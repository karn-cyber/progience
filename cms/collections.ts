import type { CollectionConfig, Field } from "payload";

const publicationAccess: CollectionConfig["access"] = {
  read: ({ req }) => req.user ? true : ({ _status: { equals: "published" } } as const),
};

const workflow: CollectionConfig["versions"] = {
  drafts: { autosave: true, schedulePublish: true },
  maxPerDoc: 25,
};

const identityFields: Field[] = [
  { name: "title", type: "text", required: true },
  { name: "slug", type: "text", required: true, unique: true, index: true, admin: { position: "sidebar" } },
  { name: "summary", type: "textarea", required: true, maxLength: 320 },
  { name: "body", type: "richText" },
  { name: "owner", type: "relationship", relationTo: "people", admin: { position: "sidebar" } },
  { name: "reviewDate", type: "date", admin: { position: "sidebar" } },
];

const createEditorialCollection = (slug: string, singular: string, plural: string, fields: Field[] = []): CollectionConfig => ({
  slug,
  labels: { singular, plural },
  access: publicationAccess,
  admin: { useAsTitle: "title", defaultColumns: ["title", "owner", "reviewDate", "updatedAt"] },
  versions: workflow,
  fields: [...identityFields, ...fields],
});

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  access: { read: ({ req }) => Boolean(req.user), create: ({ req }) => !req.user || req.user.role === "administrator", update: ({ req }) => Boolean(req.user), delete: ({ req }) => req.user?.role === "administrator" },
  fields: [{ name: "name", type: "text", required: true }, { name: "role", type: "select", required: true, defaultValue: "editor", options: ["administrator", "editor", "reviewer", "approver"] }],
};

export const Media: CollectionConfig = {
  slug: "media",
  upload: { mimeTypes: ["image/*", "application/pdf"], imageSizes: [{ name: "card", width: 800, height: 520, position: "centre" }, { name: "social", width: 1200, height: 630, position: "centre" }] },
  access: { read: () => true, create: ({ req }) => Boolean(req.user), update: ({ req }) => Boolean(req.user), delete: ({ req }) => req.user?.role === "administrator" },
  fields: [{ name: "alt", type: "text", required: true }, { name: "usageApproval", type: "checkbox", required: true, defaultValue: false }],
};

export const Problems = createEditorialCollection("problems", "Problem", "Problems", [{ name: "buyerQuestion", type: "text", required: true }]);
export const Solutions = createEditorialCollection("solutions", "Solution", "Solutions", [
  { name: "problems", type: "relationship", relationTo: "problems", hasMany: true },
  { name: "capabilities", type: "relationship", relationTo: "capabilities", hasMany: true, required: true },
  { name: "outcomes", type: "relationship", relationTo: "outcomes", hasMany: true },
  { name: "proof", type: "relationship", relationTo: ["proof-items", "case-studies"], hasMany: true },
]);
export const Capabilities = createEditorialCollection("capabilities", "Capability", "Capabilities", [
  { name: "maturity", type: "select", required: true, options: ["proven", "established", "emerging", "strategic-direction"] },
  { name: "competencies", type: "array", fields: [{ name: "competency", type: "text", required: true }] },
  { name: "relatedSolutions", type: "relationship", relationTo: "solutions", hasMany: true },
  { name: "proof", type: "relationship", relationTo: ["proof-items", "case-studies"], hasMany: true },
]);
export const Industries = createEditorialCollection("industries", "Industry", "Industries", [{ name: "solutions", type: "relationship", relationTo: "solutions", hasMany: true }, { name: "capabilities", type: "relationship", relationTo: "capabilities", hasMany: true }]);
export const GCCThemes = createEditorialCollection("gcc-themes", "GCC Theme", "GCC Themes", [{ name: "lifecycleStage", type: "select", required: true, options: ["strategize", "establish", "build", "scale", "optimize", "transform"] }, { name: "capabilities", type: "relationship", relationTo: "capabilities", hasMany: true }]);
export const Outcomes = createEditorialCollection("outcomes", "Outcome", "Outcomes", [{ name: "measure", type: "text" }, { name: "evidence", type: "relationship", relationTo: "proof-items", hasMany: true }]);
export const CaseStudies = createEditorialCollection("case-studies", "Case Study", "Case Studies", [
  { name: "context", type: "richText", required: true }, { name: "challenge", type: "richText", required: true }, { name: "workPerformed", type: "richText", required: true },
  { name: "capabilities", type: "relationship", relationTo: "capabilities", hasMany: true, required: true }, { name: "outcomes", type: "relationship", relationTo: "outcomes", hasMany: true }, { name: "claims", type: "relationship", relationTo: "claim-records", hasMany: true, required: true },
]);
export const Insights = createEditorialCollection("insights", "Insight", "Insights", [{ name: "category", type: "text", required: true, index: true }, { name: "buyerQuestion", type: "text", required: true }, { name: "capabilities", type: "relationship", relationTo: "capabilities", hasMany: true }, { name: "proof", type: "relationship", relationTo: "proof-items", hasMany: true }]);

export const ProofItems: CollectionConfig = {
  ...createEditorialCollection("proof-items", "Proof Item", "Proof Items"),
  fields: [...identityFields,
    { name: "proofType", type: "select", required: true, options: ["customer-evidence", "metric", "testimonial", "credential", "delivery-artifact"] },
    { name: "evidenceLevel", type: "select", required: true, defaultValue: "E0", options: ["E0", "E1", "E2", "E3", "E4"], admin: { position: "sidebar" } },
    { name: "source", type: "textarea", required: true }, { name: "approvedWording", type: "textarea" }, { name: "approvalDate", type: "date" }, { name: "expiryDate", type: "date", required: true },
  ],
};

export const ClaimRecords: CollectionConfig = {
  slug: "claim-records", admin: { useAsTitle: "claim" }, versions: workflow,
  fields: [
    { name: "claim", type: "textarea", required: true }, { name: "owner", type: "relationship", relationTo: "people", required: true }, { name: "source", type: "textarea", required: true },
    { name: "evidenceLevel", type: "select", required: true, defaultValue: "E0", options: ["E0", "E1", "E2", "E3", "E4"] }, { name: "status", type: "select", required: true, defaultValue: "draft", options: ["draft", "in-review", "approved", "blocked", "expired"] },
    { name: "approvedWording", type: "textarea" }, { name: "businessApproval", type: "checkbox", defaultValue: false }, { name: "legalApproval", type: "checkbox", defaultValue: false }, { name: "reviewDate", type: "date", required: true }, { name: "expiryDate", type: "date", required: true },
  ],
};

export const People = createEditorialCollection("people", "Person", "People", [{ name: "role", type: "text", required: true }, { name: "accountability", type: "textarea" }, { name: "photo", type: "upload", relationTo: "media" }]);
export const JobRoles = createEditorialCollection("job-roles", "Job Role", "Job Roles", [{ name: "location", type: "text" }, { name: "employmentType", type: "select", options: ["full-time", "part-time", "contract", "internship"] }, { name: "applicationRoute", type: "text", required: true }]);
export const CTAs = createEditorialCollection("ctas", "CTA", "CTAs", [{ name: "label", type: "text", required: true }, { name: "href", type: "text", required: true }, { name: "intent", type: "select", options: ["general", "technology_capability", "gcc", "workforce", "engineering", "quality_trust", "application_support", "other"] }]);
export const Redirects: CollectionConfig = { slug: "redirects", admin: { useAsTitle: "source" }, fields: [{ name: "source", type: "text", required: true, unique: true }, { name: "destination", type: "text", required: true }, { name: "permanent", type: "checkbox", defaultValue: true }, { name: "owner", type: "relationship", relationTo: "people" }] };

export const collections: CollectionConfig[] = [Users, Media, People, Problems, Solutions, Capabilities, Industries, GCCThemes, CaseStudies, Insights, Outcomes, ProofItems, ClaimRecords, JobRoles, CTAs, Redirects];
