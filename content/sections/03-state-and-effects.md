+++
title = "Global State & Zustand Architecture"
weight = 4
[extra]
section_number = 3
section_id = "section-03"
part = 2
part_title = "Part 2: Reactive State, Hooks & Forms"
total_videos = 14
total_duration_seconds = 5067
recommended_courses = [
  { title = "React: State Management", url = "https://www.linkedin.com/learning/react-state-management-22688323", author = "LinkedIn Learning", duration = "3h 50m", scope = "Zustand quickstart, store hooks, centralized stores, atomic states, and reducer patterns." },
  { title = "Build Modern Web Apps with React: Hooks, State Management, and APIs Using Vite or Next.js", url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js", author = "LinkedIn Learning", duration = "5h 45m", scope = "Zustand, Jotai, Recoil, Redux Toolkit comparisons, and typed middleware mutations." },
]
chapters = [
  {
    id = "03-001",
    number = 1,
    title = "Global State with Zustand",
    local_chapter_file = "001-global-state-with-zustand.md",
    key_concepts = ["The problem this chapter answers", "What a Zustand store actually is", "Reference: the core APIs", "Reference: the equality function in detail", "Why this matters", "Recall check"],
    total_duration_seconds = 623,
    videos = [
      {
        id = "UzM6QzE6VjE6MDAxLWds",
        raw_key = "S3:C1:V1",
        title = "Zustand code example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/zustand-code-example",
        duration_text = "08m15s",
        duration_seconds = 495,
        description = "In-depth walkthrough of Global State with Zustand, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "You already know how to keep state in a component with `useState`, how to push it down with props, and how to share it across a subtree with `useContext`. That triangle covers a lot of apps. It starts to creak in three places:  1. The state has to live at the top of the tree, so every component in between re-renders when the value changes (unless you split contexts or memoize carefully). 2. The state only exists inside React. Anything outside React, a browser event listener, a WebSocket callback, a `setInterval`, has to reach back through a hook to read or update it. 3. The provider needs to wrap every consumer. A second copy of the same app (a second modal root, a second storybook story, a route-level sub-tree) needs its own provider, with its own state.", mental_model = "A store that lives outside React is the right answer when state has to survive the absence of a component (a WebSocket handler that updates the chat when the chat panel is unmounted), when the same state has to be read by a worker or a non-React widget, or when a second tree needs its own copy without rebuilding the provider tree.  The class of bug this prevents is \"the value in the sidebar does not match the value in the URL bar because one reads a stale prop and the other reads a stale context\". With Zustand, both read the same store, both update it the same way, and there is no second copy to drift.", code_example = "import { create } from \"zustand\";\n\nconst useCounterStore = create((set) => ({\n  count: 0,\n  inc: () => set((state) => ({ count: state.count + 1 })),\n}));", pitfalls = "Direct DOM mutation or impure side effects during the render phase cause hydration mismatches, duplicate executions in Strict Mode, and stale closures. Always declare full dependency arrays in useEffect and never read state during render from outside the component tree." }
      },
      {
        id = "UzM6QzE6VjI6MDAxLWds",
        raw_key = "S3:C1:V2",
        title = "Zustand quickstart",
        url = "https://www.linkedin.com/learning/react-state-management-22688323/zustand-quickstart",
        duration_text = "02m08s",
        duration_seconds = 128,
        description = "In-depth walkthrough of Global State with Zustand, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React: State Management",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "You already know how to keep state in a component with `useState`, how to push it down with props, and how to share it across a subtree with `useContext`. That triangle covers a lot of apps. It starts to creak in three places:  1. The state has to live at the top of the tree, so every component in between re-renders when the value changes (unless you split contexts or memoize carefully). 2. The state only exists inside React. Anything outside React, a browser event listener, a WebSocket callback, a `setInterval`, has to reach back through a hook to read or update it. 3. The provider needs to wrap every consumer. A second copy of the same app (a second modal root, a second storybook story, a route-level sub-tree) needs its own provider, with its own state.", mental_model = "A store that lives outside React is the right answer when state has to survive the absence of a component (a WebSocket handler that updates the chat when the chat panel is unmounted), when the same state has to be read by a worker or a non-React widget, or when a second tree needs its own copy without rebuilding the provider tree.  The class of bug this prevents is \"the value in the sidebar does not match the value in the URL bar because one reads a stale prop and the other reads a stale context\". With Zustand, both read the same store, both update it the same way, and there is no second copy to drift.", code_example = "import { create } from \"zustand\";\n\nconst useCounterStore = create((set) => ({\n  count: 0,\n  inc: () => set((state) => ({ count: state.count + 1 })),\n}));", pitfalls = "Direct DOM mutation or impure side effects during the render phase cause hydration mismatches, duplicate executions in Strict Mode, and stale closures. Always declare full dependency arrays in useEffect and never read state during render from outside the component tree." }
      },
    ]
  },
  {
    id = "03-002",
    number = 2,
    title = "Shallow equality function",
    local_chapter_file = "002-shallow-equality-function.md",
    key_concepts = ["1. Hook: comparing two shopping baskets", "2. The concept", "3. Minimal example", "4. Predict the render", "5. Common mistakes", "6. Why this matters"],
    total_duration_seconds = 411,
    videos = [
      {
        id = "UzM6QzI6VjE6MDAyLXNo",
        raw_key = "S3:C2:V1",
        title = "Using Codespaces in this course",
        url = "https://www.linkedin.com/learning/react-state-management-22688323/using-codespaces-in-this-course",
        duration_text = "01m49s",
        duration_seconds = 109,
        description = "In-depth walkthrough of Shallow equality function, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React: State Management",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "Picture a checkout clerk with a quick visual scan. They look at each item on top of each basket. If every item on top matches, they stamp the baskets \"equal\" and move on. They do not open sealed jars, check brand names underneath, or compare prices stamped on the bottom of a coupon. `shallow` is that clerk: it checks top-level properties only and lets nested objects keep their own identity.  This matters because Zustand decides whether to re-render a subscriber by comparing two snapshots. The default check is `Object.is`, which only returns true when both sides are the same reference. When a selector returns a fresh wrapper object on every render, `Object.is` always says \"different\", and React schedules a new render. `shallow` lets you tell Zustand \"check the top-level fields instead; the wrapper is fine if its contents are unchanged\".", mental_model = "Zustand has no Context and no Provider. Subscribers read directly from the store, and the store uses a comparator to decide whether each subscriber's slice has changed. The comparator is the entire performance model. `Object.is` is the cheapest possible check, and it is what you want for scalar values and stable references. The moment a selector returns a composite slice, you need a comparator that walks one level into it. `shallow` is that comparator.  You will see `useShallow` everywhere a real Zustand app selects more than one field, especially around `combine` reducers, derived selectors that return `{ x, y }`, and time-travel features (the tic-tac-toe walkthrough in the reference section below). The same pattern shows up under different names in other libraries: `reselect` for Redux, `useShallow` for Jotai in some configurations, and `useMemo` with a custom comparator in vanilla React.", code_example = "bun add zustand", pitfalls = "- **Forgetting `useShallow` after upgrading to v5.** Zustand v4 happily re-rendered on every selector call; v5 uses `Object.is` by default and surfaces wrapper-object selectors as `Maximum update depth exceeded`. If you see the error after upgrading, the first place to look is every selector that returns a freshly built object or array. - **Expecting `shallow` to deep-compare nested objects.** `shallow({ a: { b: 1 } }, { a: { b: 1 } })` returns `false` because the nested `{ b: 1 }` references are different. If you need recursion, write a custom comparator or use `lodash.isEqual`. - **Passing `shallow` directly to `useStore`.** The vanilla `shallow` comparator expects to be called with `(currentSnapshot, nextSnapshot)`. The React hook is `useShallow`, which wraps a selector. Mixing them up " }
      },
      {
        id = "UzM6QzI6VjI6MDAyLXNo",
        raw_key = "S3:C2:V2",
        title = "Moving logic into a function reducer",
        url = "https://www.linkedin.com/learning/react-state-management-22688323/moving-logic-into-a-function-reducer",
        duration_text = "05m02s",
        duration_seconds = 302,
        description = "In-depth walkthrough of Shallow equality function, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React: State Management",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "Picture a checkout clerk with a quick visual scan. They look at each item on top of each basket. If every item on top matches, they stamp the baskets \"equal\" and move on. They do not open sealed jars, check brand names underneath, or compare prices stamped on the bottom of a coupon. `shallow` is that clerk: it checks top-level properties only and lets nested objects keep their own identity.  This matters because Zustand decides whether to re-render a subscriber by comparing two snapshots. The default check is `Object.is`, which only returns true when both sides are the same reference. When a selector returns a fresh wrapper object on every render, `Object.is` always says \"different\", and React schedules a new render. `shallow` lets you tell Zustand \"check the top-level fields instead; the wrapper is fine if its contents are unchanged\".", mental_model = "Zustand has no Context and no Provider. Subscribers read directly from the store, and the store uses a comparator to decide whether each subscriber's slice has changed. The comparator is the entire performance model. `Object.is` is the cheapest possible check, and it is what you want for scalar values and stable references. The moment a selector returns a composite slice, you need a comparator that walks one level into it. `shallow` is that comparator.  You will see `useShallow` everywhere a real Zustand app selects more than one field, especially around `combine` reducers, derived selectors that return `{ x, y }`, and time-travel features (the tic-tac-toe walkthrough in the reference section below). The same pattern shows up under different names in other libraries: `reselect` for Redux, `useShallow` for Jotai in some configurations, and `useMemo` with a custom comparator in vanilla React.", code_example = "bun add zustand", pitfalls = "- **Forgetting `useShallow` after upgrading to v5.** Zustand v4 happily re-rendered on every selector call; v5 uses `Object.is` by default and surfaces wrapper-object selectors as `Maximum update depth exceeded`. If you see the error after upgrading, the first place to look is every selector that returns a freshly built object or array. - **Expecting `shallow` to deep-compare nested objects.** `shallow({ a: { b: 1 } }, { a: { b: 1 } })` returns `false` because the nested `{ b: 1 }` references are different. If you need recursion, write a custom comparator or use `lodash.isEqual`. - **Passing `shallow` directly to `useStore`.** The vanilla `shallow` comparator expects to be called with `(currentSnapshot, nextSnapshot)`. The React hook is `useShallow`, which wraps a selector. Mixing them up " }
      },
    ]
  },
  {
    id = "03-003",
    number = 3,
    title = "`createWithEqualityFn` API reference",
    local_chapter_file = "003-createwithequalityfn-api-reference.md",
    key_concepts = ["1. Hook: a comparator at the door", "2. The concept", "3. Minimal example", "4. Predict the render", "5. Common mistakes", "6. Why this matters"],
    total_duration_seconds = 827,
    videos = [
      {
        id = "UzM6QzM6VjE6MDAzLWNy",
        raw_key = "S3:C3:V1",
        title = "Overview and fetch API example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/overview-and-fetch-api-example",
        duration_text = "08m00s",
        duration_seconds = 480,
        description = "In-depth walkthrough of `createWithEqualityFn` API reference, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "Imagine a coffee shop with a single host stand. Each customer walking in is checked against the guest list. Some days the host only checks names (`Object.is`); some days the host checks the whole party (`shallow` on a wrapper object). In the Zustand v5 world, the default host is strict (`Object.is`), and every selector inside `useStore` is on its own: each one has to remember to bring its own custom comparator (`useShallow`) or risk kicking off an infinite loop.  `createWithEqualityFn` from `zustand/traditional` puts the host policy back at the door. You give the store one default comparator when you create it, and every selector read through the returned hook inherits that comparator automatically. You stop wrapping every selector with `useShallow`; you stop hand-rolling comparators at every call site. The comparator lives at the store, the way the host policy lives at the stand.", mental_model = "Two stores in the same app can carry two different comparators. A `useBookmarkStore` created with `shallow` is friendly to wrapper selectors; a `useMetricsStore` created with the default `Object.is` is strict. Each comparator reflects the shape of the data the store owns. `createWithEqualityFn` lets you declare that policy once, at the store, instead of repeating it at every `useShallow` call.  You will see this pattern in Zustand shops that bundle many stores: each one picks the comparator that matches its data shape, and consumers do not need to know which comparator is in use. The same idea shows up in Reselect for Redux, in `useSyncExternalStoreWithSelector` for low-level external stores, and in `useMemo` with a custom comparator in vanilla React.", code_example = "bun add zustand use-sync-external-store", pitfalls = "- **Forgetting the peer dependency.** On a fresh Vite + React 18 setup, importing `zustand/traditional` without `use-sync-external-store` throws `Cannot find module 'use-sync-external-store/shim/...'` at build time. `bun add use-sync-external-store` once and it stops. - **Wrapping the store with `useShallow` anyway.** Once the comparator lives in the store, wrapping the selector in `useShallow` is redundant and clutters the call site. Either pick `createWithEqualityFn(..., shallow)` or pick `create` + `useShallow` per call site, not both. - **Expecting `shallow` to deep-compare nested objects.** The same rule from the previous chapter applies here. `shallow({ a: { b: 1 } }, { a: { b: 1 } })` returns `false`. The store-level comparator changes nothing about what `shallow` itself walks. - **" }
      },
      {
        id = "UzM6QzM6VjI6MDAzLWNy",
        raw_key = "S3:C3:V2",
        title = "Conditional rendering: Ternaries",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/conditional-rendering-ternaries",
        duration_text = "05m47s",
        duration_seconds = 347,
        description = "In-depth walkthrough of `createWithEqualityFn` API reference, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "Imagine a coffee shop with a single host stand. Each customer walking in is checked against the guest list. Some days the host only checks names (`Object.is`); some days the host checks the whole party (`shallow` on a wrapper object). In the Zustand v5 world, the default host is strict (`Object.is`), and every selector inside `useStore` is on its own: each one has to remember to bring its own custom comparator (`useShallow`) or risk kicking off an infinite loop.  `createWithEqualityFn` from `zustand/traditional` puts the host policy back at the door. You give the store one default comparator when you create it, and every selector read through the returned hook inherits that comparator automatically. You stop wrapping every selector with `useShallow`; you stop hand-rolling comparators at every call site. The comparator lives at the store, the way the host policy lives at the stand.", mental_model = "Two stores in the same app can carry two different comparators. A `useBookmarkStore` created with `shallow` is friendly to wrapper selectors; a `useMetricsStore` created with the default `Object.is` is strict. Each comparator reflects the shape of the data the store owns. `createWithEqualityFn` lets you declare that policy once, at the store, instead of repeating it at every `useShallow` call.  You will see this pattern in Zustand shops that bundle many stores: each one picks the comparator that matches its data shape, and consumers do not need to know which comparator is in use. The same idea shows up in Reselect for Redux, in `useSyncExternalStoreWithSelector` for low-level external stores, and in `useMemo` with a custom comparator in vanilla React.", code_example = "bun add zustand use-sync-external-store", pitfalls = "- **Forgetting the peer dependency.** On a fresh Vite + React 18 setup, importing `zustand/traditional` without `use-sync-external-store` throws `Cannot find module 'use-sync-external-store/shim/...'` at build time. `bun add use-sync-external-store` once and it stops. - **Wrapping the store with `useShallow` anyway.** Once the comparator lives in the store, wrapping the selector in `useShallow` is redundant and clutters the call site. Either pick `createWithEqualityFn(..., shallow)` or pick `create` + `useShallow` per call site, not both. - **Expecting `shallow` to deep-compare nested objects.** The same rule from the previous chapter applies here. `shallow({ a: { b: 1 } }, { a: { b: 1 } })` returns `false`. The store-level comparator changes nothing about what `shallow` itself walks. - **" }
      },
    ]
  },
  {
    id = "03-004",
    number = 4,
    title = "Tic-tac-toe walkthrough with Zustand",
    local_chapter_file = "004-tic-tac-toe-walkthrough-with-zustand.md",
    key_concepts = ["Why build a whole game", "The component tree", "Step 1: a controlled Square and Board", "Step 2: the store with `combine`", "Step 3: derive `xIsNext`, don't store it", "Step 4: time travel comes for free"],
    total_duration_seconds = 556,
    videos = [
      {
        id = "UzM6QzQ6VjE6MDA0LXRp",
        raw_key = "S3:C4:V1",
        title = "Next steps for building with React",
        url = "https://www.linkedin.com/learning/building-modern-projects-with-react-24955170/next-steps-for-building-with-react",
        duration_text = "01m01s",
        duration_seconds = 61,
        description = "In-depth walkthrough of Tic-tac-toe walkthrough with Zustand, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Building Modern Projects with React",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "You have met the pieces already: `create`, selectors, `set`, `combine`, `shallow`. A game is where they stop being isolated facts and start being an architecture. Tic-tac-toe is small enough to hold in your head and rich enough to force every real decision a store faces: what to store, what to derive, how to keep a move immutable, and how to add a feature (time travel) without rewriting the model.  The rule that carries this whole chapter: **store the minimum, derive the rest.** Every value you can compute from another value is a value that can drift out of sync. The game ends with exactly two stored fields.", mental_model = "This is the shape of nearly every real Zustand store: a small stored core, derived values computed in render, immutable updates, and middleware added only where it pays off. Time travel is a stand-in for undo/redo, which you will build for real in an editor, a form wizard, or a drawing tool. The immutability habit that makes it cheap is the same habit React's reconciler depends on to detect changes at all.", code_example = "type Player = \"X\" | \"O\";\ntype SquareValue = Player | null;\ntype BoardState = SquareValue[];\n\nfunction Square({\n  value,\n  onSquareClick,\n}: {\n  value: SquareValue;\n  onSquareClick: () => void;\n}) {\n  return (\n    <button className=\"square\" onClick={onSquareClick}>\n      {value}\n    </button>\n  );\n}", pitfalls = "An earlier draft of this game stored `xIsNext` as a boolean and flipped it on every move. It worked until time travel: jumping to move 3 also had to reset `xIsNext`, and forgetting to do so put the game in an impossible state where O played twice.  `xIsNext` is completely determined by `currentMove`. Even moves are X, odd moves are O. So compute it:  There is now no way for the turn indicator to disagree with the board, because there is only one source of truth. This is the chapter's rule in one line.  const xIsNext = currentMove % 2 === 0;   const currentSquares = history[currentMove] ?? emptyBoard();" }
      },
      {
        id = "UzM6QzQ6VjI6MDA0LXRp",
        raw_key = "S3:C4:V2",
        title = "Zustand code example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/zustand-code-example",
        duration_text = "08m15s",
        duration_seconds = 495,
        description = "In-depth walkthrough of Tic-tac-toe walkthrough with Zustand, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "You have met the pieces already: `create`, selectors, `set`, `combine`, `shallow`. A game is where they stop being isolated facts and start being an architecture. Tic-tac-toe is small enough to hold in your head and rich enough to force every real decision a store faces: what to store, what to derive, how to keep a move immutable, and how to add a feature (time travel) without rewriting the model.  The rule that carries this whole chapter: **store the minimum, derive the rest.** Every value you can compute from another value is a value that can drift out of sync. The game ends with exactly two stored fields.", mental_model = "This is the shape of nearly every real Zustand store: a small stored core, derived values computed in render, immutable updates, and middleware added only where it pays off. Time travel is a stand-in for undo/redo, which you will build for real in an editor, a form wizard, or a drawing tool. The immutability habit that makes it cheap is the same habit React's reconciler depends on to detect changes at all.", code_example = "type Player = \"X\" | \"O\";\ntype SquareValue = Player | null;\ntype BoardState = SquareValue[];\n\nfunction Square({\n  value,\n  onSquareClick,\n}: {\n  value: SquareValue;\n  onSquareClick: () => void;\n}) {\n  return (\n    <button className=\"square\" onClick={onSquareClick}>\n      {value}\n    </button>\n  );\n}", pitfalls = "An earlier draft of this game stored `xIsNext` as a boolean and flipped it on every move. It worked until time travel: jumping to move 3 also had to reset `xIsNext`, and forgetting to do so put the game in an impossible state where O played twice.  `xIsNext` is completely determined by `currentMove`. Even moves are X, odd moves are O. So compute it:  There is now no way for the turn indicator to disagree with the board, because there is only one source of truth. This is the chapter's rule in one line.  const xIsNext = currentMove % 2 === 0;   const currentSquares = history[currentMove] ?? emptyBoard();" }
      },
    ]
  },
  {
    id = "03-005",
    number = 5,
    title = "`useStoreWithEqualityFn` hook API reference",
    local_chapter_file = "005-usestorewithequalityfn-hook-api-reference.md",
    key_concepts = ["1. Hook: a vanilla store with a React-sized viewing window", "2. The concept", "3. Minimal example", "4. Predict the render", "5. Common mistakes", "6. Why this matters"],
    total_duration_seconds = 585,
    videos = [
      {
        id = "UzM6QzU6VjE6MDA1LXVz",
        raw_key = "S3:C5:V1",
        title = "Counter app: Creating a store with a hook",
        url = "https://www.linkedin.com/learning/react-state-management-22688323/counter-app-creating-a-store-with-a-hook",
        duration_text = "04m22s",
        duration_seconds = 262,
        description = "In-depth walkthrough of `useStoreWithEqualityFn` hook API reference, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React: State Management",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "Imagine a warehouse shared by several teams. The warehouse is the store. A team does not need every box delivered to its desk, so it asks for a view, such as `{ selectedIds, toggle }`. At the loading dock, a checker compares the old view and the new view. If the selected fields are unchanged, the desk stays quiet. `useStoreWithEqualityFn` lets that team choose the checker.", mental_model = "This hook is the boundary between React and stores that also serve workers, tests, server-side factories, or non-React code. It prevents two opposite classes of bugs: a fresh composite selector can cause unnecessary updates or a v5 update loop under `Object.is`, while in-place `Map` and `Set` mutation can hide a real update.  A vanilla store also makes scope explicit. A provider can create one store per request, tab, route, or editor key, and a component can subscribe to only the selected slice. Keep the store instance stable with `useState`; creating it during every render loses the subscription's identity.", code_example = "import { createStore } from \"zustand/vanilla\";\nimport { shallow } from \"zustand/vanilla/shallow\";\nimport { useStoreWithEqualityFn } from \"zustand/traditional\";\n\ntype CounterStore = {\n  count: number;\n  label: string;\n  increment: () => void;\n};\n\nconst counterStore = createStore<CounterStore>()((set) => ({\n  count: 0,\n  label: \"Inbox\",\n  increment: () => set((state) => ({ count: state.count + 1 })),\n}));\n\nexport function Counter(): React.JSX.Element {\n  const view = useStoreWithEqualityFn(\n    counterStore,\n    (state) => ({ count: state.count, label: state.label }),\n    shallow,\n  );\n\n  return (\n    <button type=\"button\" onClick={counterStore.getState().increment}>\n      {view.label}: {view.count}\n    </button>\n  );\n}", pitfalls = "- **Using `create` when you need a vanilla `StoreApi`.** `useStoreWithEqualityFn(useCounterStore, selector, shallow)` produces a type error such as `Argument of type 'UseBoundStore<StoreApi<CounterStore>>' is not assignable to parameter of type 'StoreApi<...>'`. Pass a store returned by `createStore`, or use the bound hook returned by `create`. - **Mutating a `Map` or `Set` in place.** `state.tags.set(\"react\", 1)` keeps the same reference, so subscribers can miss the change. Return `new Map(state.tags).set(\"react\", 1)` or `new Set(state.tags).add(\"react\")`. - **Leaving an empty collection untyped.** `new Set([])` can infer `Set<never>`, causing `Argument of type 'string' is not assignable to parameter of type 'never'`. Write `new Set<string>()` or `new Set([] as string[])`. - **Replacing a" }
      },
      {
        id = "UzM6QzU6VjI6MDA1LXVz",
        raw_key = "S3:C5:V2",
        title = "Core concepts and theming with tailwind.config.js",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/core-concepts-and-theming-with-tailwind-config-js",
        duration_text = "05m23s",
        duration_seconds = 323,
        description = "In-depth walkthrough of `useStoreWithEqualityFn` hook API reference, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "Imagine a warehouse shared by several teams. The warehouse is the store. A team does not need every box delivered to its desk, so it asks for a view, such as `{ selectedIds, toggle }`. At the loading dock, a checker compares the old view and the new view. If the selected fields are unchanged, the desk stays quiet. `useStoreWithEqualityFn` lets that team choose the checker.", mental_model = "This hook is the boundary between React and stores that also serve workers, tests, server-side factories, or non-React code. It prevents two opposite classes of bugs: a fresh composite selector can cause unnecessary updates or a v5 update loop under `Object.is`, while in-place `Map` and `Set` mutation can hide a real update.  A vanilla store also makes scope explicit. A provider can create one store per request, tab, route, or editor key, and a component can subscribe to only the selected slice. Keep the store instance stable with `useState`; creating it during every render loses the subscription's identity.", code_example = "import { createStore } from \"zustand/vanilla\";\nimport { shallow } from \"zustand/vanilla/shallow\";\nimport { useStoreWithEqualityFn } from \"zustand/traditional\";\n\ntype CounterStore = {\n  count: number;\n  label: string;\n  increment: () => void;\n};\n\nconst counterStore = createStore<CounterStore>()((set) => ({\n  count: 0,\n  label: \"Inbox\",\n  increment: () => set((state) => ({ count: state.count + 1 })),\n}));\n\nexport function Counter(): React.JSX.Element {\n  const view = useStoreWithEqualityFn(\n    counterStore,\n    (state) => ({ count: state.count, label: state.label }),\n    shallow,\n  );\n\n  return (\n    <button type=\"button\" onClick={counterStore.getState().increment}>\n      {view.label}: {view.count}\n    </button>\n  );\n}", pitfalls = "- **Using `create` when you need a vanilla `StoreApi`.** `useStoreWithEqualityFn(useCounterStore, selector, shallow)` produces a type error such as `Argument of type 'UseBoundStore<StoreApi<CounterStore>>' is not assignable to parameter of type 'StoreApi<...>'`. Pass a store returned by `createStore`, or use the bound hook returned by `create`. - **Mutating a `Map` or `Set` in place.** `state.tags.set(\"react\", 1)` keeps the same reference, so subscribers can miss the change. Return `new Map(state.tags).set(\"react\", 1)` or `new Set(state.tags).add(\"react\")`. - **Leaving an empty collection untyped.** `new Set([])` can infer `Set<never>`, causing `Argument of type 'string' is not assignable to parameter of type 'never'`. Write `new Set<string>()` or `new Set([] as string[])`. - **Replacing a" }
      },
    ]
  },
  {
    id = "03-006",
    number = 6,
    title = "Higher-kinded mutators for typed middleware",
    local_chapter_file = "006-higher-kinded-mutators-for-typed-middleware.md",
    key_concepts = ["1. Hook: middleware that rewrites the receipt", "2. The concept", "3. Minimal example", "4. Predict the render", "5. Common mistakes", "6. Why this matters"],
    total_duration_seconds = 816,
    videos = [
      {
        id = "UzM6QzY6VjE6MDA2LWhp",
        raw_key = "S3:C6:V1",
        title = "Analytic middleware example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/analytic-middleware-example",
        duration_text = "02m19s",
        duration_seconds = 139,
        description = "In-depth walkthrough of Higher-kinded mutators for typed middleware, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "Think of a Zustand store as a package moving down a conveyor belt. Each piece of middleware is a station that can stamp the package before it reaches you. Most stations leave the contents alone: a logger prints what went by, but the box that comes out the far end holds exactly what went in. Other stations open the box and add something. `persist` bolts on a `persist` API. `devtools` wires in a time-travel connection. `redux` swaps the whole update mechanism for a `dispatch`.  When a station changes what the box contains, the label on the box has to change too, or the person unpacking it reaches for a field that TypeScript swears isn't there. A **higher-kinded mutator** is how Zustand keeps the label honest. It is a type-level record that travels alongside the store, saying \"after this middleware runs, the store also has `.persist`\", or \"…also has `.foo`\". You rarely write one from scratch. You meet them the moment you type a `StateCreator` for a slice, and you must write one if you author middleware that attaches anything to the store object.", mental_model = "You will not write a custom mutator most weeks. You *will* read these tuples constantly: every time you split a store into slices, type a store that stacks `devtools` + `persist` + `immer`, or debug why `set`'s third argument stopped compiling. Knowing that `Mis` shapes the tools you receive and `Mos` advertises what you add turns those cryptic `StateCreator<S, [['zustand/devtools', never]], []>` signatures into something you can write from memory.  When you do author middleware, higher-kinded mutators are the difference between a middleware that lies about its store and one whose consumers get autocomplete for the fields it attaches. The bug class they prevent is the worst kind: code that type-checks but reaches for `store.persist` (or a devtools label, or an `immer` draft) that the types quietly stripped away, only to fail at runtime in production.", code_example = "import type { StateCreator, StoreMutatorIdentifier } from \"zustand\";\n\ntype Logger = <\n  T,\n  Mps extends [StoreMutatorIdentifier, unknown][] = [],\n  Mcs extends [StoreMutatorIdentifier, unknown][] = [],\n>(\n  creator: StateCreator<T, Mps, Mcs>,\n  name?: string,\n) => StateCreator<T, Mps, Mcs>;\n\n// The implementation is untyped internally, then cast to the public shape.\ntype LoggerImpl = <T>(\n  creator: StateCreator<T, [], []>,\n  name?: string,\n) => StateCreator<T, [], []>;\n\nconst loggerImpl: LoggerImpl = (creator, name) => (set, get, store) => {\n  const loggedSet: typeof set = (...args) => {\n    set(...(args as Parameters<typeof set>));\n    console.log(...(name ? [`${name}:`] : []), get());\n  };\n  return creator(loggedSet, get, store);\n};\n\nexport const logger = loggerImpl as unknown as Logge", pitfalls = "- **Skipping the curried `create<T>()(...)` call.** Writing `create<T>((set) => ...)` (one call, explicit `T`) breaks middleware mutator inference; the extra `()` is a TypeScript workaround, not a style choice. Use `create<T>()((set) => ...)`. The same applies to `createStore<T>()(...)`.  - **Forgetting to register a custom mutation in `StoreMutators`.** Without the `declare module \"zustand/vanilla\"` augmentation, `Mutate<StoreApi<T>, [[\"foo\", A]]>` resolves to `never`, and `store.foo = bar` reports `Property 'foo' does not exist on type 'never'`. Register the identifier first.  - **Augmenting the wrong module.** The `StoreMutators` interface is declared in `zustand/vanilla`. Augment that path (`declare module \"zustand/vanilla\"`), not a re-export, or the merge silently does nothing.  - **D" }
      },
      {
        id = "UzM6QzY6VjI6MDA2LWhp",
        raw_key = "S3:C6:V2",
        title = "useForm example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/useform-example",
        duration_text = "11m17s",
        duration_seconds = 677,
        description = "In-depth walkthrough of Higher-kinded mutators for typed middleware, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "Think of a Zustand store as a package moving down a conveyor belt. Each piece of middleware is a station that can stamp the package before it reaches you. Most stations leave the contents alone: a logger prints what went by, but the box that comes out the far end holds exactly what went in. Other stations open the box and add something. `persist` bolts on a `persist` API. `devtools` wires in a time-travel connection. `redux` swaps the whole update mechanism for a `dispatch`.  When a station changes what the box contains, the label on the box has to change too, or the person unpacking it reaches for a field that TypeScript swears isn't there. A **higher-kinded mutator** is how Zustand keeps the label honest. It is a type-level record that travels alongside the store, saying \"after this middleware runs, the store also has `.persist`\", or \"…also has `.foo`\". You rarely write one from scratch. You meet them the moment you type a `StateCreator` for a slice, and you must write one if you author middleware that attaches anything to the store object.", mental_model = "You will not write a custom mutator most weeks. You *will* read these tuples constantly: every time you split a store into slices, type a store that stacks `devtools` + `persist` + `immer`, or debug why `set`'s third argument stopped compiling. Knowing that `Mis` shapes the tools you receive and `Mos` advertises what you add turns those cryptic `StateCreator<S, [['zustand/devtools', never]], []>` signatures into something you can write from memory.  When you do author middleware, higher-kinded mutators are the difference between a middleware that lies about its store and one whose consumers get autocomplete for the fields it attaches. The bug class they prevent is the worst kind: code that type-checks but reaches for `store.persist` (or a devtools label, or an `immer` draft) that the types quietly stripped away, only to fail at runtime in production.", code_example = "import type { StateCreator, StoreMutatorIdentifier } from \"zustand\";\n\ntype Logger = <\n  T,\n  Mps extends [StoreMutatorIdentifier, unknown][] = [],\n  Mcs extends [StoreMutatorIdentifier, unknown][] = [],\n>(\n  creator: StateCreator<T, Mps, Mcs>,\n  name?: string,\n) => StateCreator<T, Mps, Mcs>;\n\n// The implementation is untyped internally, then cast to the public shape.\ntype LoggerImpl = <T>(\n  creator: StateCreator<T, [], []>,\n  name?: string,\n) => StateCreator<T, [], []>;\n\nconst loggerImpl: LoggerImpl = (creator, name) => (set, get, store) => {\n  const loggedSet: typeof set = (...args) => {\n    set(...(args as Parameters<typeof set>));\n    console.log(...(name ? [`${name}:`] : []), get());\n  };\n  return creator(loggedSet, get, store);\n};\n\nexport const logger = loggerImpl as unknown as Logge", pitfalls = "- **Skipping the curried `create<T>()(...)` call.** Writing `create<T>((set) => ...)` (one call, explicit `T`) breaks middleware mutator inference; the extra `()` is a TypeScript workaround, not a style choice. Use `create<T>()((set) => ...)`. The same applies to `createStore<T>()(...)`.  - **Forgetting to register a custom mutation in `StoreMutators`.** Without the `declare module \"zustand/vanilla\"` augmentation, `Mutate<StoreApi<T>, [[\"foo\", A]]>` resolves to `never`, and `store.foo = bar` reports `Property 'foo' does not exist on type 'never'`. Register the identifier first.  - **Augmenting the wrong module.** The `StoreMutators` interface is declared in `zustand/vanilla`. Augment that path (`declare module \"zustand/vanilla\"`), not a re-export, or the merge silently does nothing.  - **D" }
      },
    ]
  },
  {
    id = "03-007",
    number = 7,
    title = "useReducer with Discriminated Unions",
    local_chapter_file = "007-usereducer-with-discriminated-unions.md",
    key_concepts = ["1. Hook: a state machine tucked inside a hook", "2. The concept", "3. Minimal example", "4. Predict the render", "5. Common mistakes", "6. Why this matters"],
    total_duration_seconds = 1249,
    videos = [
      {
        id = "UzM6Qzc6VjE6MDA3LXVz",
        raw_key = "S3:C7:V1",
        title = "useReducer vs useState: Basic example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/usereducer-vs-usestate-basic-example",
        duration_text = "05m59s",
        duration_seconds = 359,
        description = "In-depth walkthrough of useReducer with Discriminated Unions, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "A traffic light is a state machine. Three bulbs, six transitions, no side effects. The state moves forward on a `tick` action, jumps to red on an `emergency` action, and resets on a `reset` action. The same rules apply every time the inputs come in, in the same order, and the same output comes out. That is a reducer.  `useReducer` is React's built-in state-machine hook. It hands you a function `(state, action) => newState` and gives you back a `dispatch` to send actions into it. Every state change in a reducer-based component flows through one function, which means you can read the whole app's transition logic in a single place.", mental_model = "The reducer pattern shows up wherever state has more than one kind of update and the updates have non-trivial payloads. Forms with nested fields, multi-step wizards, paginated lists with filters and sort orders, optimistic updates from server responses, undo/redo stacks, and any feature flagging system that combines independent toggles all fit the pattern.  You will meet the same shape in three different sizes:", code_example = "import { useReducer } from \"react\";\n\ntype State = { count: number };\n\ntype CounterAction =\n  | { type: \"increment\" }\n  | { type: \"decrement\" }\n  | { type: \"set\"; value: number }\n  | { type: \"reset\" };\n\nconst initialState: State = { count: 0 };\n\nfunction reducer(state: State, action: CounterAction): State {\n  switch (action.type) {\n    case \"increment\":\n      return { count: state.count + 1 };\n    case \"decrement\":\n      return { count: state.count - 1 };\n    case \"set\":\n      return { count: action.value };\n    case \"reset\":\n      return { count: 0 };\n    default: {\n      const exhaustive: never = action;\n      return exhaustive;\n    }\n  }\n}\n\nexport function Counter() {\n  const [state, dispatch] = useReducer(reducer, initialState);\n\n  return (\n    <div>\n      <p>Count: {state.count}</p>\n  ", pitfalls = "- **Mutating `state` inside the reducer.** `state.count += 1` returns the same object reference. React may bail out of the re-render because `Object.is(prev, next)` is true, and any other code that held a reference to the old state now sees the wrong value. The error React surfaces in development is `Cannot assign to read only property 'count' of object` if you mutated under `strict mode`, or simply a missing UI update otherwise.  // Right   case \"increment\":     return { count: state.count + 1 };   ```  - **Forgetting the `never` exhaustive check.** Without `const exhaustive: never = action;` in the `default` branch, adding a fifth action variant to the union compiles fine and silently falls through to the `default`, which then returns `undefined`. TypeScript with `noFallthroughCasesInSwi" }
      },
      {
        id = "UzM6Qzc6VjI6MDA3LXVz",
        raw_key = "S3:C7:V2",
        title = "useReducer status manager example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/usereducer-status-manager-example",
        duration_text = "14m50s",
        duration_seconds = 890,
        description = "In-depth walkthrough of useReducer with Discriminated Unions, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zustand Official Documentation", url = "https://zustand.docs.pmnd.rs/getting-started/introduction", description = "Lightweight, un-opinionated state management with React hooks." },
          { label = "Zustand: Slices Pattern & TypeScript", url = "https://zustand.docs.pmnd.rs/guides/slices-pattern", description = "Modular store slice architecture and typed middleware." },
        ],
        notes = { definition = "A traffic light is a state machine. Three bulbs, six transitions, no side effects. The state moves forward on a `tick` action, jumps to red on an `emergency` action, and resets on a `reset` action. The same rules apply every time the inputs come in, in the same order, and the same output comes out. That is a reducer.  `useReducer` is React's built-in state-machine hook. It hands you a function `(state, action) => newState` and gives you back a `dispatch` to send actions into it. Every state change in a reducer-based component flows through one function, which means you can read the whole app's transition logic in a single place.", mental_model = "The reducer pattern shows up wherever state has more than one kind of update and the updates have non-trivial payloads. Forms with nested fields, multi-step wizards, paginated lists with filters and sort orders, optimistic updates from server responses, undo/redo stacks, and any feature flagging system that combines independent toggles all fit the pattern.  You will meet the same shape in three different sizes:", code_example = "import { useReducer } from \"react\";\n\ntype State = { count: number };\n\ntype CounterAction =\n  | { type: \"increment\" }\n  | { type: \"decrement\" }\n  | { type: \"set\"; value: number }\n  | { type: \"reset\" };\n\nconst initialState: State = { count: 0 };\n\nfunction reducer(state: State, action: CounterAction): State {\n  switch (action.type) {\n    case \"increment\":\n      return { count: state.count + 1 };\n    case \"decrement\":\n      return { count: state.count - 1 };\n    case \"set\":\n      return { count: action.value };\n    case \"reset\":\n      return { count: 0 };\n    default: {\n      const exhaustive: never = action;\n      return exhaustive;\n    }\n  }\n}\n\nexport function Counter() {\n  const [state, dispatch] = useReducer(reducer, initialState);\n\n  return (\n    <div>\n      <p>Count: {state.count}</p>\n  ", pitfalls = "- **Mutating `state` inside the reducer.** `state.count += 1` returns the same object reference. React may bail out of the re-render because `Object.is(prev, next)` is true, and any other code that held a reference to the old state now sees the wrong value. The error React surfaces in development is `Cannot assign to read only property 'count' of object` if you mutated under `strict mode`, or simply a missing UI update otherwise.  // Right   case \"increment\":     return { count: state.count + 1 };   ```  - **Forgetting the `never` exhaustive check.** Without `const exhaustive: never = action;` in the `default` branch, adding a fifth action variant to the union compiles fine and silently falls through to the `default`, which then returns `undefined`. TypeScript with `noFallthroughCasesInSwi" }
      },
    ]
  },
]
+++

This section covers **Global State & Zustand Architecture** (Part 2: Reactive State, Hooks & Forms), featuring **14 curated LinkedIn Learning video lessons**, comprehensive pop-up chapter study notes with **Ask AI**, and official React documentation references across all 7 core chapters.
