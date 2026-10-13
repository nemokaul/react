import fs from "fs";
import path from "path";

const booksDir = path.resolve("..", "react-books");
const dirs = fs.readdirSync(booksDir);

interface ImageRef {
  bookDir: string;
  bookShortName: string;
  chapterFile: string;
  chapterTitle: string;
  caption: string;
  relImgPath: string;
  absImgPath: string;
  exists: boolean;
  sizeBytes: number;
}

const allRefs: ImageRef[] = [];

for (const d of dirs) {
  const fullDirPath = path.join(booksDir, d);
  if (!fs.statSync(fullDirPath).isDirectory()) continue;
  
  let bookShort = d;
  if (d.includes("Nadia Makarevich -- 2023")) bookShort = "advanced-react-makarevich";
  else if (d.includes("Carl Rippon -- 2025")) bookShort = "learn-react-ts-rippon";
  else if (d.includes("Alan Alickovic")) bookShort = "react-architecture-alickovic";
  else if (d.includes("Daniel Bugl")) bookShort = "learn-react-hooks-bugl";
  else if (d.includes("Nate Murray")) bookShort = "fullstack-react-ts-murray";
  else if (d.includes("Robin Wieruch")) bookShort = "road-to-react-wieruch";
  else if (d.includes("Trevor Burnham")) bookShort = "test-driven-react-burnham";
  else if (d.includes("Web Performance")) bookShort = "web-performance-makarevich";
  else if (d.includes("Pedro")) bookShort = "advanced-react-patterns-martins";
  else if (d.includes("Cornish")) bookShort = "react-19-server-components-cornish";
  else if (d.includes("React_Design_Patterns")) bookShort = "react-design-patterns";

  const files = fs.readdirSync(fullDirPath).filter(f => f.endsWith(".md"));
  for (const f of files) {
    const content = fs.readFileSync(path.join(fullDirPath, f), "utf8");
    // Extract first # header as chapter title
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const chapterTitle = titleMatch ? titleMatch[1].trim() : f;

    const regex = /!\[([^\]]*)\]\(([^)]*images\/[^)]+)\)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const caption = match[1].trim();
      const rawImg = match[2].trim();
      // Resolve path
      const imgClean = rawImg.replace(/^(\.\/|\/)/, "");
      const absPath = path.resolve(fullDirPath, imgClean);
      const exists = fs.existsSync(absPath);
      const sizeBytes = exists ? fs.statSync(absPath).size : 0;

      // Filter out small icons or empty/cover decorations (e.g. < 2KB or book covers if not conceptual)
      allRefs.push({
        bookDir: d,
        bookShortName: bookShort,
        chapterFile: f,
        chapterTitle,
        caption,
        relImgPath: rawImg,
        absImgPath: absPath,
        exists,
        sizeBytes
      });
    }
  }
}

console.log(`Extracted ${allRefs.length} total image references across books.`);
const validRefs = allRefs.filter(r => r.exists && r.sizeBytes > 2000);
console.log(`Valid architectural / conceptual diagrams (> 2KB): ${validRefs.length}`);

// Group by book
const byBook: Record<string, number> = {};
validRefs.forEach(r => {
  byBook[r.bookShortName] = (byBook[r.bookShortName] || 0) + 1;
});
console.log("By book distribution:", byBook);

// Save manifest to json for mapping
fs.writeFileSync(path.resolve("scripts", "book_images_manifest.json"), JSON.stringify(validRefs, null, 2));
console.log("Wrote scripts/book_images_manifest.json");
