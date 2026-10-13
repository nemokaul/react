import fs from "fs";
import path from "path";

const booksDir = path.resolve("..", "react-books");
const staticBooksImgDir = path.resolve("static", "images", "books");

// Ensure base directories exist
const subdirs = [
  "advanced-react",
  "road-to-react",
  "learn-react-hooks",
  "react-architecture",
  "data-fetching",
  "web-performance",
  "learn-react-typescript"
];

for (const sub of subdirs) {
  const p = path.join(staticBooksImgDir, sub);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function copyFileSafe(src: string, dest: string) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

let copiedCount = 0;

// 1. Advanced React (Nadia Makarevich)
const advReactSrc = path.join(booksDir, "Advanced React_ deep dives, investigations, performance -- Nadia Makarevich -- 2023 -- anonymous", "images");
if (fs.existsSync(advReactSrc)) {
  const map: Record<string, string> = {
    "e292879e-6cf7-4cff-b455-8285c32bcb90.png": "re-renders-state-top.png",
    "e94d6975-0495-4148-9336-35fbb29cbdfb.png": "re-renders-state-middle.png",
    "b931f624-aa6f-4317-8b84-164e08a0f47f.png": "memo-preventing-rerenders.png",
    "a8296817-1354-430b-892f-379627f6c5b3.png": "move-state-down-before-after.png",
    "848ed796-25c7-46ae-aa63-7ec9e6effff7.png": "render-props-data-flow.png",
    "27a08f5e-1bb9-49f4-b76a-0dc4d7da7620.png": "usememo-callback-memo-tree.png",
    "361cce3d-f4b9-4da3-a197-9cbd4b241f90.png": "diffing-reconciliation-no-key.png",
    "543905d4-0f12-4813-8792-1363ce61bf87.png": "diffing-reconciliation-id-key.png",
    "812887fe-0a00-4f7d-9152-c0836c055892.png": "diffing-index-key-memoized.png",
    "668d0b9d-0f4b-4b8c-9b1b-8d641373106d.png": "diffing-id-key-memoized.png",
    "fc2ccf96-89e0-4746-85df-c5ca1fa507ac.png": "diffing-index-key-new-item.png",
    "353244c0-4612-4bc1-89bb-734fb351c153.png": "diffing-id-key-new-item.png",
    "5cd64ca8-60b1-4a2c-b7dc-d53dc3503c25.png": "context-data-flow.png",
    "9c35fb8b-a4a7-4976-aa39-2aeb498c7b85.png": "context-performance-tree.png",
    "b7b572c3-130e-4ea9-bce0-84d19ac3117f.png": "closures-in-react.png",
    "abfd9fe6-7100-48a8-9060-f1a3d529474a.png": "stale-closure-execution.png",
    "b606a95d-dec1-44ad-8ad5-e502e5cdef4d.png": "useeffect-render-flow.png",
    "67ac7509-ca9e-45a9-9e21-529de2831d4f.png": "uselayout-render-flow.png",
    "62340e02-5535-4554-978c-96e851117c97.png": "ssr-hydration-pipeline.png",
    "07d9de22-b079-4a8a-8ae0-4eb10db9f38b.png": "stacking-context-portals.png",
    "2c8570a6-4c5b-41b8-b8e1-001f3366210f.png": "css-stacking-context-zindex.png",
    "36c2cf5a-df6e-42a9-b629-c341931e782d.png": "network-waterfall-requests.png",
    "31bd3a80-81fc-42ac-bb62-733498fb2900.png": "promise-all-parallel-fetch.png",
    "8fa01803-ec1e-428f-819b-7c790b33f71c.png": "race-condition-in-effects.png",
    "cef9903f-a76d-47a7-9e92-b4b185d2f84a.png": "abort-controller-race-fix.png"
  };

  for (const [srcName, destName] of Object.entries(map)) {
    if (copyFileSafe(path.join(advReactSrc, srcName), path.join(staticBooksImgDir, "advanced-react", destName))) {
      copiedCount++;
    }
  }
}

// 2. The Road to React (Robin Wieruch)
const roadSrc = path.join(booksDir, "The Road to React_ Your journey to master plain yet -- Robin Wieruch -- 2024, 2018 -- Independently published", "images");
if (fs.existsSync(roadSrc)) {
  const files = fs.readdirSync(roadSrc).filter(f => f.endsWith(".png") && !f.startsWith("leanpub"));
  for (const f of files) {
    if (copyFileSafe(path.join(roadSrc, f), path.join(staticBooksImgDir, "road-to-react", f))) {
      copiedCount++;
    }
  }
}

// 3. Learn React Hooks (Daniel Bugl)
const hooksSrc = path.join(booksDir, "Learn React Hooks_ Unlock scalable state, performance, and -- Daniel Bugl -- 2, 2025 -- Packt -- isbn13 9781836209171", "images");
if (fs.existsSync(hooksSrc)) {
  const files = fs.readdirSync(hooksSrc).filter(f => f.startsWith("B31327_"));
  for (const f of files) {
    if (copyFileSafe(path.join(hooksSrc, f), path.join(staticBooksImgDir, "learn-react-hooks", f))) {
      copiedCount++;
    }
  }
}

// 4. React Application Architecture for Production (Alan Alickovic)
const archSrc = path.join(booksDir, "React Application Architecture for Production - 2 Edition - -- Alan Alickovic, Anthony Alicea -- 2026 -- Packt", "images");
if (fs.existsSync(archSrc)) {
  const files = fs.readdirSync(archSrc).filter(f => f.startsWith("B31385_") || f.startsWith("B22102_"));
  // Copy first 50 key diagrams
  for (const f of files.slice(0, 60)) {
    if (copyFileSafe(path.join(archSrc, f), path.join(staticBooksImgDir, "react-architecture", f))) {
      copiedCount++;
    }
  }
}

// 5. Advanced Data Fetching Patterns in React
const dataFetchSrc = path.join(booksDir, "Advanced Data Fetching Patterns in React -- 2024", "assets");
if (fs.existsSync(dataFetchSrc)) {
  const map: Record<string, string> = {
    "92353d609fe03fc3e11c21b624dc61ee.png": "waterfall-timeline.png",
    "92df7dd866c8cbf99c16264e04ce0b19.png": "parallel-requests.png",
    "88722f588fe1e70316d3014e5b299b6d.png": "hybrid-parallel-sequential.png",
    "00e0e9524fc784d874db9ccfe23a168e.png": "component-tree-fetching.png",
    "4ba4f391f5b3ab65b9d1af3181cc9138.png": "code-splitting-lazy-card.png",
    "cc779a1eb87452adccc5953657d98624.png": "swr-caching-revalidation.png",
    "45bf281c6ed393554ae2a1469cde69a0.png": "ssg-ssr-client-mix.png",
    "7d65c2f66c2373c45399a1eccc3e5201.png": "skeleton-preview-ui.png",
    "80a51329b320969a2713607342244098.png": "suspense-streaming-boundary.png",
    "ab84d5eba8dbd8e7ce91fb1790c904ca.png": "network-request-chunk-loading.png"
  };

  for (const [srcName, destName] of Object.entries(map)) {
    if (copyFileSafe(path.join(dataFetchSrc, srcName), path.join(staticBooksImgDir, "data-fetching", destName))) {
      copiedCount++;
    }
  }
}

// 6. Web Performance Fundamentals (Nadia Makarevich - 2025)
const perfSrc = path.join(booksDir, "Web Performance Fundamentals_ A Frontend Developer’s Guide -- Nadia Makarevich -- 2025", "images");
if (fs.existsSync(perfSrc)) {
  const map: Record<string, string> = {
    "4a3293cd-739a-46dc-b380-2276ff3ab9da.png": "lighthouse-metrics.png",
    "31b9fdc0-a77f-4c96-8273-2c307aa3d404.png": "flame-graph-main-thread.png",
    "9e9a7962-b516-4cfd-a9b7-a58e52c1f089.png": "network-throttling-profiles.png",
    "54ac09fc-8998-4160-91ad-6354d9d887ca.png": "cdn-geographic-caching.png",
    "8687c6e8-3513-47ce-8461-2588e44bcc18.png": "memory-cache-vs-disk-cache.png",
    "3f3c8554-f4b8-4c55-a626-4fa69da701b8.png": "304-not-modified-flow.png",
    "f40cc812-3d20-4e56-ac82-fc4033b3319b.png": "core-web-vitals-scores.png",
    "c06a8bba-39a5-45f1-9612-db332e758503.png": "main-thread-network-coordination.png"
  };

  for (const [srcName, destName] of Object.entries(map)) {
    if (copyFileSafe(path.join(perfSrc, srcName), path.join(staticBooksImgDir, "web-performance", destName))) {
      copiedCount++;
    }
  }
}

// 7. Learn React with TypeScript (Carl Rippon)
const tsSrc = path.join(booksDir, "Learn React with TypeScript, Third Edition -- Carl Rippon -- 2025 -- Packt Publishing Pvt_ Ltd", "images");
if (fs.existsSync(tsSrc)) {
  const files = fs.readdirSync(tsSrc).filter(f => f.startsWith("B31786_"));
  for (const f of files.slice(0, 30)) {
    if (copyFileSafe(path.join(tsSrc, f), path.join(staticBooksImgDir, "learn-react-typescript", f))) {
      copiedCount++;
    }
  }
}

console.log(`Successfully organized and copied ${copiedCount} book architectural diagrams to static/images/books/`);
