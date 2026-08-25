import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { collections } from "./cms/collections";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const connectionString = process.env.DATABASE_URL || "postgresql://progience:progience@127.0.0.1:5432/progience";

export default buildConfig({
  admin: { user: "users", importMap: { baseDir: path.resolve(dirname) }, meta: { titleSuffix: " | Progience Content" } },
  collections,
  db: postgresAdapter({ pool: { connectionString }, schemaName: "cms", push: process.env.NODE_ENV === "development" }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "development-only-payload-secret-change-before-production",
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
