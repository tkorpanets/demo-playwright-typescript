import fs from 'fs';
import path from 'path';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
type JsonSchema = Record<string, unknown> & { $ref?: string };

type ResponseContent = {
  'application/json': { schema: JsonSchema };
};

type Operation = {
  responses: Record<number, { content: ResponseContent }>;
};

type Paths = Record<string, Partial<Record<HttpMethod, Operation>>>;

export type OpenApiDoc = {
  paths: Paths;
  components?: { schemas?: Record<string, JsonSchema> };
};

export function loadOpenApiLocal(name = 'default'): OpenApiDoc {
  const file = path.resolve(__dirname, 'schemas', `${name}.json`);

  if (!fs.existsSync(file)) {
    throw new Error(`OpenAPI schema file not found: ${file}`);
  }

  const raw = fs.readFileSync(file, 'utf-8');
  if (!raw.trim()) {
    throw new Error(`OpenAPI schema file is empty: ${file}`);
  }

  const parsed: unknown = JSON.parse(raw);
  return parsed as OpenApiDoc;
}
