import fs from "fs";
import path from "path";

const DOCS_DIR = "C:\\Users\\admin\\Downloads\\reaact-docs\\docs";
const OUTPUT_DIR = "C:\\Users\\admin\\Downloads\\reaact-docs\\zola-reactjs";

interface VideoRef {
  label: string;
  url: string;
  description: string;
}

interface VideoNotes {
  definition: string;
  mental_model: string;
  code_example: string;
  pitfalls: string;
}

interface VideoItem {
  id: string;
  raw_key: string;
  title: string;
  url: string;
  duration_text: string;
  duration_seconds: number;
  description: string;
  category_tag: string;
  references: VideoRef[];
  notes: VideoNotes;
}

interface ChapterData {
  id: string;
  number: number;
  title: string;
  local_chapter_file: string;
  key_concepts: string[];
  total_duration_seconds: number;
  summary_notes: {
    definition: string;
    mental_model: string;
    code_example: string;
    pitfalls: string;
  };
  videos: VideoItem[];
}

interface SectionConfig {
  number: number;
  slug: string;
  id: string;
  title: string;
  part: number;
  part_title: string;
  dirName: string;
  recommended_courses: {
    title: string;
    url: string;
    author: string;
    duration: string;
    scope: string;
  }[];
}

const SECTIONS: SectionConfig[] = [
  {
    number: 0,
    slug: "00-setup",
    id: "section-00",
    title: "Environment, Vite & Modern Web Tooling",
    part: 1,
    part_title: "Part 1: React & Tooling Foundations",
    dirName: "00-setup",
    recommended_courses: [
      {
        title: "Build Modern Web Apps with React: Hooks, State Management, and APIs Using Vite or Next.js",
        url: "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js",
        author: "LinkedIn Learning",
        duration: "5h 45m",
        scope: "Modern Vite development setup, fast bundling, ESM constraints, project structures, and TypeScript tooling."
      },
      {
        title: "React Essential Training",
        url: "https://www.linkedin.com/learning/react-essential-training",
        author: "Eve Porcello",
        duration: "3h 15m",
        scope: "Initializing React projects with Vite, Chrome DevTools, React Compiler, and project setup."
      }
    ]
  },
  {
    number: 1,
    slug: "01-fundamentals",
    id: "section-01",
    title: "Components, Props & JSX Architecture",
    part: 1,
    part_title: "Part 1: React & Tooling Foundations",
    dirName: "01-fundamentals",
    recommended_courses: [
      {
        title: "React Essential Training",
        url: "https://www.linkedin.com/learning/react-essential-training",
        author: "Eve Porcello",
        duration: "3h 15m",
        scope: "Component hierarchies, JSX compilation, props destructuring, element tree reconciliation, and event handling."
      },
      {
        title: "React: Design Patterns",
        url: "https://www.linkedin.com/learning/react-design-patterns-25656257",
        author: "LinkedIn Learning",
        duration: "4h 06m",
        scope: "Layout components, split-screen patterns, component composition, and Headless UI architecture."
      }
    ]
  },
  {
    number: 2,
    slug: "02-hooks",
    id: "section-02",
    title: "Core Hooks & Reactive APIs",
    part: 2,
    part_title: "Part 2: Reactive State, Hooks & Forms",
    dirName: "02-hooks",
    recommended_courses: [
      {
        title: "React: State Management",
        url: "https://www.linkedin.com/learning/react-state-management-22688323",
        author: "LinkedIn Learning",
        duration: "3h 50m",
        scope: "useState, useEffect, useReducer, context API, single source of truth, and custom hooks."
      },
      {
        title: "Build Modern Web Apps with React: Hooks, State Management, and APIs Using Vite or Next.js",
        url: "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js",
        author: "LinkedIn Learning",
        duration: "5h 45m",
        scope: "Mastering React Hooks: useMemo, useCallback, useRef, useImperativeHandle, dependency arrays, and cleanup."
      }
    ]
  },
  {
    number: 3,
    slug: "03-state-and-effects",
    id: "section-03",
    title: "Global State & Zustand Architecture",
    part: 2,
    part_title: "Part 2: Reactive State, Hooks & Forms",
    dirName: "03-state-and-effects",
    recommended_courses: [
      {
        title: "React: State Management",
        url: "https://www.linkedin.com/learning/react-state-management-22688323",
        author: "LinkedIn Learning",
        duration: "3h 50m",
        scope: "Zustand quickstart, store hooks, centralized stores, atomic states, and reducer patterns."
      },
      {
        title: "Build Modern Web Apps with React: Hooks, State Management, and APIs Using Vite or Next.js",
        url: "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js",
        author: "LinkedIn Learning",
        duration: "5h 45m",
        scope: "Zustand, Jotai, Recoil, Redux Toolkit comparisons, and typed middleware mutations."
      }
    ]
  },
  {
    number: 4,
    slug: "04-forms",
    id: "section-04",
    title: "Forms & Schema Validation",
    part: 2,
    part_title: "Part 2: Reactive State, Hooks & Forms",
    dirName: "04-forms",
    recommended_courses: [
      {
        title: "Build Modern Web Apps with React: Hooks, State Management, and APIs Using Vite or Next.js",
        url: "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js",
        author: "LinkedIn Learning",
        duration: "5h 45m",
        scope: "Controlled vs uncontrolled forms, React Hook Form (RHF), useForm, watch, Zod schema validation, and custom resolvers."
      },
      {
        title: "Master React 19 and Next.js 16 with Hands-On Projects",
        url: "https://www.linkedin.com/learning/master-react-19-and-next-js-16-with-hands-on-projects-and-real-world-applications",
        author: "LinkedIn Learning",
        duration: "4h 20m",
        scope: "Advanced form handling with react-hook-form, Zod validation, and React 19 form actions."
      }
    ]
  },
  {
    number: 5,
    slug: "05-styling",
    id: "section-05",
    title: "Modern Styling: Tailwind CSS & Material UI",
    part: 3,
    part_title: "Part 3: UI Systems & Server Communication",
    dirName: "05-styling",
    recommended_courses: [
      {
        title: "Tailwind CSS 4 Essential Training",
        url: "https://www.linkedin.com/learning/tailwind-css-4-essential-training",
        author: "LinkedIn Learning",
        duration: "4h 15m",
        scope: "Utility-first architecture, typography, color palettes, responsive modifiers, flexbox/grid layouts, arbitrary values, and dark mode."
      },
      {
        title: "Build Modern Web Apps with React: Hooks, State Management, and APIs Using Vite or Next.js",
        url: "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js",
        author: "LinkedIn Learning",
        duration: "5h 45m",
        scope: "Styling in React: Tailwind CSS Vite setup, CSS Modules, Styled Components, Material UI design systems, and component theming."
      }
    ]
  },
  {
    number: 6,
    slug: "06-data-fetching",
    id: "section-06",
    title: "Data Fetching, Axios & TanStack Query",
    part: 3,
    part_title: "Part 3: UI Systems & Server Communication",
    dirName: "06-data-fetching",
    recommended_courses: [
      {
        title: "Build Modern Web Apps with React: Hooks, State Management, and APIs Using Vite or Next.js",
        url: "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js",
        author: "LinkedIn Learning",
        duration: "5h 45m",
        scope: "Axios client setup, interceptors, race condition handling, TanStack React Query caching, mutations, optimistic updates, and SSR hydration."
      },
      {
        title: "React Essential Training",
        url: "https://www.linkedin.com/learning/react-essential-training",
        author: "Eve Porcello",
        duration: "3h 15m",
        scope: "Data fetching pipelines, asynchronous server components, query caching, and client state synchronization."
      }
    ]
  }
];

function sanitizeString(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function parseDurationSeconds(text: string): number {
  let sec = 0;
  const m = text.match(/(\d+)m/);
  const s = text.match(/(\d+)s/);
  if (m) sec += parseInt(m[1], 10) * 60;
  if (s) sec += parseInt(s[1], 10);
  return sec || 300;
}

function formatDurationSeconds(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}


function getActualOfficialReferences(title: string, secSlug: string): VideoRef[] {
  const t = title.toLowerCase();
  
  if (secSlug === "00-setup") {
    if (t.includes("asset")) {
      return [
        { label: "Vite Guide: Static Asset Handling", url: "https://vite.dev/guide/assets.html", description: "Importing images, SVGs, and URL references in Vite." },
        { label: "React Docs: Rules of JSX & Asset Elements", url: "https://react.dev/learn/writing-markup-with-jsx", description: "Specifying image src and attribute types in JSX." }
      ];
    }
    if (t.includes("env") || t.includes("variable") || t.includes("mode")) {
      return [
        { label: "Vite Guide: Env Variables and Modes", url: "https://vite.dev/guide/env-and-mode.html", description: "import.meta.env prefixes, .env files, and mode switches." },
        { label: "TypeScript Handbook: Compiler Options", url: "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description: "Strict typing for custom environment declarations." }
      ];
    }
    if (t.includes("tsconfig") || t.includes("strict") || t.includes("type")) {
      return [
        { label: "TypeScript Handbook: tsconfig.json Reference", url: "https://www.typescriptlang.org/docs/handbook/tsconfig-json.html", description: "Strict compiler flags, noImplicitAny, and moduleResolution." },
        { label: "Vite Guide: Features - TypeScript", url: "https://vite.dev/guide/features.html#typescript", description: "How Vite handles esbuild transpilation and isolated modules." }
      ];
    }
    return [
      { label: "Vite Guide: Getting Started", url: "https://vite.dev/guide/", description: "Fast scaffolding, dev server architecture, and project templates." },
      { label: "React Docs: Build a React App from Scratch", url: "https://react.dev/learn/build-a-react-app-from-scratch", description: "Minimal HTML container, DOM mounting, and script bundling." }
    ];
  }

  if (secSlug === "01-fundamentals") {
    if (t.includes("jsx") || t.includes("markup")) {
      return [
        { label: "React Docs: Writing Markup with JSX", url: "https://react.dev/learn/writing-markup-with-jsx", description: "JSX syntax rules, single root element, and camelCase attributes." },
        { label: "React Docs: JavaScript in JSX with Curly Braces", url: "https://react.dev/learn/javascript-in-jsx-with-curly-braces", description: "Embedding expressions, string interpolations, and style objects." }
      ];
    }
    if (t.includes("prop")) {
      return [
        { label: "React Docs: Passing Props to a Component", url: "https://react.dev/learn/passing-props-to-a-component", description: "Props as arguments, default values, children prop, and read-only invariants." },
        { label: "React Docs: Your First Component", url: "https://react.dev/learn/your-first-component", description: "Defining function components, export conventions, and nesting." }
      ];
    }
    if (t.includes("list") || t.includes("key")) {
      return [
        { label: "React Docs: Rendering Lists", url: "https://react.dev/learn/rendering-lists", description: "Array.map rendering, key identity rules, and index as key pitfalls." },
        { label: "React Docs: Keeping Components Pure", url: "https://react.dev/learn/keeping-components-pure", description: "Deterministic outputs and avoiding side-effects during render." }
      ];
    }
    if (t.includes("conditional")) {
      return [
        { label: "React Docs: Conditional Rendering", url: "https://react.dev/learn/conditional-rendering", description: "Ternary operators, logical && short-circuiting, and returning null." },
        { label: "React Docs: Describing the UI", url: "https://react.dev/learn/describing-the-ui", description: "The component mental model and virtual DOM tree projection." }
      ];
    }
    return [
      { label: "React Docs: Your First Component", url: "https://react.dev/learn/your-first-component", description: "Defining function components and component hierarchy." },
      { label: "React Docs: Understanding Your UI as a Tree", url: "https://react.dev/learn/understanding-your-ui-as-a-tree", description: "Render trees, module dependency trees, and reconciliation." }
    ];
  }

  if (secSlug === "02-hooks") {
    if (t.includes("usestate") || t.includes("state")) {
      return [
        { label: "React API: useState", url: "https://react.dev/reference/react/useState", description: "State hook specification, updater functions, and initial state initializer." },
        { label: "React Docs: State - A Component's Memory", url: "https://react.dev/learn/state-a-components-memory", description: "Retaining data between renders and trigger-render-commit lifecycle." }
      ];
    }
    if (t.includes("useeffect") || t.includes("effect")) {
      return [
        { label: "React API: useEffect", url: "https://react.dev/reference/react/useEffect", description: "Connecting to external systems, cleanup functions, and dependencies." },
        { label: "React Docs: Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects", description: "When and why to declare effects versus event handlers." }
      ];
    }
    if (t.includes("usecontext") || t.includes("context")) {
      return [
        { label: "React API: useContext", url: "https://react.dev/reference/react/useContext", description: "Subscribing to context and reading nearest provider values." },
        { label: "React Docs: Passing Data Deeply with Context", url: "https://react.dev/learn/passing-data-deeply-with-context", description: "Avoiding prop drilling and scaling with context providers." }
      ];
    }
    if (t.includes("usereducer") || t.includes("reducer")) {
      return [
        { label: "React API: useReducer", url: "https://react.dev/reference/react/useReducer", description: "Action dispatching, reducer functions, and complex state transitions." },
        { label: "React Docs: Extracting State Logic into a Reducer", url: "https://react.dev/learn/extracting-state-logic-into-a-reducer", description: "Separating state updates from event logic with reducer patterns." }
      ];
    }
    if (t.includes("useref") || t.includes("ref")) {
      return [
        { label: "React API: useRef", url: "https://react.dev/reference/react/useRef", description: "Persisting mutable values across renders and DOM element references." },
        { label: "React Docs: Manipulating the DOM with Refs", url: "https://react.dev/learn/manipulating-the-dom-with-refs", description: "Focus management, measuring layout, and node manipulation." }
      ];
    }
    if (t.includes("usememo") || t.includes("memo")) {
      return [
        { label: "React API: useMemo", url: "https://react.dev/reference/react/useMemo", description: "Caching calculation results between re-renders." },
        { label: "React API: memo", url: "https://react.dev/reference/react/memo", description: "Skipping re-rendering when component props are unchanged." }
      ];
    }
    if (t.includes("usecallback") || t.includes("callback")) {
      return [
        { label: "React API: useCallback", url: "https://react.dev/reference/react/useCallback", description: "Caching function definitions across re-renders for reference equality." },
        { label: "React Docs: Separating Events from Effects", url: "https://react.dev/learn/separating-events-from-effects", description: "Reactive values versus non-reactive event logic." }
      ];
    }
    if (t.includes("transition") || t.includes("deferred")) {
      return [
        { label: "React API: useTransition", url: "https://react.dev/reference/react/useTransition", description: "Marking state updates as non-blocking background transitions." },
        { label: "React API: useDeferredValue", url: "https://react.dev/reference/react/useDeferredValue", description: "Deferring updates for low-priority parts of the UI." }
      ];
    }
    if (t.includes("action") || t.includes("optimistic") || t.includes("use(")) {
      return [
        { label: "React API: useActionState", url: "https://react.dev/reference/react/useActionState", description: "Managing form actions, pending state, and server state updates." },
        { label: "React API: useOptimistic", url: "https://react.dev/reference/react/useOptimistic", description: "Optimistic UI updates while an asynchronous action is pending." }
      ];
    }
    return [
      { label: "React API: Built-in React Hooks", url: "https://react.dev/reference/react", description: "Canonical reference for all built-in React 19 hooks." },
      { label: "React Docs: Reusing Logic with Custom Hooks", url: "https://react.dev/learn/reusing-logic-with-custom-hooks", description: "Composing custom reactive hooks and sharing stateful logic." }
    ];
  }

  if (secSlug === "03-state-and-effects") {
    return [
      { label: "Zustand Official Documentation: Getting Started", url: "https://zustand.docs.pmnd.rs/learn/getting-started/introduction.html", description: "Lightweight, un-opinionated state management with React hooks." },
      { label: "Zustand: Slices Pattern & TypeScript", url: "https://zustand.docs.pmnd.rs/learn/guides/slices-pattern.html", description: "Modular store slice architecture and typed middleware." }
    ];
  }

  if (secSlug === "04-forms") {
    if (t.includes("zod")) {
      return [
        { label: "Zod Official Documentation: Basic Usage", url: "https://zod.dev/?id=basic-usage", description: "TypeScript-first schema validation with static type inference." },
        { label: "React Hook Form: Schema Validation with Zod", url: "https://react-hook-form.com/get-started#schema-validation", description: "Integrating @hookform/resolvers/zod with useForm." }
      ];
    }
    return [
      { label: "React Hook Form Official Documentation", url: "https://react-hook-form.com/get-started", description: "Performant, flexible, and extensible forms with easy-to-use validation." },
      { label: "React Docs: Form Actions in React 19", url: "https://react.dev/reference/react-dom/components/form", description: "Native HTML <form> action handlers and progressive enhancement." }
    ];
  }

  if (secSlug === "05-styling") {
    if (t.includes("material") || t.includes("mui")) {
      return [
        { label: "Material UI Official Guide: Getting Started", url: "https://mui.com/material-ui/getting-started/", description: "Production-ready component library implementing Material Design." },
        { label: "Material UI: Customization & Theming", url: "https://mui.com/material-ui/customization/theming/", description: "Palette, typography, and createTheme configuration." }
      ];
    }
    return [
      { label: "Tailwind CSS Official Documentation", url: "https://tailwindcss.com/docs/utility-first", description: "Utility-first CSS framework for rapid UI development." },
      { label: "Tailwind CSS: Responsive Design", url: "https://tailwindcss.com/docs/responsive-design", description: "Mobile-first breakpoint modifiers (sm, md, lg, xl, 2xl)." }
    ];
  }

  if (secSlug === "06-data-fetching") {
    if (t.includes("axios")) {
      return [
        { label: "Axios Official Documentation", url: "https://axios-http.com/docs/intro", description: "Promise-based HTTP client for the browser and node.js." },
        { label: "Axios: Interceptors Reference", url: "https://axios-http.com/docs/interceptors", description: "Intercepting requests and responses before handling." }
      ];
    }
    return [
      { label: "TanStack React Query Documentation", url: "https://tanstack.com/query/latest/docs/framework/react/overview", description: "Powerful asynchronous state management, server-state caching, and query hooks." },
      { label: "TanStack Query: Important Defaults & Invalidation", url: "https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults", description: "Stale-while-revalidate caching, garbage collection, and query client invalidation." }
    ];
  }

  return [
    { label: "React 19 Official Documentation", url: "https://react.dev/learn", description: "Authoritative React 19 guide and API reference." },
    { label: "TypeScript Handbook Reference", url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html", description: "Everyday types and TypeScript strict best practices." }
  ];
}

const SCRAPED_LESSONS: any[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "scripts", "all_scraped_lessons.json"), "utf-8")
);

const usedVideoUrls = new Set<string>();

function getActualVideo(secSlug: string, chapTitle: string, vIdx: number, chapNumber: number, keyConcepts: string[] = []) {
  const t = chapTitle.toLowerCase();
  const searchWords = [
    ...t.replace(/[§\d\.\:\-]+/g, ' ').split(/\s+/).filter(w => w.length > 2),
    ...keyConcepts.flatMap(k => k.toLowerCase().split(/\s+/).filter(w => w.length > 3))
  ];

  // Specific course keyword bonuses per section
  const sectionTopicKeywords: Record<string, string[]> = {
    "00-setup": ["vite", "environment", "setup", "tooling", "typescript", "npm", "node", "bundl", "lint", "project"],
    "01-fundamentals": ["component", "prop", "jsx", "render", "element", "tree", "hierarchy", "list", "key", "pure"],
    "02-hooks": ["hook", "usestate", "useeffect", "context", "reducer", "memo", "callback", "ref", "transition", "action"],
    "03-state-and-effects": ["state", "store", "zustand", "effect", "global", "redux", "slice", "lifecycle", "atomic"],
    "04-forms": ["form", "input", "validation", "zod", "rhf", "hook-form", "submit", "action", "control"],
    "05-styling": ["css", "style", "tailwind", "responsive", "material", "mui", "layout", "flex", "grid", "theme"],
    "06-data-fetching": ["fetch", "api", "query", "axios", "cache", "async", "tanstack", "mutation", "network", "client"]
  };

  const topicWords = sectionTopicKeywords[secSlug] || [];

  // Score all 1733 scraped lessons
  const scored = SCRAPED_LESSONS.map(lesson => {
    let score = 0;
    const lTitle = lesson.title.toLowerCase();
    const lUrl = lesson.url.toLowerCase();
    const cTitle = (lesson.courseTitle || "").toLowerCase();

    // Check title and url matches against chapter keywords
    for (const w of searchWords) {
      if (lTitle.includes(w)) score += 15;
      if (lUrl.includes(w)) score += 10;
      if (cTitle.includes(w)) score += 8;
    }

    // Check section topic words
    for (const tw of topicWords) {
      if (lTitle.includes(tw)) score += 12;
      if (lUrl.includes(tw)) score += 8;
      if (cTitle.includes(tw)) score += 10;
    }

    // Specific exact matches
    if (t.includes("vite") && (lTitle.includes("vite") || lUrl.includes("vite"))) score += 40;
    if (t.includes("zustand") && (lTitle.includes("zustand") || lUrl.includes("zustand") || cTitle.includes("state"))) score += 40;
    if ((t.includes("form") || t.includes("rhf")) && (lTitle.includes("form") || lUrl.includes("form"))) score += 35;
    if (t.includes("zod") && (lTitle.includes("zod") || lUrl.includes("validation") || lTitle.includes("validation"))) score += 35;
    if ((t.includes("query") || t.includes("tanstack")) && (lTitle.includes("query") || lUrl.includes("query") || lTitle.includes("api"))) score += 35;
    if (t.includes("tailwind") && (cTitle.includes("tailwind") || lUrl.includes("tailwind") || lTitle.includes("tailwind"))) score += 35;
    if (t.includes("material") || t.includes("mui")) {
      if (lTitle.includes("component") || cTitle.includes("storybook") || cTitle.includes("ui")) score += 30;
    }
    if (t.includes("effect") && (lTitle.includes("effect") || lUrl.includes("effect"))) score += 35;
    if (t.includes("reducer") && (lTitle.includes("reducer") || lUrl.includes("reducer"))) score += 35;
    if (t.includes("context") && (lTitle.includes("context") || lUrl.includes("context"))) score += 35;
    if (t.includes("prop") && (lTitle.includes("prop") || lUrl.includes("prop"))) score += 25;
    if (t.includes("custom hook") && (lTitle.includes("custom hook") || lUrl.includes("custom-hook"))) score += 40;
    if (t.includes("axios") && (lTitle.includes("api") || lUrl.includes("api") || lTitle.includes("fetch"))) score += 30;

    // Heavily penalize already-used URLs to encourage diversity
    if (usedVideoUrls.has(lesson.url)) {
      score -= 50;
    }

    return { lesson, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Pick top candidate that isn't already used if possible
  let picked = scored[0].lesson;
  for (const item of scored) {
    if (!usedVideoUrls.has(item.lesson.url)) {
      picked = item.lesson;
      break;
    }
  }

  usedVideoUrls.add(picked.url);

  return {
    title: picked.title,
    url: picked.url,
    durationText: picked.durationText,
    durationSeconds: picked.durationSeconds,
    category: picked.courseTitle || "LinkedIn Learning"
  };
}


// Generate curriculum
console.log("🚀 Generating React Course Curriculum for Zola Tailwind Site...");

const allSectionsData: any[] = [];
let grandTotalVideos = 0;
let grandTotalDurationSeconds = 0;

for (const sec of SECTIONS) {
  const dirPath = path.join(DOCS_DIR, sec.dirName);
  const chapterFiles = fs.readdirSync(dirPath)
    .filter(f => /^\d{3}-[a-z0-9-]+\.md$/.test(f))
    .sort();

  console.log(`Processing ${sec.slug}: found ${chapterFiles.length} chapter files.`);

  const chapters: ChapterData[] = [];
  let secTotalVideos = 0;
  let secTotalDurationSeconds = 0;

  chapterFiles.forEach((chapFile, idx) => {
    const chapNumber = idx + 1;
    const chapOrderStr = String(chapNumber).padStart(3, "0");
    const chapId = `${String(sec.number).padStart(2, "0")}-${chapOrderStr}`;
    const fullChapPath = path.join(dirPath, chapFile);
    const content = fs.readFileSync(fullChapPath, "utf-8");

    const titleMatch = content.match(/^#\s+(.+)$/m);
    let title = titleMatch ? titleMatch[1].trim() : chapFile.replace(/\.md$/, "");
    title = title.replace(/^\d+\.\s*/, ""); // strip leading "001. " if present

    // Extract key concepts from markdown headings
    const headings = Array.from(content.matchAll(/^##\s+(.+)$/gm))
      .map(m => m[1].trim())
      .filter(h => !h.toLowerCase().includes("exercise") && !h.toLowerCase().includes("summary"))
      .slice(0, 6);

    const key_concepts = headings.length >= 3 
      ? headings 
      : ["Component Architecture", "Render Phase", "TypeScript Strict Types", "State Isolation", "Production Patterns"];

    // -----------------------------------------------------------------------
    // DETAILED notes extraction from chapter file
    // -----------------------------------------------------------------------
    // Split into H2 sections for targeted extraction
    const sections = content.split(/\n(?=## )/);

    // Helper: get clean paragraphs from a section string
    function sectionParas(sec: string): string[] {
      return sec.split("\n\n")
        .map(p => p.trim())
        .filter(p => p && !p.startsWith("#") && !p.startsWith("```") && !p.startsWith(">") && !p.startsWith("|"))
        .map(p => p.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\n/g, " ").trim());
    }

    // 1. DEFINITION — first 2 full body paragraphs from the intro (before first H2, or first H2 if intro is just title)
    const introSection = sections[0] || "";
    let introParas = sectionParas(introSection).filter(p => p.length > 30);
    if (!introParas.length && sections.length > 1) {
      introParas = sectionParas(sections[1]).filter(p => p.length > 30);
    }
    const definition = introParas.slice(0, 2).join("  ") ||
      `${title} is a core primitive in modern React applications, providing predictable rendering and type-safe state isolation.`;

    // 2. MENTAL MODEL — find section matching mental-model / under-the-hood / how it works / dev vs build etc.
    let mentalModel = "";
    for (const sec of sections.slice(1)) {
      const h = (sec.match(/^##\s+(.+)$/m) || [])[1] || "";
      if (/under.the.hood|how it works|dev vs|why this|behind the scenes|mental model|internals|mechanics|the one place|pipeline/i.test(h)) {
        const ps = sectionParas(sec).filter(p => p.length > 30);
        if (ps.length) { mentalModel = ps.slice(0, 2).join("  "); break; }
      }
    }
    // Fallback: use 2nd and 3rd sections body
    if (!mentalModel) {
      for (const sec of sections.slice(1, 4)) {
        const ps = sectionParas(sec).filter(p => p.length > 30);
        if (ps.length) { mentalModel = ps.slice(0, 2).join("  "); break; }
      }
    }
    if (!mentalModel) {
      mentalModel = `React reconciles virtual descriptions against the actual host environment tree, dispatching targeted minimal mutations. The Fiber scheduler interleaves work so expensive reconciliations never block the main thread.`;
    }

    // 3. CODE EXAMPLE — prefer Minimal Example section, then first tsx/ts/jsx code block
    let codeExample = "";
    const minExSec = sections.find(s => /minimal example/i.test((s.match(/^##\s+(.+)$/m) || [])[1] || ""));
    if (minExSec) {
      const cm = minExSec.match(/```(?:tsx|ts|jsx|js|html|css|bash)\n([\s\S]*?)```/);
      if (cm) codeExample = cm[1].trim();
    }
    if (!codeExample) {
      const cm = content.match(/```(?:tsx|ts|jsx|js|html|css|bash)\n([\s\S]*?)```/);
      if (cm) codeExample = cm[1].trim();
    }
    if (!codeExample) {
      codeExample = `// React 19 Enterprise Implementation\nimport React from "react";\n\nexport function Component() {\n  return <div>Production Component</div>;\n}`;
    }
    // Preserve complete code example (up to 2500 chars)
    if (codeExample.length > 2500) codeExample = codeExample.slice(0, 2500);

    // 4. PITFALLS — find mistakes / common-mistakes / pitfall / gotcha section
    let pitfalls = "";
    for (const sec of sections) {
      const h = (sec.match(/^##\s+(.+)$/m) || [])[1] || "";
      if (/common mistake|mistake|pitfall|gotcha|warning|trap|don.t|avoid/i.test(h)) {
        // Get full sentences from this section
        const ps = sectionParas(sec).filter(p => p.length > 20);
        if (ps.length) { pitfalls = ps.slice(0, 5).join("  "); break; }
      }
    }
    if (!pitfalls) {
      // Scan for bolded pitfall patterns inline
      const boldPitfalls = Array.from(content.matchAll(/\*\*([^*]+\.(?: [A-Z][^.]+\.){0,3})\*\*/g))
        .map(m => m[1].trim())
        .filter(p => p.length > 20)
        .slice(0, 4);
      pitfalls = boldPitfalls.join("  ");
    }
    if (!pitfalls || pitfalls.length < 30) {
      pitfalls = `Direct DOM mutation or impure side effects during the render phase cause hydration mismatches, duplicate executions in Strict Mode, and stale closures. Always declare full dependency arrays in useEffect and never read state during render from outside the component tree.`;
    }
    if (pitfalls.length > 2000) pitfalls = pitfalls.slice(0, 2000);

    // Map videos
    const videos: VideoItem[] = [];
    const videoCount = 2; // 2 curated video lessons per chapter

    for (let vIdx = 1; vIdx <= videoCount; vIdx++) {
      const vId = Buffer.from(`S${sec.number}:C${chapNumber}:V${vIdx}:${chapFile}`).toString("base64url").slice(0, 20);
      const rawKey = `S${sec.number}:C${chapNumber}:V${vIdx}`;
      const vidInfo = getActualVideo(sec.slug, title, vIdx, chapNumber, key_concepts);
      const videoTitle = vidInfo.title;
      const videoUrl = vidInfo.url;
      const categoryTag = vidInfo.category;
      const durationText = vidInfo.durationText;
      const vDurSec = vidInfo.durationSeconds;
      const references = getActualOfficialReferences(title, sec.slug);

      videos.push({
        id: vId,
        raw_key: rawKey,
        title: videoTitle,
        url: videoUrl,
        duration_text: durationText,
        duration_seconds: vDurSec,
        description: `In-depth walkthrough of ${title}, examining real-world production implementations, rendering performance, and TypeScript contracts.`,
        category_tag: categoryTag,
        references,
        notes: {
          definition,
          mental_model: mentalModel,
          code_example: codeExample,
          pitfalls
        }
      });
    }

    const chapDuration = videos.reduce((acc, v) => acc + v.duration_seconds, 0);
    secTotalVideos += videos.length;
    secTotalDurationSeconds += chapDuration;

    chapters.push({
      id: chapId,
      number: chapNumber,
      title,
      local_chapter_file: chapFile,
      key_concepts,
      total_duration_seconds: chapDuration,
      summary_notes: {
        definition,
        mental_model: mentalModel,
        code_example: codeExample,
        pitfalls
      },
      videos
    });
  });

  grandTotalVideos += secTotalVideos;
  grandTotalDurationSeconds += secTotalDurationSeconds;

  // Build section TOML markdown file
  let mdContent = `+++\ntitle = "${sanitizeString(sec.title)}"\nweight = ${sec.number + 1}\n[extra]\n`;
  mdContent += `section_number = ${sec.number}\n`;
  mdContent += `section_id = "${sec.id}"\n`;
  mdContent += `part = ${sec.part}\n`;
  mdContent += `part_title = "${sanitizeString(sec.part_title)}"\n`;
  mdContent += `total_videos = ${secTotalVideos}\n`;
  mdContent += `total_duration_seconds = ${secTotalDurationSeconds}\n`;
  
  // recommended_courses
  mdContent += `recommended_courses = [\n`;
  for (const rc of sec.recommended_courses) {
    mdContent += `  { title = "${sanitizeString(rc.title)}", url = "${rc.url}", author = "${sanitizeString(rc.author)}", duration = "${rc.duration}", scope = "${sanitizeString(rc.scope)}" },\n`;
  }
  mdContent += `]\n`;

  // chapters
  mdContent += `chapters = [\n`;
  for (const ch of chapters) {
    mdContent += `  {\n`;
    mdContent += `    id = "${ch.id}",\n`;
    mdContent += `    number = ${ch.number},\n`;
    mdContent += `    title = "${sanitizeString(ch.title)}",\n`;
    mdContent += `    local_chapter_file = "${ch.local_chapter_file}",\n`;
    mdContent += `    key_concepts = [${ch.key_concepts.map(k => `"${sanitizeString(k)}"`).join(", ")}],\n`;
    mdContent += `    total_duration_seconds = ${ch.total_duration_seconds},\n`;
    mdContent += `    videos = [\n`;
    for (const v of ch.videos) {
      mdContent += `      {\n`;
      mdContent += `        id = "${v.id}",\n`;
      mdContent += `        raw_key = "${v.raw_key}",\n`;
      mdContent += `        title = "${sanitizeString(v.title)}",\n`;
      mdContent += `        url = "${v.url}",\n`;
      mdContent += `        duration_text = "${v.duration_text}",\n`;
      mdContent += `        duration_seconds = ${v.duration_seconds},\n`;
      mdContent += `        description = "${sanitizeString(v.description)}",\n`;
      mdContent += `        category_tag = "${sanitizeString(v.category_tag)}",\n`;
      mdContent += `        references = [\n`;
      for (const ref of v.references) {
        mdContent += `          { label = "${sanitizeString(ref.label)}", url = "${ref.url}", description = "${sanitizeString(ref.description)}" },\n`;
      }
      mdContent += `        ],\n`;
      mdContent += `        notes = { definition = "${sanitizeString(v.notes.definition)}", mental_model = "${sanitizeString(v.notes.mental_model)}", code_example = "${sanitizeString(v.notes.code_example)}", pitfalls = "${sanitizeString(v.notes.pitfalls)}" }\n`;
      mdContent += `      },\n`;
    }
    mdContent += `    ]\n`;
    mdContent += `  },\n`;
  }
  mdContent += `]\n+++\n\n`;
  mdContent += `This section covers **${sec.title}** (${sec.part_title}), featuring **${secTotalVideos} curated LinkedIn Learning video lessons**, comprehensive pop-up chapter study notes with **Ask AI**, and official React documentation references across all ${chapters.length} core chapters.\n`;

  const outSecPath = path.join(OUTPUT_DIR, "content", "sections", `${sec.slug}.md`);
  fs.writeFileSync(outSecPath, mdContent, "utf-8");
  console.log(`✓ Written ${outSecPath}`);

  allSectionsData.push({
    id: sec.id,
    slug: sec.slug,
    number: sec.number,
    title: sec.title,
    part: sec.part,
    partTitle: sec.part_title,
    filePath: `content/sections/${sec.slug}.md`,
    totalVideos: secTotalVideos,
    totalDurationSeconds: secTotalDurationSeconds,
    recommendedCourses: sec.recommended_courses,
    chapters
  });
}

// Generate static/js/course-data.js
const totalDurationFormatted = formatDurationSeconds(grandTotalDurationSeconds);
const courseDataJs = `// Auto-generated course metadata for React & Modern Web Mastery
window.COURSE_DATA = {
  summary: {
    totalSections: ${SECTIONS.length},
    totalChapters: ${allSectionsData.reduce((acc, s) => acc + s.chapters.length, 0)},
    totalVideos: ${grandTotalVideos},
    totalDurationSeconds: ${grandTotalDurationSeconds},
    totalDurationFormatted: "${totalDurationFormatted}"
  },
  sections: ${JSON.stringify(allSectionsData, null, 2)}
};
`;

const jsOutPath = path.join(OUTPUT_DIR, "static", "js", "course-data.js");
fs.mkdirSync(path.dirname(jsOutPath), { recursive: true });
fs.writeFileSync(jsOutPath, courseDataJs, "utf-8");
console.log(`✓ Written ${jsOutPath}`);

// Update config.toml with accurate totals
const configPath = path.join(OUTPUT_DIR, "config.toml");
let configContent = fs.readFileSync(configPath, "utf-8");
configContent = configContent.replace(/total_videos = \d+/, `total_videos = ${grandTotalVideos}`);
configContent = configContent.replace(/total_duration = "[^"]+"/, `total_duration = "${totalDurationFormatted}"`);
configContent = configContent.replace(/total_duration_seconds = \d+/, `total_duration_seconds = ${grandTotalDurationSeconds}`);
fs.writeFileSync(configPath, configContent, "utf-8");
console.log(`✓ Updated ${configPath} with ${grandTotalVideos} videos and ${totalDurationFormatted} duration.`);
console.log("🎉 Curriculum generation completed successfully!");
