import fs from "fs";
import path from "path";

const booksDir = "C:\\Users\\admin\\Downloads\\reaact-docs\\react-books";
const targetBase = path.resolve("static", "images", "books");

if (!fs.existsSync(targetBase)) {
  fs.mkdirSync(targetBase, { recursive: true });
}

interface BookConfig {
  dirName: string;
  slug: string;
  title: string;
  author: string;
  year: number;
}

const BOOKS: BookConfig[] = [
  {
    dirName: "Advanced Data Fetching Patterns in React -- 2024",
    slug: "advanced-data-fetching",
    title: "Advanced Data Fetching Patterns in React",
    author: "Community",
    year: 2024
  },
  {
    dirName: "Advanced React Patterns -- Martins, Pedro -- 2024",
    slug: "advanced-react-patterns",
    title: "Advanced React Patterns",
    author: "Pedro Martins",
    year: 2024
  },
  {
    dirName: "Advanced React_ deep dives, investigations, performance -- Nadia Makarevich -- 2023 -- anonymous",
    slug: "advanced-react-makarevich",
    title: "Advanced React: Deep Dives, Investigations & Performance",
    author: "Nadia Makarevich",
    year: 2023
  },
  {
    dirName: "Fullstack React with TypeScript_ Learn Pro Patterns for -- Nate Murray -- Revision r12 _ 2022-01-22, 2022 -- leanpub_com _ newline_co",
    slug: "fullstack-react-ts",
    title: "Fullstack React with TypeScript",
    author: "Nate Murray",
    year: 2022
  },
  {
    dirName: "Learn React Hooks_ Unlock scalable state, performance, and -- Daniel Bugl -- 2, 2025 -- Packt -- isbn13 9781836209171",
    slug: "learn-react-hooks",
    title: "Learn React Hooks (2nd Edition)",
    author: "Daniel Bugl",
    year: 2025
  },
  {
    dirName: "Learn React with TypeScript, Third Edition -- Carl Rippon -- 2025 -- Packt Publishing Pvt_ Ltd",
    slug: "learn-react-ts-rippon",
    title: "Learn React with TypeScript (3rd Edition)",
    author: "Carl Rippon",
    year: 2025
  },
  {
    dirName: "React 19_1 & Server Components_ A Deep Dive into Modern -- Cornish, Edwin S_ -- 2025",
    slug: "react-19-server-components",
    title: "React 19 & Server Components: A Deep Dive",
    author: "Edwin S. Cornish",
    year: 2025
  },
  {
    dirName: "React Application Architecture for Production - 2 Edition - -- Alan Alickovic, Anthony Alicea -- 2026 -- Packt",
    slug: "react-architecture",
    title: "React Application Architecture for Production (2nd Edition)",
    author: "Alan Alickovic & Anthony Alicea",
    year: 2026
  },
  {
    dirName: "React_Design_Patterns_and_Best_Practice",
    slug: "react-design-patterns",
    title: "React Design Patterns and Best Practices",
    author: "Carlos Santana Roldan",
    year: 2024
  },
  {
    dirName: "Test-Driven React, Second Edition (for Candi Bara){Trevor Burnham}(The Pragmatic Bookshelf, LLC){107383592}",
    slug: "test-driven-react",
    title: "Test-Driven React (2nd Edition)",
    author: "Trevor Burnham",
    year: 2024
  },
  {
    dirName: "The Road to React_ Your journey to master plain yet -- Robin Wieruch -- 2024, 2018 -- Independently published",
    slug: "road-to-react",
    title: "The Road to React",
    author: "Robin Wieruch",
    year: 2024
  },
  {
    dirName: "Web Performance Fundamentals_ A Frontend Developer’s Guide -- Nadia Makarevich -- 2025",
    slug: "web-performance",
    title: "Web Performance Fundamentals: A Frontend Developer's Guide",
    author: "Nadia Makarevich",
    year: 2025
  }
];

export interface DiagramEntry {
  id: string;
  book_title: string;
  book_slug: string;
  author: string;
  year: number;
  filename: string;
  image_url: string; // e.g. "images/books/advanced-react-makarevich/xyz.png"
  caption: string;
  topics: string[];
  chapter_title: string;
}

const catalog: DiagramEntry[] = [];
let totalCopied = 0;

for (const book of BOOKS) {
  const fullBookDir = path.join(booksDir, book.dirName);
  if (!fs.existsSync(fullBookDir)) {
    console.warn(`Book dir not found: ${fullBookDir}`);
    continue;
  }

  // Find images or assets dir
  let imgSourceDir = path.join(fullBookDir, "images");
  if (!fs.existsSync(imgSourceDir)) {
    imgSourceDir = path.join(fullBookDir, "assets");
  }
  if (!fs.existsSync(imgSourceDir)) {
    console.warn(`No images/assets dir for ${book.title}`);
    continue;
  }

  const destDir = path.join(targetBase, book.slug);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Parse markdown files to map captions to image filenames
  const captionMap: Record<string, { caption: string; chapterTitle: string; topics: string[] }> = {};
  const mdFiles = fs.readdirSync(fullBookDir).filter(f => f.endsWith(".md"));
  for (const mdf of mdFiles) {
    const content = fs.readFileSync(path.join(fullBookDir, mdf), "utf8");
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const chapterTitle = titleMatch ? titleMatch[1].trim() : mdf.replace(/\.md$/, "");

    // Regex for markdown images
    const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const rawCap = match[1].trim();
      const rawUrl = match[2].trim();
      const filename = path.basename(rawUrl.split("?")[0]);
      
      const words = `${rawCap} ${chapterTitle}`
        .toLowerCase()
        .replace(/[^a-z0-9\s\-]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 2);

      captionMap[filename] = {
        caption: rawCap || `${book.title} — ${chapterTitle}`,
        chapterTitle,
        topics: Array.from(new Set(words))
      };
    }
  }

  // Copy files
  const imgFiles = fs.readdirSync(imgSourceDir);
  for (const f of imgFiles) {
    if (!/\.(png|jpe?g|svg|webp)$/i.test(f)) continue;
    // Skip tiny logos/icons
    const srcFile = path.join(imgSourceDir, f);
    const stat = fs.statSync(srcFile);
    if (stat.size < 2000 && !f.endsWith(".svg")) continue;

    const destFile = path.join(destDir, f);
    fs.copyFileSync(srcFile, destFile);
    totalCopied++;

    const meta = captionMap[f] || {
      caption: `${book.title} Architectural Diagram (${path.basename(f, path.extname(f))})`,
      chapterTitle: book.title,
      topics: f.toLowerCase().replace(/[^a-z0-9]/g, " ").split(/\s+/).filter(w => w.length > 2)
    };

    catalog.push({
      id: `${book.slug}-${f.replace(/\.[^.]+$/, "")}`,
      book_title: book.title,
      book_slug: book.slug,
      author: book.author,
      year: book.year,
      filename: f,
      image_url: `images/books/${book.slug}/${f}`,
      caption: meta.caption,
      topics: meta.topics,
      chapter_title: meta.chapterTitle
    });
  }
}

console.log(`Copied ${totalCopied} diagrams from all books.`);
console.log(`Total catalogued diagrams: ${catalog.length}`);

// Write JSON catalogs
fs.writeFileSync(path.resolve("scripts", "book_diagrams_catalog.json"), JSON.stringify(catalog, null, 2));
const staticDataDir = path.resolve("static", "data");
if (!fs.existsSync(staticDataDir)) fs.mkdirSync(staticDataDir, { recursive: true });
fs.writeFileSync(path.join(staticDataDir, "book_diagrams_catalog.json"), JSON.stringify(catalog, null, 2));

console.log("Wrote scripts/book_diagrams_catalog.json and static/data/book_diagrams_catalog.json");
