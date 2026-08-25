export type Solution = {
  slug: string;
  title: string;
  need: string;
  promise: string;
  challenge: string;
  outcome: string[];
  useCases: string[];
  capabilities: string[];
  approach: string[];
  intent: string;
};

export type Capability = {
  slug: string;
  title: string;
  role: string;
  problems: string[];
  competencies: string[];
  outcomes: string[];
  relatedSolutions: string[];
  maturity: "Established" | "Emerging";
};

export const solutions: Solution[] = [
  {
    slug: "build",
    title: "Build",
    need: "Create technology capability",
    promise: "Build the people, engineering and supporting disciplines required to turn technology ambition into execution.",
    challenge: "New teams, products and capability centres often need to form quickly without creating fragmented delivery, quality or governance.",
    outcome: ["Faster mobilisation", "Coherent capability", "A foundation designed to scale"],
    useCases: ["Build technology teams", "Establish GCC capability", "Build digital products", "Create specialist capability"],
    capabilities: ["Workforce", "Digital Engineering", "Quality Engineering", "Digital Trust"],
    approach: ["Clarify the capability objective", "Design the right capability mix", "Mobilise people and delivery disciplines", "Establish governance and measures"],
    intent: "technology_capability",
  },
  {
    slug: "scale",
    title: "Scale",
    need: "Increase technology capacity",
    promise: "Scale technology capability while protecting delivery quality, trust and control.",
    challenge: "Rapid growth can amplify inconsistency, bottlenecks and risk when workforce, engineering and assurance scale separately.",
    outcome: ["More capacity", "Sustained quality", "Clearer operational control"],
    useCases: ["Scale engineering teams", "Scale technology workforce", "Scale delivery capability", "Scale digital operations"],
    capabilities: ["Workforce", "Digital Engineering", "Quality Engineering", "Digital Trust", "Application Support"],
    approach: ["Identify the real constraint", "Sequence capacity and process changes", "Embed quality and trust", "Measure capability health"],
    intent: "engineering",
  },
  {
    slug: "engineer",
    title: "Engineer",
    need: "Improve engineering execution",
    promise: "Engineer and modernise products and platforms around measurable delivery outcomes.",
    challenge: "Engineering organisations must improve speed and productivity without trading away maintainability, reliability or customer value.",
    outcome: ["Delivery velocity", "Product resilience", "Modernisation progress"],
    useCases: ["Digital engineering", "Product engineering", "Application modernisation", "Engineering productivity"],
    capabilities: ["Digital Engineering", "Quality Engineering", "Workforce", "Emerging Technology"],
    approach: ["Frame the product outcome", "Assess architecture and delivery constraints", "Build with integrated quality", "Evolve through measurable increments"],
    intent: "engineering",
  },
  {
    slug: "assure",
    title: "Assure",
    need: "Increase quality, security and trust",
    promise: "Build confidence into technology delivery instead of treating quality and trust as final-stage checks.",
    challenge: "Release pressure exposes weaknesses when testing, security and engineering operate as disconnected gates.",
    outcome: ["Release confidence", "Risk visibility", "Quality at engineering speed"],
    useCases: ["Quality engineering", "Test automation", "Digital trust", "Security engineering"],
    capabilities: ["Quality Engineering", "Digital Trust", "Digital Engineering"],
    approach: ["Map critical risks", "Shift assurance into delivery", "Automate repeatable controls", "Use evidence to improve continuously"],
    intent: "quality_trust",
  },
  {
    slug: "operate",
    title: "Operate",
    need: "Keep critical technology reliable",
    promise: "Operate critical applications with the reliability and insight required to keep evolving them.",
    challenge: "Operational burden and brittle applications can consume the capacity needed for improvement and modernisation.",
    outcome: ["Reliability", "Operational clarity", "Readiness to evolve"],
    useCases: ["Application support", "Application reliability", "Managed application services"],
    capabilities: ["Application Support", "Digital Engineering", "Quality Engineering", "Digital Trust"],
    approach: ["Understand service criticality", "Stabilise priority risks", "Improve support discipline", "Create a route from operation to evolution"],
    intent: "application_support",
  },
  {
    slug: "evolve",
    title: "Evolve",
    need: "Modernise and adopt what is next",
    promise: "Evolve technology capability through practical innovation, disciplined engineering and responsible adoption.",
    challenge: "Modernisation and emerging technology create value only when they connect to real operating needs, quality and trust.",
    outcome: ["Practical innovation", "Modern capability", "Responsible adoption"],
    useCases: ["AI enablement", "Technology modernisation", "Emerging technology", "Digital evolution"],
    capabilities: ["Emerging Technology", "Digital Engineering", "Digital Trust", "Quality Engineering", "Application Support"],
    approach: ["Prioritise valuable opportunities", "Validate feasibility and risk", "Engineer a practical path", "Scale proven capability responsibly"],
    intent: "technology_capability",
  },
];

export const capabilities: Capability[] = [
  {
    slug: "workforce",
    title: "Workforce Services",
    role: "Build and scale the specialist technology workforce required for execution.",
    problems: ["Hiring speed", "Specialist capability gaps", "Flexible capacity", "GCC talent scaling"],
    competencies: ["Technology workforce solutions", "Specialist team mobilisation", "Flexible engagement models", "Capability-aligned talent"],
    outcomes: ["Speed", "Scale"],
    relatedSolutions: ["build", "scale", "engineer"],
    maturity: "Established",
  },
  {
    slug: "digital-engineering",
    title: "Digital Engineering",
    role: "Build, modernise and improve digital products and engineering capability.",
    problems: ["Product engineering", "Application modernisation", "Engineering productivity", "Delivery execution"],
    competencies: ["Product and application engineering", "Modernisation", "Architecture and delivery", "Engineering enablement"],
    outcomes: ["Speed", "Evolution"],
    relatedSolutions: ["build", "scale", "engineer", "evolve"],
    maturity: "Established",
  },
  {
    slug: "digital-trust",
    title: "Digital Trust Services",
    role: "Strengthen security, resilience and confidence across technology environments.",
    problems: ["Digital risk", "Security integration", "Resilience", "Governance"],
    competencies: ["Security engineering", "Digital risk assessment", "Resilience practices", "Trust-by-design enablement"],
    outcomes: ["Trust", "Resilience"],
    relatedSolutions: ["assure", "operate", "evolve"],
    maturity: "Established",
  },
  {
    slug: "emerging-technology",
    title: "Enabling Emerging Technology",
    role: "Translate emerging technology into practical, responsible enterprise capability.",
    problems: ["AI adoption", "Use-case prioritisation", "Responsible enablement", "Capability readiness"],
    competencies: ["Opportunity framing", "Prototyping and validation", "Responsible adoption", "Engineering enablement"],
    outcomes: ["Evolution", "Trust"],
    relatedSolutions: ["engineer", "evolve"],
    maturity: "Emerging",
  },
  {
    slug: "application-support",
    title: "Application Support Services",
    role: "Keep critical applications reliable while preparing them to evolve.",
    problems: ["Application instability", "Operational burden", "Legacy complexity", "Modernisation support"],
    competencies: ["Application support", "Reliability improvement", "Maintenance and enhancement", "Modernisation readiness"],
    outcomes: ["Reliability", "Evolution"],
    relatedSolutions: ["operate", "engineer", "evolve"],
    maturity: "Established",
  },
  {
    slug: "quality-engineering",
    title: "Quality Engineering Services",
    role: "Improve software quality and release confidence without slowing engineering.",
    problems: ["Release quality", "Test automation", "Validation", "Quality at scale"],
    competencies: ["Quality engineering", "Test automation", "Continuous validation", "Release assurance"],
    outcomes: ["Quality", "Speed"],
    relatedSolutions: ["scale", "engineer", "assure", "operate"],
    maturity: "Established",
  },
];

export const industries = [
  {
    slug: "technology-product",
    title: "Technology & Product Companies",
    label: "Technology and product organisations",
    intro: "Increase engineering capacity, product quality and specialist capability without losing the focus and discipline that make product organisations effective.",
    pressures: ["Scaling engineering teams", "Modernising products", "Improving release confidence", "Accessing specialist capability"],
    solutions: ["Scale", "Engineer", "Assure", "Evolve"],
  },
  {
    slug: "enterprise",
    title: "Enterprise",
    label: "Enterprise technology environments",
    intro: "Connect capability growth, engineering execution, quality and trust around the realities of complex enterprise technology.",
    pressures: ["Legacy complexity", "Governance and risk", "Delivery capacity", "Operational reliability"],
    solutions: ["Build", "Engineer", "Assure", "Operate", "Evolve"],
  },
];

export const insights = [
  {
    category: "technology-capability",
    slug: "building-connected-technology-capability",
    title: "What does connected technology capability actually mean?",
    summary: "A practical model for moving beyond isolated service lines and organising people, engineering, quality, trust and operations around an outcome.",
    question: "Why do capable teams still struggle to turn technology ambition into consistent execution?",
    framework: ["Start with the outcome", "Identify the binding constraint", "Combine only the capabilities required", "Make proof and governance visible"],
  },
  {
    category: "gcc",
    slug: "gcc-capability-lifecycle",
    title: "A capability-first lifecycle for building and scaling a GCC",
    summary: "How to think through strategy, establishment, capability building, scale, optimisation and transformation without reducing the GCC story to hiring alone.",
    question: "What must connect for a GCC to become a durable technology capability rather than a capacity programme?",
    framework: ["Strategise", "Establish", "Build", "Scale", "Optimise", "Transform"],
  },
  {
    category: "engineering",
    slug: "scale-engineering-without-losing-quality",
    title: "How can engineering organisations scale without losing quality?",
    summary: "Treat workforce growth, engineering systems, quality and trust as one scaling problem instead of a chain of hand-offs.",
    question: "Where does rapid engineering growth create hidden constraints?",
    framework: ["Map flow, not headcount", "Strengthen engineering enablement", "Integrate quality early", "Measure outcomes and health"],
  },
  {
    category: "quality-engineering",
    slug: "quality-at-engineering-speed",
    title: "Quality at engineering speed",
    summary: "A practical way to improve release confidence by integrating risk, automation and feedback into the delivery system.",
    question: "How can quality improve without creating a slower release process?",
    framework: ["Prioritise critical risks", "Automate repeatable evidence", "Move feedback earlier", "Improve from production learning"],
  },
  {
    category: "digital-trust",
    slug: "integrate-digital-trust-into-engineering",
    title: "Integrating digital trust into engineering",
    summary: "Security and resilience are more effective when they shape architecture and delivery decisions rather than appearing as late gates.",
    question: "How can trust controls support delivery rather than compete with it?",
    framework: ["Define trust outcomes", "Embed controls in workflow", "Automate evidence", "Use risk to guide depth"],
  },
  {
    category: "ai-emerging-technology",
    slug: "responsible-ai-capability",
    title: "From AI interest to responsible capability",
    summary: "A disciplined path from opportunity framing to validation, engineering, assurance and responsible scale.",
    question: "What separates a useful AI capability from an isolated experiment?",
    framework: ["Choose a valuable problem", "Validate data and feasibility", "Design trust and quality in", "Scale only proven patterns"],
  },
];

export const capabilityMap = [
  { problem: "Cannot hire fast enough", solution: "Build", capabilities: "Workforce + Digital Engineering", outcome: "Speed + Scale" },
  { problem: "Need to scale engineering", solution: "Scale", capabilities: "Workforce + Engineering + QE", outcome: "Scale + Quality" },
  { problem: "Poor release confidence", solution: "Assure", capabilities: "QE + Engineering + Digital Trust", outcome: "Quality + Trust" },
  { problem: "Legacy application burden", solution: "Operate / Evolve", capabilities: "App Support + Engineering + QE", outcome: "Reliability + Evolution" },
];

export function getSolution(slug: string) {
  return solutions.find((item) => item.slug === slug);
}

export function getCapability(slug: string) {
  return capabilities.find((item) => item.slug === slug);
}

export function getIndustry(slug: string) {
  return industries.find((item) => item.slug === slug);
}

export function getInsight(category: string, slug: string) {
  return insights.find((item) => item.category === category && item.slug === slug);
}

export const caseStudies: Array<{ slug: string; title: string }> = [];
export const openRoles: Array<{ slug: string; title: string; location: string }> = [];
