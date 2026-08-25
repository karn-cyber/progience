import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("includes the complete P0 route families", async () => {
  const required = [
    "app/(frontend)/page.tsx", "app/(frontend)/solutions/page.tsx", "app/(frontend)/solutions/[slug]/page.tsx",
    "app/(frontend)/capabilities/page.tsx", "app/(frontend)/capabilities/[slug]/page.tsx", "app/(frontend)/industries/page.tsx",
    "app/(frontend)/gcc/page.tsx", "app/(frontend)/insights/page.tsx", "app/(frontend)/case-studies/page.tsx",
    "app/(frontend)/about/page.tsx", "app/(frontend)/careers/page.tsx", "app/(frontend)/contact/page.tsx",
    "app/(frontend)/privacy/page.tsx", "app/(frontend)/accessibility/page.tsx", "app/(frontend)/security/page.tsx",
    "app/(payload)/admin/[[...segments]]/page.tsx", "app/(payload)/api/[[...slug]]/route.ts",
  ];
  await Promise.all(required.map((path) => access(new URL(path, root))));
});

test("locks the approved brand foundation and accessibility fallbacks", async () => {
  const css = await read("app/(frontend)/globals.css");
  for (const token of ["#000057", "#0e1033", "#ff2454", "#2eaedb", "#f5b82e", "IBM Plex Sans", "Poppins", "prefers-reduced-motion", ":focus-visible"]) assert.match(css, new RegExp(token, "i"));
});

test("keeps proof and claims evidence-gated", async () => {
  const [collections, content] = await Promise.all([read("cms/collections.ts"), read("lib/content.ts")]);
  for (const level of ["E0", "E1", "E2", "E3", "E4"]) assert.match(collections, new RegExp(`\\"${level}\\"`));
  assert.match(collections, /legalApproval/);
  assert.match(collections, /expiryDate/);
  assert.match(content, /export const caseStudies: Array<.*> = \[\];/);
  assert.match(content, /export const openRoles: Array<.*> = \[\];/);
});

test("keeps candidate and client data flows separate", async () => {
  const [schema, contact, careers] = await Promise.all([read("db/schema.ts"), read("app/(frontend)/contact/page.tsx"), read("app/(frontend)/careers/page.tsx")]);
  assert.match(schema, /careers_applications/);
  assert.match(schema, /enquiries/);
  assert.match(contact, /Job applications stay in the Careers journey/);
  assert.match(careers, /Client workforce enquiries have their own separate route/);
});
