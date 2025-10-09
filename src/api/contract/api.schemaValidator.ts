import Ajv, { type AnySchema, type ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import type { OpenApiDoc, HttpMethod } from './api.openapiLoader';

// get JSON Schema for route + method + status from OpenAPI
export function getResponseSchema(openapi: OpenApiDoc, route: string, method: HttpMethod, status = 200): AnySchema {
  const op = openapi.paths[route] && openapi.paths[route][method];
  if (!op) {
    throw new Error(`Operation not found for route ${route} and method ${method.toUpperCase()}`);
  }

  const schema = op.responses[status].content['application/json'].schema;

  // simple ref resolver: "#/components/schemas/Name"
  const ref = schema.$ref;
  if (typeof ref === 'string') {
    const name = ref.split('/').pop()!;
    const resolved = openapi.components?.schemas?.[name];
    return (resolved ?? {}) as AnySchema;
  }

  return schema as AnySchema;
}

// validate API data by AJV schema
export function validateBySchema(
  schema: AnySchema,
  data: unknown
): { ok: boolean; errors: ErrorObject[] | null | undefined } {
  const ajv = new Ajv({ strict: false, allErrors: true });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const ok = validate(data) as boolean;

  return { ok, errors: validate.errors };
}
