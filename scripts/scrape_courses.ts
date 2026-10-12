import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

const COURSES = [
  "https://www.linkedin.com/learning/react-essential-training",
  "https://www.linkedin.com/learning/react-design-patterns-25656257",
  "https://www.linkedin.com/learning/react-state-management-22688323",
  "https://www.linkedin.com/learning/tailwind-css-3-essential-training",
  "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js",
  "https://www.linkedin.com/learning/react-working-with-apis",
  "https://www.linkedin.com/learning/react-creating-and-hosting-a-full-stack-site-2023",
  "https://www.linkedin.com/learning/react-hooks-18302196"
];

interface LessonInfo {
  title: string;
  url: string;
  duration?: string;
  durationSeconds?: number;
  courseTitle: string;
}

const allLessons: LessonInfo[] = [];

for (const courseUrl of COURSES) {
  console.log(`Scraping: ${courseUrl}...`);
  const proc = spawnSync("webclaw", [courseUrl, "-b", "chrome", "--raw-html"], {
    encoding: "utf-8",
    maxBuffer: 50 * 1024 * 1024
  });

  const html = proc.stdout || "";
  if (!html) {
    console.warn(`No HTML received for ${courseUrl}`);
    continue;
  }

  // Extract course title from <title> or <h1>
  const titleMatch = html.match(/<title>([^<|]+)/i) || html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const courseTitle = titleMatch ? titleMatch[1].trim() : "LinkedIn Learning Course";

  // Match lesson links
  const courseSlug = courseUrl.split("/").pop();
  const regex = new RegExp(`href="(\\/learning\\/${courseSlug}\\/([^"#?]+))"`, "gi");
  let m;
  const seenUrls = new Set<string>();

  while ((m = regex.exec(html)) !== null) {
    const fullUrl = `https://www.linkedin.com${m[1]}`;
    const slug = m[2];
    if (seenUrls.has(fullUrl)) continue;
    seenUrls.add(fullUrl);

    // Convert slug into readable title
    const readableTitle = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase());

    allLessons.push({
      title: readableTitle,
      url: fullUrl,
      courseTitle
    });
  }

  console.log(`✓ ${courseTitle}: Extracted ${seenUrls.size} authentic video URLs`);
}

console.log(`Total extracted lessons: ${allLessons.length}`);
fs.writeFileSync(
  path.join(__dirname, "scraped_lessons.json"),
  JSON.stringify(allLessons, null, 2),
  "utf-8"
);
console.log("Saved to scripts/scraped_lessons.json");
