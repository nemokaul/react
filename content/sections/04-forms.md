+++
title = "Forms & Schema Validation"
weight = 5
[extra]
section_number = 4
section_id = "section-04"
part = 2
part_title = "Part 2: Reactive State, Hooks & Forms"
total_videos = 18
total_duration_seconds = 4771
recommended_courses = [
  { title = "Build Modern Web Apps with React: Hooks, State Management, and APIs Using Vite or Next.js", url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js", author = "LinkedIn Learning", duration = "5h 45m", scope = "Controlled vs uncontrolled forms, React Hook Form (RHF), useForm, watch, Zod schema validation, and custom resolvers." },
  { title = "Master React 19 and Next.js 16 with Hands-On Projects", url = "https://www.linkedin.com/learning/master-react-19-and-next-js-16-with-hands-on-projects-and-real-world-applications", author = "LinkedIn Learning", duration = "4h 20m", scope = "Advanced form handling with react-hook-form, Zod validation, and React 19 form actions." },
]
chapters = [
  {
    id = "04-001",
    number = 1,
    title = "Forms with React Hook Form",
    local_chapter_file = "001-forms-with-rhf.md",
    key_concepts = ["The concept", "Predict the render", "Sharing a form with nested components", "Controlled components and declarative submission", "Common mistakes", "Why this matters"],
    total_duration_seconds = 389,
    videos = [
      {
        id = "UzQ6QzE6VjE6MDAxLWZv",
        raw_key = "S4:C1:V1",
        title = "Benefits: Performance, reusability, strong community, SEO (with SSR/SSG)",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/benefits-performance-reusability-strong-community-seo-with-ssr-ssg",
        duration_text = "03m01s",
        duration_seconds = 181,
        description = "In-depth walkthrough of Forms with React Hook Form, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React Hook Form Official Documentation", url = "https://react-hook-form.com/get-started", description = "Performant, flexible, and extensible forms with easy-to-use validation." },
          { label = "React Docs: Form Actions in React 19", url = "https://react.dev/reference/react-dom/components/form", description = "Native HTML <form> action handlers and progressive enhancement." },
        ],
        notes = { definition = "A paper form has a useful division of labor. The paper holds the answers, while a clerk keeps the checklist, decides whether the form is complete, and delivers it when you sign. React Hook Form (RHF) gives the browser's native inputs that first job and keeps the checklist and submission workflow outside React state.", mental_model = "RHF appears in signup, checkout, settings, and search forms. Its field registration avoids a React state update for every native keystroke, while `formState` lets an error message, submit button, or field wrapper subscribe to exactly the state it displays. Typed field paths catch mismatches between a form's data model and its JSX before a request reaches an API. `Controller` keeps a third-party widget from fighting the form's value ownership. These choices prevent stale submissions, missing fields, validation bypasses, and unnecessary render work.", code_example = "import { useForm, type SubmitHandler } from \"react-hook-form\";\n\ntype Signup = { email: string };\n\nexport function SignupForm() {\n  const { register, handleSubmit } = useForm<Signup>();\n  const onSubmit: SubmitHandler<Signup> = (data) => {\n    console.log(data.email);\n  };\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <label>\n        Email\n        <input type=\"email\" {...register(\"email\")} />\n      </label>\n      <button type=\"submit\">Join</button>\n    </form>\n  );\n}", pitfalls = "1. **Calling the handler directly.** `onSubmit={onSubmit}` skips RHF's validation wrapper. Use `onSubmit={handleSubmit(onSubmit)}`. Otherwise invalid data can reach application code. 2. **Forgetting the spread.** `register(\"email\")` alone does not attach the returned `ref` and handlers. If you write `<input {...register(\"email\")} />` as `<input register={register(\"email\")} />`, TypeScript reports `Property 'register' does not exist on type 'DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>'.` Spread the result. 3. **Using a misspelled path.** With `useForm<Profile>()`, `register(\"acount.email\")` produces `Argument of type '\"acount.email\"' is not assignable to parameter of type '\"account\" | \"account.email\"'.` Correct the path or correct the model. 4. **Expecting `ge" }
      },
      {
        id = "UzQ6QzE6VjI6MDAxLWZv",
        raw_key = "S4:C1:V2",
        title = "React Hook Form",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/react-hook-form",
        duration_text = "03m28s",
        duration_seconds = 208,
        description = "In-depth walkthrough of Forms with React Hook Form, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React Hook Form Official Documentation", url = "https://react-hook-form.com/get-started", description = "Performant, flexible, and extensible forms with easy-to-use validation." },
          { label = "React Docs: Form Actions in React 19", url = "https://react.dev/reference/react-dom/components/form", description = "Native HTML <form> action handlers and progressive enhancement." },
        ],
        notes = { definition = "A paper form has a useful division of labor. The paper holds the answers, while a clerk keeps the checklist, decides whether the form is complete, and delivers it when you sign. React Hook Form (RHF) gives the browser's native inputs that first job and keeps the checklist and submission workflow outside React state.", mental_model = "RHF appears in signup, checkout, settings, and search forms. Its field registration avoids a React state update for every native keystroke, while `formState` lets an error message, submit button, or field wrapper subscribe to exactly the state it displays. Typed field paths catch mismatches between a form's data model and its JSX before a request reaches an API. `Controller` keeps a third-party widget from fighting the form's value ownership. These choices prevent stale submissions, missing fields, validation bypasses, and unnecessary render work.", code_example = "import { useForm, type SubmitHandler } from \"react-hook-form\";\n\ntype Signup = { email: string };\n\nexport function SignupForm() {\n  const { register, handleSubmit } = useForm<Signup>();\n  const onSubmit: SubmitHandler<Signup> = (data) => {\n    console.log(data.email);\n  };\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <label>\n        Email\n        <input type=\"email\" {...register(\"email\")} />\n      </label>\n      <button type=\"submit\">Join</button>\n    </form>\n  );\n}", pitfalls = "1. **Calling the handler directly.** `onSubmit={onSubmit}` skips RHF's validation wrapper. Use `onSubmit={handleSubmit(onSubmit)}`. Otherwise invalid data can reach application code. 2. **Forgetting the spread.** `register(\"email\")` alone does not attach the returned `ref` and handlers. If you write `<input {...register(\"email\")} />` as `<input register={register(\"email\")} />`, TypeScript reports `Property 'register' does not exist on type 'DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>'.` Spread the result. 3. **Using a misspelled path.** With `useForm<Profile>()`, `register(\"acount.email\")` produces `Argument of type '\"acount.email\"' is not assignable to parameter of type '\"account\" | \"account.email\"'.` Correct the path or correct the model. 4. **Expecting `ge" }
      },
    ]
  },
  {
    id = "04-002",
    number = 2,
    title = "Validation with Zod",
    local_chapter_file = "002-validation-with-zod.md",
    key_concepts = ["The concept", "Validation modes in RHF", "Wiring the Zod resolver", "`reset` and the lifecycle of a form", "`useFieldArray` for dynamic lists", "`useLens` for reusable deeply-nested components"],
    total_duration_seconds = 499,
    videos = [
      {
        id = "UzQ6QzI6VjE6MDAyLXZh",
        raw_key = "S4:C2:V1",
        title = "Benefits of Yup and Zod",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/benefits-of-yup-and-zod",
        duration_text = "03m24s",
        duration_seconds = 204,
        description = "In-depth walkthrough of Validation with Zod, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "The previous chapter used RHF's HTML-shaped rules (`required`, `minLength`, `pattern`, `validate`). Those rules are fine for a small form, but they live inside the JSX: each rule is a one-off object, the error message is a string the developer types by hand, and the TypeScript shape of the form is duplicated in the rules. The instant two fields must agree (password matches confirm, end date is after start date), the `register` API starts to hurt.  **Zod** solves the same problem on the other side of the wall. You write a schema that describes the form's data shape once. The schema is the source of truth for both the runtime validator and the TypeScript type. RHF plugs into it through `@hookform/resolvers/zod` and forwards the schema's inferred type to `useForm`, so the field names, the rules, and the errors are all derived from one definition.", mental_model = "Zod turns a form's data contract into a single typed object. RHF runs the contract on every trigger, transforms the resulting `ZodIssue` array into `errors`, and renders the messages. The same schema reappears in a Server Action, a Server Component, a `tanstack-query` mutation, and a `drizzle-zod` row. One definition, many boundaries. The `reset`, `useFieldArray`, `useLens`, and `createFormControl` APIs cover the four lifecycle moves you'll meet in real form code: clear after submit, repeat a row, share a deeply-nested field, and own form state outside React.", code_example = "import { z } from \"zod\";\n\nconst Signup = z.object({\n  email: z.string().email(),\n  password: z.string().min(8),\n  age: z.number().int().min(13),\n});\n\ntype Signup = z.infer<typeof Signup>;\n// type Signup = { email: string; password: string; age: number }\n\nconst ok = Signup.safeParse({ email: \"a@b.test\", password: \"longenough\", age: 21 });\nif (ok.success) {\n  console.log(ok.data.email); // strict: string\n} else {\n  console.log(ok.error.issues[0]?.message);\n}", pitfalls = "1. **Duplicating the type and the schema.** Writing `type Contact = { email: string; ... }` and `const Contact = z.object({ email: z.string(), ... })` separately is a recipe for the schema to drift from the type. Use `z.infer<typeof Contact>` for the type, and pass the schema to `zodResolver`. 2. **Treating `optional` as \"may be missing or empty\".** `z.string().optional()` accepts `undefined` and `\"\"`. To require a non-empty trimmed value, use `z.string().trim().min(1)`. 3. **Forgetting `coerce` on query strings.** `URLSearchParams.get(\"page\")` returns `\"1\"`, not `1`. `z.number().parse(\"1\")` throws. `z.coerce.number().parse(\"1\")` returns `1`. 4. **Not reading `formState` before using it.** Reading `formState.errors` during render subscribes the component to error changes. A component that " }
      },
      {
        id = "UzQ6QzI6VjI6MDAyLXZh",
        raw_key = "S4:C2:V2",
        title = "Zod demo usage",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/zod-demo-usage",
        duration_text = "04m55s",
        duration_seconds = 295,
        description = "In-depth walkthrough of Validation with Zod, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "The previous chapter used RHF's HTML-shaped rules (`required`, `minLength`, `pattern`, `validate`). Those rules are fine for a small form, but they live inside the JSX: each rule is a one-off object, the error message is a string the developer types by hand, and the TypeScript shape of the form is duplicated in the rules. The instant two fields must agree (password matches confirm, end date is after start date), the `register` API starts to hurt.  **Zod** solves the same problem on the other side of the wall. You write a schema that describes the form's data shape once. The schema is the source of truth for both the runtime validator and the TypeScript type. RHF plugs into it through `@hookform/resolvers/zod` and forwards the schema's inferred type to `useForm`, so the field names, the rules, and the errors are all derived from one definition.", mental_model = "Zod turns a form's data contract into a single typed object. RHF runs the contract on every trigger, transforms the resulting `ZodIssue` array into `errors`, and renders the messages. The same schema reappears in a Server Action, a Server Component, a `tanstack-query` mutation, and a `drizzle-zod` row. One definition, many boundaries. The `reset`, `useFieldArray`, `useLens`, and `createFormControl` APIs cover the four lifecycle moves you'll meet in real form code: clear after submit, repeat a row, share a deeply-nested field, and own form state outside React.", code_example = "import { z } from \"zod\";\n\nconst Signup = z.object({\n  email: z.string().email(),\n  password: z.string().min(8),\n  age: z.number().int().min(13),\n});\n\ntype Signup = z.infer<typeof Signup>;\n// type Signup = { email: string; password: string; age: number }\n\nconst ok = Signup.safeParse({ email: \"a@b.test\", password: \"longenough\", age: 21 });\nif (ok.success) {\n  console.log(ok.data.email); // strict: string\n} else {\n  console.log(ok.error.issues[0]?.message);\n}", pitfalls = "1. **Duplicating the type and the schema.** Writing `type Contact = { email: string; ... }` and `const Contact = z.object({ email: z.string(), ... })` separately is a recipe for the schema to drift from the type. Use `z.infer<typeof Contact>` for the type, and pass the schema to `zodResolver`. 2. **Treating `optional` as \"may be missing or empty\".** `z.string().optional()` accepts `undefined` and `\"\"`. To require a non-empty trimmed value, use `z.string().trim().min(1)`. 3. **Forgetting `coerce` on query strings.** `URLSearchParams.get(\"page\")` returns `\"1\"`, not `1`. `z.number().parse(\"1\")` throws. `z.coerce.number().parse(\"1\")` returns `1`. 4. **Not reading `formState` before using it.** Reading `formState.errors` during render subscribes the component to error changes. A component that " }
      },
    ]
  },
  {
    id = "04-003",
    number = 3,
    title = "Zod Schema Types",
    local_chapter_file = "003-zod-schema-types.md",
    key_concepts = ["Mental model", "Primitives and literals", "String validation", "Top-level string format schemas (Zod 4)", "Number validation", "Enums, literals, template literals"],
    total_duration_seconds = 499,
    videos = [
      {
        id = "UzQ6QzM6VjE6MDAzLXpv",
        raw_key = "S4:C3:V1",
        title = "Benefits of Yup and Zod",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/benefits-of-yup-and-zod",
        duration_text = "03m24s",
        duration_seconds = 204,
        description = "In-depth walkthrough of Zod Schema Types, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "The previous chapter treated a Zod schema as one opaque object handed to a resolver. This chapter opens the schema up: the constructors, the constraints, and the three small knobs that decide how a schema behaves when the input doesn't match. Most of these APIs are one-liners, so the chapter leans reference-first: a quick map of what each one does, then a worked example that combines several.", mental_model = "Think of a Zod schema as an assembly line. A value arrives at one end. It passes through a series of stations (type check, format check, range check), then either rolls off the bottom as a parsed value or falls into a bucket of issues. Each station is a method that returns a *new* schema with one more station bolted on.  Nothing validates until `.parse()` runs. Reading the chain only describes the conveyor; it doesn't run it.", code_example = "const Status = z.literal(\"draft\");                 // \"draft\"\nconst OneTrue = z.literal(true);                   // true\nconst Page    = z.coerce.number().int().min(1);    // 1, 2, 3, ...", pitfalls = "1. **Wrapping `z.string().email()`.** Zod 4 promotes email (and friends) to top-level schemas. `z.email()` is shorter, tree-shakes better, and avoids the chained-method deprecation warning. 2. **Forgetting `z.coerce` on numeric inputs.** A `<input type=\"number\" />` form value is still a string in the DOM. `z.coerce.number().parse(\"30\")` is `30`; `z.number().parse(\"30\")` throws. 3. **Using `z.boolean()` for env-style strings.** `z.coerce.boolean().parse(\"false\")` is `true`. The right tool is `z.stringbool()`, which honors `\"true\" | \"1\" | \"yes\" | \"on\"` as truthy. 4. **Reaching for `.optional().default(...)` when only `.default(...)` is needed.** `.default(v)` already accepts `undefined`. The extra `.optional()` widens the output type to `string | undefined`, defeating the default. 5. **Mixin" }
      },
      {
        id = "UzQ6QzM6VjI6MDAzLXpv",
        raw_key = "S4:C3:V2",
        title = "Zod demo usage",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/zod-demo-usage",
        duration_text = "04m55s",
        duration_seconds = 295,
        description = "In-depth walkthrough of Zod Schema Types, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "The previous chapter treated a Zod schema as one opaque object handed to a resolver. This chapter opens the schema up: the constructors, the constraints, and the three small knobs that decide how a schema behaves when the input doesn't match. Most of these APIs are one-liners, so the chapter leans reference-first: a quick map of what each one does, then a worked example that combines several.", mental_model = "Think of a Zod schema as an assembly line. A value arrives at one end. It passes through a series of stations (type check, format check, range check), then either rolls off the bottom as a parsed value or falls into a bucket of issues. Each station is a method that returns a *new* schema with one more station bolted on.  Nothing validates until `.parse()` runs. Reading the chain only describes the conveyor; it doesn't run it.", code_example = "const Status = z.literal(\"draft\");                 // \"draft\"\nconst OneTrue = z.literal(true);                   // true\nconst Page    = z.coerce.number().int().min(1);    // 1, 2, 3, ...", pitfalls = "1. **Wrapping `z.string().email()`.** Zod 4 promotes email (and friends) to top-level schemas. `z.email()` is shorter, tree-shakes better, and avoids the chained-method deprecation warning. 2. **Forgetting `z.coerce` on numeric inputs.** A `<input type=\"number\" />` form value is still a string in the DOM. `z.coerce.number().parse(\"30\")` is `30`; `z.number().parse(\"30\")` throws. 3. **Using `z.boolean()` for env-style strings.** `z.coerce.boolean().parse(\"false\")` is `true`. The right tool is `z.stringbool()`, which honors `\"true\" | \"1\" | \"yes\" | \"on\"` as truthy. 4. **Reaching for `.optional().default(...)` when only `.default(...)` is needed.** `.default(v)` already accepts `undefined`. The extra `.optional()` widens the output type to `string | undefined`, defeating the default. 5. **Mixin" }
      },
    ]
  },
  {
    id = "04-004",
    number = 4,
    title = "Zod `reportInput: true` (Including Input Data in `ZodIssue`s)",
    local_chapter_file = "004-zod-reportinput-true-including-input-data-in-zodissues.md",
    key_concepts = ["Mental model", "The concept", "Minimal example", "Predict the parse", "Reference: Zod 4 error API", "Reference: Zod 4 versioning"],
    total_duration_seconds = 499,
    videos = [
      {
        id = "UzQ6QzQ6VjE6MDA0LXpv",
        raw_key = "S4:C4:V1",
        title = "Benefits of Yup and Zod",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/benefits-of-yup-and-zod",
        duration_text = "03m24s",
        duration_seconds = 204,
        description = "In-depth walkthrough of Zod `reportInput: true` (Including Input Data in `ZodIssue`s), examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "The previous two chapters taught how to write a schema and how to read the `ZodIssue`s it produces. This chapter is about one of the most common reasons a `ZodIssue` feels incomplete: the value that failed validation is *not* in the issue. By default Zod strips the offending input to avoid leaking sensitive data into logs and telemetry. When you want to debug, you opt back in.  const r = Signup.safeParse({ email: \"not-an-email\", age: -1 }); // r.error.issues[0].input  <-- undefined, by default", mental_model = "Think of a `ZodIssue` as a report card for one failed check. The card carries the rule that failed (a `code` like `\"invalid_type\"` or `\"too_small\"`), the path to the offending field (a `path` array), and a human-readable `message`. The card *does not* carry the value that failed, by default.  Why hidden? Two reasons: (1) the input may contain a password, a token, or a PII field that you don't want in error reports; (2) most production code paths only need the rule that failed, not the value. The flip side is that during development, you often *do* want the value to figure out what went wrong. `reportInput: true` is the switch.", code_example = "import { z } from \"zod\";\n\nconst Port = z.int().gte(1).lte(65535);\n\nconst a = Port.safeParse(\"hello\");           // { success: false, error: ZodError }\na.error.issues[0].input;                     // undefined\n\nconst b = Port.safeParse(\"hello\", { reportInput: true });\nb.error.issues[0].input;                     // \"hello\"\n\nconst c = Port.safeParse(99999, { reportInput: true });\nc.error.issues[0].input;                     // 99999\nc.error.issues[0].code;                      // \"too_big\"\nc.error.issues[0].expected;                  // \"<=65535\"\nc.error.issues[0].received;                  // 99999", pitfalls = "1. **Enabling `reportInput: true` in production.** The raw input can contain passwords, tokens, or PII. Production error reporting should log `code`, `path`, and `message`, not the value. Wrap the dev-only helper in `import.meta.env.DEV` (Vite) or `process.env.NODE_ENV !== \"production\"` (Node). 2. **Assuming `issue.input` is always the original value.** With `.transform()` chains, the value Zod sees at one rule may have already been transformed. Walk the chain to know what `input` represents at the failing step. 3. **Type-narrowing `issue.input` without checking `code`.** `ZodIssue` is a discriminated union by `code`. The shape of `input` (and `expected`, `received`) depends on the code. Cast through the `code` field before reading those properties. 4. **Conflating `reportInput` with `rece" }
      },
      {
        id = "UzQ6QzQ6VjI6MDA0LXpv",
        raw_key = "S4:C4:V2",
        title = "Zod demo usage",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/zod-demo-usage",
        duration_text = "04m55s",
        duration_seconds = 295,
        description = "In-depth walkthrough of Zod `reportInput: true` (Including Input Data in `ZodIssue`s), examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "The previous two chapters taught how to write a schema and how to read the `ZodIssue`s it produces. This chapter is about one of the most common reasons a `ZodIssue` feels incomplete: the value that failed validation is *not* in the issue. By default Zod strips the offending input to avoid leaking sensitive data into logs and telemetry. When you want to debug, you opt back in.  const r = Signup.safeParse({ email: \"not-an-email\", age: -1 }); // r.error.issues[0].input  <-- undefined, by default", mental_model = "Think of a `ZodIssue` as a report card for one failed check. The card carries the rule that failed (a `code` like `\"invalid_type\"` or `\"too_small\"`), the path to the offending field (a `path` array), and a human-readable `message`. The card *does not* carry the value that failed, by default.  Why hidden? Two reasons: (1) the input may contain a password, a token, or a PII field that you don't want in error reports; (2) most production code paths only need the rule that failed, not the value. The flip side is that during development, you often *do* want the value to figure out what went wrong. `reportInput: true` is the switch.", code_example = "import { z } from \"zod\";\n\nconst Port = z.int().gte(1).lte(65535);\n\nconst a = Port.safeParse(\"hello\");           // { success: false, error: ZodError }\na.error.issues[0].input;                     // undefined\n\nconst b = Port.safeParse(\"hello\", { reportInput: true });\nb.error.issues[0].input;                     // \"hello\"\n\nconst c = Port.safeParse(99999, { reportInput: true });\nc.error.issues[0].input;                     // 99999\nc.error.issues[0].code;                      // \"too_big\"\nc.error.issues[0].expected;                  // \"<=65535\"\nc.error.issues[0].received;                  // 99999", pitfalls = "1. **Enabling `reportInput: true` in production.** The raw input can contain passwords, tokens, or PII. Production error reporting should log `code`, `path`, and `message`, not the value. Wrap the dev-only helper in `import.meta.env.DEV` (Vite) or `process.env.NODE_ENV !== \"production\"` (Node). 2. **Assuming `issue.input` is always the original value.** With `.transform()` chains, the value Zod sees at one rule may have already been transformed. Walk the chain to know what `input` represents at the failing step. 3. **Type-narrowing `issue.input` without checking `code`.** `ZodIssue` is a discriminated union by `code`. The shape of `input` (and `expected`, `received`) depends on the code. Cast through the `code` field before reading those properties. 4. **Conflating `reportInput` with `rece" }
      },
    ]
  },
  {
    id = "04-005",
    number = 5,
    title = "Zod to JSON Schema conversion",
    local_chapter_file = "005-zod-to-json-schema-conversion.md",
    key_concepts = ["1. Hook: two labels for the same package", "2. The concept", "3. Minimal example", "4. Predict the result", "5. Common mistakes", "6. Why this matters"],
    total_duration_seconds = 499,
    videos = [
      {
        id = "UzQ6QzU6VjE6MDA1LXpv",
        raw_key = "S4:C5:V1",
        title = "Benefits of Yup and Zod",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/benefits-of-yup-and-zod",
        duration_text = "03m24s",
        duration_seconds = 204,
        description = "In-depth walkthrough of Zod to JSON Schema conversion, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "Imagine a package at a shipping counter. The warehouse uses an internal label with detailed handling instructions. A public carrier accepts a standard label format. You can keep the warehouse label for your own code, then print a JSON Schema label when another system needs to understand the package.  A Zod schema is the internal label. JSON Schema is a portable description of JSON data. `z.toJSONSchema()` prints the portable description. `z.fromJSONSchema()` reads one back into a Zod schema.", mental_model = "You meet this boundary when a React form shares its contract with a route handler, an OpenAPI generator, an AI model, or another language. The Zod schema remains the runtime gate inside the app. The generated JSON Schema gives tools outside the app a common shape to inspect.  The split prevents a particular class of bugs: a UI can appear type-safe while its HTTP payload, generated API document, and runtime parser disagree. Keeping `z.input`, `z.output`, and the exported JSON Schema visible makes coercion, defaults, required keys, and unsupported JavaScript values explicit.", code_example = "import { z } from \"zod\";\n\nconst Profile = z.object({\n  displayName: z.string().min(1),\n  age: z.int().min(0),\n});\n\ntype Profile = z.infer<typeof Profile>;\n\nexport function SchemaPreview() {\n  const jsonSchema = z.toJSONSchema(Profile);\n\n  return (\n    <section>\n      <h2>Profile contract</h2>\n      <pre>{JSON.stringify(jsonSchema, null, 2)}</pre>\n    </section>\n  );\n}", pitfalls = "This deliberately broken call throws at runtime:  z.toJSONSchema(z.date()); ```  The runtime error is an `Error` about an unrepresentable type, commonly shown as:  Use an ISO string schema when the wire format is JSON:" }
      },
      {
        id = "UzQ6QzU6VjI6MDA1LXpv",
        raw_key = "S4:C5:V2",
        title = "Zod demo usage",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/zod-demo-usage",
        duration_text = "04m55s",
        duration_seconds = 295,
        description = "In-depth walkthrough of Zod to JSON Schema conversion, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "Imagine a package at a shipping counter. The warehouse uses an internal label with detailed handling instructions. A public carrier accepts a standard label format. You can keep the warehouse label for your own code, then print a JSON Schema label when another system needs to understand the package.  A Zod schema is the internal label. JSON Schema is a portable description of JSON data. `z.toJSONSchema()` prints the portable description. `z.fromJSONSchema()` reads one back into a Zod schema.", mental_model = "You meet this boundary when a React form shares its contract with a route handler, an OpenAPI generator, an AI model, or another language. The Zod schema remains the runtime gate inside the app. The generated JSON Schema gives tools outside the app a common shape to inspect.  The split prevents a particular class of bugs: a UI can appear type-safe while its HTTP payload, generated API document, and runtime parser disagree. Keeping `z.input`, `z.output`, and the exported JSON Schema visible makes coercion, defaults, required keys, and unsupported JavaScript values explicit.", code_example = "import { z } from \"zod\";\n\nconst Profile = z.object({\n  displayName: z.string().min(1),\n  age: z.int().min(0),\n});\n\ntype Profile = z.infer<typeof Profile>;\n\nexport function SchemaPreview() {\n  const jsonSchema = z.toJSONSchema(Profile);\n\n  return (\n    <section>\n      <h2>Profile contract</h2>\n      <pre>{JSON.stringify(jsonSchema, null, 2)}</pre>\n    </section>\n  );\n}", pitfalls = "This deliberately broken call throws at runtime:  z.toJSONSchema(z.date()); ```  The runtime error is an `Error` about an unrepresentable type, commonly shown as:  Use an ISO string schema when the wire format is JSON:" }
      },
    ]
  },
  {
    id = "04-006",
    number = 6,
    title = "Zod checks and `.check()`",
    local_chapter_file = "006-zod-checks-and-check.md",
    key_concepts = ["Mental model", "The concept", "Worked example: a contact form with mixed Zod surfaces", "Common mistakes", "Why this matters", "Recall check"],
    total_duration_seconds = 499,
    videos = [
      {
        id = "UzQ6QzY6VjE6MDA2LXpv",
        raw_key = "S4:C6:V1",
        title = "Benefits of Yup and Zod",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/benefits-of-yup-and-zod",
        duration_text = "03m24s",
        duration_seconds = 204,
        description = "In-depth walkthrough of Zod checks and `.check()`, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "The previous chapters used the chained-method API (`z.string().min(5).email()`) and treated each chain segment as an unnamed rule. This chapter opens up what those chain methods actually are: every constraint Zod applies after parsing is a small object called a **check**. Checks live in an array on every schema, can be added explicitly with `.check()`, and form the public API of the tree-shakable Zod Mini variant.  // Regular Zod hides checks inside chainable methods. const Email = z.string().min(5).email();", mental_model = "A schema is a conveyor belt. A check is a station bolted onto the end of it. The station does not reshape the value (unless it is a mutation check like `.trim()`); it inspects the value, and either lets it pass or pushes an issue into the error bucket.  input \"abc\"         |         v   $ZodString         |         v   $ZodCheckMinLength  --> issue: too_small ```", code_example = "import { z } from \"zod\";\n\n// Regular Zod hides checks inside chainable methods.\nconst Email = z.string().min(5).email();\n\n// Zod Mini asks for them explicitly.\nimport * as zm from \"zod/mini\";\nconst MiniEmail = zm.string().check(zm.minLength(5), zm.email());\n\n// Both schemas have a `.checks` array on their internals.\n(Email as unknown as { _zod: { def: { checks: unknown[] } } })._zod.def.checks.length; // 2", pitfalls = "The `.check()` method is a Zod Mini API. It works on Mini schemas because Mini has no chainable convenience methods. Calling `.check(...)` on a Classic schema throws:  z.string().check(z.minLength(5)); // TS error: Property 'check' does not exist on type 'ZodString' ```  For Classic, use the chainable methods (`.min(5)`) or build the check directly:  const MinFive = z.string().min(5); // or, if you must: const MinFiveAlt = z.string().check(z.minLength(5) as never); // wrong shape, do not do this ```" }
      },
      {
        id = "UzQ6QzY6VjI6MDA2LXpv",
        raw_key = "S4:C6:V2",
        title = "Zod demo usage",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/zod-demo-usage",
        duration_text = "04m55s",
        duration_seconds = 295,
        description = "In-depth walkthrough of Zod checks and `.check()`, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "The previous chapters used the chained-method API (`z.string().min(5).email()`) and treated each chain segment as an unnamed rule. This chapter opens up what those chain methods actually are: every constraint Zod applies after parsing is a small object called a **check**. Checks live in an array on every schema, can be added explicitly with `.check()`, and form the public API of the tree-shakable Zod Mini variant.  // Regular Zod hides checks inside chainable methods. const Email = z.string().min(5).email();", mental_model = "A schema is a conveyor belt. A check is a station bolted onto the end of it. The station does not reshape the value (unless it is a mutation check like `.trim()`); it inspects the value, and either lets it pass or pushes an issue into the error bucket.  input \"abc\"         |         v   $ZodString         |         v   $ZodCheckMinLength  --> issue: too_small ```", code_example = "import { z } from \"zod\";\n\n// Regular Zod hides checks inside chainable methods.\nconst Email = z.string().min(5).email();\n\n// Zod Mini asks for them explicitly.\nimport * as zm from \"zod/mini\";\nconst MiniEmail = zm.string().check(zm.minLength(5), zm.email());\n\n// Both schemas have a `.checks` array on their internals.\n(Email as unknown as { _zod: { def: { checks: unknown[] } } })._zod.def.checks.length; // 2", pitfalls = "The `.check()` method is a Zod Mini API. It works on Mini schemas because Mini has no chainable convenience methods. Calling `.check(...)` on a Classic schema throws:  z.string().check(z.minLength(5)); // TS error: Property 'check' does not exist on type 'ZodString' ```  For Classic, use the chainable methods (`.min(5)`) or build the check directly:  const MinFive = z.string().min(5); // or, if you must: const MinFiveAlt = z.string().check(z.minLength(5) as never); // wrong shape, do not do this ```" }
      },
    ]
  },
  {
    id = "04-007",
    number = 7,
    title = "Zod Mini check API",
    local_chapter_file = "007-zod-mini-check-api.md",
    key_concepts = ["Mental model", "The `ZodMiniType` and `.check()`", "The full check catalogue", "Custom refinements", "Custom error messages", "Transforms and `.overwrite()`"],
    total_duration_seconds = 499,
    videos = [
      {
        id = "UzQ6Qzc6VjE6MDA3LXpv",
        raw_key = "S4:C7:V1",
        title = "Benefits of Yup and Zod",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/benefits-of-yup-and-zod",
        duration_text = "03m24s",
        duration_seconds = 204,
        description = "In-depth walkthrough of Zod Mini check API, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "The previous chapter showed how `.check()` collects the custom validations that Zod Classic methods like `.refine()` produce one by one. This chapter is the same surface seen from the Zod Mini side: a functional, tree-shakable variant where checks are top-level values you pass into `.check()`. The single mental model is \"a schema is a base type plus a list of check objects you append\", and everything else (refinements, transforms, error customization, defaults, codecs, library compatibility) follows from that one list.", mental_model = "Imagine a passport control gate. The traveler arrives with a passport (the *schema*: `z.string()`). The gate staff run a list of checks in order: \"is the page an email?\", \"is the length at least 5?\", \"is the text trimmed?\". Each check either passes the traveler through or stamps the passport with an issue. The order is yours; the checks are independent values you supply up front.  The class of the schema (`$ZodString`) is preserved across `.check()`. The same call site supports four kinds of entries:", code_example = "import * as z from \"zod/mini\";\n\nconst Email = z.string().check(\n  z.minLength(5, { error: \"Too short\" }),\n  z.email({ error: \"Not an email\" }),\n);\n\nEmail.parse(\"hi@example.test\");        // \"hi@example.test\"\nEmail.parse(\"hi\");                     // throws $ZodError", pitfalls = "1. **Calling `.parse()` on a schema with an async refinement.** Synchronous parse throws synchronously rather than awaiting. Use `.parseAsync()` (or the RHF resolver, which does it for you). 2. **Using `.transform()` where you meant `.overwrite()`.** `.transform()` changes the inferred type and breaks any subsequent `.min()`, `.refine()`, or JSON Schema conversion. If the value mutates but the type stays, `.overwrite()` (or `z.trim()`, `z.toLowerCase()`, etc.) is the right tool. 3. **Reaching for `.default(value)` on a transformed schema expecting Zod 3 semantics.** `.default(\"anon\")` on a `string → number` transform now short-circuits; you get the string default back as the number output (compile error) or `undefined` substituted for the parsed number. Use `.prefault(\"anon\")` instead. 4. " }
      },
      {
        id = "UzQ6Qzc6VjI6MDA3LXpv",
        raw_key = "S4:C7:V2",
        title = "Zod demo usage",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/zod-demo-usage",
        duration_text = "04m55s",
        duration_seconds = 295,
        description = "In-depth walkthrough of Zod Mini check API, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "Zod Official Documentation: Basic Usage", url = "https://zod.dev/?id=basic-usage", description = "TypeScript-first schema validation with static type inference." },
          { label = "React Hook Form: Schema Validation with Zod", url = "https://react-hook-form.com/get-started#schema-validation", description = "Integrating @hookform/resolvers/zod with useForm." },
        ],
        notes = { definition = "The previous chapter showed how `.check()` collects the custom validations that Zod Classic methods like `.refine()` produce one by one. This chapter is the same surface seen from the Zod Mini side: a functional, tree-shakable variant where checks are top-level values you pass into `.check()`. The single mental model is \"a schema is a base type plus a list of check objects you append\", and everything else (refinements, transforms, error customization, defaults, codecs, library compatibility) follows from that one list.", mental_model = "Imagine a passport control gate. The traveler arrives with a passport (the *schema*: `z.string()`). The gate staff run a list of checks in order: \"is the page an email?\", \"is the length at least 5?\", \"is the text trimmed?\". Each check either passes the traveler through or stamps the passport with an issue. The order is yours; the checks are independent values you supply up front.  The class of the schema (`$ZodString`) is preserved across `.check()`. The same call site supports four kinds of entries:", code_example = "import * as z from \"zod/mini\";\n\nconst Email = z.string().check(\n  z.minLength(5, { error: \"Too short\" }),\n  z.email({ error: \"Not an email\" }),\n);\n\nEmail.parse(\"hi@example.test\");        // \"hi@example.test\"\nEmail.parse(\"hi\");                     // throws $ZodError", pitfalls = "1. **Calling `.parse()` on a schema with an async refinement.** Synchronous parse throws synchronously rather than awaiting. Use `.parseAsync()` (or the RHF resolver, which does it for you). 2. **Using `.transform()` where you meant `.overwrite()`.** `.transform()` changes the inferred type and breaks any subsequent `.min()`, `.refine()`, or JSON Schema conversion. If the value mutates but the type stays, `.overwrite()` (or `z.trim()`, `z.toLowerCase()`, etc.) is the right tool. 3. **Reaching for `.default(value)` on a transformed schema expecting Zod 3 semantics.** `.default(\"anon\")` on a `string → number` transform now short-circuits; you get the string default back as the number output (compile error) or `undefined` substituted for the parsed number. Use `.prefault(\"anon\")` instead. 4. " }
      },
    ]
  },
  {
    id = "04-008",
    number = 8,
    title = "Recursive and mutually recursive schemas",
    local_chapter_file = "008-recursive-and-mutually-recursive-schemas.md",
    key_concepts = ["Mental model", "The concept", "Minimal example", "Transforms, pipes, and codecs", "Branded types", "Zod 4 input and output types"],
    total_duration_seconds = 675,
    videos = [
      {
        id = "UzQ6Qzg6VjE6MDA4LXJl",
        raw_key = "S4:C8:V1",
        title = "Prop types",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/prop-types",
        duration_text = "04m04s",
        duration_seconds = 244,
        description = "In-depth walkthrough of Recursive and mutually recursive schemas, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React Hook Form Official Documentation", url = "https://react-hook-form.com/get-started", description = "Performant, flexible, and extensible forms with easy-to-use validation." },
          { label = "React Docs: Form Actions in React 19", url = "https://react.dev/reference/react-dom/components/form", description = "Native HTML <form> action handlers and progressive enhancement." },
        ],
        notes = { definition = "The previous chapters built Zod schemas that look like JSON: a flat `z.object({ a, b, c })` with a list of strings, numbers, and booleans. Real data is rarely flat. A comment thread has comments inside comments. A navigation menu has categories inside categories. A permission system has roles that grant other roles. The moment a value can contain another value of the same shape, every schema writer hits the same wall: how do you write `z.object(...)` that points to itself, without a `TypeError: Cannot access 'Category' before initialization`?  That wall is the topic of this chapter. The solution is a JavaScript getter on a key, with a TypeScript return-type annotation when the inference gets confused. The same trick covers *mutually* recursive types (a `User` that has a `Manager` that has a `User`).", mental_model = "A recursive schema is a boxed reference. Imagine a folder on a computer. The folder has a name, a list of files, and a list of folders. Each of those folders is the same shape: another folder with its own files and folders. In code:  The arrow `folder: Folder[]` points back to the same shape. The folder knows about another folder the same way as it knows about itself. JavaScript handles this with a closure: a getter that returns the schema, evaluated lazily. TypeScript handles it with a return-type annotation when the inference cycle becomes too long.", code_example = "import { z } from \"zod\";\n\nconst Category = z.object({\n  name: z.string(),\n  get subcategories(): z.ZodType<{ name: string; subcategories: Category[] }[]> {\n    return z.array(Category);\n  },\n});\n\ntype Category = z.infer<typeof Category>;\n\nconst tree = Category.parse({\n  name: \"root\",\n  subcategories: [\n    { name: \"tech\", subcategories: [\n      { name: \"frontend\", subcategories: [] },\n      { name: \"backend\", subcategories: [] },\n    ]},\n    { name: \"books\", subcategories: [] },\n  ],\n});\n\nfunction count(c: Category): number {\n  return 1 + c.subcategories.reduce((sum, c) => sum + count(c), 0);\n}\n\ncount(tree); // 5", pitfalls = "1. **Reaching forward with a `const`.** `const A = z.object({ b: B }); const B = z.string();` throws `ReferenceError: Cannot access 'B' before initialization`. Use a getter or `z.lazy(() => B)`. 2. **Missing the return-type annotation on a recursive getter.** TypeScript gives up inference and produces `any`. The compiler still says the code compiles, but downstream code loses the type. Annotate the getter with `: z.ZodType<...>`. 3. **Calling `.transform()` before a chained check.** `z.string().transform((s) => s.length).min(3)` does not compile: `.min` is a string method, and the transform already produced a number. Move the transform to the end, or use `.pipe()`. 4. **Forgetting `unrepresentable: \"any\"` when emitting OpenAPI.** A `z.date()` in the schema throws at `z.toJSONSchema()` time" }
      },
      {
        id = "UzQ6Qzg6VjI6MDA4LXJl",
        raw_key = "S4:C8:V2",
        title = "Text input example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/text-input-example",
        duration_text = "07m11s",
        duration_seconds = 431,
        description = "In-depth walkthrough of Recursive and mutually recursive schemas, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React Hook Form Official Documentation", url = "https://react-hook-form.com/get-started", description = "Performant, flexible, and extensible forms with easy-to-use validation." },
          { label = "React Docs: Form Actions in React 19", url = "https://react.dev/reference/react-dom/components/form", description = "Native HTML <form> action handlers and progressive enhancement." },
        ],
        notes = { definition = "The previous chapters built Zod schemas that look like JSON: a flat `z.object({ a, b, c })` with a list of strings, numbers, and booleans. Real data is rarely flat. A comment thread has comments inside comments. A navigation menu has categories inside categories. A permission system has roles that grant other roles. The moment a value can contain another value of the same shape, every schema writer hits the same wall: how do you write `z.object(...)` that points to itself, without a `TypeError: Cannot access 'Category' before initialization`?  That wall is the topic of this chapter. The solution is a JavaScript getter on a key, with a TypeScript return-type annotation when the inference gets confused. The same trick covers *mutually* recursive types (a `User` that has a `Manager` that has a `User`).", mental_model = "A recursive schema is a boxed reference. Imagine a folder on a computer. The folder has a name, a list of files, and a list of folders. Each of those folders is the same shape: another folder with its own files and folders. In code:  The arrow `folder: Folder[]` points back to the same shape. The folder knows about another folder the same way as it knows about itself. JavaScript handles this with a closure: a getter that returns the schema, evaluated lazily. TypeScript handles it with a return-type annotation when the inference cycle becomes too long.", code_example = "import { z } from \"zod\";\n\nconst Category = z.object({\n  name: z.string(),\n  get subcategories(): z.ZodType<{ name: string; subcategories: Category[] }[]> {\n    return z.array(Category);\n  },\n});\n\ntype Category = z.infer<typeof Category>;\n\nconst tree = Category.parse({\n  name: \"root\",\n  subcategories: [\n    { name: \"tech\", subcategories: [\n      { name: \"frontend\", subcategories: [] },\n      { name: \"backend\", subcategories: [] },\n    ]},\n    { name: \"books\", subcategories: [] },\n  ],\n});\n\nfunction count(c: Category): number {\n  return 1 + c.subcategories.reduce((sum, c) => sum + count(c), 0);\n}\n\ncount(tree); // 5", pitfalls = "1. **Reaching forward with a `const`.** `const A = z.object({ b: B }); const B = z.string();` throws `ReferenceError: Cannot access 'B' before initialization`. Use a getter or `z.lazy(() => B)`. 2. **Missing the return-type annotation on a recursive getter.** TypeScript gives up inference and produces `any`. The compiler still says the code compiles, but downstream code loses the type. Annotate the getter with `: z.ZodType<...>`. 3. **Calling `.transform()` before a chained check.** `z.string().transform((s) => s.length).min(3)` does not compile: `.min` is a string method, and the transform already produced a number. Move the transform to the end, or use `.pipe()`. 4. **Forgetting `unrepresentable: \"any\"` when emitting OpenAPI.** A `z.date()` in the schema throws at `z.toJSONSchema()` time" }
      },
    ]
  },
  {
    id = "04-009",
    number = 9,
    title = "Reusable component API design",
    local_chapter_file = "009-reusable-component-api-design.md",
    key_concepts = ["The mental model", "The concept", "Minimal example", "Type-safe props, events, refs", "Predict the render", "Common mistakes"],
    total_duration_seconds = 713,
    videos = [
      {
        id = "UzQ6Qzk6VjE6MDA5LXJl",
        raw_key = "S4:C9:V1",
        title = "Responsive design examples",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/responsive-design-examples",
        duration_text = "03m53s",
        duration_seconds = 233,
        description = "In-depth walkthrough of Reusable component API design, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React Hook Form Official Documentation", url = "https://react-hook-form.com/get-started", description = "Performant, flexible, and extensible forms with easy-to-use validation." },
          { label = "React Docs: Form Actions in React 19", url = "https://react.dev/reference/react-dom/components/form", description = "Native HTML <form> action handlers and progressive enhancement." },
        ],
        notes = { definition = "A real form needs more than one input. A real app needs more than one form. The difference between a codebase that scales and one that collapses is whether your components generalize before the third copy of them gets written. This chapter is about that generalization: how a single component exposes enough variability through props, `children`, and TypeScript types to absorb the third, fourth, and tenth use case without rewriting itself.", mental_model = "Imagine a wall outlet. The outlet does not care whether you plug in a lamp, a phone charger, or a vacuum. The outlet exposes a small, well-defined contract: two slots, a ground pin, a fixed voltage. Every device that wants electricity conforms to that contract. The outlet is reusable, not because it knows about lamps, but because it knows about electricity.  A reusable React component works the same way. It exposes a small contract (props + `children`), and every consumer conforms. The component stays small because it never knows the consumer's domain. The consumer stays flexible because the component never locks it into one shape.", code_example = "import { useId, type ReactNode } from \"react\";\n\ntype CardProps = {\n  title: string;\n  children: ReactNode;\n  footer?: ReactNode;\n};\n\nexport function Card({ title, children, footer }: CardProps) {\n  return (\n    <section className=\"card\">\n      <h2>{title}</h2>\n      <div>{children}</div>\n      {footer ? <footer>{footer}</footer> : null}\n    </section>\n  );\n}\n\nexport function App() {\n  return (\n    <Card\n      title=\"Account\"\n      footer={<button>Save</button>}\n    >\n      <p>You are signed in.</p>\n    </Card>\n  );\n}", pitfalls = "The component name is `EmailField`, the label is `Email`, the name is `email`. A reusable version is `TextField` with a `label` and `type` prop. Hardcoded labels are the first sign that the component is one-shot.  The component accepts a className but no content. Every consumer wraps it: `<Box className=\"card\"><Inner /></Box>`. That works, but the cleaner API is `<Box className=\"card\">{inner}</Box>` so the box can be combined with anything.  If a parent passes both, React ignores `defaultValue`. If the parent passes neither, the input is uncontrolled. Mixing the two contracts in one signature confuses everyone. Pick one: a controlled component takes `value` and `onChange`; an uncontrolled component takes `defaultValue` and a ref.  TypeScript types `e` as `any` or as `unknown` depending on " }
      },
      {
        id = "UzQ6Qzk6VjI6MDA5LXJl",
        raw_key = "S4:C9:V2",
        title = "Overview and fetch API example",
        url = "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js/overview-and-fetch-api-example",
        duration_text = "08m00s",
        duration_seconds = 480,
        description = "In-depth walkthrough of Reusable component API design, examining real-world production implementations, rendering performance, and TypeScript contracts.",
        category_tag = "Build Modern Web Apps with React, Hooks, State Management, and APIs Using Vite or Next.js",
        references = [
          { label = "React Hook Form Official Documentation", url = "https://react-hook-form.com/get-started", description = "Performant, flexible, and extensible forms with easy-to-use validation." },
          { label = "React Docs: Form Actions in React 19", url = "https://react.dev/reference/react-dom/components/form", description = "Native HTML <form> action handlers and progressive enhancement." },
        ],
        notes = { definition = "A real form needs more than one input. A real app needs more than one form. The difference between a codebase that scales and one that collapses is whether your components generalize before the third copy of them gets written. This chapter is about that generalization: how a single component exposes enough variability through props, `children`, and TypeScript types to absorb the third, fourth, and tenth use case without rewriting itself.", mental_model = "Imagine a wall outlet. The outlet does not care whether you plug in a lamp, a phone charger, or a vacuum. The outlet exposes a small, well-defined contract: two slots, a ground pin, a fixed voltage. Every device that wants electricity conforms to that contract. The outlet is reusable, not because it knows about lamps, but because it knows about electricity.  A reusable React component works the same way. It exposes a small contract (props + `children`), and every consumer conforms. The component stays small because it never knows the consumer's domain. The consumer stays flexible because the component never locks it into one shape.", code_example = "import { useId, type ReactNode } from \"react\";\n\ntype CardProps = {\n  title: string;\n  children: ReactNode;\n  footer?: ReactNode;\n};\n\nexport function Card({ title, children, footer }: CardProps) {\n  return (\n    <section className=\"card\">\n      <h2>{title}</h2>\n      <div>{children}</div>\n      {footer ? <footer>{footer}</footer> : null}\n    </section>\n  );\n}\n\nexport function App() {\n  return (\n    <Card\n      title=\"Account\"\n      footer={<button>Save</button>}\n    >\n      <p>You are signed in.</p>\n    </Card>\n  );\n}", pitfalls = "The component name is `EmailField`, the label is `Email`, the name is `email`. A reusable version is `TextField` with a `label` and `type` prop. Hardcoded labels are the first sign that the component is one-shot.  The component accepts a className but no content. Every consumer wraps it: `<Box className=\"card\"><Inner /></Box>`. That works, but the cleaner API is `<Box className=\"card\">{inner}</Box>` so the box can be combined with anything.  If a parent passes both, React ignores `defaultValue`. If the parent passes neither, the input is uncontrolled. Mixing the two contracts in one signature confuses everyone. Pick one: a controlled component takes `value` and `onChange`; an uncontrolled component takes `defaultValue` and a ref.  TypeScript types `e` as `any` or as `unknown` depending on " }
      },
    ]
  },
]
+++

This section covers **Forms & Schema Validation** (Part 2: Reactive State, Hooks & Forms), featuring **18 curated LinkedIn Learning video lessons**, comprehensive pop-up chapter study notes with **Ask AI**, and official React documentation references across all 9 core chapters.
