import path from 'path';
import { mkdir, writeFile } from 'fs/promises';

const targets = [
  { name: 'default', url: 'https://reqres.in/openapi.json' },
  // { name: 'catalog', url: 'https://api.example.com/catalog/openapi.json' }, //example for another endpoint
];

const OUT_DIR = path.join(process.cwd(), 'src', 'api', 'contract', 'schemas');

async function run(): Promise<void> {
  await mkdir(OUT_DIR, { recursive: true });
  for (const t of targets) {
    try {
      const res = await fetch(t.url);
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const json: unknown = await res.json();
      const filePath = path.join(OUT_DIR, `${t.name}.json`);
      await writeFile(filePath, JSON.stringify(json, null, 2), 'utf-8');
      console.log(`Saved "${t.name}" -> ${filePath}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Failed to download schema for "${t.name}": ${message}`);
    }
  }
}

void run().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error('Unhandled error in script:', message);
  process.exit(1);
});
