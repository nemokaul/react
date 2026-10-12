+++
title = "Components, Props & JSX Architecture"
weight = 2
[extra]
section_number = 1
section_id = "section-01"
part = 1
part_title = "Part 1: React & Tooling Foundations"
total_videos = 18
total_duration_seconds = 3194
recommended_courses = [
  { title = "React Essential Training", url = "https://www.linkedin.com/learning/react-essential-training", author = "Eve Porcello", duration = "3h 15m", scope = "Component hierarchies, JSX compilation, props destructuring, element tree reconciliation, and event handling." },
  { title = "React: Design Patterns", url = "https://www.linkedin.com/learning/react-design-patterns-25656257", author = "LinkedIn Learning", duration = "4h 06m", scope = "Layout components, split-screen patterns, component composition, and Headless UI architecture." },
]
chapters = [
  {
    id = "01-001",
    number = 1,
    title = "Components and Props",
    local_chapter_file = "001-components-and-props.md",
    key_concepts = ["A page built from function calls, not from bricklaying", "Function components", "Props: the read-only input to a function component", "Component nesting and the component tree", "Fragments: grouping JSX without an extra DOM node", "Predict the render"],
    total_duration_seconds = 712,
    videos = [
      {
        id = "UzE6QzE6VjE6MDAxLWNv",
        raw_key = "S1:C1:V1",
        title = "Introduction to functional components",
        url = "https://www.linkedin.com/learning/react-foundations-by-pearson/introduction-to-functional-components",
        duration_text = "04m53s",
        duration_seconds = 293,
        description = "In-depth walkthrough of Components and Props, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React Foundations by Pearson",
        references = [
          { label = "React Docs: Passing Props to a Component", url = "https://react.dev/learn/passing-props-to-a-component", description = "Props as arguments, default values, children prop, and read-only invariants." },
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components, export conventions, and nesting." },
        ],
        notes = { definition = "You've just finished setting up the toolchain (environment setup, Vite, `tsconfig.json`). This chapter is where the tooling stops being the subject and React starts being the subject: what a component actually is, what props are, and how a page ends up as a tree of both.", mental_model = "Every component library you'll use later in this course, Headless UI, MUI, whatever you reach for, exposes exactly the props table from earlier: `className`, `style`, `children`, `aria-*`, event handlers, spread onto whatever DOM element the library renders underneath. Recognizing \"this is just `ComponentPropsWithoutRef` plus a few extras\" in a library's types saves you from reading unfamiliar documentation from scratch every time.  The declarative-versus-imperative distinction from this chapter also explains a category of React bugs you'll meet later: an effect that reaches into the DOM directly, a ref mutated during render, a third-party widget fighting React for control of the same nodes. Once you can name \"this code is being imperative where React expects declarative,\" you can spot that pattern the moment it shows up, even in files you've never seen before.", code_example = "<body>\n  <div id=\"root\"></div>\n  <script type=\"module\" src=\"/src/main.tsx\"></script>\n</body>", pitfalls = "**Lowercase component names might compile clean and silently render the wrong thing.**  function App() {   return <header title=\"Ava\" />; } ```  This compiles with zero errors. `header` collides with a real HTML tag name, so JSX resolves `<header>` to the built-in DOM element, not your function. `title` gets passed straight through as an HTML attribute, and your `<h1>` never renders at all. Capitalize both the function and the tag (`Header`, `<Header title=\"Ava\" />`) and the call resolves to your component.  If the name doesn't happen to collide with a real HTML tag, TypeScript does catch it:" }
      },
      {
        id = "UzE6QzE6VjI6MDAxLWNv",
        raw_key = "S1:C1:V2",
        title = "Defining simple functional components",
        url = "https://www.linkedin.com/learning/react-foundations-by-pearson/defining-simple-functional-components",
        duration_text = "06m59s",
        duration_seconds = 419,
        description = "In-depth walkthrough of Components and Props, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React Foundations by Pearson",
        references = [
          { label = "React Docs: Passing Props to a Component", url = "https://react.dev/learn/passing-props-to-a-component", description = "Props as arguments, default values, children prop, and read-only invariants." },
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components, export conventions, and nesting." },
        ],
        notes = { definition = "You've just finished setting up the toolchain (environment setup, Vite, `tsconfig.json`). This chapter is where the tooling stops being the subject and React starts being the subject: what a component actually is, what props are, and how a page ends up as a tree of both.", mental_model = "Every component library you'll use later in this course, Headless UI, MUI, whatever you reach for, exposes exactly the props table from earlier: `className`, `style`, `children`, `aria-*`, event handlers, spread onto whatever DOM element the library renders underneath. Recognizing \"this is just `ComponentPropsWithoutRef` plus a few extras\" in a library's types saves you from reading unfamiliar documentation from scratch every time.  The declarative-versus-imperative distinction from this chapter also explains a category of React bugs you'll meet later: an effect that reaches into the DOM directly, a ref mutated during render, a third-party widget fighting React for control of the same nodes. Once you can name \"this code is being imperative where React expects declarative,\" you can spot that pattern the moment it shows up, even in files you've never seen before.", code_example = "<body>\n  <div id=\"root\"></div>\n  <script type=\"module\" src=\"/src/main.tsx\"></script>\n</body>", pitfalls = "**Lowercase component names might compile clean and silently render the wrong thing.**  function App() {   return <header title=\"Ava\" />; } ```  This compiles with zero errors. `header` collides with a real HTML tag name, so JSX resolves `<header>` to the built-in DOM element, not your function. `title` gets passed straight through as an HTML attribute, and your `<h1>` never renders at all. Capitalize both the function and the tag (`Header`, `<Header title=\"Ava\" />`) and the call resolves to your component.  If the name doesn't happen to collide with a real HTML tag, TypeScript does catch it:" }
      },
    ]
  },
  {
    id = "01-002",
    number = 2,
    title = "JSX and Rendering",
    local_chapter_file = "002-jsx-and-rendering.md",
    key_concepts = ["1. Hook: a UI recipe", "2. The concept", "3. Minimal example", "4. Predict the render", "5. Common mistakes", "6. Why this matters"],
    total_duration_seconds = 388,
    videos = [
      {
        id = "UzE6QzI6VjE6MDAyLWpz",
        raw_key = "S1:C2:V1",
        title = "rendering data in react",
        url = "https://www.linkedin.com/learning/rendering-data-in-react/rendering-data-in-react",
        duration_text = "03m00s",
        duration_seconds = 180,
        description = "In-depth walkthrough of JSX and Rendering, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Rendering Data in React",
        references = [
          { label = "React Docs: Writing Markup with JSX", url = "https://react.dev/learn/writing-markup-with-jsx", description = "JSX syntax rules, single root element, and camelCase attributes." },
          { label = "React Docs: JavaScript in JSX with Curly Braces", url = "https://react.dev/learn/javascript-in-jsx-with-curly-braces", description = "Embedding expressions, string interpolations, and style objects." },
        ],
        notes = { definition = "Think of a component as a recipe card. JSX is the readable recipe notation. React reads the recipe and updates the counter when inputs change. The recipe is a description, not a list of manual DOM edits.", mental_model = "This model explains malformed markup, incorrect attributes, and stale-looking output. Library code uses the same boundaries for buttons, links, fields, and layout components. Understanding that React reruns functions and reconciles returned elements helps you avoid manual DOM edits and local variables used as state. `react.dev` is the current learning and API-reference home for React.", code_example = "type GreetingProps = { name: string };\n\nfunction Greeting({ name }: GreetingProps) {\n  return <p className=\"greeting\">Hello, {name}!</p>;\n}\n\nexport function App() {\n  return <Greeting name=\"Ada\" />;\n}", pitfalls = "- Returning two sibling roots produces `JSX expressions must have one parent element`. Wrap them in an element or `<>...</>`. - HTML names copied unchanged produce errors such as `Property 'for' does not exist on type ...`. Use `htmlFor` and `className`. - An unclosed tag produces `JSX element 'span' has no corresponding closing tag`. Close every tag. - Calling `Greeting({ name: \"Ada\" })` bypasses the React component boundary. Use `<Greeting name=\"Ada\" />`, especially when the component later uses Hooks." }
      },
      {
        id = "UzE6QzI6VjI6MDAyLWpz",
        raw_key = "S1:C2:V2",
        title = "Basics of rendering static data",
        url = "https://www.linkedin.com/learning/rendering-data-in-react/basics-of-rendering-static-data",
        duration_text = "03m28s",
        duration_seconds = 208,
        description = "In-depth walkthrough of JSX and Rendering, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Rendering Data in React",
        references = [
          { label = "React Docs: Writing Markup with JSX", url = "https://react.dev/learn/writing-markup-with-jsx", description = "JSX syntax rules, single root element, and camelCase attributes." },
          { label = "React Docs: JavaScript in JSX with Curly Braces", url = "https://react.dev/learn/javascript-in-jsx-with-curly-braces", description = "Embedding expressions, string interpolations, and style objects." },
        ],
        notes = { definition = "Think of a component as a recipe card. JSX is the readable recipe notation. React reads the recipe and updates the counter when inputs change. The recipe is a description, not a list of manual DOM edits.", mental_model = "This model explains malformed markup, incorrect attributes, and stale-looking output. Library code uses the same boundaries for buttons, links, fields, and layout components. Understanding that React reruns functions and reconciles returned elements helps you avoid manual DOM edits and local variables used as state. `react.dev` is the current learning and API-reference home for React.", code_example = "type GreetingProps = { name: string };\n\nfunction Greeting({ name }: GreetingProps) {\n  return <p className=\"greeting\">Hello, {name}!</p>;\n}\n\nexport function App() {\n  return <Greeting name=\"Ada\" />;\n}", pitfalls = "- Returning two sibling roots produces `JSX expressions must have one parent element`. Wrap them in an element or `<>...</>`. - HTML names copied unchanged produce errors such as `Property 'for' does not exist on type ...`. Use `htmlFor` and `className`. - An unclosed tag produces `JSX element 'span' has no corresponding closing tag`. Close every tag. - Calling `Greeting({ name: \"Ada\" })` bypasses the React component boundary. Use `<Greeting name=\"Ada\" />`, especially when the component later uses Hooks." }
      },
    ]
  },
  {
    id = "01-003",
    number = 3,
    title = "Pagination Query Parameters",
    local_chapter_file = "003-pagination-query-parameters.md",
    key_concepts = ["A menu, not the whole cookbook", "The concept: page, limit, and the metadata a client needs back", "Minimal example: rendering one page", "Predict the render", "Common mistakes", "Why this matters"],
    total_duration_seconds = 388,
    videos = [
      {
        id = "UzE6QzM6VjE6MDAzLXBh",
        raw_key = "S1:C3:V1",
        title = "rendering data in react",
        url = "https://www.linkedin.com/learning/rendering-data-in-react/rendering-data-in-react",
        duration_text = "03m00s",
        duration_seconds = 180,
        description = "In-depth walkthrough of Pagination Query Parameters, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Rendering Data in React",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "You've seen how a component reads props (Components and Props) and how JSX turns those props into a rendered tree (JSX and Rendering). This chapter puts both to work on a shape you'll meet in almost every list-rendering screen you build: a server that hands back one page of results at a time, plus enough metadata for the UI to know where it is.", mental_model = "The `page`/`limit`/`total`/`totalPages`/`hasNext`/`hasPrev` shape shows up again almost unchanged once this course reaches data fetching: a `useQuery` call keyed by `[\"books\", page]` in the TanStack Query chapters returns exactly this response shape, and React Router's `useSearchParams`, in the routing section, is how a real app reads and writes `page` in the URL bar instead of only in component state, so a reload or a shared link lands on the same page. Cursor-based pagination (a token instead of a page number, common for infinite-scroll feeds) trades `page`/`totalPages` for a `nextCursor` field, but the same clamp-and-report shape underneath: never trust a client-supplied size limit, always tell the client whether more exists.  The index-as-key mistake above is one of the most common sources of \"my list item's checkbox is checked on the wrong row\" bugs in real apps, and it gets harder to spot the more layers sit between the array and the `.map()` that renders it, exactly why it's worth catching here, in a plain list, before a filter or a sort makes the array's order less predictable.", code_example = "import type { ReactNode } from \"react\";\n\ntype PaginatedListProps<T> = {\n  items: T[];\n  meta: PaginationMeta;\n  getKey: (item: T) => string | number;\n  renderItem: (item: T) => ReactNode;\n  onPageChange: (page: number) => void;\n};\n\nfunction PaginatedList<T>({ items, meta, getKey, renderItem, onPageChange }: PaginatedListProps<T>) {\n  return (\n    <>\n      <ul>\n        {items.map((item) => (\n          <li key={getKey(item)}>{renderItem(item)}</li>\n        ))}\n      </ul>\n      <p>\n        Page {meta.page} of {meta.totalPages} ({meta.total} results)\n      </p>\n      <button type=\"button\" disabled={!meta.hasPrev} onClick={() => onPageChange(meta.page - 1)}>\n        Previous\n      </button>\n      <button type=\"button\" disabled={!meta.hasNext} onClick={() => onPageChange(meta.page + 1)}>\n      ", pitfalls = "**`Math.floor` instead of `Math.ceil` when computing `totalPages`.**  With `total = 21` and `limit = 10`, `Math.floor(21 / 10)` is `2`, not `3`. The 21st item exists but sits on a page number the metadata claims doesn't exist: `hasNext` reads `false` on page 2, so the \"Next\" button disables itself one page too early, and the last item becomes unreachable through the UI even though the server has it. `Math.ceil` rounds a partial page up instead of dropping it.  **Skipping the clamp on `limit`.**  This compiles. `limit` is a `number`, and any `number` satisfies that type, so TypeScript has nothing to object to. The bug shows up at runtime instead: a caller (or a bug elsewhere that forwards a raw query parameter) requesting `limit=50000` gets back exactly that many rows in one response. Clamp" }
      },
      {
        id = "UzE6QzM6VjI6MDAzLXBh",
        raw_key = "S1:C3:V2",
        title = "Basics of rendering static data",
        url = "https://www.linkedin.com/learning/rendering-data-in-react/basics-of-rendering-static-data",
        duration_text = "03m28s",
        duration_seconds = 208,
        description = "In-depth walkthrough of Pagination Query Parameters, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Rendering Data in React",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "You've seen how a component reads props (Components and Props) and how JSX turns those props into a rendered tree (JSX and Rendering). This chapter puts both to work on a shape you'll meet in almost every list-rendering screen you build: a server that hands back one page of results at a time, plus enough metadata for the UI to know where it is.", mental_model = "The `page`/`limit`/`total`/`totalPages`/`hasNext`/`hasPrev` shape shows up again almost unchanged once this course reaches data fetching: a `useQuery` call keyed by `[\"books\", page]` in the TanStack Query chapters returns exactly this response shape, and React Router's `useSearchParams`, in the routing section, is how a real app reads and writes `page` in the URL bar instead of only in component state, so a reload or a shared link lands on the same page. Cursor-based pagination (a token instead of a page number, common for infinite-scroll feeds) trades `page`/`totalPages` for a `nextCursor` field, but the same clamp-and-report shape underneath: never trust a client-supplied size limit, always tell the client whether more exists.  The index-as-key mistake above is one of the most common sources of \"my list item's checkbox is checked on the wrong row\" bugs in real apps, and it gets harder to spot the more layers sit between the array and the `.map()` that renders it, exactly why it's worth catching here, in a plain list, before a filter or a sort makes the array's order less predictable.", code_example = "import type { ReactNode } from \"react\";\n\ntype PaginatedListProps<T> = {\n  items: T[];\n  meta: PaginationMeta;\n  getKey: (item: T) => string | number;\n  renderItem: (item: T) => ReactNode;\n  onPageChange: (page: number) => void;\n};\n\nfunction PaginatedList<T>({ items, meta, getKey, renderItem, onPageChange }: PaginatedListProps<T>) {\n  return (\n    <>\n      <ul>\n        {items.map((item) => (\n          <li key={getKey(item)}>{renderItem(item)}</li>\n        ))}\n      </ul>\n      <p>\n        Page {meta.page} of {meta.totalPages} ({meta.total} results)\n      </p>\n      <button type=\"button\" disabled={!meta.hasPrev} onClick={() => onPageChange(meta.page - 1)}>\n        Previous\n      </button>\n      <button type=\"button\" disabled={!meta.hasNext} onClick={() => onPageChange(meta.page + 1)}>\n      ", pitfalls = "**`Math.floor` instead of `Math.ceil` when computing `totalPages`.**  With `total = 21` and `limit = 10`, `Math.floor(21 / 10)` is `2`, not `3`. The 21st item exists but sits on a page number the metadata claims doesn't exist: `hasNext` reads `false` on page 2, so the \"Next\" button disables itself one page too early, and the last item becomes unreachable through the UI even though the server has it. `Math.ceil` rounds a partial page up instead of dropping it.  **Skipping the clamp on `limit`.**  This compiles. `limit` is a `number`, and any `number` satisfies that type, so TypeScript has nothing to object to. The bug shows up at runtime instead: a caller (or a bug elsewhere that forwards a raw query parameter) requesting `limit=50000` gets back exactly that many rows in one response. Clamp" }
      },
    ]
  },
  {
    id = "01-004",
    number = 4,
    title = "React Major Version Policy",
    local_chapter_file = "004-react-major-version-policy.md",
    key_concepts = ["A kitchen that gets renovated twice a decade, not every Tuesday", "The concept: a major version bump is the only place breaking changes are allowed to live", "Minimal example: reading a version range in `package.json`", "Predict the upgrade", "Common mistakes", "Reference: installing React, and the shape of its own documentation"],
    total_duration_seconds = 217,
    videos = [
      {
        id = "UzE6QzQ6VjE6MDA0LXJl",
        raw_key = "S1:C4:V1",
        title = "Re-rendering sorted data when the order changes",
        url = "https://www.linkedin.com/learning/rendering-data-in-react/re-rendering-sorted-data-when-the-order-changes",
        duration_text = "01m49s",
        duration_seconds = 109,
        description = "In-depth walkthrough of React Major Version Policy, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Rendering Data in React",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "You've built components with typed props (Components and Props), you've seen how JSX compiles down to plain function calls (JSX and Rendering), and you've rendered a page of server data through props (Pagination Query Parameters). Before this course goes any further into hooks and state, it's worth pausing on something that isn't a hook or a rendering rule at all: how React itself changes over time, which starting points still make sense in 2026, and a few naming and typing conventions that recur in almost every component you'll write from here on.", mental_model = "The version policy in this chapter is why the rest of this course can show you real, current APIs (React 19's `useActionState`, form Actions, the `use` API) without worrying they'll be gone by the time you finish: a major version bump big enough to remove them would show up as React 20, announced and migration-guided, not a silent patch release. It's also why libraries like Zustand, TanStack Query, and React Hook Form, all used later in this course, can declare a `peerDependencies` range on React and trust it: they're trusting the same guarantee you just read about, that nothing inside a major version range breaks their assumptions about React's API surface.  The state-types taxonomy is the lens the rest of this course's state-management chapters use without restating it. `useState`, a few chapters from here, is how you hold local state. Context and Zustand, later still, are how you hold shared state without prop-drilling it through every layer. React Hook Form and TanStack Query, further out, exist specifically to manage form state and server state well, because both come with problems (validation timing, caching, refetching) that a plain `useState` handles poorly at any real scale. Knowing the category before you reach for a tool is what makes \"why does this project use four different state tools\" read as \"each one owns a different kind of state\" instead of unexplained complexity.", code_example = "function Card({ children }: { children: React.ReactNode }) {\n  return <section className=\"card\">{children}</section>;\n}", pitfalls = "**Assuming a project scaffolded with Create React App is still a reasonable way to start a new one.** Plenty of tutorials, Stack Overflow answers, and even older company templates still say `npx create-react-app my-app`. As of February 14, 2025, the React team no longer recommends it for new projects at all; the React docs point new starts at a framework (Next.js, React Router in framework mode, Expo for native) or a build tool like Vite, Parcel, or Rsbuild instead. CRA still runs if you already have a project built on it. It just isn't where a new one should begin, which is exactly why this course's own setup chapter used Vite from the first command.  **Treating \"no major bump\" as \"no risk.\"** A minor release can still deprecate an API with a console warning (the `ReactDOM.render` example" }
      },
      {
        id = "UzE6QzQ6VjI6MDA0LXJl",
        raw_key = "S1:C4:V2",
        title = "Solution: Only five items at a time",
        url = "https://www.linkedin.com/learning/rendering-data-in-react/solution-only-5-items-at-a-time",
        duration_text = "01m48s",
        duration_seconds = 108,
        description = "In-depth walkthrough of React Major Version Policy, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Rendering Data in React",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "You've built components with typed props (Components and Props), you've seen how JSX compiles down to plain function calls (JSX and Rendering), and you've rendered a page of server data through props (Pagination Query Parameters). Before this course goes any further into hooks and state, it's worth pausing on something that isn't a hook or a rendering rule at all: how React itself changes over time, which starting points still make sense in 2026, and a few naming and typing conventions that recur in almost every component you'll write from here on.", mental_model = "The version policy in this chapter is why the rest of this course can show you real, current APIs (React 19's `useActionState`, form Actions, the `use` API) without worrying they'll be gone by the time you finish: a major version bump big enough to remove them would show up as React 20, announced and migration-guided, not a silent patch release. It's also why libraries like Zustand, TanStack Query, and React Hook Form, all used later in this course, can declare a `peerDependencies` range on React and trust it: they're trusting the same guarantee you just read about, that nothing inside a major version range breaks their assumptions about React's API surface.  The state-types taxonomy is the lens the rest of this course's state-management chapters use without restating it. `useState`, a few chapters from here, is how you hold local state. Context and Zustand, later still, are how you hold shared state without prop-drilling it through every layer. React Hook Form and TanStack Query, further out, exist specifically to manage form state and server state well, because both come with problems (validation timing, caching, refetching) that a plain `useState` handles poorly at any real scale. Knowing the category before you reach for a tool is what makes \"why does this project use four different state tools\" read as \"each one owns a different kind of state\" instead of unexplained complexity.", code_example = "function Card({ children }: { children: React.ReactNode }) {\n  return <section className=\"card\">{children}</section>;\n}", pitfalls = "**Assuming a project scaffolded with Create React App is still a reasonable way to start a new one.** Plenty of tutorials, Stack Overflow answers, and even older company templates still say `npx create-react-app my-app`. As of February 14, 2025, the React team no longer recommends it for new projects at all; the React docs point new starts at a framework (Next.js, React Router in framework mode, Expo for native) or a build tool like Vite, Parcel, or Rsbuild instead. CRA still runs if you already have a project built on it. It just isn't where a new one should begin, which is exactly why this course's own setup chapter used Vite from the first command.  **Treating \"no major bump\" as \"no risk.\"** A minor release can still deprecate an API with a console warning (the `ReactDOM.render` example" }
      },
    ]
  },
  {
    id = "01-005",
    number = 5,
    title = "React Event Handlers",
    local_chapter_file = "005-react-event-handlers.md",
    key_concepts = ["A doorbell, not a script", "The concept: functions wired through props, invoked later", "Why function components sidestep the `this` problem", "Typed synthetic events", "Predict the render", "The `children`-as-a-function pattern for imperative triggers"],
    total_duration_seconds = 435,
    videos = [
      {
        id = "UzE6QzU6VjE6MDA1LXJl",
        raw_key = "S1:C5:V1",
        title = "Using the filter function to render filtered data",
        url = "https://www.linkedin.com/learning/rendering-data-in-react/using-the-filter-function-to-render-filtered-data",
        duration_text = "02m22s",
        duration_seconds = 142,
        description = "In-depth walkthrough of React Event Handlers, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Rendering Data in React",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "You've written components as functions of their props (Components and Props), watched JSX compile down to function calls (JSX and Rendering), and seen why React ships breaking changes only in major versions (React Major Version Policy). Every example so far that involved a click or a change event left the interesting part as a `console.log`, with a note that \"the count doesn't actually change yet, that's state, coming later.\" This chapter is the last stop before state: how a component finds out that something happened at all.", mental_model = "Every form library and UI kit you'll reach for later in this course routes through exactly this mechanism. React Hook Form's `register` function, covered in the forms section, returns an object that includes an `onChange` and `onBlur` you spread onto a plain `<input>`. Material UI and Headless UI components accept `onClick`, `onChange`, and friends and forward them to the native element underneath, the same passthrough idea `001-components-and-props.md` introduced for `className` and `style`. Recognizing \"this is just a handler prop, wired the same way as `SaveButton`'s `onSave`\" is what makes an unfamiliar library's event props unsurprising the first time you open its docs.  The client-secret boundary is a related discipline worth stating plainly here, because a click handler is exactly where it gets violated by accident: a handler that calls `fetch` directly from a component, with an API key or another privileged credential embedded in the request, ships that value to every visitor's browser the moment the bundle loads, readable in plain text from the network tab regardless of how the request itself is written. A handler prop like `onDelete` in this chapter's `DeleteAction` example is the correct shape for that boundary: the component that renders the button never holds a credential at all; it calls a callback that some other, server-adjacent layer of the app owns.", code_example = "function Greeting() {\n  function handleClick() {\n    console.log(\"button clicked\");\n  }\n\n  return <button onClick={handleClick}>Say hi</button>;\n}", pitfalls = "**Leaving off the event's type annotation.**  This project's strict TypeScript settings won't infer a type for a standalone function's parameter from how it's later used as a prop. Annotate it directly: `function handleChange(event: React.ChangeEvent<HTMLInputElement>)`. An inline arrow written straight inside the JSX attribute (`onChange={(event) => ...}`) doesn't need this, because the attribute's expected type supplies `event`'s type through context, but a named function declared on its own needs the annotation spelled out.  **Annotating the event for the wrong element.**  function Field() {   return <input onChange={handleChange} />; } ```" }
      },
      {
        id = "UzE6QzU6VjI6MDA1LXJl",
        raw_key = "S1:C5:V2",
        title = "Introduction to functional components",
        url = "https://www.linkedin.com/learning/react-foundations-by-pearson/introduction-to-functional-components",
        duration_text = "04m53s",
        duration_seconds = 293,
        description = "In-depth walkthrough of React Event Handlers, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React Foundations by Pearson",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "You've written components as functions of their props (Components and Props), watched JSX compile down to function calls (JSX and Rendering), and seen why React ships breaking changes only in major versions (React Major Version Policy). Every example so far that involved a click or a change event left the interesting part as a `console.log`, with a note that \"the count doesn't actually change yet, that's state, coming later.\" This chapter is the last stop before state: how a component finds out that something happened at all.", mental_model = "Every form library and UI kit you'll reach for later in this course routes through exactly this mechanism. React Hook Form's `register` function, covered in the forms section, returns an object that includes an `onChange` and `onBlur` you spread onto a plain `<input>`. Material UI and Headless UI components accept `onClick`, `onChange`, and friends and forward them to the native element underneath, the same passthrough idea `001-components-and-props.md` introduced for `className` and `style`. Recognizing \"this is just a handler prop, wired the same way as `SaveButton`'s `onSave`\" is what makes an unfamiliar library's event props unsurprising the first time you open its docs.  The client-secret boundary is a related discipline worth stating plainly here, because a click handler is exactly where it gets violated by accident: a handler that calls `fetch` directly from a component, with an API key or another privileged credential embedded in the request, ships that value to every visitor's browser the moment the bundle loads, readable in plain text from the network tab regardless of how the request itself is written. A handler prop like `onDelete` in this chapter's `DeleteAction` example is the correct shape for that boundary: the component that renders the button never holds a credential at all; it calls a callback that some other, server-adjacent layer of the app owns.", code_example = "function Greeting() {\n  function handleClick() {\n    console.log(\"button clicked\");\n  }\n\n  return <button onClick={handleClick}>Say hi</button>;\n}", pitfalls = "**Leaving off the event's type annotation.**  This project's strict TypeScript settings won't infer a type for a standalone function's parameter from how it's later used as a prop. Annotate it directly: `function handleChange(event: React.ChangeEvent<HTMLInputElement>)`. An inline arrow written straight inside the JSX attribute (`onChange={(event) => ...}`) doesn't need this, because the attribute's expected type supplies `event`'s type through context, but a named function declared on its own needs the annotation spelled out.  **Annotating the event for the wrong element.**  function Field() {   return <input onChange={handleChange} />; } ```" }
      },
    ]
  },
  {
    id = "01-006",
    number = 6,
    title = "Domain-first data model planning",
    local_chapter_file = "006-domain-first-data-model-planning.md",
    key_concepts = ["Draw the blueprint before you frame the house", "The concept: model the entities, then everything else", "From model to component tree", "Composition: extract units, wrap what you don't own", "The toolchain that turns the model into a running app", "Plan for failure in three layers"],
    total_duration_seconds = 244,
    videos = [
      {
        id = "UzE6QzY6VjE6MDA2LWRv",
        raw_key = "S1:C6:V1",
        title = "What are layout components?",
        url = "https://www.linkedin.com/learning/react-design-patterns-25656257/what-are-layout-components",
        duration_text = "02m14s",
        duration_seconds = 134,
        description = "In-depth walkthrough of Domain-first data model planning, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React: Design Patterns",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "Every component you've written so far started from its props. Components and Props taught you to annotate the props object and read fields off it; JSX and Rendering showed those props flowing into markup; React Event Handlers wired callbacks back out. One question has been quietly deferred the whole time: where do the prop *shapes* come from in the first place? Who decided a `ProfilePage` takes `name`, `role`, `joinedIso`, and a `contacts` array, and not some other set of fields?  This chapter answers that. Before you pick a folder layout, a state library, a component kit, or a data-fetching tool, you write down the things your app is *about*: the entities, their fields, and how they relate. Components fall out of that model almost mechanically. Tooling choices become justified by the model instead of by whatever was trending the week you started.", mental_model = "Everything later in this course attaches to the model you draw here. The forms section validates the entities' fields. The data-fetching section keys its cache by entity id and normalizes responses into `Record<ID, Entity>` lookups. The state section stores slices named after the entities. The routing section maps URLs like `/ideas/:id` straight onto them. The architecture section formalizes the folder layout around them. A chapter this early can only sketch each of those, but they all assume the sketch exists.  The payoff is that \"which tool should I use here?\" stops being a matter of taste. A component that renders a single entity is presentational and takes that entity as a prop. A list keys by the entity's id. A form's schema mirrors the entity's fields. An error boundary wraps a feature that owns a group of entities. Each decision has an answer because the model gave the question a fixed frame of reference.", code_example = "type ID = string;\n\ninterface User {\n  id: ID;\n  name: string;\n  email: string;\n  avatarUrl: string | null;\n}\n\ninterface Idea {\n  id: ID;\n  title: string;\n  summary: string;\n  authorId: ID; // -> User.id\n  tags: string[];\n  reviewIds: ID[]; // -> Review.id\n}\n\ninterface Review {\n  id: ID;\n  ideaId: ID; // -> Idea.id\n  reviewerId: ID; // -> User.id\n  rating: 1 | 2 | 3 | 4 | 5;\n  comment: string;\n}", pitfalls = "A large component that renders an idea, its author, its tags, and all its reviews inline becomes a wall of JSX with nested helper functions defined inside it. The moment a chunk of that markup forms a meaningful unit, pull it out into its own component. \"Author with avatar\" is a unit. \"The list of reviews\" is a unit. \"A single review\" is a unit inside that.  function ReviewList({ reviews }: { reviews: { review: Review; reviewer: User | null }[] }) {   return (     <ul>       {reviews.map(({ review, reviewer }) => (         <ReviewItem key={review.id} review={review} reviewer={reviewer} />       ))}     </ul>   ); } ```  The rule of thumb: prefer extracting a subcomponent over accumulating another nested render function inside a parent. A nested `function renderReview()` defined inside `Ide" }
      },
      {
        id = "UzE6QzY6VjI6MDA2LWRv",
        raw_key = "S1:C6:V2",
        title = "What are container components?",
        url = "https://www.linkedin.com/learning/react-design-patterns-25656257/what-are-container-components",
        duration_text = "01m50s",
        duration_seconds = 110,
        description = "In-depth walkthrough of Domain-first data model planning, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React: Design Patterns",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "Every component you've written so far started from its props. Components and Props taught you to annotate the props object and read fields off it; JSX and Rendering showed those props flowing into markup; React Event Handlers wired callbacks back out. One question has been quietly deferred the whole time: where do the prop *shapes* come from in the first place? Who decided a `ProfilePage` takes `name`, `role`, `joinedIso`, and a `contacts` array, and not some other set of fields?  This chapter answers that. Before you pick a folder layout, a state library, a component kit, or a data-fetching tool, you write down the things your app is *about*: the entities, their fields, and how they relate. Components fall out of that model almost mechanically. Tooling choices become justified by the model instead of by whatever was trending the week you started.", mental_model = "Everything later in this course attaches to the model you draw here. The forms section validates the entities' fields. The data-fetching section keys its cache by entity id and normalizes responses into `Record<ID, Entity>` lookups. The state section stores slices named after the entities. The routing section maps URLs like `/ideas/:id` straight onto them. The architecture section formalizes the folder layout around them. A chapter this early can only sketch each of those, but they all assume the sketch exists.  The payoff is that \"which tool should I use here?\" stops being a matter of taste. A component that renders a single entity is presentational and takes that entity as a prop. A list keys by the entity's id. A form's schema mirrors the entity's fields. An error boundary wraps a feature that owns a group of entities. Each decision has an answer because the model gave the question a fixed frame of reference.", code_example = "type ID = string;\n\ninterface User {\n  id: ID;\n  name: string;\n  email: string;\n  avatarUrl: string | null;\n}\n\ninterface Idea {\n  id: ID;\n  title: string;\n  summary: string;\n  authorId: ID; // -> User.id\n  tags: string[];\n  reviewIds: ID[]; // -> Review.id\n}\n\ninterface Review {\n  id: ID;\n  ideaId: ID; // -> Idea.id\n  reviewerId: ID; // -> User.id\n  rating: 1 | 2 | 3 | 4 | 5;\n  comment: string;\n}", pitfalls = "A large component that renders an idea, its author, its tags, and all its reviews inline becomes a wall of JSX with nested helper functions defined inside it. The moment a chunk of that markup forms a meaningful unit, pull it out into its own component. \"Author with avatar\" is a unit. \"The list of reviews\" is a unit. \"A single review\" is a unit inside that.  function ReviewList({ reviews }: { reviews: { review: Review; reviewer: User | null }[] }) {   return (     <ul>       {reviews.map(({ review, reviewer }) => (         <ReviewItem key={review.id} review={review} reviewer={reviewer} />       ))}     </ul>   ); } ```  The rule of thumb: prefer extracting a subcomponent over accumulating another nested render function inside a parent. A nested `function renderReview()` defined inside `Ide" }
      },
    ]
  },
  {
    id = "01-007",
    number = 7,
    title = "Headless UI: behavior without a forced visual design",
    local_chapter_file = "007-headless-ui-unstyled-accessible-components-for-react-vue.md",
    key_concepts = ["Before you start", "1. Hook: borrow the kitchen, choose the furniture", "2. The concept", "3. Minimal example: a headless-style disclosure", "4. Predict the render", "5. Common mistakes"],
    total_duration_seconds = 290,
    videos = [
      {
        id = "UzE6Qzc6VjE6MDA3LWhl",
        raw_key = "S1:C7:V1",
        title = "Designing performant apps with React Server Components",
        url = "https://www.linkedin.com/learning/react-essential-training/designing-performant-apps-with-react-server-components",
        duration_text = "01m36s",
        duration_seconds = 96,
        description = "In-depth walkthrough of Headless UI: behavior without a forced visual design, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React Essential Training",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "Read Components and Props, JSX and Rendering, and React Major Version Policy. You need function components, JSX expressions, props, and `map()` before this chapter.", mental_model = "A headless library prevents a class of bugs that only appears during real interaction: focus getting lost, `Escape` failing to close a dialog, a selected option not being announced, disabled items still receiving keyboard focus, or a menu looking open while its ARIA state says closed. These bugs survive a screenshot review.  Use a headless primitive when the interaction pattern is shared and its accessibility rules are easy to get subtly wrong. Use a native `<button>`, `<details>`, or `<select>` when it already expresses the behavior you need. Do not build a custom listbox because a styled `<select>` feels inconvenient.", code_example = "import { useState } from \"react\";\n\nexport function Notice() {\n  const [open, setOpen] = useState(false);\n\n  return (\n    <section>\n      <button\n        aria-expanded={open}\n        aria-controls=\"notice-panel\"\n        onClick={() => setOpen((current) => !current)}\n      >\n        Details\n      </button>\n      {open ? (\n        <p id=\"notice-panel\">Ships on Friday.</p>\n      ) : null}\n    </section>\n  );\n}", pitfalls = "A menu item may look correct but be a plain `div` with a click handler. Keyboard users cannot reach it with normal menu behavior, and a screen reader may not learn which item is active. The browser does not report a TypeScript error because the markup is syntactically valid. Use the library's `Menu`, `Menu.Button`, `Menu.Items`, and `Menu.Item` roles and state management, or use native controls when the pattern is simple.  Deliberately broken JSX:  A development render can report:  Pass a function instead:" }
      },
      {
        id = "UzE6Qzc6VjI6MDA3LWhl",
        raw_key = "S1:C7:V2",
        title = "What are design patterns?",
        url = "https://www.linkedin.com/learning/react-design-patterns-25656257/what-are-design-patterns",
        duration_text = "03m14s",
        duration_seconds = 194,
        description = "In-depth walkthrough of Headless UI: behavior without a forced visual design, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React: Design Patterns",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "Read Components and Props, JSX and Rendering, and React Major Version Policy. You need function components, JSX expressions, props, and `map()` before this chapter.", mental_model = "A headless library prevents a class of bugs that only appears during real interaction: focus getting lost, `Escape` failing to close a dialog, a selected option not being announced, disabled items still receiving keyboard focus, or a menu looking open while its ARIA state says closed. These bugs survive a screenshot review.  Use a headless primitive when the interaction pattern is shared and its accessibility rules are easy to get subtly wrong. Use a native `<button>`, `<details>`, or `<select>` when it already expresses the behavior you need. Do not build a custom listbox because a styled `<select>` feels inconvenient.", code_example = "import { useState } from \"react\";\n\nexport function Notice() {\n  const [open, setOpen] = useState(false);\n\n  return (\n    <section>\n      <button\n        aria-expanded={open}\n        aria-controls=\"notice-panel\"\n        onClick={() => setOpen((current) => !current)}\n      >\n        Details\n      </button>\n      {open ? (\n        <p id=\"notice-panel\">Ships on Friday.</p>\n      ) : null}\n    </section>\n  );\n}", pitfalls = "A menu item may look correct but be a plain `div` with a click handler. Keyboard users cannot reach it with normal menu behavior, and a screen reader may not learn which item is active. The browser does not report a TypeScript error because the markup is syntactically valid. Use the library's `Menu`, `Menu.Button`, `Menu.Items`, and `Menu.Item` roles and state management, or use native controls when the pattern is simple.  Deliberately broken JSX:  A development render can report:  Pass a function instead:" }
      },
    ]
  },
  {
    id = "01-008",
    number = 8,
    title = "React Canary Release Channel",
    local_chapter_file = "008-react-canary-release-channel.md",
    key_concepts = ["Three release rings, one product", "The concept: only Latest promises no surprises", "Canary: release candidates you can actually ship, if you pin them", "Experimental: the nightly ring", "The toolchain that reflects your edits: Fast Refresh and HMR", "How React puts it on screen: render and commit"],
    total_duration_seconds = 273,
    videos = [
      {
        id = "UzE6Qzg6VjE6MDA4LXJl",
        raw_key = "S1:C8:V1",
        title = "rendering data in react",
        url = "https://www.linkedin.com/learning/rendering-data-in-react/rendering-data-in-react",
        duration_text = "03m00s",
        duration_seconds = 180,
        description = "In-depth walkthrough of React Canary Release Channel, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Rendering Data in React",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "The previous chapter (React Major Version Policy) covered how React's Stable version number moves: rarely at the major digit, often everywhere else. It mentioned in passing that React publishes to more than one channel and that production apps track Stable. This chapter opens that up. There are three channels, they exist for different audiences, and only one of them follows the version policy you just learned. Getting the distinction wrong is how a copy-pasted install command ends up putting `19.3.0-canary-a1b2c3d4-20260115` in your `package.json` and nobody knows why.  Alongside the channel story, this chapter gathers a handful of durable React conventions that recur in almost every component regardless of which channel you're on: how React actually puts pixels on the screen, how you render a list, how you reach a value deep in the tree without prop-drilling it, and a few of the lint rules that keep components well-formed. They're grouped here because they're the kind of foundation the hooks section ahead assumes you already have.", mental_model = "The channel distinction is the difference between a boring dependency upgrade and a mystery. When your `package.json` says `^19.2.0`, the previous chapter's policy fully protects you. The moment a version string carries `-canary-` or `-experimental-`, that protection is gone by design, and the only safe move is an exact pin plus deliberate upgrades. Frameworks like Next.js make this invisible by consuming a pinned Canary for you, which is why you get new React features in Next before they hit a plain `bun add react`, without ever touching the pin yourself.  The conventions bundled into this chapter, render-and-commit, keyed lists, context, portals, clean props, `Record` lookups, the structural lint rules, aren't channel-specific. They're the substrate the hooks section assumes. Knowing that \"render\" means \"React called your function\" (not \"the DOM changed\") is what makes the coming chapters on `useState`, re-renders, and memoization comprehensible rather than magical.", code_example = "# a scheduled job bumps the pin to the newest Canary, then runs the test suite\nbun add react@canary react-dom@canary", pitfalls = "React keeps old APIs alive rather than forcing rewrites.  Development builds warn before they break.  Some changes never count as breaking, by policy." }
      },
      {
        id = "UzE6Qzg6VjI6MDA4LXJl",
        raw_key = "S1:C8:V2",
        title = "Next steps in your React journey",
        url = "https://www.linkedin.com/learning/react-design-patterns-25656257/next-steps-in-your-react-journey",
        duration_text = "01m33s",
        duration_seconds = 93,
        description = "In-depth walkthrough of React Canary Release Channel, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React: Design Patterns",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "The previous chapter (React Major Version Policy) covered how React's Stable version number moves: rarely at the major digit, often everywhere else. It mentioned in passing that React publishes to more than one channel and that production apps track Stable. This chapter opens that up. There are three channels, they exist for different audiences, and only one of them follows the version policy you just learned. Getting the distinction wrong is how a copy-pasted install command ends up putting `19.3.0-canary-a1b2c3d4-20260115` in your `package.json` and nobody knows why.  Alongside the channel story, this chapter gathers a handful of durable React conventions that recur in almost every component regardless of which channel you're on: how React actually puts pixels on the screen, how you render a list, how you reach a value deep in the tree without prop-drilling it, and a few of the lint rules that keep components well-formed. They're grouped here because they're the kind of foundation the hooks section ahead assumes you already have.", mental_model = "The channel distinction is the difference between a boring dependency upgrade and a mystery. When your `package.json` says `^19.2.0`, the previous chapter's policy fully protects you. The moment a version string carries `-canary-` or `-experimental-`, that protection is gone by design, and the only safe move is an exact pin plus deliberate upgrades. Frameworks like Next.js make this invisible by consuming a pinned Canary for you, which is why you get new React features in Next before they hit a plain `bun add react`, without ever touching the pin yourself.  The conventions bundled into this chapter, render-and-commit, keyed lists, context, portals, clean props, `Record` lookups, the structural lint rules, aren't channel-specific. They're the substrate the hooks section assumes. Knowing that \"render\" means \"React called your function\" (not \"the DOM changed\") is what makes the coming chapters on `useState`, re-renders, and memoization comprehensible rather than magical.", code_example = "# a scheduled job bumps the pin to the newest Canary, then runs the test suite\nbun add react@canary react-dom@canary", pitfalls = "React keeps old APIs alive rather than forcing rewrites.  Development builds warn before they break.  Some changes never count as breaking, by policy." }
      },
    ]
  },
  {
    id = "01-009",
    number = 9,
    title = "The Plan for React 18",
    local_chapter_file = "009-the-plan-for-react-18.md",
    key_concepts = ["The Plan for React 18, in one paragraph", "React Conf 2021: the surface area gets named", "Quick reference: short notes on the rest of this chapter's concepts", "Why this matters", "Recall check"],
    total_duration_seconds = 247,
    videos = [
      {
        id = "UzE6Qzk6VjE6MDA5LXRo",
        raw_key = "S1:C9:V1",
        title = "Understanding the React compiler",
        url = "https://www.linkedin.com/learning/react-essential-training/understanding-the-react-compiler",
        duration_text = "02m10s",
        duration_seconds = 130,
        description = "In-depth walkthrough of The Plan for React 18, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React Essential Training",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "The previous chapter opened React's release channel story: three rings, one product, only Latest follows semver. This chapter steps back to the moment that story actually started, the **June 2021 announcement** that laid out what React 18 was going to be before it shipped. The announcement is the cleanest way to see why React 18 was a quiet upgrade on the surface and a foundational one underneath.  The chapter is also where the section gathers a handful of short, related references that the upcoming hooks section assumes you can recognize: how React models your UI as a tree, the `ReactNode` and `PropsWithChildren` patterns for typed children, the React 18 portal escape hatch, and a few adjacent patterns from other course sources (Next.js typed API routes, styled-components typing, `declare global` for test helpers, discriminated-union action types, transitive dependency analysis). Those overlap with later chapters in detail; here they get one paragraph each so you can recognize them when they appear.", mental_model = "The Plan for React 18 is the architectural decision that everything else in the section builds on. Once you understand that React 18 is opt-in concurrency and that the new APIs are how you turn features on, you stop being afraid of \"breaking changes\" in the major version. The hooks section that follows this chapter will introduce `useState`, `useMemo`, `useTransition`, and the rest; each one is a tool that fits into the React 18 model, not a replacement for it.  The short references in the second half are the kind of vocabulary you accumulate by reading real React codebases. None of them is a chapter in its own right here, but each one is a phrase you'll see in JIRA tickets, library docs, and senior-engineer code reviews. Recognizing them now means you have a place to put them when you meet them later.", code_example = "// React 19 Enterprise Implementation\nimport React from \"react\";\n\nexport function Component() {\n  return <div>Production Component</div>;\n}", pitfalls = "Upgrading to React 18 is a small change.  New features are gated behind new APIs.  Styling strategies in React." }
      },
      {
        id = "UzE6Qzk6VjI6MDA5LXRo",
        raw_key = "S1:C9:V2",
        title = "Setting up Chrome tools for React",
        url = "https://www.linkedin.com/learning/react-essential-training/setting-up-chrome-tools-for-react",
        duration_text = "01m57s",
        duration_seconds = 117,
        description = "In-depth walkthrough of The Plan for React 18, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React Essential Training",
        references = [
          { label = "React Docs: Your First Component", url = "https://react.dev/learn/your-first-component", description = "Defining function components and component hierarchy." },
          { label = "React Docs: Understanding Your UI as a Tree", url = "https://react.dev/learn/understanding-your-ui-as-a-tree", description = "Render trees, module dependency trees, and reconciliation." },
        ],
        notes = { definition = "The previous chapter opened React's release channel story: three rings, one product, only Latest follows semver. This chapter steps back to the moment that story actually started, the **June 2021 announcement** that laid out what React 18 was going to be before it shipped. The announcement is the cleanest way to see why React 18 was a quiet upgrade on the surface and a foundational one underneath.  The chapter is also where the section gathers a handful of short, related references that the upcoming hooks section assumes you can recognize: how React models your UI as a tree, the `ReactNode` and `PropsWithChildren` patterns for typed children, the React 18 portal escape hatch, and a few adjacent patterns from other course sources (Next.js typed API routes, styled-components typing, `declare global` for test helpers, discriminated-union action types, transitive dependency analysis). Those overlap with later chapters in detail; here they get one paragraph each so you can recognize them when they appear.", mental_model = "The Plan for React 18 is the architectural decision that everything else in the section builds on. Once you understand that React 18 is opt-in concurrency and that the new APIs are how you turn features on, you stop being afraid of \"breaking changes\" in the major version. The hooks section that follows this chapter will introduce `useState`, `useMemo`, `useTransition`, and the rest; each one is a tool that fits into the React 18 model, not a replacement for it.  The short references in the second half are the kind of vocabulary you accumulate by reading real React codebases. None of them is a chapter in its own right here, but each one is a phrase you'll see in JIRA tickets, library docs, and senior-engineer code reviews. Recognizing them now means you have a place to put them when you meet them later.", code_example = "// React 19 Enterprise Implementation\nimport React from \"react\";\n\nexport function Component() {\n  return <div>Production Component</div>;\n}", pitfalls = "Upgrading to React 18 is a small change.  New features are gated behind new APIs.  Styling strategies in React." }
      },
    ]
  },
]
+++

This section covers **Components, Props & JSX Architecture** (Part 1: React & Tooling Foundations), featuring **18 curated LinkedIn Learning video lessons**, comprehensive pop-up chapter study notes with **Ask AI**, and official React documentation references across all 9 core chapters.
