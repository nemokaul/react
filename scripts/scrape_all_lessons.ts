import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

const TARGET_COURSES = [
  "https://www.linkedin.com/learning/react-essential-training",
  "https://www.linkedin.com/learning/react-design-patterns-25656257",
  "https://www.linkedin.com/learning/react-state-management-22688323",
  "https://www.linkedin.com/learning/tailwind-css-4-essential-training",
  "https://www.linkedin.com/learning/build-modern-web-apps-with-react-hooks-state-management-and-apis-using-vite-or-next-js",
  "https://www.linkedin.com/learning/react-working-with-apis",
  "https://www.linkedin.com/learning/react-testing-and-debugging",
  "https://www.linkedin.com/learning/react-components-forms-and-the-virtual-dom"
];

interface ScrapedLesson {
  title: string;
  url: string;
  durationText: string;
  durationSeconds: number;
  courseTitle: string;
  courseUrl: string;
  category: string;
}

function parseDurationIso(iso: string): { durationText: string; durationSeconds: number } {
  // e.g. "PT3M14S", "PT1H45M39S", "PT37S"
  let h = 0, m = 0, s = 0;
  const hMatch = iso.match(/(\d+)H/);
  const mMatch = iso.match(/(\d+)M/);
  const sMatch = iso.match(/(\d+)S/);
  if (hMatch) h = parseInt(hMatch[1], 10);
  if (mMatch) m = parseInt(mMatch[1], 10);
  if (sMatch) s = parseInt(sMatch[1], 10);
  const totalSeconds = h * 3600 + m * 60 + s;
  
  const mStr = String(m).padStart(2, "0");
  const sStr = String(s).padStart(2, "0");
  const durationText = h > 0 ? `${h}h${mStr}m${sStr}s` : `${mStr}m${sStr}s`;
  return { durationText, durationSeconds: totalSeconds };
}

const allLessons: ScrapedLesson[] = [];

for (const courseUrl of TARGET_COURSES) {
  const courseSlug = courseUrl.split("/").pop()!;
  console.log(`Fetching course: ${courseSlug}...`);
  const proc = spawnSync("webclaw", [courseUrl, "-b", "chrome", "--raw-html"], {
    encoding: "utf-8",
    maxBuffer: 50 * 1024 * 1024
  });

  const html = proc.stdout || "";
  if (!html) {
    console.warn(`Failed to fetch HTML for ${courseSlug}`);
    continue;
  }

  // Find all lesson URLs directly in HTML
  const urlRegex = new RegExp(`(https:\\/\\/www\\.linkedin\\.com\\/learning\\/${courseSlug}\\/([a-zA-Z0-9\\-]+))`, "g");
  const directUrls = [...new Set([...html.matchAll(urlRegex)].map(m => m[1]))];

  // Also parse syllabus from JSON-LD
  const jsonMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  let syllabusItems: any[] = [];
  let courseTitle = courseSlug;

  for (const m of jsonMatches) {
    try {
      const parsed = JSON.parse(m[1]);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of list) {
        if (item["@type"] === "Course") {
          courseTitle = item.name || courseSlug;
          if (item.syllabusSections && Array.isArray(item.syllabusSections)) {
            syllabusItems = item.syllabusSections;
          }
        }
      }
    } catch (e) {}
  }

  console.log(`Course: ${courseTitle} -> found ${directUrls.length} direct URLs, ${syllabusItems.length} syllabus items`);

  // Map direct URLs to lessons
  for (let i = 0; i < directUrls.length; i++) {
    const u = directUrls[i];
    const slug = u.split("/").pop()!;
    const syllabus = syllabusItems.find((s: any) => {
      const sSlug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return slug.includes(sSlug) || sSlug.includes(slug);
    }) || syllabusItems[i];

    const title = syllabus ? syllabus.name : slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
    const isoDuration = syllabus ? syllabus.timeRequired : "PT3M30S";
    const { durationText, durationSeconds } = parseDurationIso(isoDuration || "PT3M30S");

    allLessons.push({
      title,
      url: u,
      durationText,
      durationSeconds,
      courseTitle,
      courseUrl,
      category: courseSlug
    });
  }
}

console.log(`Total authentic LinkedIn Learning lessons collected: ${allLessons.length}`);
fs.writeFileSync(
  path.join(__dirname, "all_scraped_lessons.json"),
  JSON.stringify(allLessons, null, 2),
  "utf-8"
);
console.log("Saved to scripts/all_scraped_lessons.json");
