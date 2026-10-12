import fs from "fs";

function parseDurationText(str: string): number {
  let seconds = 0;
  const mMatch = str.match(/(\d+)\s*m/);
  const sMatch = str.match(/(\d+)\s*s/);
  if (mMatch) seconds += parseInt(mMatch[1], 10) * 60;
  if (sMatch) seconds += parseInt(sMatch[1], 10);
  return seconds > 0 ? seconds : 180;
}

function formatDurationText(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}m${String(s).padStart(2, '0')}s`;
}

const existingLessons: any[] = JSON.parse(fs.readFileSync("scripts/all_scraped_lessons.json", "utf-8"));
const existingUrls = new Set(existingLessons.map(l => l.url));

const stepFiles = [
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1149/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1155/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1159/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1163/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1167/output.txt"
];

let addedCount = 0;

for (const file of stepFiles) {
  if (!fs.existsSync(file)) continue;
  try {
    const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
    const items = raw.result || [];
    for (const item of items) {
      // item.value is an array of [key, {type, value}]
      const obj: any = {};
      if (Array.isArray(item.value)) {
        for (const [k, v] of item.value) {
          obj[k] = v.value;
        }
      } else if (item.url) {
        Object.assign(obj, item);
      }

      if (obj.url && !existingUrls.has(obj.url)) {
        existingUrls.add(obj.url);
        const durationSec = parseDurationText(obj.durationText || "3m");
        existingLessons.push({
          title: obj.title.replace(/^Solution:\s*/i, "Solution: ").replace(/^\(Locked\)\s*/i, "").trim(),
          url: obj.url,
          durationText: formatDurationText(durationSec),
          durationSeconds: durationSec,
          courseTitle: obj.courseTitle,
          courseUrl: obj.courseUrl,
          category: obj.category
        });
        addedCount++;
      }
    }
  } catch (err: any) {
    console.error("Error reading", file, err.message);
  }
}

fs.writeFileSync("scripts/all_scraped_lessons.json", JSON.stringify(existingLessons, null, 2), "utf-8");
console.log(`Added ${addedCount} new stealth-scraped lessons. Total lessons now: ${existingLessons.length}`);
