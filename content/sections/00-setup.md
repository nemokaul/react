+++
title = "Environment, Vite & Modern Web Tooling"
weight = 1
[extra]
section_number = 0
section_id = "section-00"
part = 1
part_title = "Part 1: React & Tooling Foundations"
total_videos = 24
total_duration_seconds = 6801
recommended_courses = [
  { title = "Build Modern Web Apps with React: Hooks, State Management, and APIs Using Vite or Next.js", url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js", author = "LinkedIn Learning", duration = "5h 45m", scope = "Modern Vite development setup, fast bundling, ESM constraints, project structures, and TypeScript tooling." },
  { title = "React Essential Training", url = "https://www.linkedin.com/learning/react-essential-training", author = "Eve Porcello", duration = "3h 15m", scope = "Initializing React projects with Vite, Chrome DevTools, React Compiler, and project setup." },
]
chapters = [
  {
    id = "00-001",
    number = 1,
    title = "Environment Setup: Vite, TypeScript, and Tooling",
    local_chapter_file = "001-environment.md",
    key_concepts = ["Before you write any React", "What Vite actually does", "Scaffolding your project", "The three commands you'll run constantly", "Predict what happens", "Absolute imports: `@/` instead of `../../../`"],
    total_duration_seconds = 630,
    videos = [
      {
        id = "UzA6QzE6VjE6MDAxLWVu",
        raw_key = "S0:C1:V1",
        title = "What is React?",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/what-is-react",
        duration_text = "02m20s",
        duration_seconds = 140,
        description = "In-depth walkthrough of Environment Setup: Vite, TypeScript, and Tooling, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "Picture a kitchen. You write a recipe (your source code), but nobody eats raw recipe cards. Something has to turn the recipe into food: gather the ingredients, apply heat, plate the result. In a React project, that \"something\" is your build tool. You will write `.tsx` files full of TypeScript and JSX; the browser cannot run either one directly. A tool has to translate your files into plain JavaScript, serve them to the browser, and refresh the page (or just the one component) the instant you save a change.  This course uses **Vite** for that job. Before this chapter is over you will have scaffolded a project, run it, and understood exactly what happens between hitting save and seeing the update on screen. None of this is React yet. It's the floor React stands on.", mental_model = "Every chapter after this one assumes a running Vite project: you'll add hooks, routing, data fetching, and eventually a Next.js section, all inside the scaffold you just built. The alias, the quality trio, and the env-variable fence aren't course exercises you'll discard. Open any production React repository built with this toolchain (Bulletproof React is one well-known example) and you'll find the same `@/` alias, the same ESLint + Prettier + Husky trio, and the same `VITE_`-prefixed public variables sitting next to server-only secrets that never cross into client code.", code_example = "<script type=\"module\" src=\"/src/main.tsx\"></script>", pitfalls = "**Running `npm` or `node` commands from a tutorial you found online.** This course (and most modern setups) uses `bun`. If you paste `npm install` into a terminal that only has `bun` on its `PATH`, you'll get a plain `command not found`. Translate: `npm install` -> `bun install`, `npx <tool>` -> `bunx <tool>`.  **Forgetting the `VITE_` prefix on an environment variable.**  No error, no warning, just `undefined` at the point you read it. The fix is the prefix: `VITE_API_URL=https://api.example.com`, then read `import.meta.env.VITE_API_URL`.  **Configuring the path alias in only one of the two files.** If `@/*` is in `tsconfig.json` but missing from `vite.config.ts`, the editor shows no red squiggly, `bunx tsc --noEmit` passes, and then the dev server throws at runtime:" }
      },
      {
        id = "UzA6QzE6VjI6MDAxLWVu",
        raw_key = "S0:C1:V2",
        title = "Running your first React project",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/running-your-first-react-project",
        duration_text = "08m10s",
        duration_seconds = 490,
        description = "In-depth walkthrough of Environment Setup: Vite, TypeScript, and Tooling, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "Picture a kitchen. You write a recipe (your source code), but nobody eats raw recipe cards. Something has to turn the recipe into food: gather the ingredients, apply heat, plate the result. In a React project, that \"something\" is your build tool. You will write `.tsx` files full of TypeScript and JSX; the browser cannot run either one directly. A tool has to translate your files into plain JavaScript, serve them to the browser, and refresh the page (or just the one component) the instant you save a change.  This course uses **Vite** for that job. Before this chapter is over you will have scaffolded a project, run it, and understood exactly what happens between hitting save and seeing the update on screen. None of this is React yet. It's the floor React stands on.", mental_model = "Every chapter after this one assumes a running Vite project: you'll add hooks, routing, data fetching, and eventually a Next.js section, all inside the scaffold you just built. The alias, the quality trio, and the env-variable fence aren't course exercises you'll discard. Open any production React repository built with this toolchain (Bulletproof React is one well-known example) and you'll find the same `@/` alias, the same ESLint + Prettier + Husky trio, and the same `VITE_`-prefixed public variables sitting next to server-only secrets that never cross into client code.", code_example = "<script type=\"module\" src=\"/src/main.tsx\"></script>", pitfalls = "**Running `npm` or `node` commands from a tutorial you found online.** This course (and most modern setups) uses `bun`. If you paste `npm install` into a terminal that only has `bun` on its `PATH`, you'll get a plain `command not found`. Translate: `npm install` -> `bun install`, `npx <tool>` -> `bunx <tool>`.  **Forgetting the `VITE_` prefix on an environment variable.**  No error, no warning, just `undefined` at the point you read it. The fix is the prefix: `VITE_API_URL=https://api.example.com`, then read `import.meta.env.VITE_API_URL`.  **Configuring the path alias in only one of the two files.** If `@/*` is in `tsconfig.json` but missing from `vite.config.ts`, the editor shows no red squiggly, `bunx tsc --noEmit` passes, and then the dev server throws at runtime:" }
      },
    ]
  },
  {
    id = "00-002",
    number = 2,
    title = "Static Asset URL Import",
    local_chapter_file = "002-static-asset-url-import.md",
    key_concepts = ["An import that hands back an address, not a package", "Dev vs. build: what the string actually is", "Minimal example", "Predict what changes", "Common mistakes", "Why this matters"],
    total_duration_seconds = 190,
    videos = [
      {
        id = "UzA6QzI6VjE6MDAyLXN0",
        raw_key = "S0:C2:V1",
        title = "How to use Codespaces and what you should know",
        url = "https://www.linkedin.com/learning/react-essential-training/how-to-use-codespaces-what-you-should-know",
        duration_text = "02m10s",
        duration_seconds = 130,
        description = "In-depth walkthrough of Static Asset URL Import, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React Essential Training",
        references = [
          { label = "Vite Guide: Static Asset Handling", url = "https://vite.dev/guide/assets.html", description = "Importing images, SVGs, and URL references in Vite." },
          { label = "React Docs: Rules of JSX & Asset Elements", url = "https://react.dev/learn/writing-markup-with-jsx", description = "Specifying image src and attribute types in JSX." },
        ],
        notes = { definition = "You already import values from other modules: a function, a constant, a component. `import logoUrl from \"./logo.png\"` looks the same, but a PNG has no exports. There's no function or object living inside it for a bundler to hand you.  What Vite hands you instead is a string, the URL where that file will be reachable once it's served. Think of it like a coat check ticket rather than the coat itself: you don't carry the image's bytes around in your JavaScript, you carry a short string that tells the browser where to go fetch them when it needs to paint an `<img>` or a CSS background.", mental_model = "While the dev server is running, Vite doesn't touch the file at all. It just serves `src/logo.png` from disk at the path `/src/logo.png`, the same way it would serve any other file under `src/`. The import resolves to that path because that's genuinely where the file lives, reachable over HTTP.  `bun run build` is different. Vite reads every asset reachable from your module graph, copies each one into `dist/assets/`, and renames it with a content hash baked into the filename: `logo.2d8efhg.png`. The import now resolves to that hashed path instead of the original name.", code_example = "import logoUrl from \"./logo.png\";\n\nexport function Header() {\n  return (\n    <header>\n      <img src={logoUrl} alt=\"Acme company logo\" width={32} height={32} />\n      <h1>Acme</h1>\n    </header>\n  );\n}", pitfalls = "**Forgetting the type declarations that make the import legal at all.** TypeScript has no built-in idea that `.png` files can be imported as strings. Without a reference to Vite's client types, this is the exact error:  The fix is a `vite-env.d.ts` file at your project root containing:  `create-vite` scaffolds this file for you automatically; if you ever hand-roll a project or hit this error in a file outside a scaffolded app, add the reference yourself.  **Treating the imported value as the file, not its address.** `logoUrl` is a `string`. Calling a file-like method on it doesn't compile:" }
      },
      {
        id = "UzA6QzI6VjI6MDAyLXN0",
        raw_key = "S0:C2:V2",
        title = "What is React?",
        url = "https://www.linkedin.com/learning/react-essential-training/what-is-react",
        duration_text = "01m00s",
        duration_seconds = 60,
        description = "In-depth walkthrough of Static Asset URL Import, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React Essential Training",
        references = [
          { label = "Vite Guide: Static Asset Handling", url = "https://vite.dev/guide/assets.html", description = "Importing images, SVGs, and URL references in Vite." },
          { label = "React Docs: Rules of JSX & Asset Elements", url = "https://react.dev/learn/writing-markup-with-jsx", description = "Specifying image src and attribute types in JSX." },
        ],
        notes = { definition = "You already import values from other modules: a function, a constant, a component. `import logoUrl from \"./logo.png\"` looks the same, but a PNG has no exports. There's no function or object living inside it for a bundler to hand you.  What Vite hands you instead is a string, the URL where that file will be reachable once it's served. Think of it like a coat check ticket rather than the coat itself: you don't carry the image's bytes around in your JavaScript, you carry a short string that tells the browser where to go fetch them when it needs to paint an `<img>` or a CSS background.", mental_model = "While the dev server is running, Vite doesn't touch the file at all. It just serves `src/logo.png` from disk at the path `/src/logo.png`, the same way it would serve any other file under `src/`. The import resolves to that path because that's genuinely where the file lives, reachable over HTTP.  `bun run build` is different. Vite reads every asset reachable from your module graph, copies each one into `dist/assets/`, and renames it with a content hash baked into the filename: `logo.2d8efhg.png`. The import now resolves to that hashed path instead of the original name.", code_example = "import logoUrl from \"./logo.png\";\n\nexport function Header() {\n  return (\n    <header>\n      <img src={logoUrl} alt=\"Acme company logo\" width={32} height={32} />\n      <h1>Acme</h1>\n    </header>\n  );\n}", pitfalls = "**Forgetting the type declarations that make the import legal at all.** TypeScript has no built-in idea that `.png` files can be imported as strings. Without a reference to Vite's client types, this is the exact error:  The fix is a `vite-env.d.ts` file at your project root containing:  `create-vite` scaffolds this file for you automatically; if you ever hand-roll a project or hit this error in a file outside a scaffolded app, add the reference yourself.  **Treating the imported value as the file, not its address.** `logoUrl` is a `string`. Calling a file-like method on it doesn't compile:" }
      },
    ]
  },
  {
    id = "00-003",
    number = 3,
    title = "Compile-Time Global Constants",
    local_chapter_file = "003-compile-time-global-constants.md",
    key_concepts = ["A word that gets erased before your code ever runs", "The concept: `define`", "Minimal example", "Predict the build", "Common mistakes", "Why this matters"],
    total_duration_seconds = 470,
    videos = [
      {
        id = "UzA6QzM6VjE6MDAzLWNv",
        raw_key = "S0:C3:V1",
        title = "This keyword confusion",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/this-keyword-confusion",
        duration_text = "03m55s",
        duration_seconds = 235,
        description = "In-depth walkthrough of Compile-Time Global Constants, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Getting Started", url = "https://vite.dev/guide/", description = "Fast scaffolding, dev server architecture, and project templates." },
          { label = "React Docs: Build a React App from Scratch", url = "https://react.dev/learn/build-a-react-app-from-scratch", description = "Minimal HTML container, DOM mounting, and script bundling." },
        ],
        notes = { definition = "A mail-merge letter has a placeholder in it: \"Dear {{name}},\" Before a single copy gets printed, a program scans the template and swaps `{{name}}` for \"Ada\" everywhere it appears. The printed letter never contains the placeholder text, only the name. Nobody reading the finished letter could tell a placeholder was ever there, and nothing looks the value up while the letter is being read.  Vite's `define` option runs the same trick on your source code. You write an identifier like `__APP_VERSION__` in a component. Before the browser (or the production bundle) ever sees that file, Vite deletes the identifier and pastes in a literal value instead. There's no variable called `__APP_VERSION__` sitting in memory at runtime holding a string. The identifier is gone, replaced by the value itself, the moment the file is compiled.", mental_model = "Production error trackers like Sentry tag every report with a release version, usually a `define`d constant baked in at build time rather than read from a file at runtime, so a crash report always points at the exact code that produced it. Feature flags that only exist for a staging build get `define`d to `false` in production, which does more than hide a UI element: an `if (__IS_STAGING__) { ... }` branch guarded by a constant that's always `false` is dead code the production bundler can delete entirely, the same tree-shaking mechanism a later chapter covers in depth. A runtime `if (checkFlag())` check can't be eliminated that way, because the bundler has no way to know, at build time, what the function will return.  The bug class this prevents: a value that should never change after the app ships (a version string, a compiled-in feature flag, a build timestamp) living as a runtime lookup instead, with all the extra code, and all the ways that lookup can silently return something unexpected, that a lookup implies.", code_example = "// vite.config.ts\nimport { defineConfig } from \"vite\";\n\nexport default defineConfig({\n  define: {\n    __APP_VERSION__: JSON.stringify(\"1.4.0\"),\n  },\n});", pitfalls = "**Passing a raw string instead of a JSON-stringified one.**  Since `Footer.tsx` uses this as `build {__APP_VERSION__}`, the substitution produces `build {1.4.0}`, which isn't valid JavaScript (a number literal can't have two decimal points). `bun run build` fails with:  The fix is `JSON.stringify(\"1.4.0\")`, so the value handed to `define` is the six characters `\"1.4.0\"`, quotes included: valid JSON, and it splices in as a proper string literal rather than bare, syntactically broken source text.  **Using a relative path in `resolve.alias`.**" }
      },
      {
        id = "UzA6QzM6VjI6MDAzLWNv",
        raw_key = "S0:C3:V2",
        title = "useRef timer example: Mutable values",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/useref-timer-example-mutable-values",
        duration_text = "03m55s",
        duration_seconds = 235,
        description = "In-depth walkthrough of Compile-Time Global Constants, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Getting Started", url = "https://vite.dev/guide/", description = "Fast scaffolding, dev server architecture, and project templates." },
          { label = "React Docs: Build a React App from Scratch", url = "https://react.dev/learn/build-a-react-app-from-scratch", description = "Minimal HTML container, DOM mounting, and script bundling." },
        ],
        notes = { definition = "A mail-merge letter has a placeholder in it: \"Dear {{name}},\" Before a single copy gets printed, a program scans the template and swaps `{{name}}` for \"Ada\" everywhere it appears. The printed letter never contains the placeholder text, only the name. Nobody reading the finished letter could tell a placeholder was ever there, and nothing looks the value up while the letter is being read.  Vite's `define` option runs the same trick on your source code. You write an identifier like `__APP_VERSION__` in a component. Before the browser (or the production bundle) ever sees that file, Vite deletes the identifier and pastes in a literal value instead. There's no variable called `__APP_VERSION__` sitting in memory at runtime holding a string. The identifier is gone, replaced by the value itself, the moment the file is compiled.", mental_model = "Production error trackers like Sentry tag every report with a release version, usually a `define`d constant baked in at build time rather than read from a file at runtime, so a crash report always points at the exact code that produced it. Feature flags that only exist for a staging build get `define`d to `false` in production, which does more than hide a UI element: an `if (__IS_STAGING__) { ... }` branch guarded by a constant that's always `false` is dead code the production bundler can delete entirely, the same tree-shaking mechanism a later chapter covers in depth. A runtime `if (checkFlag())` check can't be eliminated that way, because the bundler has no way to know, at build time, what the function will return.  The bug class this prevents: a value that should never change after the app ships (a version string, a compiled-in feature flag, a build timestamp) living as a runtime lookup instead, with all the extra code, and all the ways that lookup can silently return something unexpected, that a lookup implies.", code_example = "// vite.config.ts\nimport { defineConfig } from \"vite\";\n\nexport default defineConfig({\n  define: {\n    __APP_VERSION__: JSON.stringify(\"1.4.0\"),\n  },\n});", pitfalls = "**Passing a raw string instead of a JSON-stringified one.**  Since `Footer.tsx` uses this as `build {__APP_VERSION__}`, the substitution produces `build {1.4.0}`, which isn't valid JavaScript (a number literal can't have two decimal points). `bun run build` fails with:  The fix is `JSON.stringify(\"1.4.0\")`, so the value handed to `define` is the six characters `\"1.4.0\"`, quotes included: valid JSON, and it splices in as a proper string literal rather than bare, syntactically broken source text.  **Using a relative path in `resolve.alias`.**" }
      },
    ]
  },
  {
    id = "00-004",
    number = 4,
    title = "Vite Env Variables and Modes (`import.meta.env`)",
    local_chapter_file = "004-vite-env-variables-and-modes-import-meta-env.md",
    key_concepts = ["A laminated card behind the front desk", "The concept: `import.meta.env` and modes", "Minimal example", "`.env` files: which one wins", "`%CONST_NAME%` in `index.html`", "`loadEnv`: reading env values inside `vite.config.ts`"],
    total_duration_seconds = 876,
    videos = [
      {
        id = "UzA6QzQ6VjE6MDA0LXZp",
        raw_key = "S0:C4:V1",
        title = "useRef timer example: Mutable values",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/useref-timer-example-mutable-values",
        duration_text = "03m55s",
        duration_seconds = 235,
        description = "In-depth walkthrough of Vite Env Variables and Modes (`import.meta.env`), examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "A hotel chain trains every front-desk clerk from the same script: how to greet a guest, how to explain checkout time, how to hand over a key card. What changes from property to property is a laminated card taped near the register: local wifi password, the currency guests pay in, today's checkout time if it's been extended for a holiday weekend. The script never changes. The card does, and a clerk reads whichever card is taped up at the property they happen to be standing in.  `import.meta.env` is that card. Your component code is the script: the same `.tsx` file runs whether you're developing on your laptop or serving real traffic. What changes underneath it is a small object Vite fills in with values specific to how and where the code is currently running, plus any custom entries you've added to the card yourself.", mental_model = "A single component reading `import.meta.env.VITE_API_URL` is how a real app points at a local backend in development, a staging API while QA verifies a release, and the production API once it ships, without an `if` statement anywhere near the component that has to know which environment it's in. Error trackers like Sentry tag every report with `import.meta.env.MODE` (or a `define`d release string) so a crash always shows which build produced it. A feature flag gated on a `VITE_*` variable and compiled to `false` in production is dead code a bundler can delete entirely, the same tree-shaking mechanism a later chapter covers in depth; a flag read from a runtime API call instead can't be eliminated that way, because the bundler has no way to know ahead of time what that call will return.  The bug class the `VITE_` prefix and the `loadEnv` split both prevent: a value that should never leave your own servers (an API key, a database credential) ending up readable in a browser's dev tools because it happened to sit in the same `.env` file as values that were always meant to be public.", code_example = "// src/EnvBadge.tsx\nexport function EnvBadge() {\n  return (\n    <p>\n      Running in {import.meta.env.MODE} mode\n      {import.meta.env.DEV ? \" (dev tools enabled)\" : \"\"}\n    </p>\n  );\n}", pitfalls = "`environment.md` already covered the most common one (forgetting the `VITE_` prefix entirely, which produces a silent `undefined` with no error). These four are new.  **Treating a `.env` string as a real boolean.**  This is exactly the gap the prediction above just walked through:  The fix is an explicit comparison against the string Vite will actually hand back, not a truthiness check on it:" }
      },
      {
        id = "UzA6QzQ6VjI6MDA0LXZp",
        raw_key = "S0:C4:V2",
        title = "useCallback example and understanding",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/usecallback-example-and-understanding",
        duration_text = "10m41s",
        duration_seconds = 641,
        description = "In-depth walkthrough of Vite Env Variables and Modes (`import.meta.env`), examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "A hotel chain trains every front-desk clerk from the same script: how to greet a guest, how to explain checkout time, how to hand over a key card. What changes from property to property is a laminated card taped near the register: local wifi password, the currency guests pay in, today's checkout time if it's been extended for a holiday weekend. The script never changes. The card does, and a clerk reads whichever card is taped up at the property they happen to be standing in.  `import.meta.env` is that card. Your component code is the script: the same `.tsx` file runs whether you're developing on your laptop or serving real traffic. What changes underneath it is a small object Vite fills in with values specific to how and where the code is currently running, plus any custom entries you've added to the card yourself.", mental_model = "A single component reading `import.meta.env.VITE_API_URL` is how a real app points at a local backend in development, a staging API while QA verifies a release, and the production API once it ships, without an `if` statement anywhere near the component that has to know which environment it's in. Error trackers like Sentry tag every report with `import.meta.env.MODE` (or a `define`d release string) so a crash always shows which build produced it. A feature flag gated on a `VITE_*` variable and compiled to `false` in production is dead code a bundler can delete entirely, the same tree-shaking mechanism a later chapter covers in depth; a flag read from a runtime API call instead can't be eliminated that way, because the bundler has no way to know ahead of time what that call will return.  The bug class the `VITE_` prefix and the `loadEnv` split both prevent: a value that should never leave your own servers (an API key, a database credential) ending up readable in a browser's dev tools because it happened to sit in the same `.env` file as values that were always meant to be public.", code_example = "// src/EnvBadge.tsx\nexport function EnvBadge() {\n  return (\n    <p>\n      Running in {import.meta.env.MODE} mode\n      {import.meta.env.DEV ? \" (dev tools enabled)\" : \"\"}\n    </p>\n  );\n}", pitfalls = "`environment.md` already covered the most common one (forgetting the `VITE_` prefix entirely, which produces a silent `undefined` with no error). These four are new.  **Treating a `.env` string as a real boolean.**  This is exactly the gap the prediction above just walked through:  The fix is an explicit comparison against the string Vite will actually hand back, not a truthiness check on it:" }
      },
    ]
  },
  {
    id = "00-005",
    number = 5,
    title = "Vite Modern Web Constraints",
    local_chapter_file = "005-vite-modern-web-constraints.md",
    key_concepts = ["A backstage door that doesn't open onto the stage", "The concept: Vite's modern-web bias", "Minimal example", "Predict the build", "Common mistakes", "Why this matters"],
    total_duration_seconds = 468,
    videos = [
      {
        id = "UzA6QzU6VjE6MDA1LXZp",
        raw_key = "S0:C5:V1",
        title = "Responsive design examples",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/responsive-design-examples",
        duration_text = "03m53s",
        duration_seconds = 233,
        description = "In-depth walkthrough of Vite Modern Web Constraints, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "A theater's backstage crew can do things the actors on stage never could: hammer together a set piece, splice a frayed extension cord, look up a prop's shipping manifest. None of that machinery travels onto the stage once the curtain goes up. An actor who suddenly needs a hammer mid-scene doesn't get one. The workshop and the stage are two different places with two different rules, and the curtain is the boundary between them.  `vite.config.ts`, and everything a Vite plugin does inside it, is the workshop: it runs in Node, before your app ever reaches a browser, so it can import anything Node offers (`fs`, `path`, `child_process`, any npm package built for a server). Your components live somewhere else entirely: a browser tab, alive only after the curtain (an actual `<script type=\"module\">` tag) goes up. Reach for a Node built-in from inside a component and you're asking an actor to produce a backstage hammer mid-scene. It was never shipped there.", mental_model = "Older bundlers earned their large default bundle sizes partly by trying to make every package \"just work\" in a browser, Node built-ins included, whether or not the code path that needed them ever actually ran client-side. Vite's refusal to do that is why a fresh Vite + React project ships a noticeably smaller bundle than the same dependencies run through a legacy Webpack config with its default Node polyfills turned on: nothing gets shimmed in that your code doesn't genuinely use, and anything that tries to reach a Node built-in fails immediately during development, not weeks later when a user's bundle silently misbehaves in production.  The same bias is why Next.js, Remix, and most modern React meta-frameworks draw the identical line between \"server code\" and \"client code\" that this chapter draws between Node and the browser. The specific keyword differs (`\"use server\"` and `\"use client\"` directives instead of the plain fact of which file imports what), but the underlying rule, that browser-bound code can't silently reach into server-only primitives, is the same one Vite enforces here first.", code_example = "// src/sorter.ts\nself.onmessage = (event: MessageEvent<number[]>) => {\n  const sorted = [...event.data].sort((a, b) => a - b);\n  self.postMessage(sorted);\n};", pitfalls = "**Importing a Node built-in from a component, expecting it to work because it compiles.** `@types/node` is often present in a project (for `vite.config.ts` itself), so `import { readFileSync } from \"node:fs\"` inside a `.tsx` file type-checks cleanly under `bunx tsc --noEmit`. The failure only shows up at runtime, in the browser console, and it's the exact text shown above:  The fix is never \"polyfill it.\" Move the actual file or filesystem work into a Vite plugin (Node-side, config-time) or a small backend endpoint the component calls with `fetch`, the same way any browser-only code has to reach server-only data.  **Storing the worker's `new URL(...)` in a variable before passing it to `new Worker`.**  Vite's worker detection only fires when the `new URL(...)` expression sits directly insi" }
      },
      {
        id = "UzA6QzU6VjI6MDA1LXZp",
        raw_key = "S0:C5:V2",
        title = "This keyword confusion",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/this-keyword-confusion",
        duration_text = "03m55s",
        duration_seconds = 235,
        description = "In-depth walkthrough of Vite Modern Web Constraints, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "A theater's backstage crew can do things the actors on stage never could: hammer together a set piece, splice a frayed extension cord, look up a prop's shipping manifest. None of that machinery travels onto the stage once the curtain goes up. An actor who suddenly needs a hammer mid-scene doesn't get one. The workshop and the stage are two different places with two different rules, and the curtain is the boundary between them.  `vite.config.ts`, and everything a Vite plugin does inside it, is the workshop: it runs in Node, before your app ever reaches a browser, so it can import anything Node offers (`fs`, `path`, `child_process`, any npm package built for a server). Your components live somewhere else entirely: a browser tab, alive only after the curtain (an actual `<script type=\"module\">` tag) goes up. Reach for a Node built-in from inside a component and you're asking an actor to produce a backstage hammer mid-scene. It was never shipped there.", mental_model = "Older bundlers earned their large default bundle sizes partly by trying to make every package \"just work\" in a browser, Node built-ins included, whether or not the code path that needed them ever actually ran client-side. Vite's refusal to do that is why a fresh Vite + React project ships a noticeably smaller bundle than the same dependencies run through a legacy Webpack config with its default Node polyfills turned on: nothing gets shimmed in that your code doesn't genuinely use, and anything that tries to reach a Node built-in fails immediately during development, not weeks later when a user's bundle silently misbehaves in production.  The same bias is why Next.js, Remix, and most modern React meta-frameworks draw the identical line between \"server code\" and \"client code\" that this chapter draws between Node and the browser. The specific keyword differs (`\"use server\"` and `\"use client\"` directives instead of the plain fact of which file imports what), but the underlying rule, that browser-bound code can't silently reach into server-only primitives, is the same one Vite enforces here first.", code_example = "// src/sorter.ts\nself.onmessage = (event: MessageEvent<number[]>) => {\n  const sorted = [...event.data].sort((a, b) => a - b);\n  self.postMessage(sorted);\n};", pitfalls = "**Importing a Node built-in from a component, expecting it to work because it compiles.** `@types/node` is often present in a project (for `vite.config.ts` itself), so `import { readFileSync } from \"node:fs\"` inside a `.tsx` file type-checks cleanly under `bunx tsc --noEmit`. The failure only shows up at runtime, in the browser console, and it's the exact text shown above:  The fix is never \"polyfill it.\" Move the actual file or filesystem work into a Vite plugin (Node-side, config-time) or a small backend endpoint the component calls with `fetch`, the same way any browser-only code has to reach server-only data.  **Storing the worker's `new URL(...)` in a variable before passing it to `new Worker`.**  Vite's worker detection only fires when the `new URL(...)` expression sits directly insi" }
      },
    ]
  },
  {
    id = "00-006",
    number = 6,
    title = "Vite Root, Base, Mode, and Input Options",
    local_chapter_file = "006-vite-root-base-mode-and-input-options.md",
    key_concepts = ["The three settings every Vite command reads the same way", "Predict the build: what changes when you set `base`", "`import.meta.env.BASE_URL`: the one place `base` shows up at runtime", "What `input` feeds, when you never set it", "Asset suffixes you haven't reached for yet", "Why plain CSS imports stopped exporting a string"],
    total_duration_seconds = 356,
    videos = [
      {
        id = "UzA6QzY6VjE6MDA2LXZp",
        raw_key = "S0:C6:V1",
        title = "What is React?",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/what-is-react",
        duration_text = "02m20s",
        duration_seconds = 140,
        description = "In-depth walkthrough of Vite Root, Base, Mode, and Input Options, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "Picture a moving company packing up an office. Before a single box moves, three questions get answered: which building are we packing (the address movers show up to), what's the new building's mailing label (so forwarded mail actually arrives), and is this a weekday move or a weekend rush job (which crew and rules apply).  Vite asks the same three questions before `vite`, `vite build`, and `vite preview` do anything else, and all three commands answer them the same way:", mental_model = "`vite-env-variables-and-modes-import-meta-env.md` listed `BASE_URL` in its table of built-in `import.meta.env` keys without dwelling on it. Here's the case it exists for: any place in your component code that builds a path to a `public/` asset by hand, rather than through an `import` Vite can see and rewrite.  Under deploy A this renders `href=\"/favicon.ico\"`. Under deploy B it renders `href=\"/campaigns/summer-launch/favicon.ico\"`, correctly, because `BASE_URL` itself already carries whatever `base` was set to.", code_example = "// vite.config.ts\nimport { defineConfig } from \"vite\";\n\nexport default defineConfig({\n  root: \"client\",\n  base: \"/campaigns/summer-launch/\",\n  mode: undefined, // let Vite's own per-command default apply\n});", pitfalls = "**Deploying under a subpath without setting `base`.** Locally, `bun run build && bun run preview` looks completely fine: `vite preview` serves the built `dist/` from the domain root of its own dev-only server, so `base: \"/\"` (the untouched default) matches perfectly. The break only shows up once that same `dist/` folder is copied to `https://acme.example.com/campaigns/summer-launch/`. The browser's network tab shows requests like `GET https://acme.example.com/assets/logo.a1b2c3.png` returning whatever Acme's actual site root serves for that path (often a 404, sometimes a completely unrelated page), because every asset reference in the built files still assumes the site owns the whole domain.  **Writing `import.meta.env[\"BASE_URL\"]` instead of `import.meta.env.BASE_URL`.** Covered above: th" }
      },
      {
        id = "UzA6QzY6VjI6MDA2LXZp",
        raw_key = "S0:C6:V2",
        title = "When to choose which",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/when-to-choose-which",
        duration_text = "03m36s",
        duration_seconds = 216,
        description = "In-depth walkthrough of Vite Root, Base, Mode, and Input Options, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "Picture a moving company packing up an office. Before a single box moves, three questions get answered: which building are we packing (the address movers show up to), what's the new building's mailing label (so forwarded mail actually arrives), and is this a weekday move or a weekend rush job (which crew and rules apply).  Vite asks the same three questions before `vite`, `vite build`, and `vite preview` do anything else, and all three commands answer them the same way:", mental_model = "`vite-env-variables-and-modes-import-meta-env.md` listed `BASE_URL` in its table of built-in `import.meta.env` keys without dwelling on it. Here's the case it exists for: any place in your component code that builds a path to a `public/` asset by hand, rather than through an `import` Vite can see and rewrite.  Under deploy A this renders `href=\"/favicon.ico\"`. Under deploy B it renders `href=\"/campaigns/summer-launch/favicon.ico\"`, correctly, because `BASE_URL` itself already carries whatever `base` was set to.", code_example = "// vite.config.ts\nimport { defineConfig } from \"vite\";\n\nexport default defineConfig({\n  root: \"client\",\n  base: \"/campaigns/summer-launch/\",\n  mode: undefined, // let Vite's own per-command default apply\n});", pitfalls = "**Deploying under a subpath without setting `base`.** Locally, `bun run build && bun run preview` looks completely fine: `vite preview` serves the built `dist/` from the domain root of its own dev-only server, so `base: \"/\"` (the untouched default) matches perfectly. The break only shows up once that same `dist/` folder is copied to `https://acme.example.com/campaigns/summer-launch/`. The browser's network tab shows requests like `GET https://acme.example.com/assets/logo.a1b2c3.png` returning whatever Acme's actual site root serves for that path (often a 404, sometimes a completely unrelated page), because every asset reference in the built files still assumes the site owns the whole domain.  **Writing `import.meta.env[\"BASE_URL\"]` instead of `import.meta.env.BASE_URL`.** Covered above: th" }
      },
    ]
  },
  {
    id = "00-007",
    number = 7,
    title = "Library Mode (`build.lib`)",
    local_chapter_file = "007-library-mode-build-lib.md",
    key_concepts = ["Shipping a part, not deploying a page", "The concept: `build.lib`", "Predict the build: one `entry` string vs. one `entry` object", "Combining configs without repeating them: `mergeConfig` and `resolveConfig`", "Vite 8: Rolldown replaces esbuild and Rollup", "Vite as a foundation other tools build on"],
    total_duration_seconds = 1520,
    videos = [
      {
        id = "UzA6Qzc6VjE6MDA3LWxp",
        raw_key = "S0:C7:V1",
        title = "Standard Vite/Next.js project structure",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/standard-vite-next-js-project-structure",
        duration_text = "13m37s",
        duration_seconds = 817,
        description = "In-depth walkthrough of Library Mode (`build.lib`), examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "Every Vite config so far in this course has answered one question: how does this one app get from source to a browser at one URL. `environment.md`'s `dist/` folder, `vite-root-base-mode-and-input-options.md`'s `base` and `input`, `compile-time-global-constants.md`'s dependency pre-bundling. All of it assumes a single destination: your own deployed site, built once, served from one place.  Acme's design system team has a different problem. `packages/acme-ui-kit` isn't a page. It's a `<Button>`, a `<Dialog>`, a handful of hooks, imported by three other teams' apps, each on its own React version, its own bundler, its own deploy schedule. Nobody at Acme controls what happens after `npm install acme-ui-kit`. The output has to be a set of files a stranger's toolchain can consume, not a folder a stranger's browser can visit.", mental_model = "Every other Vite config decision in this course optimizes one app's own build. Library mode is the point where Acme's Vite config stops being about Acme's own deploy and starts being a contract with code the team doesn't control: what gets bundled, what stays external, what filename a `package.json` can rely on existing. Getting `external` wrong doesn't fail a test locally, it ships a duplicate React into every app that depends on the library, the exact class of bug that only surfaces as a confusing runtime warning in someone else's project. The Vite 8 migration section matters for a similar reason: none of this course's own configs change shape because of it, but the moment a teammate pastes a config snippet from an older tutorial, knowing `build.rollupOptions` still works (converted automatically) versus knowing it's the name to actively avoid in new code is the difference between quietly accumulating deprecated options and writing today's idiomatic config from the start.", code_example = "interface LibraryOptions {\n  entry: string | string[] | Record<string, string>;\n  name?: string; // required for the umd/iife formats\n  fileName?: string | ((format: string, entryName: string) => string);\n  formats?: (\"es\" | \"cjs\" | \"umd\" | \"iife\")[];\n  cssFileName?: string;\n}", pitfalls = "**Forgetting `rolldownOptions.external` on a library build.** The build still succeeds, `dist/acme-ui-kit.js` still works. The problem shows up one install later, in a consuming app: two copies of React exist in the page (the library's bundled one, the app's own), React throws its \"Invalid hook call\" warning, or components from the library silently fail to share context with the rest of the app, because `useContext` in the library's bundled React instance can never see a `Provider` rendered by the app's own React instance.  **Copying a `package.json` `exports` map from a single-entry build onto a multi-entry one (or the reverse).** As the predict-the-build exercise above showed, single-entry defaults to `[\"es\", \"umd\"]`, multi-entry defaults to `[\"es\", \"cjs\"]`. Pointing `exports[\".\"].requir" }
      },
      {
        id = "UzA6Qzc6VjI6MDA3LWxp",
        raw_key = "S0:C7:V2",
        title = "Setting up Tailwind CSS in a React project (Vite)",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/setting-up-tailwind-css-in-a-react-project-vite",
        duration_text = "11m43s",
        duration_seconds = 703,
        description = "In-depth walkthrough of Library Mode (`build.lib`), examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "Every Vite config so far in this course has answered one question: how does this one app get from source to a browser at one URL. `environment.md`'s `dist/` folder, `vite-root-base-mode-and-input-options.md`'s `base` and `input`, `compile-time-global-constants.md`'s dependency pre-bundling. All of it assumes a single destination: your own deployed site, built once, served from one place.  Acme's design system team has a different problem. `packages/acme-ui-kit` isn't a page. It's a `<Button>`, a `<Dialog>`, a handful of hooks, imported by three other teams' apps, each on its own React version, its own bundler, its own deploy schedule. Nobody at Acme controls what happens after `npm install acme-ui-kit`. The output has to be a set of files a stranger's toolchain can consume, not a folder a stranger's browser can visit.", mental_model = "Every other Vite config decision in this course optimizes one app's own build. Library mode is the point where Acme's Vite config stops being about Acme's own deploy and starts being a contract with code the team doesn't control: what gets bundled, what stays external, what filename a `package.json` can rely on existing. Getting `external` wrong doesn't fail a test locally, it ships a duplicate React into every app that depends on the library, the exact class of bug that only surfaces as a confusing runtime warning in someone else's project. The Vite 8 migration section matters for a similar reason: none of this course's own configs change shape because of it, but the moment a teammate pastes a config snippet from an older tutorial, knowing `build.rollupOptions` still works (converted automatically) versus knowing it's the name to actively avoid in new code is the difference between quietly accumulating deprecated options and writing today's idiomatic config from the start.", code_example = "interface LibraryOptions {\n  entry: string | string[] | Record<string, string>;\n  name?: string; // required for the umd/iife formats\n  fileName?: string | ((format: string, entryName: string) => string);\n  formats?: (\"es\" | \"cjs\" | \"umd\" | \"iife\")[];\n  cssFileName?: string;\n}", pitfalls = "**Forgetting `rolldownOptions.external` on a library build.** The build still succeeds, `dist/acme-ui-kit.js` still works. The problem shows up one install later, in a consuming app: two copies of React exist in the page (the library's bundled one, the app's own), React throws its \"Invalid hook call\" warning, or components from the library silently fail to share context with the rest of the app, because `useContext` in the library's bundled React instance can never see a `Provider` rendered by the app's own React instance.  **Copying a `package.json` `exports` map from a single-entry build onto a multi-entry one (or the reverse).** As the predict-the-build exercise above showed, single-entry defaults to `[\"es\", \"umd\"]`, multi-entry defaults to `[\"es\", \"cjs\"]`. Pointing `exports[\".\"].requir" }
      },
    ]
  },
  {
    id = "00-008",
    number = 8,
    title = "HMR Fallback to Full Reload",
    local_chapter_file = "008-hmr-fallback-to-full-reload.md",
    key_concepts = ["A pot that's still simmering", "Recap: the boundary you already have", "React Fast Refresh: the boundary you get for free", "The three ways a save doesn't do what you expect", "Minimal example", "Predict the reload"],
    total_duration_seconds = 200,
    videos = [
      {
        id = "UzA6Qzg6VjE6MDA4LWht",
        raw_key = "S0:C8:V1",
        title = "What is React?",
        url = "https://www.linkedin.com/learning/react-essential-training/what-is-react",
        duration_text = "01m00s",
        duration_seconds = 60,
        description = "In-depth walkthrough of HMR Fallback to Full Reload, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React Essential Training",
        references = [
          { label = "Vite Guide: Getting Started", url = "https://vite.dev/guide/", description = "Fast scaffolding, dev server architecture, and project templates." },
          { label = "React Docs: Build a React App from Scratch", url = "https://react.dev/learn/build-a-react-app-from-scratch", description = "Minimal HTML container, DOM mounting, and script bundling." },
        ],
        notes = { definition = "Picture a pot of soup on the stove, already simmering. You taste it and decide it needs more salt. You don't pour the pot out and start again from cold water: you add the salt, stir, and the soup that was already cooking keeps cooking, now slightly different. That's the good case.  Now picture a different edit: you decide the soup should have been a stew, and you've changed the base ingredient entirely. At that point \"just stir it in\" doesn't make sense. Whatever was already in the pot has to go, and you start again from a cold, empty one.", mental_model = "Every state-management singleton you build in this course eventually asks the same question this chapter answers: when a module re-executes on a hot update, should it build a brand-new instance, wiping out whatever was already there, or reuse the one that's already running? A Zustand store, a TanStack Query client, a React Hook Form instance sitting outside a component: all of them re-run their top-level module code on a self-accepting hot update, exactly like `App.tsx`'s manual `.accept()` did in the Predict section above. The tools you'll reach for later in this course solve it with the same primitive this chapter covers, `hot.data`, to remember that an instance already exists across the swap instead of building a second one.  The casing bug is the one most worth internalizing early, because it costs the most time relative to how simple the fix is: it's invisible in dev on the two most common development platforms, and only turns into a hard, unambiguous build error once code reaches a case-sensitive Linux CI runner. A contributor who's never developed on Linux can go a long time without ever seeing it locally.", code_example = "// src/Badge.tsx\nexport const badgeSize = 12;\n\nexport function Badge({ label }: { label: string }) {\n  return <span style={{ fontSize: badgeSize }}>{label}</span>;\n}", pitfalls = "**Assuming any co-exported constant breaks Fast Refresh, or the opposite: assuming none of them ever will.** Both are wrong in a way that costs debugging time. A components file can safely export a plain constant next to its component; the boundary only breaks when that constant's *value* changes between saves, not merely by its presence. A components file exporting a `defaultProps`-style object, a memoized style, or a fixed size value is common and fine; changing that object's contents is the moment Fast Refresh's guarantee ends for that file, and it's easy to mistake \"my whole page just reset\" for a JSX bug when the actual cause was two lines above the JSX entirely.  **Treating a case-insensitive-filesystem casing bug as \"HMR is broken.\"** `import Button from \"./button\"` against an on-di" }
      },
      {
        id = "UzA6Qzg6VjI6MDA4LWht",
        raw_key = "S0:C8:V2",
        title = "What is React?",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/what-is-react",
        duration_text = "02m20s",
        duration_seconds = 140,
        description = "In-depth walkthrough of HMR Fallback to Full Reload, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Getting Started", url = "https://vite.dev/guide/", description = "Fast scaffolding, dev server architecture, and project templates." },
          { label = "React Docs: Build a React App from Scratch", url = "https://react.dev/learn/build-a-react-app-from-scratch", description = "Minimal HTML container, DOM mounting, and script bundling." },
        ],
        notes = { definition = "Picture a pot of soup on the stove, already simmering. You taste it and decide it needs more salt. You don't pour the pot out and start again from cold water: you add the salt, stir, and the soup that was already cooking keeps cooking, now slightly different. That's the good case.  Now picture a different edit: you decide the soup should have been a stew, and you've changed the base ingredient entirely. At that point \"just stir it in\" doesn't make sense. Whatever was already in the pot has to go, and you start again from a cold, empty one.", mental_model = "Every state-management singleton you build in this course eventually asks the same question this chapter answers: when a module re-executes on a hot update, should it build a brand-new instance, wiping out whatever was already there, or reuse the one that's already running? A Zustand store, a TanStack Query client, a React Hook Form instance sitting outside a component: all of them re-run their top-level module code on a self-accepting hot update, exactly like `App.tsx`'s manual `.accept()` did in the Predict section above. The tools you'll reach for later in this course solve it with the same primitive this chapter covers, `hot.data`, to remember that an instance already exists across the swap instead of building a second one.  The casing bug is the one most worth internalizing early, because it costs the most time relative to how simple the fix is: it's invisible in dev on the two most common development platforms, and only turns into a hard, unambiguous build error once code reaches a case-sensitive Linux CI runner. A contributor who's never developed on Linux can go a long time without ever seeing it locally.", code_example = "// src/Badge.tsx\nexport const badgeSize = 12;\n\nexport function Badge({ label }: { label: string }) {\n  return <span style={{ fontSize: badgeSize }}>{label}</span>;\n}", pitfalls = "**Assuming any co-exported constant breaks Fast Refresh, or the opposite: assuming none of them ever will.** Both are wrong in a way that costs debugging time. A components file can safely export a plain constant next to its component; the boundary only breaks when that constant's *value* changes between saves, not merely by its presence. A components file exporting a `defaultProps`-style object, a memoized style, or a fixed size value is common and fine; changing that object's contents is the moment Fast Refresh's guarantee ends for that file, and it's easy to mistake \"my whole page just reset\" for a JSX bug when the actual cause was two lines above the JSX entirely.  **Treating a case-insensitive-filesystem casing bug as \"HMR is broken.\"** `import Button from \"./button\"` against an on-di" }
      },
    ]
  },
  {
    id = "00-009",
    number = 9,
    title = "Virtual Modules (`virtual:` convention)",
    local_chapter_file = "009-virtual-modules-virtual-convention.md",
    key_concepts = ["An import with nothing on disk behind it", "JS primer: what a plugin hook actually is", "The concept: `resolveId` + `load`, and the `\\0` prefix", "Minimal example, and what it renders", "Predict what happens: does the footer update on every edit?", "Matching by regex, and a hook's own `order`"],
    total_duration_seconds = 270,
    videos = [
      {
        id = "UzA6Qzk6VjE6MDA5LXZp",
        raw_key = "S0:C9:V1",
        title = "What is React?",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/what-is-react",
        duration_text = "02m20s",
        duration_seconds = 140,
        description = "In-depth walkthrough of Virtual Modules (`virtual:` convention), examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Getting Started", url = "https://vite.dev/guide/", description = "Fast scaffolding, dev server architecture, and project templates." },
          { label = "React Docs: Build a React App from Scratch", url = "https://react.dev/learn/build-a-react-app-from-scratch", description = "Minimal HTML container, DOM mounting, and script bundling." },
        ],
        notes = { definition = "Every `import` you've written so far in this course points at something real: a `.tsx` file, a `.png` `static-asset-url-import.md` turned into a URL, a `.env` value `vite-env-variables-and-modes-import-meta-env.md` replaced at build time. Open the file, and the thing you imported is sitting right there on disk.  Acme's docs site wants one more thing in every page's footer: which build this is. Not a version pulled from `package.json` (that only changes on a release), something that changes on every single `bun run dev` restart and every `bun run build`, a plain timestamp. Writing that to an actual file (`src/build-info.ts`, regenerated by a script before every build) works, but it means a build script has to run before Vite ever starts, and that script has to remember to run every time, including the one time a teammate forgets and ships yesterday's timestamp.", mental_model = "Virtual modules are how a whole category of real plugins hand build-time information to your app without a code-generation step you have to remember to run: PWA tooling exposing `virtual:pwa-register` for a service-worker registration snippet, a design system injecting generated theme tokens, an i18n toolchain assembling a locale's strings into one module at build time. Reaching for a virtual module instead of a generated file on disk removes an entire class of \"the generated file is stale\" bug, since there's no file to go stale, the content is computed fresh every time something actually asks for it.  The `\\0` convention and the `resolveId`/`load` pairing matter beyond writing your own plugins, too: reading a third-party plugin's source (or debugging why an import resolves the way it does) is a lot less mysterious once `\\0some-id` in a stack trace or `vite-plugin-inspect`'s module list reads as \"this is a virtual module, not a missing file,\" rather than as a typo.", code_example = "// vite.config.ts\nimport { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\n\nfunction buildInfoPlugin(): Plugin {\n  const virtualModuleId = \"virtual:build-info\";\n  const resolvedId = \"\\0\" + virtualModuleId;\n  return {\n    name: \"acme-build-info\",\n    resolveId(source) {\n      if (source === virtualModuleId) return resolvedId;\n    },\n    load(id) {\n      if (id === resolvedId) {\n        return `export const buildId = ${JSON.stringify(Date.now())};`;\n      }\n    },\n  };\n}\n\nexport default defineConfig({\n  plugins: [react(), buildInfoPlugin()],\n});", pitfalls = "**Importing a virtual module from a `.ts`/`.tsx` file with no ambient declaration.** `tsc --noEmit` doesn't run Vite's plugins, so it has no `resolveId` or `load` to ask. It reports exactly the error you'd get for any genuinely missing module:  The fix is the `declare module \"virtual:build-info\" { ... }` block from the combined example above, usually kept in one shared `vite-env.d.ts` alongside the `/// <reference types=\"vite/client\" />` line `vite-env-variables-and-modes-import-meta-env.md` already introduced.  **A `load` filter that doesn't match what `resolveId` actually returned.** Copy-pasting a virtual-module plugin and renaming the id in `resolveId` but missing one spot in `load`'s filter leaves `load` unable to recognize the id `resolveId` just resolved. No plugin's `load` claims i" }
      },
      {
        id = "UzA6Qzk6VjI6MDA5LXZp",
        raw_key = "S0:C9:V2",
        title = "How to use Codespaces and what you should know",
        url = "https://www.linkedin.com/learning/react-essential-training/how-to-use-codespaces-what-you-should-know",
        duration_text = "02m10s",
        duration_seconds = 130,
        description = "In-depth walkthrough of Virtual Modules (`virtual:` convention), examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "React Essential Training",
        references = [
          { label = "Vite Guide: Getting Started", url = "https://vite.dev/guide/", description = "Fast scaffolding, dev server architecture, and project templates." },
          { label = "React Docs: Build a React App from Scratch", url = "https://react.dev/learn/build-a-react-app-from-scratch", description = "Minimal HTML container, DOM mounting, and script bundling." },
        ],
        notes = { definition = "Every `import` you've written so far in this course points at something real: a `.tsx` file, a `.png` `static-asset-url-import.md` turned into a URL, a `.env` value `vite-env-variables-and-modes-import-meta-env.md` replaced at build time. Open the file, and the thing you imported is sitting right there on disk.  Acme's docs site wants one more thing in every page's footer: which build this is. Not a version pulled from `package.json` (that only changes on a release), something that changes on every single `bun run dev` restart and every `bun run build`, a plain timestamp. Writing that to an actual file (`src/build-info.ts`, regenerated by a script before every build) works, but it means a build script has to run before Vite ever starts, and that script has to remember to run every time, including the one time a teammate forgets and ships yesterday's timestamp.", mental_model = "Virtual modules are how a whole category of real plugins hand build-time information to your app without a code-generation step you have to remember to run: PWA tooling exposing `virtual:pwa-register` for a service-worker registration snippet, a design system injecting generated theme tokens, an i18n toolchain assembling a locale's strings into one module at build time. Reaching for a virtual module instead of a generated file on disk removes an entire class of \"the generated file is stale\" bug, since there's no file to go stale, the content is computed fresh every time something actually asks for it.  The `\\0` convention and the `resolveId`/`load` pairing matter beyond writing your own plugins, too: reading a third-party plugin's source (or debugging why an import resolves the way it does) is a lot less mysterious once `\\0some-id` in a stack trace or `vite-plugin-inspect`'s module list reads as \"this is a virtual module, not a missing file,\" rather than as a typo.", code_example = "// vite.config.ts\nimport { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\n\nfunction buildInfoPlugin(): Plugin {\n  const virtualModuleId = \"virtual:build-info\";\n  const resolvedId = \"\\0\" + virtualModuleId;\n  return {\n    name: \"acme-build-info\",\n    resolveId(source) {\n      if (source === virtualModuleId) return resolvedId;\n    },\n    load(id) {\n      if (id === resolvedId) {\n        return `export const buildId = ${JSON.stringify(Date.now())};`;\n      }\n    },\n  };\n}\n\nexport default defineConfig({\n  plugins: [react(), buildInfoPlugin()],\n});", pitfalls = "**Importing a virtual module from a `.ts`/`.tsx` file with no ambient declaration.** `tsc --noEmit` doesn't run Vite's plugins, so it has no `resolveId` or `load` to ask. It reports exactly the error you'd get for any genuinely missing module:  The fix is the `declare module \"virtual:build-info\" { ... }` block from the combined example above, usually kept in one shared `vite-env.d.ts` alongside the `/// <reference types=\"vite/client\" />` line `vite-env-variables-and-modes-import-meta-env.md` already introduced.  **A `load` filter that doesn't match what `resolveId` actually returned.** Copy-pasting a virtual-module plugin and renaming the id in `resolveId` but missing one spot in `load`'s filter leaves `load` unable to recognize the id `resolveId` just resolved. No plugin's `load` claims i" }
      },
    ]
  },
  {
    id = "00-010",
    number = 10,
    title = "Vite Middleware Mode",
    local_chapter_file = "010-vite-middleware-mode.md",
    key_concepts = ["One shared circuit, then a whole panel", "`appType` is the other half of `middlewareMode`", "The Environment API: naming more than one circuit", "Minimal example: the SSR preview server, made environment-aware", "Predict what happens: same server, `appType` left at its default", "Common mistakes"],
    total_duration_seconds = 328,
    videos = [
      {
        id = "UzA6QzEwOlYxOjAxMC12",
        raw_key = "S0:C10:V1",
        title = "Set up modern development environment",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/set-up-modern-development-environment",
        duration_text = "03m08s",
        duration_seconds = 188,
        description = "In-depth walkthrough of Vite Middleware Mode, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "`virtual-modules-virtual-convention.md` ended with a working SSR preview server: `vite.middlewares` mounted on a plain `node:http` server, one request handler reading `index.html`, calling `vite.transformIndexHtml`, then `vite.ssrLoadModule('/src/entry-server.tsx')` to render. That setup has exactly two things going on: a client bundle (the browser tab) and one \"ssr\" bundle (the render call, running in Node). Vite's older APIs treat that second thing as a single boolean, `ssr: true`, threaded through hooks and options wherever it matters.  A single breaker switch is fine for a house with one circuit beyond the main one. It stops being fine the day you need a second: an edge runtime (a Cloudflare Worker rendering a subset of routes), a separate React Server Components graph, a worker-thread pool. `ssr: true` can only ever answer \"is this the one other thing, or not.\" It has no way to say *which* other thing, once there's more than one.", mental_model = "Every framework that embeds Vite in a custom dev server, an SSR meta- framework, a component-explorer tool, a test runner's browser mode, goes through exactly the `middlewareMode` plus `appType: \"custom\"` combination this chapter opened with. Reading one of those tools' source for the first time is a lot less mysterious once `vite.middlewares`, `appType`, and `transformIndexHtml` read as \"the same three pieces this course already built a small version of,\" rather than framework-specific magic.  The Environment API matters for the same reason a bit further out: a project that later adds React Server Components (this course's own RSC chapters return to this) typically needs a distinct environment for the RSC module graph, separate from `client` and `ssr`, each with its own resolve conditions. Recognizing `this.environment.name`, `applyToEnvironment`, and `server.environments` on sight is what turns \"this plugin's config looks completely different from a normal Vite plugin\" into \"this is the same panel of named environments, with a third circuit added.\"", code_example = "// scripts/ssr-preview-server.ts\nimport { resolve } from \"node:path\";\nimport { readFileSync } from \"node:fs\";\nimport { fileURLToPath } from \"node:url\";\nimport { createServer as createHttpServer } from \"node:http\";\nimport { createServer } from \"vite\";\n\nconst projectRoot = fileURLToPath(new URL(\"..\", import.meta.url));\n\nconst vite = await createServer({\n  configFile: false,\n  root: projectRoot,\n  appType: \"custom\",\n  server: { middlewareMode: true },\n});\n\nvite.middlewares.use(async (req, res, next) => {\n  const url = req.originalUrl ?? req.url ?? \"/\";\n\n  try {\n    const templatePath = resolve(projectRoot, \"index.html\");\n    let template = readFileSync(templatePath, \"utf-8\");\n    template = await vite.transformIndexHtml(url, template);\n\n    const ssrEnvironment = vite.environments.ssr;\n    co", pitfalls = "**Setting `middlewareMode: true` and expecting HTML routing to already be disabled.** As above: `curl` returns the client shell, not your rendered page, and no error is thrown anywhere, which is what makes this one easy to miss in development. The fix is `appType: \"custom\"` alongside `middlewareMode: true`, not instead of it.  **Branching on `options?.ssr` once a third environment exists.** A hook written against the old two-way flag:  `options?.ssr` is falsy for `client`, and also falsy for a newly-added `edge` environment, since that flag never had a third state to represent \"edge.\" `injectBrowserGlobals` now runs for `edge` too, and the edge bundle throws the moment it actually executes in a runtime with no `window`:  Checking `this.environment.name === \"client\"` instead of `!options?.s" }
      },
      {
        id = "UzA6QzEwOlYyOjAxMC12",
        raw_key = "S0:C10:V2",
        title = "What is React?",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/what-is-react",
        duration_text = "02m20s",
        duration_seconds = 140,
        description = "In-depth walkthrough of Vite Middleware Mode, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Env Variables and Modes", url = "https://vite.dev/guide/env-and-mode.html", description = "import.meta.env prefixes, .env files, and mode switches." },
          { label = "TypeScript Handbook: Compiler Options", url = "https://www.typescriptlang.org/docs/handbook/compiler-options.html", description = "Strict typing for custom environment declarations." },
        ],
        notes = { definition = "`virtual-modules-virtual-convention.md` ended with a working SSR preview server: `vite.middlewares` mounted on a plain `node:http` server, one request handler reading `index.html`, calling `vite.transformIndexHtml`, then `vite.ssrLoadModule('/src/entry-server.tsx')` to render. That setup has exactly two things going on: a client bundle (the browser tab) and one \"ssr\" bundle (the render call, running in Node). Vite's older APIs treat that second thing as a single boolean, `ssr: true`, threaded through hooks and options wherever it matters.  A single breaker switch is fine for a house with one circuit beyond the main one. It stops being fine the day you need a second: an edge runtime (a Cloudflare Worker rendering a subset of routes), a separate React Server Components graph, a worker-thread pool. `ssr: true` can only ever answer \"is this the one other thing, or not.\" It has no way to say *which* other thing, once there's more than one.", mental_model = "Every framework that embeds Vite in a custom dev server, an SSR meta- framework, a component-explorer tool, a test runner's browser mode, goes through exactly the `middlewareMode` plus `appType: \"custom\"` combination this chapter opened with. Reading one of those tools' source for the first time is a lot less mysterious once `vite.middlewares`, `appType`, and `transformIndexHtml` read as \"the same three pieces this course already built a small version of,\" rather than framework-specific magic.  The Environment API matters for the same reason a bit further out: a project that later adds React Server Components (this course's own RSC chapters return to this) typically needs a distinct environment for the RSC module graph, separate from `client` and `ssr`, each with its own resolve conditions. Recognizing `this.environment.name`, `applyToEnvironment`, and `server.environments` on sight is what turns \"this plugin's config looks completely different from a normal Vite plugin\" into \"this is the same panel of named environments, with a third circuit added.\"", code_example = "// scripts/ssr-preview-server.ts\nimport { resolve } from \"node:path\";\nimport { readFileSync } from \"node:fs\";\nimport { fileURLToPath } from \"node:url\";\nimport { createServer as createHttpServer } from \"node:http\";\nimport { createServer } from \"vite\";\n\nconst projectRoot = fileURLToPath(new URL(\"..\", import.meta.url));\n\nconst vite = await createServer({\n  configFile: false,\n  root: projectRoot,\n  appType: \"custom\",\n  server: { middlewareMode: true },\n});\n\nvite.middlewares.use(async (req, res, next) => {\n  const url = req.originalUrl ?? req.url ?? \"/\";\n\n  try {\n    const templatePath = resolve(projectRoot, \"index.html\");\n    let template = readFileSync(templatePath, \"utf-8\");\n    template = await vite.transformIndexHtml(url, template);\n\n    const ssrEnvironment = vite.environments.ssr;\n    co", pitfalls = "**Setting `middlewareMode: true` and expecting HTML routing to already be disabled.** As above: `curl` returns the client shell, not your rendered page, and no error is thrown anywhere, which is what makes this one easy to miss in development. The fix is `appType: \"custom\"` alongside `middlewareMode: true`, not instead of it.  **Branching on `options?.ssr` once a third environment exists.** A hook written against the old two-way flag:  `options?.ssr` is falsy for `client`, and also falsy for a newly-added `edge` environment, since that flag never had a third state to represent \"edge.\" `injectBrowserGlobals` now runs for `edge` too, and the edge bundle throws the moment it actually executes in a runtime with no `window`:  Checking `this.environment.name === \"client\"` instead of `!options?.s" }
      },
    ]
  },
  {
    id = "00-011",
    number = 11,
    title = "Vite ModuleRunner",
    local_chapter_file = "011-vite-modulerunner.md",
    key_concepts = ["Opening the box `ssrEnvironment.runner.import(...)` came in", "`ModuleRunner`: the piece that actually executes code", "`ModuleRunnerTransport`: the courier", "`ModuleEvaluator`: what actually runs the code", "A primer on `Promise.all`, then Vite's own JavaScript API", "Where this API came from: the Vite 5.1 Runtime API"],
    total_duration_seconds = 680,
    videos = [
      {
        id = "UzA6QzExOlYxOjAxMS12",
        raw_key = "S0:C11:V1",
        title = "VS Code and extensions",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/vs-code-and-extensions",
        duration_text = "06m12s",
        duration_seconds = 372,
        description = "In-depth walkthrough of Vite ModuleRunner, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Getting Started", url = "https://vite.dev/guide/", description = "Fast scaffolding, dev server architecture, and project templates." },
          { label = "React Docs: Build a React App from Scratch", url = "https://react.dev/learn/build-a-react-app-from-scratch", description = "Minimal HTML container, DOM mounting, and script bundling." },
        ],
        notes = { definition = "`vite-middleware-mode.md` ended with one line quietly doing a lot of work:  That chapter treated `.runner` as a black box: call `.import(url)`, get back the same module namespace `vite.ssrLoadModule` would have handed you. This chapter opens the box. `.runner` is a `ModuleRunner`, and a `ModuleRunner` is built from three separate pieces that Vite deliberately keeps apart, because each one answers a different question.", mental_model = "Almost nothing here is code you'll write in a typical app: most React projects never construct a `ModuleRunner`, a `ModuleRunnerTransport`, or a custom `ModuleEvaluator` by hand. Framework authors do, though, and the list is long, Vitest's browser mode, Storybook's Vite builder, Remix's and Next.js's own dev tooling (where it applies), any tool that says \"powered by Vite\" while running your code somewhere Vite's default Node-process shortcut doesn't reach. Recognizing `ModuleRunner`, `hotUpdate`, and `environment.moduleGraph` on sight turns reading one of those tools' source for the first time into \"this is the same three pieces this chapter named,\" instead of unfamiliar framework-specific machinery.  The SSR-facing half (externals, the manifest, `ssrFixStacktrace`) is the part of this chapter you're more likely to touch directly: any team shipping a custom SSR server, not a framework, hits the ESM-externals error at least once, and the manifest-driven preload pattern is the standard way a hand- rolled SSR setup avoids a waterfall where the browser only discovers a lazy component's file after the main bundle has already finished loading and started executing.", code_example = "const { render } = await ssrEnvironment.runner.import(\"/src/entry-server.tsx\");", pitfalls = "**Hand-rolling module execution instead of using `ModuleRunner`.** Reading a `.tsx` file with `fs.readFileSync` and evaluating it directly (a regex to strip `import`/`export` lines, then `new Function(...)` on what's left) skips Vite's entire transform pipeline: no JSX transform, no path alias resolution, no environment variable substitution. The moment the source contains real JSX, the raw string still contains the literal `<` from a JSX element when `new Function` tries to parse it as plain JavaScript:  `ModuleRunner.import(url)` (or `ssrEnvironment.runner.import(url)`) runs the file through the same pipeline `vite.ssrLoadModule` uses, transformed first, executed second, in that order, every time.  **Branching a `hotUpdate` (or the older `handleHotUpdate`) hook on file extension alone, i" }
      },
      {
        id = "UzA6QzExOlYyOjAxMS12",
        raw_key = "S0:C11:V2",
        title = "Explanation of code with async thunk and slice",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/explanation-of-code-with-async-thunk-and-slice",
        duration_text = "05m08s",
        duration_seconds = 308,
        description = "In-depth walkthrough of Vite ModuleRunner, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Vite Guide: Getting Started", url = "https://vite.dev/guide/", description = "Fast scaffolding, dev server architecture, and project templates." },
          { label = "React Docs: Build a React App from Scratch", url = "https://react.dev/learn/build-a-react-app-from-scratch", description = "Minimal HTML container, DOM mounting, and script bundling." },
        ],
        notes = { definition = "`vite-middleware-mode.md` ended with one line quietly doing a lot of work:  That chapter treated `.runner` as a black box: call `.import(url)`, get back the same module namespace `vite.ssrLoadModule` would have handed you. This chapter opens the box. `.runner` is a `ModuleRunner`, and a `ModuleRunner` is built from three separate pieces that Vite deliberately keeps apart, because each one answers a different question.", mental_model = "Almost nothing here is code you'll write in a typical app: most React projects never construct a `ModuleRunner`, a `ModuleRunnerTransport`, or a custom `ModuleEvaluator` by hand. Framework authors do, though, and the list is long, Vitest's browser mode, Storybook's Vite builder, Remix's and Next.js's own dev tooling (where it applies), any tool that says \"powered by Vite\" while running your code somewhere Vite's default Node-process shortcut doesn't reach. Recognizing `ModuleRunner`, `hotUpdate`, and `environment.moduleGraph` on sight turns reading one of those tools' source for the first time into \"this is the same three pieces this chapter named,\" instead of unfamiliar framework-specific machinery.  The SSR-facing half (externals, the manifest, `ssrFixStacktrace`) is the part of this chapter you're more likely to touch directly: any team shipping a custom SSR server, not a framework, hits the ESM-externals error at least once, and the manifest-driven preload pattern is the standard way a hand- rolled SSR setup avoids a waterfall where the browser only discovers a lazy component's file after the main bundle has already finished loading and started executing.", code_example = "const { render } = await ssrEnvironment.runner.import(\"/src/entry-server.tsx\");", pitfalls = "**Hand-rolling module execution instead of using `ModuleRunner`.** Reading a `.tsx` file with `fs.readFileSync` and evaluating it directly (a regex to strip `import`/`export` lines, then `new Function(...)` on what's left) skips Vite's entire transform pipeline: no JSX transform, no path alias resolution, no environment variable substitution. The moment the source contains real JSX, the raw string still contains the literal `<` from a JSX element when `new Function` tries to parse it as plain JavaScript:  `ModuleRunner.import(url)` (or `ssrEnvironment.runner.import(url)`) runs the file through the same pipeline `vite.ssrLoadModule` uses, transformed first, executed second, in that order, every time.  **Branching a `hotUpdate` (or the older `handleHotUpdate`) hook on file extension alone, i" }
      },
    ]
  },
  {
    id = "00-012",
    number = 12,
    title = "tsconfig.json",
    local_chapter_file = "012-tsconfig-json.md",
    key_concepts = ["A style sheet the compiler reads before it looks at your code", "Why one project ends up with more than one tsconfig file", "The options worth knowing by name", "Minimal example: checking one project, then all of them", "Predict what happens: running tsc against the bare root config", "Common mistakes"],
    total_duration_seconds = 813,
    videos = [
      {
        id = "UzA6QzEyOlYxOjAxMi10",
        raw_key = "S0:C12:V1",
        title = "Running your first React project",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/running-your-first-react-project",
        duration_text = "08m10s",
        duration_seconds = 490,
        description = "In-depth walkthrough of tsconfig.json, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "TypeScript Handbook: tsconfig.json Reference", url = "https://www.typescriptlang.org/docs/handbook/tsconfig-json.html", description = "Strict compiler flags, noImplicitAny, and moduleResolution." },
          { label = "Vite Guide: Features - TypeScript", url = "https://vite.dev/guide/features.html#typescript", description = "How Vite handles esbuild transpilation and isolated modules." },
        ],
        notes = { definition = "Picture handing a manuscript to a copy editor who won't start marking it up until you've told them which style guide to enforce: British or American spelling, Oxford comma or not, which sections to skip entirely. `tsconfig.json` is that style guide for `tsc`, the TypeScript compiler. It doesn't produce any JavaScript by itself, and it doesn't know anything about your components. It answers three questions before the compiler reads a single `.tsx` file: how strict should type-checking be, which files count as \"this project,\" and, once a codebase is bigger than one folder, which other projects does this one depend on.  Formally: `tsconfig.json` configures the TypeScript compiler's options and, in a codebase with more than one buildable unit, its project references. A `compilerOptions` block sets flags like `strict`, `target`, and `jsx`. An `include` (or `files`) list decides which source files those options apply to. A `references` array points at other `tsconfig` files this one depends on, so a build tool (or `tsc` itself) knows what order to check things in.", mental_model = "Every one of the four mistakes above is silent or near-silent in the editor, which is why `tsconfig.json` earns a place in continuous integration, alongside a local `bun run dev` session, not instead of one. A CI job that runs `bun run typecheck` across a **matrix** of environments, say `ubuntu-latest`, `windows-latest`, and `macos-latest`, with `fail-fast: false` so one platform's failure doesn't hide the others, catches a config that only breaks somewhere the whole team doesn't happen to develop on:  `moduleResolution`, `jsx`, and the rest also power two tools you'll use every day without opening `tsconfig.json` directly: your editor's inline red squiggles (VS Code's built-in TypeScript server reads the nearest `tsconfig.json` to know what to flag), and any type-aware ESLint rule (a later chapter in this course points `typescript-eslint`'s parser at this exact file). Get `tsconfig.json` wrong and both of those tools either miss real problems or invent fake ones; get it right once, and every tool downstream inherits the same correct picture of your project for free.", code_example = "bunx tsc --build tsconfig.solutions.json", pitfalls = "**Forgetting `jsx` in `compilerOptions`.** A `.tsx` file compiled with no `jsx` option set:  Both errors point at the same missing setting. Add `\"jsx\": \"react-jsx\"` and both disappear together; there's nothing else to fix.  **A plain value import where `verbatimModuleSyntax` expects a type-only one.**  export function isTodo(x: unknown): x is Todo {   return typeof x === \"object\" && x !== null && \"id\" in x; } ```" }
      },
      {
        id = "UzA6QzEyOlYyOjAxMi10",
        raw_key = "S0:C12:V2",
        title = "Core concepts and theming with tailwind.config.js",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/core-concepts-and-theming-with-tailwind-config-js",
        duration_text = "05m23s",
        duration_seconds = 323,
        description = "In-depth walkthrough of tsconfig.json, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "TypeScript Handbook: tsconfig.json Reference", url = "https://www.typescriptlang.org/docs/handbook/tsconfig-json.html", description = "Strict compiler flags, noImplicitAny, and moduleResolution." },
          { label = "Vite Guide: Features - TypeScript", url = "https://vite.dev/guide/features.html#typescript", description = "How Vite handles esbuild transpilation and isolated modules." },
        ],
        notes = { definition = "Picture handing a manuscript to a copy editor who won't start marking it up until you've told them which style guide to enforce: British or American spelling, Oxford comma or not, which sections to skip entirely. `tsconfig.json` is that style guide for `tsc`, the TypeScript compiler. It doesn't produce any JavaScript by itself, and it doesn't know anything about your components. It answers three questions before the compiler reads a single `.tsx` file: how strict should type-checking be, which files count as \"this project,\" and, once a codebase is bigger than one folder, which other projects does this one depend on.  Formally: `tsconfig.json` configures the TypeScript compiler's options and, in a codebase with more than one buildable unit, its project references. A `compilerOptions` block sets flags like `strict`, `target`, and `jsx`. An `include` (or `files`) list decides which source files those options apply to. A `references` array points at other `tsconfig` files this one depends on, so a build tool (or `tsc` itself) knows what order to check things in.", mental_model = "Every one of the four mistakes above is silent or near-silent in the editor, which is why `tsconfig.json` earns a place in continuous integration, alongside a local `bun run dev` session, not instead of one. A CI job that runs `bun run typecheck` across a **matrix** of environments, say `ubuntu-latest`, `windows-latest`, and `macos-latest`, with `fail-fast: false` so one platform's failure doesn't hide the others, catches a config that only breaks somewhere the whole team doesn't happen to develop on:  `moduleResolution`, `jsx`, and the rest also power two tools you'll use every day without opening `tsconfig.json` directly: your editor's inline red squiggles (VS Code's built-in TypeScript server reads the nearest `tsconfig.json` to know what to flag), and any type-aware ESLint rule (a later chapter in this course points `typescript-eslint`'s parser at this exact file). Get `tsconfig.json` wrong and both of those tools either miss real problems or invent fake ones; get it right once, and every tool downstream inherits the same correct picture of your project for free.", code_example = "bunx tsc --build tsconfig.solutions.json", pitfalls = "**Forgetting `jsx` in `compilerOptions`.** A `.tsx` file compiled with no `jsx` option set:  Both errors point at the same missing setting. Add `\"jsx\": \"react-jsx\"` and both disappear together; there's nothing else to fix.  **A plain value import where `verbatimModuleSyntax` expects a type-only one.**  export function isTodo(x: unknown): x is Todo {   return typeof x === \"object\" && x !== null && \"id\" in x; } ```" }
      },
    ]
  },
]
+++

This section covers **Environment, Vite & Modern Web Tooling** (Part 1: React & Tooling Foundations), featuring **24 curated LinkedIn Learning video lessons**, comprehensive pop-up chapter study notes with **Ask AI**, and official React documentation references across all 12 core chapters.
