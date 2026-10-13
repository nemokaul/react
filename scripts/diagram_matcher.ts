import fs from "fs";
import path from "path";

export interface BookDiagram {
  id: string;
  book_title: string;
  book_slug: string;
  author: string;
  year: number;
  filename: string;
  image_url: string;
  caption: string;
  topics: string[];
  chapter_title: string;
}

export interface DiagramMatch {
  diagram_url: string;
  diagram_caption: string;
  diagram_source: string;
}

// Load catalog
const catalogPath = path.resolve(__dirname, "..", "static", "data", "book_diagrams_catalog.json");
const rawCatalog: BookDiagram[] = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));

// Filter out low-value items
const cleanCatalog: BookDiagram[] = rawCatalog.filter(d => {
  if (d.filename.includes("leanpub_") && !d.filename.includes("module")) return false;
  if (d.filename.includes("apple-logo") || d.filename.includes("Packt_Logo") || d.filename.includes("logo")) return false;
  if (d.caption.includes("Cover of") || d.caption.includes("image-placeholder")) return false;
  if (d.filename.includes("Coupon") || d.filename.includes("GitHub_create_repository")) return false;
  return true;
});

// Humanized captions mapping for high-yield diagrams
const CAPTION_OVERRIDES: Record<string, string> = {
  // Robin Wieruch (The Road to React)
  "road-to-react-rendering-jsx": "JSX Compilation to React.createElement & Virtual DOM Description",
  "road-to-react-jsx-mapping": "Declarative List Rendering via Array.prototype.map in JSX",
  "road-to-react-react-keys-performance": "React Reconciliation Performance: List Diffing with Stable Keys",
  "road-to-react-component-tree": "React Component Tree Hierarchy & Declarative DOM Mapping",
  "road-to-react-react-lifecycle": "Modern React Component Lifecycle: Render, Commit, and Passive Effects",
  "road-to-react-react-state": "Internal Component State Lifecycle & Fiber Node Re-render Trigger",
  "road-to-react-react-usestate": "useState Hook Call Cycle & State Update Dispatcher",
  "road-to-react-callback-handler-1": "Event Callback Handler Flow Across Component Boundaries",
  "road-to-react-callback-handler-2": "SyntheticEvent Dispatch & Event Delegation to Document Root",
  "road-to-react-state-where": "Lifting State Up: Determining State Ownership in Component Hierarchy",
  "road-to-react-component-communication": "Component Communication: Unidirectional Data Flow via Props and Callbacks",
  "road-to-react-controlled-component": "Controlled Component Architecture: Form Inputs Bound to React State",
  "road-to-react-react-props-handling": "TypeScript Props Destructuring, Default Values & Contract Validation",
  "road-to-react-use-storage-state": "Custom Hook Architecture: Synchronizing Local State with Web Storage",
  "road-to-react-css-style-strategies": "CSS Styling Strategies in React: Utility-First vs Scoped CSS Modules",
  "road-to-react-ui-library": "UI Component Library Architecture & Design Tokens Integration",
  "road-to-react-memo": "React.memo Render Skipping & Shallow Props Reference Comparison",
  "road-to-react-usememo-1": "useMemo Caching Expensive Computations Across Re-renders",
  "road-to-react-usememo-2": "useMemo Dependency Array Invalidation & Cache Eviction Rules",
  "road-to-react-testing-pyramid": "Testing Pyramid in React: Unit Tests, Component Integration & E2E",
  "road-to-react-paginated-list": "Paginated Data Fetching & Query Cache Invalidation Pipelines",
  "road-to-react-infinite-pagination": "Infinite Scroll Pagination Architecture & Cursor-Based Fetching",

  // Nadia Makarevich (Advanced React)
  "advanced-react-makarevich-27a08f5e-1bb9-49f4-b76a-0dc4d7da7620": "Component Tree Re-render Cascades & React.memo Render Skipping",
  "advanced-react-makarevich-b931f624-aa6f-4317-8b84-164e08a0f47f": "Preventing Component Tree Re-renders with React.memo Boundary",
  "advanced-react-makarevich-e292879e-6cf7-4cff-b455-8285c32bcb90": "Unconstrained Re-render Cascading Down Component Subtrees",
  "advanced-react-makarevich-e94d6975-0495-4148-9336-35fbb29cbdfb": "Mid-Tree State Triggering Subtree-Only Re-renders",
  "advanced-react-makarevich-a8296817-1354-430b-892f-379627f6c5b3": "State Colocation: Moving State Down to Eliminate Widespread Re-renders",
  "advanced-react-makarevich-07d9de22-b079-4a8a-8ae0-4eb10db9f38b": "CSS Stacking Context Traps: Why Portals Are Required for Modals & Overlays",
  "advanced-react-makarevich-2c8570a6-4c5b-41b8-b8e1-001f3366210f": "Stacking Context Isolation of z-index and Fixed Positioning",
  "advanced-react-makarevich-83240ad2-7187-4234-a8c5-84f26c2abf64": "Natural Stacking Context and DOM Stacking Order",
  "advanced-react-makarevich-8cf45ec8-ae73-4567-8543-821dfc566a26": "Container Element Stacking Context Clipping Child Modals",
  "advanced-react-makarevich-98b54084-3ce3-482b-bfac-e6aba04de3f9": "Clipped Modal Dialog Inside Parent Element with overflow:hidden",
  "advanced-react-makarevich-353244c0-4612-4bc1-89bb-734fb351c153": "List Reconciliation with Stable Keys: Inserting Elements Without Re-renders",
  "advanced-react-makarevich-361cce3d-f4b9-4da3-a197-9cbd4b241f90": "Diffing Without Keys: The Pitfall of Stateful Input Elements Being Reused",
  "advanced-react-makarevich-543905d4-0f12-4813-8792-1363ce61bf87": "Reconciliation with Stable Unique Keys: Preserving Host DOM Input State",
  "advanced-react-makarevich-668d0b9d-0f4b-4b8c-9b1b-8d641373106d": "Memoized List Items with Stable Keys During Item Reordering",
  "advanced-react-makarevich-812887fe-0a00-4f7d-9152-c0836c055892": "The Index-As-Key Trap: Stale Props and Unnecessary Re-renders on Reordering",
  "advanced-react-makarevich-fc2ccf96-89e0-4746-85df-c5ca1fa507ac": "Index as Key Causing Unnecessary Re-renders When Prepending Items",
  "advanced-react-makarevich-5cd64ca8-60b1-4a2c-b7dc-d53dc3503c25": "Context API Data Flow: Propagating Values Past Intermediate Components",
  "advanced-react-makarevich-b606a95d-dec1-44ad-8ad5-e502e5cdef4d": "useEffect Passive Execution Pipeline: Render -> Paint -> Asynchronous Effect",
  "advanced-react-makarevich-67ac7509-ca9e-45a9-9e21-529de2831d4f": "useLayoutEffect Synchronous Execution: Blocking Paint for Layout Measurements",
  "advanced-react-makarevich-7a7c8572-a6d4-4c83-ac1e-8e36614bf22e": "Synchronous Event Loop Flow: Event Handlers, Microtasks & Rendering",
  "advanced-react-makarevich-848ed796-25c7-46ae-aa63-7ec9e6effff7": "Render Props Pattern: Inverting Control and Sharing Component State Logic",
  "advanced-react-makarevich-36c2cf5a-df6e-42a9-b629-c341931e782d": "Sequential Network Waterfall: Component-level Fetching Bottlenecks",
  "advanced-react-makarevich-31bd3a80-81fc-42ac-bb62-733498fb2900": "Parallel Data Fetching: Mitigating Waterfalls with Promise.all",
  "advanced-react-makarevich-cd7268f9-c602-475d-8db1-e7956040948c": "Parallel Promise Execution Timeline vs Chained Sequential Requests",
  "advanced-react-makarevich-8fa01803-ec1e-428f-819b-7c790b33f71c": "Network Race Condition: Out-of-Order Asynchronous Responses Overwriting State",
  "advanced-react-makarevich-cef9903f-a76d-47a7-9e92-b4b185d2f84a": "Resolving Race Conditions with Cleanup Flags & AbortController Cancellation",
  "advanced-react-makarevich-df5775fc-ce98-47eb-b887-f92e9584456c": "Race Condition Timeline: Rapid Search Queries Resolving Out of Order",
  "advanced-react-makarevich-abfd9fe6-7100-48a8-9060-f1a3d529474a": "Stale Closure Problem in React Effects & Callback Hooks",
  "advanced-react-makarevich-b7b572c3-130e-4ea9-bce0-84d19ac3117f": "JavaScript Lexical Scope & Closure Capture in React Render Cycles",
  "advanced-react-makarevich-62340e02-5535-4554-978c-96e851117c97": "SSR Transformation Pipeline: Server-Rendered HTML to Client Hydration",

  // Daniel Bugl (Learn React Hooks)
  "learn-react-hooks-B31327_01_04": "Vite Project Scaffolding & Terminal Setup for React 19",
  "learn-react-hooks-B31327_01_05": "Starting the Vite Local Development Server with Instant HMR",
  "learn-react-hooks-B31327_01_07": "First React 19 Application Architecture Using Modern Hooks",
  "learn-react-hooks-B31327_02_01": "Custom Hook Reimplementation: Encapsulating Reactive State",
  "learn-react-hooks-B31327_02_02": "State Batching: Initial UI State Before User Interaction",
  "learn-react-hooks-B31327_02_03": "State Update Dispatch: UI Re-render Following State Mutation",
  "learn-react-hooks-B31327_03_02": "Deconstructing UI Mockups into Fundamental Reusable Presentational Components",
  "learn-react-hooks-B31327_03_03": "Container Component Pattern: Encapsulating Stateful Logic and Data Fetching",
  "learn-react-hooks-B31327_03_08": "Validation & Error Handling State Machine Implemented with Hooks",
  "learn-react-hooks-B31327_05_01": "useContext Consumption for Global Dynamic Theming",
  "learn-react-hooks-B31327_05_02": "Nested Context Providers: Overriding Scoped Context Values Locally",
  "learn-react-hooks-B31327_08_02": "Client-Side Routing: Declarative Link Navigation",
  "learn-react-hooks-B31327_08_03": "Active Navigation Links via NavLink Route Matching",
  "learn-react-hooks-B31327_09_05": "useRef Direct DOM Access for Imperative Focus Management",
  "learn-react-hooks-B31327_09_08": "Inspecting Custom Hook State in React Developer Tools",
  "learn-react-hooks-B31327_11_02": "The Rules of Hooks: Call Order Invariance and Linked List Fiber Pointers",
  "learn-react-hooks-B31327_11_03": "React Runtime Enforcement: Detecting Mismatched Hook Counts Across Renders",
  "learn-react-hooks-B31327_11_05": "Static Analysis: eslint-plugin-react-hooks Enforcing Hook Call Rules",
  "learn-react-hooks-B31327_13_02": "Component Architecture Decomposition: Atomic Presentational Units",
  "learn-react-hooks-B31327_13_03": "Component Architecture Decomposition: Stateful Business Container Units",

  // Carl Rippon (Learn React with TypeScript)
  "learn-react-ts-rippon-B31786_01_01": "Scaffolding Vite React TypeScript App with create-vite",
  "learn-react-ts-rippon-B31786_01_02": "Selecting React Framework & TypeScript Variant in Vite CLI",
  "learn-react-ts-rippon-B31786_01_03": "Strict ESLint Configuration with TypeScript Parser in VS Code",
  "learn-react-ts-rippon-B31786_01_05": "Prettier Code Formatting Integration with TypeScript AST",
  "learn-react-ts-rippon-B31786_02_18": "TypeScript Strict Type Checking: Catching Array Mutation Invariants",
  "learn-react-ts-rippon-B31786_02_19": "TypeScript Type Inference for Arrays, Objects, and Function Return Types",
  "learn-react-ts-rippon-B31786_02_20": "Union Types & Type Narrowing in React Component Props",
  "learn-react-ts-rippon-B31786_02_21": "TypeScript Compile Error on Invalid Component Props Contract",
  "learn-react-ts-rippon-B31786_03_05": "Discriminated Unions in useReducer: Type-Safe Action Payloads and Autocompletion",
  "learn-react-ts-rippon-B31786_03_06": "Imperative Element Focus Management Using Typed useRef Hook",
  "learn-react-ts-rippon-B31786_03_07": "Diagnosing Unmemoized Expensive Calculations Executing on Every Re-render",
  "learn-react-ts-rippon-B31786_03_08": "Memoizing Expensive Calculations with useMemo in TypeScript",
  "learn-react-ts-rippon-B31786_03_09": "React DevTools Highlight Updates: Visualizing Active Component Re-renders",
  "learn-react-ts-rippon-B31786_03_10": "Identifying Unnecessary Re-renders of Child Components",
  "learn-react-ts-rippon-B31786_03_12": "React DevTools Profiler: Diagnosing Component Re-render Causes",
  "learn-react-ts-rippon-B31786_03_13": "Profiler Flamegraph: Examining Component Commit Durations",
  "learn-react-ts-rippon-B31786_04_04": "The Pitfall of Clashing Global CSS Selectors Across Components",
  "learn-react-ts-rippon-B31786_04_05": "CSS Modules Scoped Hashed Identifiers Preventing Global Style Collisions",
  "learn-react-ts-rippon-B31786_04_07": "Tailwind CSS Extension Setup in Modern IDEs",
  "learn-react-ts-rippon-B31786_04_08": "Tailwind CSS IntelliSense & Utility-First Rapid UI Layouts",
  "learn-react-ts-rippon-B31786_04_09": "Component Styled with Utility-First Tailwind Design Tokens",
  "learn-react-ts-rippon-B31786_04_10": "Tailwind CSS Production JIT Purging & Minified CSS Output",
  "learn-react-ts-rippon-B31786_05_1": "Client-Side Rendering (SPA) Request & Hydration Lifecycle",
  "learn-react-ts-rippon-B31786_05_2": "React Server Components (RSC) Zero-Bundle-Size Streaming Architecture",
  "learn-react-ts-rippon-B31786_05_8": "Serialized RSC Wire Format: Flight Protocol Data Stream",
  "learn-react-ts-rippon-B31786_05_9": "Client vs Server Component Boundaries: Enforcing 'use client' Directive",
  "learn-react-ts-rippon-B31786_05_13": "Server/Client Boundary Topology in Next.js App Router",
  "learn-react-ts-rippon-B31786_07_1": "Client-Side Data Fetching Sequence: Loading States and Waterfall Risks",
  "learn-react-ts-rippon-B31786_07_2": "Server-Side Data Fetching in RSC: Direct Database & Microservice Access",
  "learn-react-ts-rippon-B31786_07_6": "Zod Schema Parsing: Catching Unexpected API Payloads at Runtime",
  "learn-react-ts-rippon-B31786_07_11": "Server Actions & Server Functions: RPC Form Submissions in Next.js",
  "learn-react-ts-rippon-B31786_09_1": "Modern React Form Submission & FormData Event Handlers",
  "learn-react-ts-rippon-B31786_09_3": "Form Validation Errors & Client-Side Schema Enforcement",
  "learn-react-ts-rippon-B31786_09_4": "Granular Field-Level Validation with React Hook Form",
  "learn-react-ts-rippon-B31786_12_1": "Vitest Unit Test Runner Execution for React Components",
  "learn-react-ts-rippon-B31786_12_2": "Failing Test Assertion Trace in Vitest",
  "learn-react-ts-rippon-B31786_12_3": "React Testing Library: User-Centric Assertions and Passing Test Suite",
  "learn-react-ts-rippon-B31786_12_5": "Passing Component Test Suite Covering Edge Cases and Accessibility",
  "learn-react-ts-rippon-B31786_12_7": "Test Coverage Analysis: Statements, Branches, and Functions",

  // Nadia Makarevich (Web Performance Fundamentals)
  "web-performance-4a3293cd-739a-46dc-b380-2276ff3ab9da": "Core Web Vitals & Lighthouse Performance Metrics Analysis",
  "web-performance-4a9a3693-931e-4c48-8ca5-b37b9c8e70a6": "Chrome DevTools Performance Panel Main Thread Flamegraph",
  "web-performance-166b79da-9681-4e76-bd47-f6f4af5ab5dc": "Webpack / Rollup Bundle Analyzer: Identifying Heavy Dependencies",
  "web-performance-064a79f4-7cb2-420f-b281-497fbe5937b6": "TanStack Router & Query Directory Structure Architecture",
  "web-performance-1055dc1c-3d2e-4c52-be3b-cd111b11715e": "SSR Without Hydration Overhead: HTML-Only Render Pipeline",
  "web-performance-185aed24-2655-4bde-87a8-940022998a2d": "React.lazy Code Splitting vs Eager Loading Bundle Comparison",
  "web-performance-3f3c8554-f4b8-4c55-a626-4fa69da701b8": "HTTP 304 Not Modified Caching Headers and ETag Revalidation",
  "web-performance-2a32f0d8-2c2e-4d07-b542-c62accec8823": "SPA Performance Characteristics Under Slow Network & Fast CPU",

  // Fullstack React with TypeScript
  "fullstack-react-ts-module_00----lesson_00.01----public----images----typescript-benefits": "TypeScript Interface Contracts Governing Inter-Module Communication",
  "fullstack-react-ts-module_01----lesson_01.04----public----images----1-your-first-react-typescript-app----css_autocompletion": "Typed CSS Autocompletion & CSS-in-JS Design Token Support",
  "fullstack-react-ts-module_01----lesson_01.05----public----images----1-your-first-react-typescript-app----app_styled_components": "Component Hierarchy Decomposition in Complex Real-World Applications",
  "fullstack-react-ts-module_01----lesson_01.12----public----images----1-your-first-react-typescript-app----reducer": "Reducer State Machine: Pure State Transitions via Action Types",
  "fullstack-react-ts-module_01----lesson_01.12----public----images----1-your-first-react-typescript-app----redux_explained": "Immutable State Architecture: Creating New Object References on Mutation",
  "fullstack-react-ts-module_03----lesson_03.03----public----images----3-react-typescript-patterns----footer-css-module": "CSS Modules Generating Locally Scoped Class Identifiers"
};

// Global tracker to ensure diagram variety across curriculum
const usedDiagramUrls = new Set<string>();

export function getCleanCaption(d: BookDiagram): string {
  if (CAPTION_OVERRIDES[d.id]) {
    return CAPTION_OVERRIDES[d.id];
  }
  let cap = d.caption || "";
  // Strip "Figure X.Y – " prefix if present
  cap = cap.replace(/^Figure\s+[\d\.]+\s*[-–—]\s*/i, "");
  // Clean generic Packt labels
  if (cap.startsWith("Image ") || cap.startsWith("OCR") || cap.includes("Architectural Diagram (B")) {
    return `${d.book_title}: Architectural Flow (${d.filename.replace(/\.[^.]+$/, "")})`;
  }
  return cap;
}

export function getAuthorSource(d: BookDiagram): string {
  return `${d.author} — ${d.book_title} (${d.year})`;
}

function scoreDiagram(d: BookDiagram, words: string[], secSlug: string): number {
  let score = 0;
  const searchable = `${d.caption} ${d.filename} ${d.chapter_title} ${d.topics.join(" ")}`.toLowerCase();

  // Prefer curated overrides
  if (CAPTION_OVERRIDES[d.id]) {
    score += 40;
  }

  // Section domain bonuses
  if (secSlug === "00-setup") {
    if (d.book_slug === "learn-react-ts-rippon" || d.book_slug === "learn-react-hooks") score += 15;
    if (searchable.includes("vite") || searchable.includes("eslint") || searchable.includes("vscode") || searchable.includes("typescript")) score += 25;
  } else if (secSlug === "01-fundamentals") {
    if (d.book_slug === "road-to-react" || d.book_slug === "learn-react-hooks" || d.book_slug === "advanced-react-makarevich") score += 15;
    if (searchable.includes("tree") || searchable.includes("reconcil") || searchable.includes("key") || searchable.includes("jsx") || searchable.includes("prop")) score += 25;
  } else if (secSlug === "02-hooks") {
    if (d.book_slug === "learn-react-hooks" || d.book_slug === "advanced-react-makarevich" || d.book_slug === "road-to-react") score += 20;
    if (searchable.includes("hook") || searchable.includes("usestate") || searchable.includes("useeffect") || searchable.includes("context") || searchable.includes("ref") || searchable.includes("reducer")) score += 30;
  } else if (secSlug === "03-state-and-effects") {
    if (d.book_slug === "advanced-react-makarevich" || d.book_slug === "road-to-react" || d.book_slug === "react-architecture") score += 20;
    if (searchable.includes("memo") || searchable.includes("render") || searchable.includes("stacking") || searchable.includes("portal") || searchable.includes("state")) score += 25;
  } else if (secSlug === "04-forms") {
    if (d.book_slug === "learn-react-ts-rippon" || d.book_slug === "road-to-react") score += 20;
    if (searchable.includes("form") || searchable.includes("control") || searchable.includes("valid") || searchable.includes("zod")) score += 30;
  } else if (secSlug === "05-styling") {
    if (d.book_slug === "learn-react-ts-rippon" || d.book_slug === "road-to-react" || d.book_slug === "fullstack-react-ts") score += 20;
    if (searchable.includes("tailwind") || searchable.includes("css") || searchable.includes("style") || searchable.includes("module")) score += 30;
  } else if (secSlug === "06-data-fetching") {
    if (d.book_slug === "advanced-react-makarevich" || d.book_slug === "web-performance" || d.book_slug === "advanced-data-fetching" || d.book_slug === "test-driven-react") score += 20;
    if (searchable.includes("waterfall") || searchable.includes("query") || searchable.includes("promise") || searchable.includes("race") || searchable.includes("test") || searchable.includes("ssr")) score += 30;
  }

  // Keyword match
  for (const w of words) {
    if (w.length < 3) continue;
    if (searchable.includes(w)) {
      score += 12;
      if (d.caption.toLowerCase().includes(w)) score += 15;
    }
  }

  // Penalize reused diagrams to maintain broad book representation
  if (usedDiagramUrls.has(d.image_url)) {
    score -= 30;
  }

  return score;
}

export function getDiagramForChapter(secSlug: string, chapTitle: string, keyConcepts: string[]): DiagramMatch {
  const queryStr = `${chapTitle} ${keyConcepts.join(" ")}`;
  const words = queryStr.toLowerCase().replace(/[^a-z0-9]/g, " ").split(/\s+/).filter(w => w.length > 2);

  const scored = cleanCatalog.map(d => ({ d, score: scoreDiagram(d, words, secSlug) }));
  scored.sort((a, b) => b.score - a.score);

  const picked = scored[0].d;
  usedDiagramUrls.add(picked.image_url);

  return {
    diagram_url: picked.image_url,
    diagram_caption: getCleanCaption(picked),
    diagram_source: getAuthorSource(picked)
  };
}

export function getDiagramForVideo(secSlug: string, chapTitle: string, videoTitle: string, vIdx: number, categoryTag: string): DiagramMatch {
  const queryStr = `${videoTitle} ${chapTitle} ${categoryTag}`;
  const words = queryStr.toLowerCase().replace(/[^a-z0-9]/g, " ").split(/\s+/).filter(w => w.length > 2);

  const scored = cleanCatalog.map(d => ({ d, score: scoreDiagram(d, words, secSlug) }));
  scored.sort((a, b) => b.score - a.score);

  // Pick top candidate that isn't already used if possible
  let picked = scored[0].d;
  for (const item of scored) {
    if (!usedDiagramUrls.has(item.d.image_url)) {
      picked = item.d;
      break;
    }
  }

  usedDiagramUrls.add(picked.image_url);

  return {
    diagram_url: picked.image_url,
    diagram_caption: getCleanCaption(picked),
    diagram_source: getAuthorSource(picked)
  };
}
