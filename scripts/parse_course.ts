import { spawnSync } from "child_process";
import fs from "fs";

const proc = spawnSync("webclaw", ["https://www.linkedin.com/learning/react-essential-training", "-b", "chrome", "--raw-html"], {
  encoding: "utf-8",
  maxBuffer: 50 * 1024 * 1024
});

const html = proc.stdout || "";
fs.writeFileSync("scripts/sample_course.html", html, "utf-8");
console.log("Saved sample_course.html, length:", html.length);

const jsonMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
console.log("Found JSON-LD scripts:", jsonMatches.length);

for (const m of jsonMatches) {
  try {
    const parsed = JSON.parse(m[1]);
    const items = Array.isArray(parsed) ? parsed : [parsed];
    for (const it of items) {
      if (it["@type"] === "Course") {
        console.log("Course Name:", it.name);
        console.log("Course URL:", it.url);
        if (it.syllabusSections) {
          console.log("Total syllabus sections:", it.syllabusSections.length);
          console.log("Sample item 0:", JSON.stringify(it.syllabusSections[0], null, 2));
          console.log("Sample item 1:", JSON.stringify(it.syllabusSections[1], null, 2));
          it.syllabusSections.forEach((s: any, idx: number) => {
            console.log(`${idx + 1}: ${s.name} [${s.timeRequired}]`);
          });
        }
      }
    }
  } catch (err) {
    console.error("JSON parse error:", err);
  }
}

// Also search HTML for any data-control-name or class containing lesson links
const lessonMatches = [...html.matchAll(/(https:\/\/www\.linkedin\.com\/learning\/react-essential-training\/[a-zA-Z0-9\-]+)/g)];
console.log("Direct URL matches in HTML:", [...new Set(lessonMatches.map(m => m[1]))]);

