import { execSync } from "child_process";
import fs from "fs";

const candidateCourses = [
  "https://www.linkedin.com/learning/react-building-styles-with-css-modules-and-tailwind-css",
  "https://www.linkedin.com/learning/learning-react-js-5",
  "https://www.linkedin.com/learning/react-creating-and-hosting-a-full-stack-site-14300435",
  "https://www.linkedin.com/learning/react-hooks",
  "https://www.linkedin.com/learning/react-components-forms-and-more",
  "https://www.linkedin.com/learning/advanced-react-design-patterns",
  "https://www.linkedin.com/learning/full-stack-web-development-with-react-and-node-js",
  "https://www.linkedin.com/learning/react-native-essential-training",
  "https://www.linkedin.com/learning/building-a-website-with-node-js-and-express-js-3"
];

const existingLessons: any[] = JSON.parse(fs.readFileSync("scripts/all_scraped_lessons.json", "utf-8"));
const existingUrls = new Set(existingLessons.map(l => l.url));

for (const cUrl of candidateCourses) {
  const slug = cUrl.split("/learning/")[1].split("?")[0];
  console.log(`Checking candidate: ${slug}...`);
  try {
    const html = execSync(`webclaw "${cUrl}" -b chrome --raw-html`, { maxBuffer: 20 * 1024 * 1024 }).toString();
    const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<title>([\s\S]*?)<\/title>/i);
    const courseTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").replace(/\| LinkedIn Learning.*/, "").trim() : slug;
    
    // Find all links matching /learning/<slug>/<lesson-slug>
    const regex = new RegExp(`href=["'](https:\\/\\/www\\.linkedin\\.com\\/learning\\/${slug}\\/([a-z0-9-]+))["']`, "g");
    const foundMatches = Array.from(html.matchAll(regex));
    console.log(`  Found ${foundMatches.length} lesson link matches.`);

    let added = 0;
    for (const m of foundMatches) {
      const fullUrl = m[1];
      const lessonSlug = m[2];
      if (lessonSlug && lessonSlug !== slug && !lessonSlug.includes("search") && !existingUrls.has(fullUrl)) {
        existingUrls.add(fullUrl);
        const titleFormatted = lessonSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        existingLessons.push({
          title: titleFormatted,
          url: fullUrl,
          durationText: "03m00s",
          durationSeconds: 180,
          courseTitle,
          courseUrl: cUrl,
          category: slug
        });
        added++;
      }
    }
    console.log(`  Added ${added} new lessons.`);
  } catch (err: any) {
    console.log(`  Failed to scrape ${slug}:`, err.message);
  }
}

fs.writeFileSync("scripts/all_scraped_lessons.json", JSON.stringify(existingLessons, null, 2), "utf-8");
console.log(`Total lessons now: ${existingLessons.length}`);
