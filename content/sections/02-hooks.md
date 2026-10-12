+++
title = "Core Hooks & Reactive APIs"
weight = 3
[extra]
section_number = 2
section_id = "section-02"
part = 2
part_title = "Part 2: Reactive State, Hooks & Forms"
total_videos = 26
total_duration_seconds = 8692
recommended_courses = [
  { title = "React: State Management", url = "https://www.linkedin.com/learning/react-state-management-22688323", author = "LinkedIn Learning", duration = "3h 50m", scope = "useState, useEffect, useReducer, context API, single source of truth, and custom hooks." },
  { title = "Build Modern Web Apps with React: Hooks, State Management, and APIs Using Vite or Next.js", url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js", author = "LinkedIn Learning", duration = "5h 45m", scope = "Mastering React Hooks: useMemo, useCallback, useRef, useImperativeHandle, dependency arrays, and cleanup." },
]
chapters = [
  {
    id = "02-001",
    number = 1,
    title = "Built-in React APIs",
    local_chapter_file = "001-built-in-react-apis.md",
    key_concepts = ["Mental model", "Reference roundup", "Worked example: a small feature with several built-ins", "Predict-the-render", "Common mistakes", "Why this matters"],
    total_duration_seconds = 336,
    videos = [
      {
        id = "UzI6QzE6VjE6MDAxLWJ1",
        raw_key = "S2:C1:V1",
        title = "React context review: Common mistakes and best practices",
        url = "https://www.linkedin.com/learning/master-react-19-and-next-js-16-with-hands-on-projects-and-real-world-applications/react-context-review-common-mistakes-and-best-practices",
        duration_text = "03m11s",
        duration_seconds = 191,
        description = "In-depth walkthrough of Built-in React APIs, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Master React 19 and Next.js 16 with Hands-On Projects and Real-World Applications",
        references = [
          { label = "React API: Built-in React Hooks", url = "https://react.dev/reference/react", description = "Canonical reference for all built-in React 19 hooks." },
          { label = "React Docs: Reusing Logic with Custom Hooks", url = "https://react.dev/learn/reusing-logic-with-custom-hooks", description = "Composing custom reactive hooks and sharing stateful logic." },
        ],
        notes = { definition = "This chapter is a reference tour of the APIs that ship with `react` and `react-dom`. Every React component, custom hook, and test you write eventually touches one of these. You don't need to memorize the catalogue, but you do need to know enough to recognise each symbol when you see it.", mental_model = "Think of the React package layout the way a hardware store stocks its inventory:  - `react` is the box of generic parts: type definitions, state primitives, the JSX runtime. You can use these anywhere a React renderer exists (DOM, native, three.js). - `react-dom` is the special-purpose adapter for the browser DOM. Its job is to translate the generic parts into real `HTMLElement`s, plus the resource-preloading helpers that pair nicely with `<link>`. - `react-dom/client` holds the root factories (`createRoot`, `hydrateRoot`) that React 18 introduced and that every Vite, Next.js, or Remix app calls at startup. - `react-dom/server` produces HTML strings for SSR (you only meet this in a Next.js chapter).", code_example = "import { createRoot } from 'react-dom/client';\nimport { App } from './App';\n\nconst root = createRoot(document.getElementById('root')!, {\n  onUncaughtError: (error) => console.error('React crash:', error),\n});\nroot.render(<App />);", pitfalls = "1. Calling a hook conditionally. `useState` must run on every render in the same order. Putting it inside `if (show)` will throw `Rendered fewer hooks than expected. This can be caused by an accidental early return`.    ```tsx    // Wrong    if (show) {      const [count, setCount] = useState(0);    }    // Right    const [count, setCount] = useState(0);    if (show) return null;    ``` 2. Forgetting that `StrictMode` runs renderers twice in development. If your component has a side effect (`console.log`, an increment of a module-level counter, writing to `localStorage`) inside the body, you'll see it happen twice on first load. Move side effects into `useEffect`.    ```tsx    function Probe() {      console.log('render'); // logs twice in StrictMode dev      useEffect(() => { console.log('mount'); }, []); // logs once      return null;    }    ``` 3. Treating `<Fragment>` like a div. Fragments don't accept className, style, or ref. If you need any of those on the wrapper, use `<div>` (or `<ViewGroup>` in native).    ```tsx    // Wrong: <Fragment className=\"row\">...</Fragment> renders className on Fragment only. It lands in the warning, not the DOM.    // Right: <div className=\"row\">...</div> or <>...</>    ``` 4. Mixing `ReactDOM.render` with `createRoot`. The two client entry functions create incompatible roots; calling both on the same node throws \"Cannot update an unmounted root\". Pick one and stick with it. If you find an old `index.tsx` calling `ReactDOM.render`, migrate it to `createRoot`.    ```tsx    // Wrong    import ReactDOM from 'react-dom';    ReactDOM.render(<App />, document.getElementById('root'));    // Right    import { createRoot } from 'react-dom/client';    createRoot(document.getElementById('root')!).render(<App />);    ```" }
      },
      {
        id = "UzI6QzE6VjI6MDAxLWJ1",
        raw_key = "S2:C1:V2",
        title = "Why useEffect matters: Overview",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/why-useeffect-matters-overview",
        duration_text = "02m25s",
        duration_seconds = 145,
        description = "In-depth walkthrough of Built-in React APIs, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: Built-in React Hooks", url = "https://react.dev/reference/react", description = "Canonical reference for all built-in React 19 hooks." },
          { label = "React Docs: Reusing Logic with Custom Hooks", url = "https://react.dev/learn/reusing-logic-with-custom-hooks", description = "Composing custom reactive hooks and sharing stateful logic." },
        ],
        notes = { definition = "This chapter is a reference tour of the APIs that ship with `react` and `react-dom`. Every React component, custom hook, and test you write eventually touches one of these. You don't need to memorize the catalogue, but you do need to know enough to recognise each symbol when you see it.", mental_model = "Think of the React package layout the way a hardware store stocks its inventory:  - `react` is the box of generic parts: type definitions, state primitives, the JSX runtime. You can use these anywhere a React renderer exists (DOM, native, three.js). - `react-dom` is the special-purpose adapter for the browser DOM. Its job is to translate the generic parts into real `HTMLElement`s, plus the resource-preloading helpers that pair nicely with `<link>`. - `react-dom/client` holds the root factories (`createRoot`, `hydrateRoot`) that React 18 introduced and that every Vite, Next.js, or Remix app calls at startup. - `react-dom/server` produces HTML strings for SSR (you only meet this in a Next.js chapter).", code_example = "import { createRoot } from 'react-dom/client';\nimport { App } from './App';\n\nconst root = createRoot(document.getElementById('root')!, {\n  onUncaughtError: (error) => console.error('React crash:', error),\n});\nroot.render(<App />);", pitfalls = "1. Calling a hook conditionally. `useState` must run on every render in the same order. Putting it inside `if (show)` will throw `Rendered fewer hooks than expected. This can be caused by an accidental early return`.    ```tsx    // Wrong    if (show) {      const [count, setCount] = useState(0);    }    // Right    const [count, setCount] = useState(0);    if (show) return null;    ``` 2. Forgetting that `StrictMode` runs renderers twice in development. If your component has a side effect (`console.log`, an increment of a module-level counter, writing to `localStorage`) inside the body, you'll see it happen twice on first load. Move side effects into `useEffect`.    ```tsx    function Probe() {      console.log('render'); // logs twice in StrictMode dev      useEffect(() => { console.log('mount'); }, []); // logs once      return null;    }    ``` 3. Treating `<Fragment>` like a div. Fragments don't accept className, style, or ref. If you need any of those on the wrapper, use `<div>` (or `<ViewGroup>` in native).    ```tsx    // Wrong: <Fragment className=\"row\">...</Fragment> renders className on Fragment only. It lands in the warning, not the DOM.    // Right: <div className=\"row\">...</div> or <>...</>    ``` 4. Mixing `ReactDOM.render` with `createRoot`. The two client entry functions create incompatible roots; calling both on the same node throws \"Cannot update an unmounted root\". Pick one and stick with it. If you find an old `index.tsx` calling `ReactDOM.render`, migrate it to `createRoot`.    ```tsx    // Wrong    import ReactDOM from 'react-dom';    ReactDOM.render(<App />, document.getElementById('root'));    // Right    import { createRoot } from 'react-dom/client';    createRoot(document.getElementById('root')!).render(<App />);    ```" }
      },
    ]
  },
  {
    id = "02-002",
    number = 2,
    title = "Conditional Rendering and Lists",
    local_chapter_file = "002-conditional-and-lists.md",
    key_concepts = ["The concept", "Lists and keys", "Predict the render", "Common mistakes", "Why this matters", "Recall check"],
    total_duration_seconds = 706,
    videos = [
      {
        id = "UzI6QzI6VjE6MDAyLWNv",
        raw_key = "S2:C2:V1",
        title = "Rendering lists",
        url = "https://www.linkedin.com/learning/master-react-19-and-next-js-16-with-hands-on-projects-and-real-world-applications/rendering-lists",
        duration_text = "05m59s",
        duration_seconds = 359,
        description = "In-depth walkthrough of Conditional Rendering and Lists, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Master React 19 and Next.js 16 with Hands-On Projects and Real-World Applications",
        references = [
          { label = "React API: Built-in React Hooks", url = "https://react.dev/reference/react", description = "Canonical reference for all built-in React 19 hooks." },
          { label = "React Docs: Reusing Logic with Custom Hooks", url = "https://react.dev/learn/reusing-logic-with-custom-hooks", description = "Composing custom reactive hooks and sharing stateful logic." },
        ],
        notes = { definition = "A dashboard is like a theatre stage. The stage crew decides which scene is visible, then places one prop for each item in the script. React does the same work during rendering: JavaScript chooses the scene, and `map` creates one element per data item.", mental_model = "Every inbox, table, menu, permission gate, loading screen, and empty state uses these patterns. Correct conditions keep placeholder UI from leaking into the page. Correct keys preserve component state when a list changes. Callback props let a row tell its parent which item the user selected without giving the child ownership of the parent’s state.", code_example = "import { useState } from \"react\";\n\ntype NoticeProps = { signedIn: boolean };\n\nfunction Notice({ signedIn }: NoticeProps) {\n  if (!signedIn) return <p>Please sign in.</p>;\n  return <p>Welcome back.</p>;\n}\n\nexport default function App() {\n  const [signedIn, setSignedIn] = useState(false);\n  return (\n    <main>\n      <Notice signedIn={signedIn} />\n      <button onClick={() => setSignedIn((current) => !current)}>\n        Toggle\n      </button>\n    </main>\n  );\n}", pitfalls = "This broken JSX is deliberate:  It calls `removeTask` while rendering. If that function updates state, React reports:  Pass a function instead:  Without a key, React logs a development warning:  Add a stable key to the element returned by `map`, usually `key={task.id}`." }
      },
      {
        id = "UzI6QzI6VjI6MDAyLWNv",
        raw_key = "S2:C2:V2",
        title = "Conditional rendering: Ternaries",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/conditional-rendering-ternaries",
        duration_text = "05m47s",
        duration_seconds = 347,
        description = "In-depth walkthrough of Conditional Rendering and Lists, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: Built-in React Hooks", url = "https://react.dev/reference/react", description = "Canonical reference for all built-in React 19 hooks." },
          { label = "React Docs: Reusing Logic with Custom Hooks", url = "https://react.dev/learn/reusing-logic-with-custom-hooks", description = "Composing custom reactive hooks and sharing stateful logic." },
        ],
        notes = { definition = "A dashboard is like a theatre stage. The stage crew decides which scene is visible, then places one prop for each item in the script. React does the same work during rendering: JavaScript chooses the scene, and `map` creates one element per data item.", mental_model = "Every inbox, table, menu, permission gate, loading screen, and empty state uses these patterns. Correct conditions keep placeholder UI from leaking into the page. Correct keys preserve component state when a list changes. Callback props let a row tell its parent which item the user selected without giving the child ownership of the parent’s state.", code_example = "import { useState } from \"react\";\n\ntype NoticeProps = { signedIn: boolean };\n\nfunction Notice({ signedIn }: NoticeProps) {\n  if (!signedIn) return <p>Please sign in.</p>;\n  return <p>Welcome back.</p>;\n}\n\nexport default function App() {\n  const [signedIn, setSignedIn] = useState(false);\n  return (\n    <main>\n      <Notice signedIn={signedIn} />\n      <button onClick={() => setSignedIn((current) => !current)}>\n        Toggle\n      </button>\n    </main>\n  );\n}", pitfalls = "This broken JSX is deliberate:  It calls `removeTask` while rendering. If that function updates state, React reports:  Pass a function instead:  Without a key, React logs a development warning:  Add a stable key to the element returned by `map`, usually `key={task.id}`." }
      },
    ]
  },
  {
    id = "02-003",
    number = 3,
    title = "preconnect and the resource-hint APIs",
    local_chapter_file = "003-preconnect.md",
    key_concepts = ["The five hints, cheapest to most eager", "Minimal example", "Where you can call them", "Packaging a hint: wrap, do not repeat", "Predict the render", "Common mistakes"],
    total_duration_seconds = 1217,
    videos = [
      {
        id = "UzI6QzM6VjE6MDAzLXBy",
        raw_key = "S2:C3:V1",
        title = "useCallback example and understanding",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/usecallback-example-and-understanding",
        duration_text = "10m41s",
        duration_seconds = 641,
        description = "In-depth walkthrough of preconnect and the resource-hint APIs, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: Built-in React Hooks", url = "https://react.dev/reference/react", description = "Canonical reference for all built-in React 19 hooks." },
          { label = "React Docs: Reusing Logic with Custom Hooks", url = "https://react.dev/learn/reusing-logic-with-custom-hooks", description = "Composing custom reactive hooks and sharing stateful logic." },
        ],
        notes = { definition = "Loading a resource from another server is a slow relay race. Before a single byte of an image or script arrives, the browser has to look up the server's IP address, open a TCP connection, and negotiate TLS. Only then can it ask for the file. If you already know the browser will need something from `cdn.example.com`, you can send it to warm up those steps early, while your component is still rendering. That is what `preconnect` and its four siblings do.  These five functions live in `react-dom`, not `react`. They are not hooks. You call them like plain functions, and each returns nothing. React deduplicates them and forwards the hint to the browser, which is free to ignore it.", mental_model = "Resource hints are one of the few React features that touch the network before your data ever loads. Frameworks like Next.js call these APIs for you, so you may not write them by hand often. But knowing the ladder, connection, then bytes, then execution, tells you which lever fixes a slow third-party image, font, or embed. Wrapping the hint in a thin component keeps the CDN host in one place, and composing widgets from single-job parts keeps those components small enough to reason about. Both habits carry into every chapter after this one.", code_example = "import { preconnect } from \"react-dom\";\n\nfunction Gallery() {\n  preconnect(\"https://cdn.example.com\");\n  return <img src=\"https://cdn.example.com/hero.jpg\" alt=\"Hero\" />;\n}", pitfalls = "They come from `react-dom`:  Supply the resource type:  TypeScript reports that `precedence` is missing from the options for a style resource. Add it:  `preload` downloads the bytes and stops. If you preload a script and expect it to execute, nothing runs. Use `preinit` when you want the script to run or the stylesheet to apply; use `preload`/`preloadModule` only to make the later fetch instant." }
      },
      {
        id = "UzI6QzM6VjI6MDAzLXBy",
        raw_key = "S2:C3:V2",
        title = "Theme context: Implementing the provider",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/theme-context-implementing-the-provider",
        duration_text = "09m36s",
        duration_seconds = 576,
        description = "In-depth walkthrough of preconnect and the resource-hint APIs, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: Built-in React Hooks", url = "https://react.dev/reference/react", description = "Canonical reference for all built-in React 19 hooks." },
          { label = "React Docs: Reusing Logic with Custom Hooks", url = "https://react.dev/learn/reusing-logic-with-custom-hooks", description = "Composing custom reactive hooks and sharing stateful logic." },
        ],
        notes = { definition = "Loading a resource from another server is a slow relay race. Before a single byte of an image or script arrives, the browser has to look up the server's IP address, open a TCP connection, and negotiate TLS. Only then can it ask for the file. If you already know the browser will need something from `cdn.example.com`, you can send it to warm up those steps early, while your component is still rendering. That is what `preconnect` and its four siblings do.  These five functions live in `react-dom`, not `react`. They are not hooks. You call them like plain functions, and each returns nothing. React deduplicates them and forwards the hint to the browser, which is free to ignore it.", mental_model = "Resource hints are one of the few React features that touch the network before your data ever loads. Frameworks like Next.js call these APIs for you, so you may not write them by hand often. But knowing the ladder, connection, then bytes, then execution, tells you which lever fixes a slow third-party image, font, or embed. Wrapping the hint in a thin component keeps the CDN host in one place, and composing widgets from single-job parts keeps those components small enough to reason about. Both habits carry into every chapter after this one.", code_example = "import { preconnect } from \"react-dom\";\n\nfunction Gallery() {\n  preconnect(\"https://cdn.example.com\");\n  return <img src=\"https://cdn.example.com/hero.jpg\" alt=\"Hero\" />;\n}", pitfalls = "They come from `react-dom`:  Supply the resource type:  TypeScript reports that `precedence` is missing from the options for a style resource. Add it:  `preload` downloads the bytes and stops. If you preload a script and expect it to execute, nothing runs. Use `preinit` when you want the script to run or the stylesheet to apply; use `preload`/`preloadModule` only to make the later fetch instant." }
      },
    ]
  },
  {
    id = "02-004",
    number = 4,
    title = "State with useState",
    local_chapter_file = "004-state-with-usestate.md",
    key_concepts = ["The concept", "Minimal example", "Rules of hooks", "State shape and updates", "Skeleton loading as a state pattern", "State and the children prop"],
    total_duration_seconds = 715,
    videos = [
      {
        id = "UzI6QzQ6VjE6MDA0LXN0",
        raw_key = "S2:C4:V1",
        title = "useReducer vs useState: Basic example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/usereducer-vs-usestate-basic-example",
        duration_text = "05m59s",
        duration_seconds = 359,
        description = "In-depth walkthrough of State with useState, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: useState", url = "https://react.dev/reference/react/useState", description = "State hook specification, updater functions, and initial state initializer." },
          { label = "React Docs: State - A Component's Memory", url = "https://react.dev/learn/state-a-components-memory", description = "Retaining data between renders and trigger-render-commit lifecycle." },
        ],
        notes = { definition = "A light switch has two positions: on and off. Flip it and the bulb changes. The switch itself does not \"know\" the bulb is on, it just remembers where it was last left. React state is the same idea inside a component. The component keeps a small pocket of memory that survives between renders, and updating it is the only way to ask the component to re-render itself.", mental_model = "Almost every interactive React component in the wild uses `useState`. A form field, a modal, a wizard's step, a toggle, a counter, a dropdown's open state, a tab panel, a theme switcher, a \"load more\" button, a to-do list. State is the boundary between \"this is a static page\" and \"this is a component you can interact with\". Getting the rules of hooks right keeps every one of those components stable across renders. Getting the immutability rules right keeps the DOM updates cheap. Getting the state shape right keeps the component's logic readable six months later.  The bigger pay-off lands when the component grows. A stateful component that calls `useEffect` to fetch data, `useMemo` to compute a derived list, `useCallback` to hand a stable callback to a memoized child, and `useId` to connect a label to an input is the canonical \"real\" React component. Every one of those hooks depends on first understanding `useState` and the rules that keep the call order stable.", code_example = "import { useState } from \"react\";\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <section>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount((c) => c + 1)}>+1</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </section>\n  );\n}", pitfalls = "React compares the new state with `Object.is`. The same array reference is `===`-equal to the previous one, so React skips the re-render. The list looks unchanged. Replace with a copy:  The setter triggers another render, which triggers the setter again, which triggers another render. Move the logic into an event handler or an effect with the right dependency list.  // after every setItems call: setFirstItem(items[0] ?? null); ```  This duplicates the source of truth and creates a sync bug the moment the derivation races with an update. Derive during render instead:  State is for values that change independently of props and other state. Anything that can be computed from existing state or props should be a `const` in the same render." }
      },
      {
        id = "UzI6QzQ6VjI6MDA0LXN0",
        raw_key = "S2:C4:V2",
        title = "useState and useContext: Recap and pitfalls",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/usestate-and-usecontext-recap-and-pitfalls",
        duration_text = "05m56s",
        duration_seconds = 356,
        description = "In-depth walkthrough of State with useState, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: useState", url = "https://react.dev/reference/react/useState", description = "State hook specification, updater functions, and initial state initializer." },
          { label = "React Docs: State - A Component's Memory", url = "https://react.dev/learn/state-a-components-memory", description = "Retaining data between renders and trigger-render-commit lifecycle." },
        ],
        notes = { definition = "A light switch has two positions: on and off. Flip it and the bulb changes. The switch itself does not \"know\" the bulb is on, it just remembers where it was last left. React state is the same idea inside a component. The component keeps a small pocket of memory that survives between renders, and updating it is the only way to ask the component to re-render itself.", mental_model = "Almost every interactive React component in the wild uses `useState`. A form field, a modal, a wizard's step, a toggle, a counter, a dropdown's open state, a tab panel, a theme switcher, a \"load more\" button, a to-do list. State is the boundary between \"this is a static page\" and \"this is a component you can interact with\". Getting the rules of hooks right keeps every one of those components stable across renders. Getting the immutability rules right keeps the DOM updates cheap. Getting the state shape right keeps the component's logic readable six months later.  The bigger pay-off lands when the component grows. A stateful component that calls `useEffect` to fetch data, `useMemo` to compute a derived list, `useCallback` to hand a stable callback to a memoized child, and `useId` to connect a label to an input is the canonical \"real\" React component. Every one of those hooks depends on first understanding `useState` and the rules that keep the call order stable.", code_example = "import { useState } from \"react\";\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <section>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount((c) => c + 1)}>+1</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </section>\n  );\n}", pitfalls = "React compares the new state with `Object.is`. The same array reference is `===`-equal to the previous one, so React skips the re-render. The list looks unchanged. Replace with a copy:  The setter triggers another render, which triggers the setter again, which triggers another render. Move the logic into an event handler or an effect with the right dependency list.  // after every setItems call: setFirstItem(items[0] ?? null); ```  This duplicates the source of truth and creates a sync bug the moment the derivation races with an update. Derive during render instead:  State is for values that change independently of props and other state. Anything that can be computed from existing state or props should be a `const` in the same render." }
      },
    ]
  },
  {
    id = "02-005",
    number = 5,
    title = "useMemo Hook",
    local_chapter_file = "005-usememo-hook.md",
    key_concepts = ["The concept", "Minimal example", "Why this matters in the wider hook family", "Predict the render", "Common mistakes", "Worked example: a slow list with a fast sibling"],
    total_duration_seconds = 426,
    videos = [
      {
        id = "UzI6QzU6VjE6MDA1LXVz",
        raw_key = "S2:C5:V1",
        title = "useCallback() and useMemo() hook",
        url = "https://www.linkedin.com/learning/master-react-19-build-ecommerce-solutions-and-prepare-for-interviews-with-typescript-next-js-and-remix/usecallback-and-usememo-hook",
        duration_text = "05m42s",
        duration_seconds = 342,
        description = "In-depth walkthrough of useMemo Hook, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Master React 19, Build Ecommerce Solutions, and Prepare for Interviews with TypeScript, Next.js, and Remix",
        references = [
          { label = "React API: useMemo", url = "https://react.dev/reference/react/useMemo", description = "Caching calculation results between re-renders." },
          { label = "React API: memo", url = "https://react.dev/reference/react/memo", description = "Skipping re-rendering when component props are unchanged." },
        ],
        notes = { definition = "Imagine you run a kitchen, and a regular customer walks in asking for the daily special. You could cook it from scratch every time they sit down, but you already have the ingredients prepped in the fridge. The smart move is to look at what changed since last time. New ingredients, new request, you cook. Nothing changed, you plate what you already made. `useMemo` is exactly that kitchen check for the result of a calculation: it caches the value, and only re-cooks when a dependency actually changes.", mental_model = "`useMemo` is one piece of a larger story about values that need to persist across renders. The same chapter is a good place to meet the other \"container\" hooks because they answer different questions about persistence.  M -->|\"cached value\\nrecalculated on dep change\"| MV[Value, not reactive]   C -->|\"cached function\\nrecreated on dep change\"| CV[Stable identity]   R -->|\"stable { current }\\nmutable, non-reactive\"| RV[DOM or instance data]   I -->|\"stable string\\nunique per call site\"| IV[SSR-safe ID for labels]   X -->|\"subscribes to nearest\\nprovider value\"| XV[Cross-tree data] ```", code_example = "import { useMemo, useState } from \"react\";\n\ntype Product = { id: string; name: string; price: number; rating: number };\n\nfunction ProductList({ products }: { products: Product[] }) {\n  const [sortKey, setSortKey] = useState<\"price\" | \"rating\">(\"price\");\n  const [minRating, setMinRating] = useState(0);\n\n  const visible = useMemo(() => {\n    const filtered = products.filter((p) => p.rating >= minRating);\n    return [...filtered].sort((a, b) => a[sortKey] - b[sortKey]);\n  }, [products, sortKey, minRating]);\n\n  return (\n    <div>\n      <label>\n        Min rating: {minRating}\n        <input\n          type=\"range\"\n          min={0}\n          max={5}\n          value={minRating}\n          onChange={(e) => setMinRating(Number(e.currentTarget.value))}\n        />\n      </label>\n      <label>\n        Sort by:{\" \"}\n        <select\n          value={sortKey}\n          onChange={(e) => setSortKey(e.currentTarget.value as \"price\" | \"rating\")}\n        >\n          <option value=\"price\">Price</option>\n          <option value=\"rating\">Rating</option>\n        </select>\n      </label>\n      <ul>\n        {visible.map((p) => (\n          <li key={p.id}>\n            {p.name} - {p.price} (rating {p.rating})\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}", pitfalls = "The lint rule `react-hooks/exhaustive-deps` will warn. If you silence the warning, the cache becomes stale: when `query` changes, the previous `filtered` is still the one returned, and the UI does not update. The fix is to include `query` in the array.  `useMemo` runs during render. Network calls inside it are wrong on two counts: they violate the rule that render is pure, and they break if React decides to recompute. Move the fetch into `useEffect` and store the result in state.  `useMemo` is not free. Every call has bookkeeping cost: React stores the previous value, the previous dependencies, and runs an array compare. Wrapping a trivial addition in `useMemo` can make the component slower, not faster. The rule of thumb: memoize when the calculation is expensive, when the result is a stable reference passed to a `React.memo` child, or when the result is a stable reference used as a dependency in another hook.  React reserves the right to throw away the cache between renders. Treat `useMemo` as a performance hint, not as semantic caching. The factory must produce the same result from the same inputs. If you need a true cache (for an expensive pure function whose result you want to reuse across components), compute the value outside the component or use a `useRef` dictionary." }
      },
      {
        id = "UzI6QzU6VjI6MDA1LXVz",
        raw_key = "S2:C5:V2",
        title = "IQ: useCallback() and useMemo() hook",
        url = "https://www.linkedin.com/learning/master-react-19-build-ecommerce-solutions-and-prepare-for-interviews-with-typescript-next-js-and-remix/iq-usecallback-and-usememo-hook",
        duration_text = "01m24s",
        duration_seconds = 84,
        description = "In-depth walkthrough of useMemo Hook, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Master React 19, Build Ecommerce Solutions, and Prepare for Interviews with TypeScript, Next.js, and Remix",
        references = [
          { label = "React API: useMemo", url = "https://react.dev/reference/react/useMemo", description = "Caching calculation results between re-renders." },
          { label = "React API: memo", url = "https://react.dev/reference/react/memo", description = "Skipping re-rendering when component props are unchanged." },
        ],
        notes = { definition = "Imagine you run a kitchen, and a regular customer walks in asking for the daily special. You could cook it from scratch every time they sit down, but you already have the ingredients prepped in the fridge. The smart move is to look at what changed since last time. New ingredients, new request, you cook. Nothing changed, you plate what you already made. `useMemo` is exactly that kitchen check for the result of a calculation: it caches the value, and only re-cooks when a dependency actually changes.", mental_model = "`useMemo` is one piece of a larger story about values that need to persist across renders. The same chapter is a good place to meet the other \"container\" hooks because they answer different questions about persistence.  M -->|\"cached value\\nrecalculated on dep change\"| MV[Value, not reactive]   C -->|\"cached function\\nrecreated on dep change\"| CV[Stable identity]   R -->|\"stable { current }\\nmutable, non-reactive\"| RV[DOM or instance data]   I -->|\"stable string\\nunique per call site\"| IV[SSR-safe ID for labels]   X -->|\"subscribes to nearest\\nprovider value\"| XV[Cross-tree data] ```", code_example = "import { useMemo, useState } from \"react\";\n\ntype Product = { id: string; name: string; price: number; rating: number };\n\nfunction ProductList({ products }: { products: Product[] }) {\n  const [sortKey, setSortKey] = useState<\"price\" | \"rating\">(\"price\");\n  const [minRating, setMinRating] = useState(0);\n\n  const visible = useMemo(() => {\n    const filtered = products.filter((p) => p.rating >= minRating);\n    return [...filtered].sort((a, b) => a[sortKey] - b[sortKey]);\n  }, [products, sortKey, minRating]);\n\n  return (\n    <div>\n      <label>\n        Min rating: {minRating}\n        <input\n          type=\"range\"\n          min={0}\n          max={5}\n          value={minRating}\n          onChange={(e) => setMinRating(Number(e.currentTarget.value))}\n        />\n      </label>\n      <label>\n        Sort by:{\" \"}\n        <select\n          value={sortKey}\n          onChange={(e) => setSortKey(e.currentTarget.value as \"price\" | \"rating\")}\n        >\n          <option value=\"price\">Price</option>\n          <option value=\"rating\">Rating</option>\n        </select>\n      </label>\n      <ul>\n        {visible.map((p) => (\n          <li key={p.id}>\n            {p.name} - {p.price} (rating {p.rating})\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}", pitfalls = "The lint rule `react-hooks/exhaustive-deps` will warn. If you silence the warning, the cache becomes stale: when `query` changes, the previous `filtered` is still the one returned, and the UI does not update. The fix is to include `query` in the array.  `useMemo` runs during render. Network calls inside it are wrong on two counts: they violate the rule that render is pure, and they break if React decides to recompute. Move the fetch into `useEffect` and store the result in state.  `useMemo` is not free. Every call has bookkeeping cost: React stores the previous value, the previous dependencies, and runs an array compare. Wrapping a trivial addition in `useMemo` can make the component slower, not faster. The rule of thumb: memoize when the calculation is expensive, when the result is a stable reference passed to a `React.memo` child, or when the result is a stable reference used as a dependency in another hook.  React reserves the right to throw away the cache between renders. Treat `useMemo` as a performance hint, not as semantic caching. The factory must produce the same result from the same inputs. If you need a true cache (for an expensive pure function whose result you want to reuse across components), compute the value outside the component or use a `useRef` dictionary." }
      },
    ]
  },
  {
    id = "02-006",
    number = 6,
    title = "memo and shallow prop comparison",
    local_chapter_file = "006-memo-and-shallow-prop-comparison.md",
    key_concepts = ["The concept", "Minimal example", "Predict the render", "Common mistakes", "Why this matters", "The related React 19 APIs in this chapter"],
    total_duration_seconds = 943,
    videos = [
      {
        id = "UzI6QzY6VjE6MDA2LW1l",
        raw_key = "S2:C6:V1",
        title = "useMemo real-world example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/usememo-real-world-example",
        duration_text = "13m58s",
        duration_seconds = 838,
        description = "In-depth walkthrough of memo and shallow prop comparison, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: useMemo", url = "https://react.dev/reference/react/useMemo", description = "Caching calculation results between re-renders." },
          { label = "React API: memo", url = "https://react.dev/reference/react/memo", description = "Skipping re-rendering when component props are unchanged." },
        ],
        notes = { definition = "Picture a library desk with a return scanner. When a book comes back, the clerk checks its barcode against the last recorded barcode. If the barcode is the same, the clerk does not inspect the book again. If it changed, the clerk processes it. `memo` gives a component a similar checkpoint when its parent renders again.", mental_model = "You meet `memo` in table rows, search results, charts, editors, and library components that sit below frequently changing parents. A search field, pointer position, or status indicator can update an ancestor many times while a large leaf has no new input.  The bug this optimization addresses is wasted render work. The bugs caused by a careless use of it are stale output, expensive comparators, and false confidence from a component that still re-renders because its props are fresh objects or functions. Read the Profiler before deciding that a memo boundary is needed. When a child should skip, make its prop identities match the intended data flow. `useMemo` can stabilize a derived object, and `useCallback` can stabilize a callback. Both are useful only when the receiving child compares those identities.", code_example = "import { memo, useState } from \"react\";\n\ntype RowProps = { label: string; value: number };\n\nfunction Row({ label, value }: RowProps) {\n  return (\n    <li>\n      {label}: {value}\n    </li>\n  );\n}\n\nconst MemoRow = memo(Row);\n\nconst rows: RowProps[] = [\n  { label: \"Apples\", value: 4 },\n  { label: \"Pears\", value: 7 },\n];\n\nexport function App() {\n  const [query, setQuery] = useState(\"\");\n\n  return (\n    <main>\n      <label>\n        Search\n        <input\n          value={query}\n          onChange={(event) => setQuery(event.currentTarget.value)}\n        />\n      </label>\n      <ul>\n        {rows.map((row) => (\n          <MemoRow key={row.label} {...row} />\n        ))}\n      </ul>\n    </main>\n  );\n}", pitfalls = "This is a plausible optimization that does not work:  The object literal is allocated again on every parent render. `Object.is` returns `false`, even when the fields contain the same values. Keep the object reference stable with state, a prop, or a justified `useMemo`, or pass the primitive fields directly.  A custom comparator has the opposite meaning from many first guesses. `true` means \"the props are equal, so React may skip.\"  This component can show stale text forever if `label` changes, because React trusts the comparator and skips the update. Compare every value that changes the rendered output, or use the default comparator. A custom comparator can also cost more than rendering the child, so measure before adding one.  This remains a normal stateful component:" }
      },
      {
        id = "UzI6QzY6VjI6MDA2LW1l",
        raw_key = "S2:C6:V2",
        title = "Understanding props",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/understanding-props",
        duration_text = "01m45s",
        duration_seconds = 105,
        description = "In-depth walkthrough of memo and shallow prop comparison, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: useMemo", url = "https://react.dev/reference/react/useMemo", description = "Caching calculation results between re-renders." },
          { label = "React API: memo", url = "https://react.dev/reference/react/memo", description = "Skipping re-rendering when component props are unchanged." },
        ],
        notes = { definition = "Picture a library desk with a return scanner. When a book comes back, the clerk checks its barcode against the last recorded barcode. If the barcode is the same, the clerk does not inspect the book again. If it changed, the clerk processes it. `memo` gives a component a similar checkpoint when its parent renders again.", mental_model = "You meet `memo` in table rows, search results, charts, editors, and library components that sit below frequently changing parents. A search field, pointer position, or status indicator can update an ancestor many times while a large leaf has no new input.  The bug this optimization addresses is wasted render work. The bugs caused by a careless use of it are stale output, expensive comparators, and false confidence from a component that still re-renders because its props are fresh objects or functions. Read the Profiler before deciding that a memo boundary is needed. When a child should skip, make its prop identities match the intended data flow. `useMemo` can stabilize a derived object, and `useCallback` can stabilize a callback. Both are useful only when the receiving child compares those identities.", code_example = "import { memo, useState } from \"react\";\n\ntype RowProps = { label: string; value: number };\n\nfunction Row({ label, value }: RowProps) {\n  return (\n    <li>\n      {label}: {value}\n    </li>\n  );\n}\n\nconst MemoRow = memo(Row);\n\nconst rows: RowProps[] = [\n  { label: \"Apples\", value: 4 },\n  { label: \"Pears\", value: 7 },\n];\n\nexport function App() {\n  const [query, setQuery] = useState(\"\");\n\n  return (\n    <main>\n      <label>\n        Search\n        <input\n          value={query}\n          onChange={(event) => setQuery(event.currentTarget.value)}\n        />\n      </label>\n      <ul>\n        {rows.map((row) => (\n          <MemoRow key={row.label} {...row} />\n        ))}\n      </ul>\n    </main>\n  );\n}", pitfalls = "This is a plausible optimization that does not work:  The object literal is allocated again on every parent render. `Object.is` returns `false`, even when the fields contain the same values. Keep the object reference stable with state, a prop, or a justified `useMemo`, or pass the primitive fields directly.  A custom comparator has the opposite meaning from many first guesses. `true` means \"the props are equal, so React may skip.\"  This component can show stale text forever if `label` changes, because React trusts the comparator and skips the update. Compare every value that changes the rendered output, or use the default comparator. A custom comparator can also cost more than rendering the child, so measure before adding one.  This remains a normal stateful component:" }
      },
    ]
  },
  {
    id = "02-007",
    number = 7,
    title = "useActionState and React 19 form actions",
    local_chapter_file = "007-useactionstate-react-19-form-actions.md",
    key_concepts = ["1. Hook: a service desk ticket", "2. The concept", "3. Minimal example", "4. Predict the render", "5. Common mistakes", "6. Why this matters"],
    total_duration_seconds = 897,
    videos = [
      {
        id = "UzI6Qzc6VjE6MDA3LXVz",
        raw_key = "S2:C7:V1",
        title = "Advanced form handling with react-hook-form",
        url = "https://www.linkedin.com/learning/master-react-19-and-next-js-16-with-hands-on-projects-and-real-world-applications/advanced-form-handling-with-react-hook-form",
        duration_text = "11m29s",
        duration_seconds = 689,
        description = "In-depth walkthrough of useActionState and React 19 form actions, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Master React 19 and Next.js 16 with Hands-On Projects and Real-World Applications",
        references = [
          { label = "React API: useState", url = "https://react.dev/reference/react/useState", description = "State hook specification, updater functions, and initial state initializer." },
          { label = "React Docs: State - A Component's Memory", url = "https://react.dev/learn/state-a-components-memory", description = "Retaining data between renders and trigger-render-commit lifecycle." },
        ],
        notes = { definition = "A form is like a service desk. You hand in a ticket, the desk checks it, and returns a new status while a busy light is on. `useActionState` gives a React form that workflow without separate submit, pending, and result plumbing.", mental_model = "Sign-in, checkout, comments, and settings forms all need pending and validation states. Keeping those states beside the mutation prevents buttons that re-enable during an in-flight request and errors that disappear into an unhandled rejection. For data needed on the first screen, use an initial-fetch strategy; for data requested after a click, use an on-demand action.", code_example = "import { useActionState } from \"react\";\n\ntype Result = { message: string; error?: string };\n\nasync function save(_: Result, data: FormData): Promise<Result> {\n  const name = String(data.get(\"name\") ?? \"\").trim();\n  return name ? { message: `Saved ${name}` } : { message: \"\", error: \"Name is required\" };\n}\n\nexport function ProfileForm() {\n  const [result, action, isPending] = useActionState(save, { message: \"\" });\n  return <form action={action}>\n    <label>Name <input name=\"name\" /></label>\n    <button disabled={isPending}>{isPending ? \"Saving…\" : \"Save\"}</button>\n    <p role=\"status\">{result.error ?? result.message}</p>\n  </form>;\n}", pitfalls = "- **Wrong prop:** `onSubmit={action}` passes an event where the action expects `(previousState, formData)`. Use `action={action}`. - **Unsafe field read:** `FormData.get()` returns `FormDataEntryValue | null`. TypeScript reports `Object is possibly 'null'` if you use a possibly null value unsafely. Validate with `String(data.get(\"name\") ?? \"\")`. - **Conditional Hook:** the linter reports `React Hook \"useActionState\" is called conditionally`. Call Hooks at the top level of a component or custom Hook. - **Submit Effect:** fetching in an Effect after a submit can replay work or race with newer input. Keep the request in the action. Effects need dependencies and cleanup." }
      },
      {
        id = "UzI6Qzc6VjI6MDA3LXVz",
        raw_key = "S2:C7:V2",
        title = "React Hook Form",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/react-hook-form",
        duration_text = "03m28s",
        duration_seconds = 208,
        description = "In-depth walkthrough of useActionState and React 19 form actions, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: useState", url = "https://react.dev/reference/react/useState", description = "State hook specification, updater functions, and initial state initializer." },
          { label = "React Docs: State - A Component's Memory", url = "https://react.dev/learn/state-a-components-memory", description = "Retaining data between renders and trigger-render-commit lifecycle." },
        ],
        notes = { definition = "A form is like a service desk. You hand in a ticket, the desk checks it, and returns a new status while a busy light is on. `useActionState` gives a React form that workflow without separate submit, pending, and result plumbing.", mental_model = "Sign-in, checkout, comments, and settings forms all need pending and validation states. Keeping those states beside the mutation prevents buttons that re-enable during an in-flight request and errors that disappear into an unhandled rejection. For data needed on the first screen, use an initial-fetch strategy; for data requested after a click, use an on-demand action.", code_example = "import { useActionState } from \"react\";\n\ntype Result = { message: string; error?: string };\n\nasync function save(_: Result, data: FormData): Promise<Result> {\n  const name = String(data.get(\"name\") ?? \"\").trim();\n  return name ? { message: `Saved ${name}` } : { message: \"\", error: \"Name is required\" };\n}\n\nexport function ProfileForm() {\n  const [result, action, isPending] = useActionState(save, { message: \"\" });\n  return <form action={action}>\n    <label>Name <input name=\"name\" /></label>\n    <button disabled={isPending}>{isPending ? \"Saving…\" : \"Save\"}</button>\n    <p role=\"status\">{result.error ?? result.message}</p>\n  </form>;\n}", pitfalls = "- **Wrong prop:** `onSubmit={action}` passes an event where the action expects `(previousState, formData)`. Use `action={action}`. - **Unsafe field read:** `FormData.get()` returns `FormDataEntryValue | null`. TypeScript reports `Object is possibly 'null'` if you use a possibly null value unsafely. Validate with `String(data.get(\"name\") ?? \"\")`. - **Conditional Hook:** the linter reports `React Hook \"useActionState\" is called conditionally`. Call Hooks at the top level of a component or custom Hook. - **Submit Effect:** fetching in an Effect after a submit can replay work or race with newer input. Keep the request in the action. Effects need dependencies and cleanup." }
      },
    ]
  },
  {
    id = "02-008",
    number = 8,
    title = "Currying event-handler factories and custom hooks",
    local_chapter_file = "008-currying-event-handler-factories.md",
    key_concepts = ["1. Hook: a name tag for every checkout button", "2. The concept", "3. Minimal example", "4. Predict the render", "5. Common mistakes", "6. From factory to custom hook"],
    total_duration_seconds = 544,
    videos = [
      {
        id = "UzI6Qzg6VjE6MDA4LWN1",
        raw_key = "S2:C8:V1",
        title = "Custom hook example and usage",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/custom-hook-example-and-usage",
        duration_text = "04m55s",
        duration_seconds = 295,
        description = "In-depth walkthrough of Currying event-handler factories and custom hooks, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: Built-in React Hooks", url = "https://react.dev/reference/react", description = "Canonical reference for all built-in React 19 hooks." },
          { label = "React Docs: Reusing Logic with Custom Hooks", url = "https://react.dev/learn/reusing-logic-with-custom-hooks", description = "Composing custom reactive hooks and sharing stateful logic." },
        ],
        notes = { definition = "Picture a coffee shop with ten checkout buttons. Each one needs to know *which* order it belongs to when the cashier taps it. Writing ten separate handlers is tedious. Writing one handler that closes over the order id is clean, but the handler needs to be created fresh for every order. The shape is: \"give me an id, and I'll give you a handler that knows what to do with that id.\" That is a curried handler factory.  `handleCheckChange` is a factory: it takes an `id` and returns a handler that closes over that id.", mental_model = "Picture a coffee shop with ten checkout buttons. Each one needs to know *which* order it belongs to when the cashier taps it. Writing ten separate handlers is tedious. Writing one handler that closes over the order id is clean, but the handler needs to be created fresh for every order. The shape is: \"give me an id, and I'll give you a handler that knows what to do with that id.\" That is a curried handler factory.  `handleCheckChange` is a factory: it takes an `id` and returns a handler that closes over that id.", code_example = "import { useState } from \"react\";\n\ntype Item = { id: number; name: string };\n\nexport function GroceryList({ items }: { items: Item[] }) {\n  const [checked, setChecked] = useState<ReadonlySet<number>>(() => new Set());\n\n  const handleCheckChange = (id: number) => () => {\n    setChecked((prev) => {\n      const next = new Set(prev);\n      next.has(id) ? next.delete(id) : next.add(id);\n      return next;\n    });\n  };\n\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item.id}>\n          <label>\n            <input\n              type=\"checkbox\"\n              checked={checked.has(item.id)}\n              onChange={handleCheckChange(item.id)}\n            />\n            {item.name}\n          </label>\n        </li>\n      ))}\n    </ul>\n  );\n}", pitfalls = "- **Calling the handler instead of passing it.** `onChange={handleCheckChange(item.id)}` is correct; `onChange={handleCheckChange()}` would call the factory with `undefined` and would not adapt to each item. The factory is called *during render*, the handler is called *on click*. - **Forgetting the inner function.** `const makeHandler = (id) => doStuff(id);` returns the result of `doStuff`, not a handler. The handler generator needs `const makeHandler = (id) => () => doStuff(id);` or `const makeHandler = (id) => () => doStuff(id);`. - **Stale closures in `useEffect` dependencies.** A handler returned by the factory captures the `id` at render time. If the `id` comes from props and the parent re-renders, the factory closes over the new `id` automatically. The factory is cheap; re-creating it on every render is fine. - **Hard-coding the value.** `() => handleCheckChange(fixedId)` is a curried handler that always ignores the per-item value. The factory pattern loses its purpose when the closed-over value is constant." }
      },
      {
        id = "UzI6Qzg6VjI6MDA4LWN1",
        raw_key = "S2:C8:V2",
        title = "Custom hook pitfalls and summary",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/custom-hook-pitfalls-and-summary",
        duration_text = "04m09s",
        duration_seconds = 249,
        description = "In-depth walkthrough of Currying event-handler factories and custom hooks, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: Built-in React Hooks", url = "https://react.dev/reference/react", description = "Canonical reference for all built-in React 19 hooks." },
          { label = "React Docs: Reusing Logic with Custom Hooks", url = "https://react.dev/learn/reusing-logic-with-custom-hooks", description = "Composing custom reactive hooks and sharing stateful logic." },
        ],
        notes = { definition = "Picture a coffee shop with ten checkout buttons. Each one needs to know *which* order it belongs to when the cashier taps it. Writing ten separate handlers is tedious. Writing one handler that closes over the order id is clean, but the handler needs to be created fresh for every order. The shape is: \"give me an id, and I'll give you a handler that knows what to do with that id.\" That is a curried handler factory.  `handleCheckChange` is a factory: it takes an `id` and returns a handler that closes over that id.", mental_model = "Picture a coffee shop with ten checkout buttons. Each one needs to know *which* order it belongs to when the cashier taps it. Writing ten separate handlers is tedious. Writing one handler that closes over the order id is clean, but the handler needs to be created fresh for every order. The shape is: \"give me an id, and I'll give you a handler that knows what to do with that id.\" That is a curried handler factory.  `handleCheckChange` is a factory: it takes an `id` and returns a handler that closes over that id.", code_example = "import { useState } from \"react\";\n\ntype Item = { id: number; name: string };\n\nexport function GroceryList({ items }: { items: Item[] }) {\n  const [checked, setChecked] = useState<ReadonlySet<number>>(() => new Set());\n\n  const handleCheckChange = (id: number) => () => {\n    setChecked((prev) => {\n      const next = new Set(prev);\n      next.has(id) ? next.delete(id) : next.add(id);\n      return next;\n    });\n  };\n\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item.id}>\n          <label>\n            <input\n              type=\"checkbox\"\n              checked={checked.has(item.id)}\n              onChange={handleCheckChange(item.id)}\n            />\n            {item.name}\n          </label>\n        </li>\n      ))}\n    </ul>\n  );\n}", pitfalls = "- **Calling the handler instead of passing it.** `onChange={handleCheckChange(item.id)}` is correct; `onChange={handleCheckChange()}` would call the factory with `undefined` and would not adapt to each item. The factory is called *during render*, the handler is called *on click*. - **Forgetting the inner function.** `const makeHandler = (id) => doStuff(id);` returns the result of `doStuff`, not a handler. The handler generator needs `const makeHandler = (id) => () => doStuff(id);` or `const makeHandler = (id) => () => doStuff(id);`. - **Stale closures in `useEffect` dependencies.** A handler returned by the factory captures the `id` at render time. If the `id` comes from props and the parent re-renders, the factory closes over the new `id` automatically. The factory is cheap; re-creating it on every render is fine. - **Hard-coding the value.** `() => handleCheckChange(fixedId)` is a curried handler that always ignores the per-item value. The factory pattern loses its purpose when the closed-over value is constant." }
      },
    ]
  },
  {
    id = "02-009",
    number = 9,
    title = "Intro to re-renders and state-driven cascade",
    local_chapter_file = "009-intro-to-re-renders-and-state-driven-cascade.md",
    key_concepts = ["1. Hook: a sneeze and the whole bus", "2. The concept", "3. Minimal example", "4. Predict the render", "5. The cascade, with state drawn in", "6. The cascade, with props drawn in"],
    total_duration_seconds = 397,
    videos = [
      {
        id = "UzI6Qzk6VjE6MDA5LWlu",
        raw_key = "S2:C9:V1",
        title = "Introduction to the useState",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/introduction-to-the-usestate",
        duration_text = "02m31s",
        duration_seconds = 151,
        description = "In-depth walkthrough of Intro to re-renders and state-driven cascade, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: useState", url = "https://react.dev/reference/react/useState", description = "State hook specification, updater functions, and initial state initializer." },
          { label = "React Docs: State - A Component's Memory", url = "https://react.dev/learn/state-a-components-memory", description = "Retaining data between renders and trigger-render-commit lifecycle." },
        ],
        notes = { definition = "Picture a bus full of passengers. One person at the back sneezes, and a sympathetic jolt ripples forward. The driver in front was not looking at the sneezer, but the jolt reaches them anyway. React re-renders work the same way: a single state change in a leaf component does not stay local. It propagates *upward* to the closest component that owns state, then *cascades downward* through every component the owning component renders. A re-render is the bus's jolt. State is the sneeze.  The two questions that follow from that picture are the spine of this chapter. *What* triggers a re-render? State does. *How far* does a re-render travel? Down the whole branch from the component that owns the state.", mental_model = "A real React tree is not two components. It is a thousand components, several layers deep, with state sprinkled across the layers. Every interaction re-renders the component that owns the state and every component nested inside it. The re-render cost is the time the function bodies take to run plus the time React takes to reconcile the DOM. On a slow laptop or a long list, that cost is visible.  The biggest performance wins come from shaping the state tree, not from sprinkling `memo`. The shapes that matter:", code_example = "import { useState } from \"react\";\n\nexport function TwoCounters() {\n  return (\n    <section>\n      <Counter label=\"A\" />\n      <hr />\n      <ReadOnly label=\"B\" />\n    </section>\n  );\n}\n\nfunction Counter({ label }: { label: string }) {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount((c) => c + 1)} type=\"button\">\n      {label}: {count}\n    </button>\n  );\n}\n\nfunction ReadOnly({ label }: { label: string }) {\n  return <p>Static: {label}</p>;\n}", pitfalls = "The component looks like it has state, but it actually mirrors a prop. The mirror is out of date the moment the prop changes and the effect that resyncs it is missing. Either derive during render (`const item = items.find((i) => i.id === id)`) or own the data in the parent and pass it down as a prop.  `count` is a function of `items`. Mirror it in state, and you spend an effect keeping it in sync. Derive it instead:  State is for values that change independently of props and other state. Anything computable during render should be a `const`.  `draft` is used by `CommentEditor` only. `Sidebar` and `Footer` re-render on every keystroke. Move the state into `CommentEditor`.  The first render shows whatever the initializer returned (`null` in this case). The second render shows the fetched data. The \"loading\" state is the gap between the two renders. Skeleton screens exist to fill that gap without shifting the layout." }
      },
      {
        id = "UzI6Qzk6VjI6MDA5LWlu",
        raw_key = "S2:C9:V2",
        title = "useEffect hook: Introduction",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/useeffect-hook-introduction",
        duration_text = "04m06s",
        duration_seconds = 246,
        description = "In-depth walkthrough of Intro to re-renders and state-driven cascade, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: useState", url = "https://react.dev/reference/react/useState", description = "State hook specification, updater functions, and initial state initializer." },
          { label = "React Docs: State - A Component's Memory", url = "https://react.dev/learn/state-a-components-memory", description = "Retaining data between renders and trigger-render-commit lifecycle." },
        ],
        notes = { definition = "Picture a bus full of passengers. One person at the back sneezes, and a sympathetic jolt ripples forward. The driver in front was not looking at the sneezer, but the jolt reaches them anyway. React re-renders work the same way: a single state change in a leaf component does not stay local. It propagates *upward* to the closest component that owns state, then *cascades downward* through every component the owning component renders. A re-render is the bus's jolt. State is the sneeze.  The two questions that follow from that picture are the spine of this chapter. *What* triggers a re-render? State does. *How far* does a re-render travel? Down the whole branch from the component that owns the state.", mental_model = "A real React tree is not two components. It is a thousand components, several layers deep, with state sprinkled across the layers. Every interaction re-renders the component that owns the state and every component nested inside it. The re-render cost is the time the function bodies take to run plus the time React takes to reconcile the DOM. On a slow laptop or a long list, that cost is visible.  The biggest performance wins come from shaping the state tree, not from sprinkling `memo`. The shapes that matter:", code_example = "import { useState } from \"react\";\n\nexport function TwoCounters() {\n  return (\n    <section>\n      <Counter label=\"A\" />\n      <hr />\n      <ReadOnly label=\"B\" />\n    </section>\n  );\n}\n\nfunction Counter({ label }: { label: string }) {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount((c) => c + 1)} type=\"button\">\n      {label}: {count}\n    </button>\n  );\n}\n\nfunction ReadOnly({ label }: { label: string }) {\n  return <p>Static: {label}</p>;\n}", pitfalls = "The component looks like it has state, but it actually mirrors a prop. The mirror is out of date the moment the prop changes and the effect that resyncs it is missing. Either derive during render (`const item = items.find((i) => i.id === id)`) or own the data in the parent and pass it down as a prop.  `count` is a function of `items`. Mirror it in state, and you spend an effect keeping it in sync. Derive it instead:  State is for values that change independently of props and other state. Anything computable during render should be a `const`.  `draft` is used by `CommentEditor` only. `Sidebar` and `Footer` re-render on every keystroke. Move the state into `CommentEditor`.  The first render shows whatever the initializer returned (`null` in this case). The second render shows the fetched data. The \"loading\" state is the gap between the two renders. Skeleton screens exist to fill that gap without shifting the layout." }
      },
    ]
  },
  {
    id = "02-010",
    number = 10,
    title = "Elements vs components, and children as props",
    local_chapter_file = "010-elements-vs-components-and-children-as-props.md",
    key_concepts = ["1. Hook: a recipe card and the cook", "2. The concept", "3. Minimal example", "4. Predict the render", "5. Configuration concerns with elements as props", "6. Render props"],
    total_duration_seconds = 565,
    videos = [
      {
        id = "UzI6QzEwOlYxOjAxMC1l",
        raw_key = "S2:C10:V1",
        title = "Working with render props",
        url = "https://www.linkedin.com/learning/react-components-context-and-accessibility/working-with-render-props",
        duration_text = "03m54s",
        duration_seconds = 234,
        description = "In-depth walkthrough of Elements vs components, and children as props, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React: Components, Context, and Accessibility",
        references = [
          { label = "React API: Built-in React Hooks", url = "https://react.dev/reference/react", description = "Canonical reference for all built-in React 19 hooks." },
          { label = "React Docs: Reusing Logic with Custom Hooks", url = "https://react.dev/learn/reusing-logic-with-custom-hooks", description = "Composing custom reactive hooks and sharing stateful logic." },
        ],
        notes = { definition = "Two roles are at work every time React renders. One writes the recipe. The other cooks it. A **component** is the cook: a function you call once per render, which runs and returns a description of what should appear on screen. An **element** is the recipe card: a plain JavaScript object that describes the dish in advance. The card sits in memory and does nothing on its own. The cook picks it up, follows its instructions, and only then does the meal actually exist.  The distinction looks academic until you see it explain a whole performance mystery. When a state update in a parent re-renders a child, the cook is asked to cook the same dish twice. The question is whether the recipe card the cook holds *changed*. If the card object is identical before and after the update, the cook stays put. If it is a new card, the cook goes again. This chapter is about that single comparison, and how to keep the card stable when you want it to be.", mental_model = "Element stability is the cheap optimisation that runs before `memo`, `useMemo`, and `useCallback` exist. It works because the reconciliation algorithm compares elements, not components. If the element reference does not change, React does not even look at the component.  The same mechanism is the foundation of every modern React pattern. Compound components expose their slots through element props. Routing libraries return matched-route elements. Layout systems delegate content via `children`. Each of those patterns works because the caller creates the element outside the stateful wrapper, and the wrapper only decides where to place it.", code_example = "import { useState } from \"react\";\n\nfunction HeavyChild({ name }: { name: string }) {\n  console.log(`render: HeavyChild ${name}`);\n  return <p>{name}</p>;\n}\n\nexport function App() {\n  const [, force] = useState(0);\n  const external = <HeavyChild name=\"B\" />;\n  return (\n    <main>\n      <button onClick={() => force((n) => n + 1)} type=\"button\">force</button>\n      <HeavyChild name=\"A\" />\n      {external}\n    </main>\n  );\n}", pitfalls = "export function App() {   return (     <Shell>       <Heavy />     </Shell>   ); } ```  Looks like a children-as-prop trick, and it is one. The element for `Heavy` is built in `App`, not `Shell`. `Heavy` does not re-render when `Shell` re-renders. The mistake is the opposite: building the element inside the stateful wrapper.  `react-hooks/immutability` flags this. `setItems(items)` gives React the same array reference it already has. `Object.is(prev, next) === true` short-circuits the re-render. The fix is a new array: `setItems((prev) => [...prev, n])`.  `count` is a function of `items`. Computing it during render keeps them in sync by construction:  The functional form is the cure. Each `(c) => c + 1` reads the latest queued value." }
      },
      {
        id = "UzI6QzEwOlYyOjAxMC1l",
        raw_key = "S2:C10:V2",
        title = "Render props pattern",
        url = "https://www.linkedin.com/learning/master-react-19-and-next-js-16-with-hands-on-projects-and-real-world-applications/render-props-pattern",
        duration_text = "05m31s",
        duration_seconds = 331,
        description = "In-depth walkthrough of Elements vs components, and children as props, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Master React 19 and Next.js 16 with Hands-On Projects and Real-World Applications",
        references = [
          { label = "React API: Built-in React Hooks", url = "https://react.dev/reference/react", description = "Canonical reference for all built-in React 19 hooks." },
          { label = "React Docs: Reusing Logic with Custom Hooks", url = "https://react.dev/learn/reusing-logic-with-custom-hooks", description = "Composing custom reactive hooks and sharing stateful logic." },
        ],
        notes = { definition = "Two roles are at work every time React renders. One writes the recipe. The other cooks it. A **component** is the cook: a function you call once per render, which runs and returns a description of what should appear on screen. An **element** is the recipe card: a plain JavaScript object that describes the dish in advance. The card sits in memory and does nothing on its own. The cook picks it up, follows its instructions, and only then does the meal actually exist.  The distinction looks academic until you see it explain a whole performance mystery. When a state update in a parent re-renders a child, the cook is asked to cook the same dish twice. The question is whether the recipe card the cook holds *changed*. If the card object is identical before and after the update, the cook stays put. If it is a new card, the cook goes again. This chapter is about that single comparison, and how to keep the card stable when you want it to be.", mental_model = "Element stability is the cheap optimisation that runs before `memo`, `useMemo`, and `useCallback` exist. It works because the reconciliation algorithm compares elements, not components. If the element reference does not change, React does not even look at the component.  The same mechanism is the foundation of every modern React pattern. Compound components expose their slots through element props. Routing libraries return matched-route elements. Layout systems delegate content via `children`. Each of those patterns works because the caller creates the element outside the stateful wrapper, and the wrapper only decides where to place it.", code_example = "import { useState } from \"react\";\n\nfunction HeavyChild({ name }: { name: string }) {\n  console.log(`render: HeavyChild ${name}`);\n  return <p>{name}</p>;\n}\n\nexport function App() {\n  const [, force] = useState(0);\n  const external = <HeavyChild name=\"B\" />;\n  return (\n    <main>\n      <button onClick={() => force((n) => n + 1)} type=\"button\">force</button>\n      <HeavyChild name=\"A\" />\n      {external}\n    </main>\n  );\n}", pitfalls = "export function App() {   return (     <Shell>       <Heavy />     </Shell>   ); } ```  Looks like a children-as-prop trick, and it is one. The element for `Heavy` is built in `App`, not `Shell`. `Heavy` does not re-render when `Shell` re-renders. The mistake is the opposite: building the element inside the stateful wrapper.  `react-hooks/immutability` flags this. `setItems(items)` gives React the same array reference it already has. `Object.is(prev, next) === true` short-circuits the re-render. The fix is a new array: `setItems((prev) => [...prev, n])`.  `count` is a function of `items`. Computing it during render keeps them in sync by construction:  The functional form is the cure. Each `(c) => c + 1` reads the latest queued value." }
      },
    ]
  },
  {
    id = "02-011",
    number = 11,
    title = "`useContext`",
    local_chapter_file = "011-usecontext.md",
    key_concepts = ["1. Hook: a wristband for one subtree", "2. The concept", "3. Minimal example", "4. Predict the render", "5. Common mistakes", "6. Why this matters"],
    total_duration_seconds = 316,
    videos = [
      {
        id = "UzI6QzExOlYxOjAxMS11",
        raw_key = "S2:C11:V1",
        title = "What you should know before watching this course",
        url = "https://www.linkedin.com/learning/react-components-context-and-accessibility/articles/what-you-should-know-before-watching-this-course",
        duration_text = "00m30s",
        duration_seconds = 30,
        description = "In-depth walkthrough of `useContext`, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React: Components, Context, and Accessibility",
        references = [
          { label = "React API: useContext", url = "https://react.dev/reference/react/useContext", description = "Subscribing to context and reading nearest provider values." },
          { label = "React Docs: Passing Data Deeply with Context", url = "https://react.dev/learn/passing-data-deeply-with-context", description = "Avoiding prop drilling and scaling with context providers." },
        ],
        notes = { definition = "Imagine a music festival. The entrance gives you a wristband. Every stage inside the festival can check the band without asking you to hand it through every queue between the entrance and the stage. A React context works in the same shape: a provider puts a value on a subtree, and a descendant reads it directly.  The wristband belongs to a particular festival. A provider for `ThemeContext` does not satisfy a consumer of `AuthContext`. If several providers for the same context are nested, the consumer sees the closest one above it.", mental_model = "Context appears in theme systems, authentication state, internationalisation, router state, design-system configuration, and React DOM's form-status APIs. It removes a particular class of bug: intermediate components accidentally rename, omit, or forward a prop while a distant leaf needs the value.  Context has a boundary. Every consumer subscribes to its provider's `value`, so a changing object can re-render many consumers. Keep context values small, split unrelated update frequencies when the tree grows, and use a separate state library when the data model needs store features rather than tree-scoped delivery. A provider is a data-flow decision, not a licence to put every value at the root.", code_example = "import { createContext, useContext } from \"react\";\n\nconst ThemeContext = createContext<\"light\" | \"dark\">(\"light\");\n\nfunction Button() {\n  const theme = useContext(ThemeContext);\n  return <button className={`button-${theme}`}>Save</button>;\n}\n\nexport function App() {\n  return (\n    <ThemeContext value=\"dark\">\n      <Button />\n    </ThemeContext>\n  );\n}", pitfalls = "This is deliberately broken TypeScript:  const SessionContext = createContext<Session>(); ```  Pass a real default, `null`, or `undefined` and include that possibility in the context type. A cast such as `{} as Session` silences the signature but does not provide a working session.  This is deliberately broken React code:  The `react-hooks/rules-of-hooks` rule reports:" }
      },
      {
        id = "UzI6QzExOlYyOjAxMS11",
        raw_key = "S2:C11:V2",
        title = "Rendering arrays",
        url = "https://www.linkedin.com/learning/react-components-context-and-accessibility/rendering-arrays",
        duration_text = "04m46s",
        duration_seconds = 286,
        description = "In-depth walkthrough of `useContext`, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React: Components, Context, and Accessibility",
        references = [
          { label = "React API: useContext", url = "https://react.dev/reference/react/useContext", description = "Subscribing to context and reading nearest provider values." },
          { label = "React Docs: Passing Data Deeply with Context", url = "https://react.dev/learn/passing-data-deeply-with-context", description = "Avoiding prop drilling and scaling with context providers." },
        ],
        notes = { definition = "Imagine a music festival. The entrance gives you a wristband. Every stage inside the festival can check the band without asking you to hand it through every queue between the entrance and the stage. A React context works in the same shape: a provider puts a value on a subtree, and a descendant reads it directly.  The wristband belongs to a particular festival. A provider for `ThemeContext` does not satisfy a consumer of `AuthContext`. If several providers for the same context are nested, the consumer sees the closest one above it.", mental_model = "Context appears in theme systems, authentication state, internationalisation, router state, design-system configuration, and React DOM's form-status APIs. It removes a particular class of bug: intermediate components accidentally rename, omit, or forward a prop while a distant leaf needs the value.  Context has a boundary. Every consumer subscribes to its provider's `value`, so a changing object can re-render many consumers. Keep context values small, split unrelated update frequencies when the tree grows, and use a separate state library when the data model needs store features rather than tree-scoped delivery. A provider is a data-flow decision, not a licence to put every value at the root.", code_example = "import { createContext, useContext } from \"react\";\n\nconst ThemeContext = createContext<\"light\" | \"dark\">(\"light\");\n\nfunction Button() {\n  const theme = useContext(ThemeContext);\n  return <button className={`button-${theme}`}>Save</button>;\n}\n\nexport function App() {\n  return (\n    <ThemeContext value=\"dark\">\n      <Button />\n    </ThemeContext>\n  );\n}", pitfalls = "This is deliberately broken TypeScript:  const SessionContext = createContext<Session>(); ```  Pass a real default, `null`, or `undefined` and include that possibility in the context type. A cast such as `{} as Session` silences the signature but does not provide a working session.  This is deliberately broken React code:  The `react-hooks/rules-of-hooks` rule reports:" }
      },
    ]
  },
  {
    id = "02-012",
    number = 12,
    title = "useDebouncedCallback (from use-debounce)",
    local_chapter_file = "012-usedebouncedcallback-from-use-debounce.md",
    key_concepts = ["The concept", "Minimal example", "Why this hook sits next to `useEffect`", "Predict the render", "Common mistakes", "Worked example: an autosave form"],
    total_duration_seconds = 1040,
    videos = [
      {
        id = "UzI6QzEyOlYxOjAxMi11",
        raw_key = "S2:C12:V1",
        title = "useForm example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/useform-example",
        duration_text = "11m17s",
        duration_seconds = 677,
        description = "In-depth walkthrough of useDebouncedCallback (from use-debounce), examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: useCallback", url = "https://react.dev/reference/react/useCallback", description = "Caching function definitions across re-renders for reference equality." },
          { label = "React Docs: Separating Events from Effects", url = "https://react.dev/learn/separating-events-from-effects", description = "Reactive values versus non-reactive event logic." },
        ],
        notes = { definition = "Picture an elevator door. As long as someone is walking toward it, the door stays open. The moment the last person walks through, the door waits a beat, then closes. If another person arrives during that wait, the timer resets. `useDebouncedCallback` is that elevator for a function: the wrapped callback only fires after the user has stopped calling it for the specified delay.", mental_model = "The naive implementation puts the delay in a `useEffect` with a `setTimeout` and a cleanup that calls `clearTimeout`. That works, but the cleanup has to be spelled out, the timer id has to live in a ref, and the latest callback has to be captured in a ref to avoid stale closures. `useDebouncedCallback` is the same shape with all the plumbing hidden, and it gives you `cancel` and `flush` for free.  The library also exposes `useDebounce(value, delay)`, which is a different shape: it returns a debounced *value*, not a debounced *function*. Use it when you want the input itself to lag (controlled inputs, sliders that drive expensive renders). Use `useDebouncedCallback` when you want the side effect to lag but the input to stay responsive.", code_example = "import { useState } from \"react\";\nimport { useDebouncedCallback } from \"use-debounce\";\n\nexport function Search() {\n  const [query, setQuery] = useState(\"\");\n  const [results, setResults] = useState<string[]>([]);\n\n  const debouncedFetch = useDebouncedCallback(async (q: string) => {\n    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);\n    const data = (await res.json()) as { results: string[] };\n    setResults(data.results);\n  }, 300);\n\n  return (\n    <div>\n      <input\n        value={query}\n        onChange={(e) => {\n          setQuery(e.currentTarget.value);\n          debouncedFetch(e.currentTarget.value);\n        }}\n      />\n      <ul>\n        {results.map((r) => (\n          <li key={r}>{r}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}", pitfalls = "The wrapper is not a one-shot timer. Each call replaces the pending invocation with a fresh one. If you write `debouncedSave(); setTimeout(() => debouncedSave(), 200)` thinking you are \"double-delaying\", you have just reset the timer. The hook's `delay` is the only wait window.  `debounced` is stable, so this is fine. But the inner `handleSave` reference must be reachable inside the wrapper. The wrapper always calls the most recent `handleSave` because the library stores the callback in a ref internally. That means a stale state read inside `handleSave` is a different problem (the usual `useEffect` stale-closure problem) and the wrapper does not fix it.  If the component unmounts while a debounced call is pending, the timer still fires. The wrapped callback will then try to call `setResults` on an unmounted component. The library warns in development and the call is a no-op, but the cleaner fix is a cleanup effect:  The same pattern is the answer for the \"user navigated away during the typing window\" case: cancel the pending call before it lands.  `cancel` mutates internal timer state. Calling it during render breaks the rules of hooks and can produce React's \"cannot update a component while rendering a different component\" warning. Schedule it inside an event handler or an effect." }
      },
      {
        id = "UzI6QzEyOlYyOjAxMi11",
        raw_key = "S2:C12:V2",
        title = "useState hook",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/usestate-hook",
        duration_text = "06m03s",
        duration_seconds = 363,
        description = "In-depth walkthrough of useDebouncedCallback (from use-debounce), examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React API: useCallback", url = "https://react.dev/reference/react/useCallback", description = "Caching function definitions across re-renders for reference equality." },
          { label = "React Docs: Separating Events from Effects", url = "https://react.dev/learn/separating-events-from-effects", description = "Reactive values versus non-reactive event logic." },
        ],
        notes = { definition = "Picture an elevator door. As long as someone is walking toward it, the door stays open. The moment the last person walks through, the door waits a beat, then closes. If another person arrives during that wait, the timer resets. `useDebouncedCallback` is that elevator for a function: the wrapped callback only fires after the user has stopped calling it for the specified delay.", mental_model = "The naive implementation puts the delay in a `useEffect` with a `setTimeout` and a cleanup that calls `clearTimeout`. That works, but the cleanup has to be spelled out, the timer id has to live in a ref, and the latest callback has to be captured in a ref to avoid stale closures. `useDebouncedCallback` is the same shape with all the plumbing hidden, and it gives you `cancel` and `flush` for free.  The library also exposes `useDebounce(value, delay)`, which is a different shape: it returns a debounced *value*, not a debounced *function*. Use it when you want the input itself to lag (controlled inputs, sliders that drive expensive renders). Use `useDebouncedCallback` when you want the side effect to lag but the input to stay responsive.", code_example = "import { useState } from \"react\";\nimport { useDebouncedCallback } from \"use-debounce\";\n\nexport function Search() {\n  const [query, setQuery] = useState(\"\");\n  const [results, setResults] = useState<string[]>([]);\n\n  const debouncedFetch = useDebouncedCallback(async (q: string) => {\n    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);\n    const data = (await res.json()) as { results: string[] };\n    setResults(data.results);\n  }, 300);\n\n  return (\n    <div>\n      <input\n        value={query}\n        onChange={(e) => {\n          setQuery(e.currentTarget.value);\n          debouncedFetch(e.currentTarget.value);\n        }}\n      />\n      <ul>\n        {results.map((r) => (\n          <li key={r}>{r}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}", pitfalls = "The wrapper is not a one-shot timer. Each call replaces the pending invocation with a fresh one. If you write `debouncedSave(); setTimeout(() => debouncedSave(), 200)` thinking you are \"double-delaying\", you have just reset the timer. The hook's `delay` is the only wait window.  `debounced` is stable, so this is fine. But the inner `handleSave` reference must be reachable inside the wrapper. The wrapper always calls the most recent `handleSave` because the library stores the callback in a ref internally. That means a stale state read inside `handleSave` is a different problem (the usual `useEffect` stale-closure problem) and the wrapper does not fix it.  If the component unmounts while a debounced call is pending, the timer still fires. The wrapped callback will then try to call `setResults` on an unmounted component. The library warns in development and the call is a no-op, but the cleaner fix is a cleanup effect:  The same pattern is the answer for the \"user navigated away during the typing window\" case: cancel the pending call before it lands.  `cancel` mutates internal timer state. Calling it during render breaks the rules of hooks and can produce React's \"cannot update a component while rendering a different component\" warning. Schedule it inside an event handler or an effect." }
      },
    ]
  },
  {
    id = "02-013",
    number = 13,
    title = "useCallback and useRef for stable callbacks",
    local_chapter_file = "013-usecallback-and-useref-for-stable-callbacks.md",
    key_concepts = ["1. Hook: the same key, not a new key-shaped object", "2. The concepts", "3. Minimal examples", "4. Predict the render", "5. Common mistakes", "6. Why this matters"],
    total_duration_seconds = 590,
    videos = [
      {
        id = "UzI6QzEzOlYxOjAxMy11",
        raw_key = "S2:C13:V1",
        title = "useEffect and useCallback Hooks",
        url = "https://www.linkedin.com/learning/react-js-building-an-interface-8551484/useeffect-and-usecallback-hooks",
        duration_text = "06m20s",
        duration_seconds = 380,
        description = "In-depth walkthrough of useCallback and useRef for stable callbacks, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React.js: Building an Interface",
        references = [
          { label = "React API: useRef", url = "https://react.dev/reference/react/useRef", description = "Persisting mutable values across renders and DOM element references." },
          { label = "React Docs: Manipulating the DOM with Refs", url = "https://react.dev/learn/manipulating-the-dom-with-refs", description = "Focus management, measuring layout, and node manipulation." },
        ],
        notes = { definition = "Imagine a subscription desk. Each time you hand the clerk a brand-new key, even if it opens the same door, the clerk treats it as a different key: the old subscription is cancelled and a new one starts. A callback created during render is like that new key. `useCallback` can keep the same function object between renders. `useRef` gives you a small drawer whose address stays fixed while its contents can change.", mental_model = "Subscriptions, timers, debounced work, and memoized list rows often use identity to decide whether to restart or re-render. Stable identity prevents needless teardown and child work. `useEffectEvent` avoids the opposite bug: adding every value to an Effect dependency list can reconnect a chat room whenever a theme changes. Refs also bridge React's declarative render model to DOM focus and third-party widgets. These tools do not make every render faster; they make a measured identity boundary predictable.", code_example = "import { memo, useCallback, useRef, useState } from \"react\";\n\nconst SaveButton = memo(function SaveButton({ onSave }: { onSave: () => void }) {\n  console.log(\"SaveButton rendered\");\n  return <button onClick={onSave}>Save</button>;\n});\n\nexport function Editor() {\n  const [text, setText] = useState(\"\");\n  const onSave = useCallback(() => console.log(text), [text]);\n  const inputRef = useRef<HTMLInputElement>(null);\n  return <><input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} /><SaveButton onSave={onSave} /></>;\n}", pitfalls = "- **Using `useMemo` for a function.** `useMemo(() => () => save(id), [id])` works, but `useCallback(() => save(id), [id])` states the intent directly. `useMemo` caches a result; `useCallback` caches a function. - **Leaving a reactive value out.** `useCallback(() => console.log(text), [])` captures the initial `text`. With the exhaustive-deps rule, you may see `React Hook useCallback has a missing dependency: 'text'.` Fix it with `[text]`, or use a ref when latest non-rendering data is deliberately required. - **Expecting a ref update to paint.** `ref.current = value` does not render new JSX. Use `useState` for visible data. - **Calling hooks conditionally.** `if (enabled) useCallback(...)` causes `Error: Rendered fewer hooks than expected.` Call hooks at the top level, then branch inside the callback or render." }
      },
      {
        id = "UzI6QzEzOlYyOjAxMy11",
        raw_key = "S2:C13:V2",
        title = "useState() hook: Understanding state creation",
        url = "https://www.linkedin.com/learning/master-react-19-build-ecommerce-solutions-and-prepare-for-interviews-with-typescript-next-js-and-remix/usestate-hook-understanding-state-creation",
        duration_text = "03m30s",
        duration_seconds = 210,
        description = "In-depth walkthrough of useCallback and useRef for stable callbacks, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Master React 19, Build Ecommerce Solutions, and Prepare for Interviews with TypeScript, Next.js, and Remix",
        references = [
          { label = "React API: useRef", url = "https://react.dev/reference/react/useRef", description = "Persisting mutable values across renders and DOM element references." },
          { label = "React Docs: Manipulating the DOM with Refs", url = "https://react.dev/learn/manipulating-the-dom-with-refs", description = "Focus management, measuring layout, and node manipulation." },
        ],
        notes = { definition = "Imagine a subscription desk. Each time you hand the clerk a brand-new key, even if it opens the same door, the clerk treats it as a different key: the old subscription is cancelled and a new one starts. A callback created during render is like that new key. `useCallback` can keep the same function object between renders. `useRef` gives you a small drawer whose address stays fixed while its contents can change.", mental_model = "Subscriptions, timers, debounced work, and memoized list rows often use identity to decide whether to restart or re-render. Stable identity prevents needless teardown and child work. `useEffectEvent` avoids the opposite bug: adding every value to an Effect dependency list can reconnect a chat room whenever a theme changes. Refs also bridge React's declarative render model to DOM focus and third-party widgets. These tools do not make every render faster; they make a measured identity boundary predictable.", code_example = "import { memo, useCallback, useRef, useState } from \"react\";\n\nconst SaveButton = memo(function SaveButton({ onSave }: { onSave: () => void }) {\n  console.log(\"SaveButton rendered\");\n  return <button onClick={onSave}>Save</button>;\n});\n\nexport function Editor() {\n  const [text, setText] = useState(\"\");\n  const onSave = useCallback(() => console.log(text), [text]);\n  const inputRef = useRef<HTMLInputElement>(null);\n  return <><input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} /><SaveButton onSave={onSave} /></>;\n}", pitfalls = "- **Using `useMemo` for a function.** `useMemo(() => () => save(id), [id])` works, but `useCallback(() => save(id), [id])` states the intent directly. `useMemo` caches a result; `useCallback` caches a function. - **Leaving a reactive value out.** `useCallback(() => console.log(text), [])` captures the initial `text`. With the exhaustive-deps rule, you may see `React Hook useCallback has a missing dependency: 'text'.` Fix it with `[text]`, or use a ref when latest non-rendering data is deliberately required. - **Expecting a ref update to paint.** `ref.current = value` does not render new JSX. Use `useState` for visible data. - **Calling hooks conditionally.** `if (enabled) useCallback(...)` causes `Error: Rendered fewer hooks than expected.` Call hooks at the top level, then branch inside the callback or render." }
      },
    ]
  },
]
+++

This section covers **Core Hooks & Reactive APIs** (Part 2: Reactive State, Hooks & Forms), featuring **26 curated LinkedIn Learning video lessons**, comprehensive pop-up chapter study notes with **Ask AI**, and official React documentation references across all 13 core chapters.
