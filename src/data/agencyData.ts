export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  summary: string;
  capabilities: string[];
  stackNote: string;
  featured?: boolean;
}

export interface ArchitectureLayer {
  id: string;
  label: string;
  headline: string;
  description: string;
  technologies: string[];
  specifications: { label: string; value: string }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  clientSector: string;
  category: '3D & WebGL' | 'FinTech & APIs' | 'Headless Commerce';
  year: string;
  summary: string;
  image: string;
  imageAlt: string;
  primaryMetric: string;
  secondaryMetric: string;
  challenge: string;
  architecture: string[];
  outcomes: { label: string; value: string }[];
  stack: string[];
}

export interface StandardPillar {
  id: string;
  index: string;
  title: string;
  description: string;
  benchmark: string;
}

export const TECH_STACK_OVERVIEW = [
  'Next.js',
  'TypeScript',
  'Node.js Microservices',
  'GraphQL',
  'AWS Cloud',
  'Docker',
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'full-stack-web-apps',
    index: '01.',
    title: 'Full-Stack Web Apps',
    summary:
      'High-performance, scalable platforms tailored for modern businesses. Built from the ground up with strict TypeScript contracts, server-rendered edge speed, and resilient state management.',
    capabilities: [
      'Server-side and edge-cached Next.js rendering pipelines',
      'End-to-end strict TypeScript API and UI schemas',
      'Multi-region CDN distribution and zero-downtime blue/green releases',
    ],
    stackNote: 'Next.js · TypeScript · Edge Compute',
    featured: true,
  },
  {
    id: 'microservices-architecture',
    index: '02.',
    title: 'Microservices Architecture',
    summary:
      'Decoupled, secure, and fast API ecosystems to future-proof your tech stack. Independently deployable services orchestrated for horizontal scale under institutional traffic spikes.',
    capabilities: [
      'Federated GraphQL gateways unifying legacy and modern services',
      'Containerized Node.js worker clusters via Docker and Kubernetes',
      'Isolated fault domains with automated circuit-breaking on AWS Cloud',
    ],
    stackNote: 'Node.js Microservices · GraphQL · AWS Cloud · Docker',
  },
  {
    id: 'interactive-web-tools',
    index: '03.',
    title: 'Interactive Web Tools',
    summary:
      'Dynamic dashboards, data visualizers, and real-time user interfaces engineered to feel instantaneous. Hardware-accelerated WebGL canvases paired with razor-sharp analytical controls.',
    capabilities: [
      'Real-time WebGL and Three.js product configurators at 60 FPS',
      'Sub-50ms streaming financial and operational telemetry views',
      'Custom procedural geometry, shader pipelines, and spatial UI',
    ],
    stackNote: 'WebGL / Three.js · Streaming APIs · Precision UI',
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'frontend-edge',
    label: 'Frontend & Edge',
    headline: 'Deterministic Rendering with Next.js & TypeScript',
    description:
      'Every interface is structured around predictable latency budgets. Static shells stream immediately from global edge nodes while dynamic data hydrates without layout shift.',
    technologies: ['Next.js App Router', 'TypeScript 5+', 'Tailwind CSS', 'WebGL / Three.js'],
    specifications: [
      { label: 'First Contentful Paint', value: '< 320ms' },
      { label: 'Core Web Vitals', value: '99 / 100' },
      { label: 'Type Coverage', value: '100% Strict' },
    ],
  },
  {
    id: 'api-mesh',
    label: 'API & Microservices',
    headline: 'Federated GraphQL over Node.js Microservices',
    description:
      'Domain services remain cleanly decoupled behind a strongly-typed GraphQL schema layer, enabling rapid product iteration without monolithic bottlenecks.',
    technologies: ['Node.js Microservices', 'GraphQL Federation', 'Redis Streams', 'gRPC Internal'],
    specifications: [
      { label: 'p99 Gateway Latency', value: '18ms' },
      { label: 'Throughput Capacity', value: '45k req/sec' },
      { label: 'Schema Governance', value: 'Automated CI' },
    ],
  },
  {
    id: 'cloud-infra',
    label: 'Cloud & Containers',
    headline: 'Immutable Docker Workloads on AWS Cloud',
    description:
      'Infrastructure is codified, reproducible, and hardened by default. Multi-AZ failover, automated container scanning, and encrypted private VPC subnets protect mission-critical workloads.',
    technologies: ['AWS Cloud (EKS / ECS)', 'Docker Multi-Stage', 'Terraform IaC', 'Zero-Trust IAM'],
    specifications: [
      { label: 'Availability SLA', value: '99.9%' },
      { label: 'Deploy Recovery', value: '< 45 sec' },
      { label: 'Encryption Standard', value: 'TLS 1.3 + KMS' },
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'luxedrive-configurator',
    title: 'LuxeDrive Configurator',
    clientSector: 'Automotive Mobility',
    category: '3D & WebGL',
    year: '2026',
    summary:
      'An interactive 3D web tool for a luxury car brand, allowing users to customize car parts in real-time.',
    image: '/src/assets/images/case_luxedrive_configurator_1794836546313.jpg',
    imageAlt: 'Dark luxury electric grand tourer inside minimalist architectural concrete studio',
    primaryMetric: '60 FPS WebGL Viewport',
    secondaryMetric: '+38% Dealer Reservations',
    challenge:
      'Legacy dealership configurators relied on pre-rendered server images that introduced multi-second delays between wheel, paint, and interior trim selections—causing steep drop-off on mobile and desktop.',
    architecture: [
      'Built a custom PBR WebGL viewport with progressive geometry streaming and dynamic studio environment reflections.',
      'Engineered an authoritative pricing and build-validation microservice in Node.js + GraphQL to prevent invalid trim combinations.',
      'Deployed asset edge caching on AWS CloudFront reducing initial 3D bundle payload by 64%.',
    ],
    outcomes: [
      { label: 'Viewport Frame Rate', value: '60 FPS' },
      { label: 'Dealer Reservations', value: '+38% QoQ' },
      { label: 'Median Session Depth', value: '6m 42s' },
    ],
    stack: ['Next.js', 'TypeScript', 'WebGL / Three.js', 'GraphQL', 'AWS Cloud'],
  },
  {
    id: 'vanguard-fintech-dashboard',
    title: 'Vanguard FinTech Dashboard',
    clientSector: 'Institutional Finance',
    category: 'FinTech & APIs',
    year: '2026',
    summary:
      'A secure, blazing-fast financial analytics dashboard powered by a microservices architecture.',
    image: '/src/assets/images/case_vanguard_fintech_1794836546134.jpg',
    imageAlt: 'Executive financial workstation overlooking London skyline with sapphire and monochrome charts',
    primaryMetric: '18ms p99 GraphQL Latency',
    secondaryMetric: '$4.8B Daily Volume',
    challenge:
      'Institutional portfolio managers needed to reconcile multi-currency liquidity exposures and real-time order books across twelve regional desks without browser stalls or stale settlement data.',
    architecture: [
      'Decoupled ledger ingestion, risk calculation, and reporting into containerized Node.js Microservices orchestrated via Docker.',
      'Unified real-time market feeds and historical queries behind a persisted GraphQL subscription layer.',
      'Enforced hardware-key MFA, strict RBAC policies, and immutable audit trails inside isolated AWS VPC subnets.',
    ],
    outcomes: [
      { label: 'p99 Query Latency', value: '18ms' },
      { label: 'Daily Volume Tracked', value: '$4.8B' },
      { label: 'Uptime Record', value: '99.98%' },
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js Microservices', 'GraphQL', 'Docker'],
  },
  {
    id: 'aura-ecommerce',
    title: 'Aura E-Commerce',
    clientSector: 'Luxury Retail',
    category: 'Headless Commerce',
    year: '2026',
    summary:
      'A headless e-commerce web application with a 0.5-second load time, integrating a custom AI recommendation engine.',
    image: '/src/assets/images/case_aura_ecommerce_1794836546310.jpg',
    imageAlt: 'Minimalist brushed titanium and smoked glass object on dark basalt plinth under studio spotlight',
    primaryMetric: '0.5s Global Load Time',
    secondaryMetric: '+42% Average Order Value',
    challenge:
      'Global luxury launches triggered 40x traffic surges in under sixty seconds, crashing monolithic storefront templates and breaking localized inventory sync across Europe, North America, and APAC.',
    architecture: [
      'Architected a headless Next.js storefront decoupled from inventory, checkout, and custom AI recommendation microservices.',
      'Implemented incremental static regeneration paired with edge-distributed GraphQL product catalogs for 0.5-second global TTFB.',
      'Containerized recommendation inference workers in Docker on AWS ECS with sub-40ms personalization scoring.',
    ],
    outcomes: [
      { label: 'Global Page Load', value: '0.5s' },
      { label: 'Average Order Value', value: '+42%' },
      { label: 'Edge Cache Hit Rate', value: '99.94%' },
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js Microservices', 'GraphQL', 'AWS Cloud', 'Docker'],
  },
];

export const VESPERA_STANDARD: StandardPillar[] = [
  {
    id: 'zero-clutter-ui',
    index: '01.',
    title: 'Zero-Clutter UI',
    description:
      'Every pixel earns its place. We strip away ornamental bloat in favor of clear typographic hierarchy, measured glass depth, and effortless operator focus.',
    benchmark: 'WCAG AA Verified Contrast',
  },
  {
    id: 'bank-grade-security',
    index: '02.',
    title: 'Bank-Grade Security',
    description:
      'Security is architected at Layer 1, never bolted on after launch. Zero-trust service boundaries, TLS 1.3 transport, automated dependency auditing, and hardened container images.',
    benchmark: 'End-to-End Encrypted Mesh',
  },
  {
    id: 'uptime-architecture',
    index: '03.',
    title: '99.9% Uptime Architecture',
    description:
      'Engineered for uninterrupted enterprise continuity across multi-region AWS clusters, automated health checks, graceful degradation, and zero-downtime rollouts.',
    benchmark: 'Multi-AZ Redundant Failover',
  },
];

export const STUDIO_IMAGE = {
  src: '/src/assets/images/standard_london_studio_1794836547374.jpg',
  alt: 'Vespera Core London engineering studio overlooking the City skyline at twilight',
};
