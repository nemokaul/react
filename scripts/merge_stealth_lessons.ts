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
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1167/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1414/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1422/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1426/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1430/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1434/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1438/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1442/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1446/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1450/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1458/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1462/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1466/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1470/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1474/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1478/output.txt",
  "C:/Users/admin/.gemini/antigravity-cli/brain/b3c05281-ee1e-47e6-adff-a526d512e061/.system_generated/steps/1482/output.txt"
];

function unpack(val: any): any {
  if (Array.isArray(val)) {
    if (val.length > 0 && Array.isArray(val[0]) && typeof val[0][0] === "string") {
      const obj: any = {};
      for (const [k, v] of val) {
        obj[k] = unpack(v && v.value !== undefined ? v.value : v);
      }
      return obj;
    }
    return val.map(v => unpack(v && v.value !== undefined ? v.value : v));
  }
  return val;
}

let addedCount = 0;

for (const file of stepFiles) {
  if (!fs.existsSync(file)) continue;
  try {
    const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
    const data = unpack(raw.result) || [];
    const items = Array.isArray(data) ? data : (data.items || []);
    
    for (const obj of items) {
      if (obj.url && !existingUrls.has(obj.url)) {
        existingUrls.add(obj.url);
        const durationSec = parseDurationText(obj.durationText || "3m");
        const slug = obj.url.split("/").pop();
        let cleanTitle = (obj.title || "").replace(/^Solution:\s*/i, "Solution: ").replace(/^\(Locked\)\s*/i, "").trim();
        if (!cleanTitle || cleanTitle.toLowerCase().includes("locked") || cleanTitle === "LinkedIn Learning") {
          cleanTitle = slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
        }
        existingLessons.push({
          title: cleanTitle,
          url: obj.url,
          durationText: formatDurationText(durationSec),
          durationSeconds: durationSec,
          courseTitle: obj.courseTitle || data.courseTitle || "LinkedIn Learning Course",
          courseUrl: obj.courseUrl || data.courseUrl || "",
          category: obj.category || "react"
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
