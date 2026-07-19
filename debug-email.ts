import { readFileSync } from "node:fs";

const buf = readFileSync("src/types/auth.test.ts");
const text = buf.toString("utf-8");

// Print bytes around "email:" occurrences to see if there's an invisible char
const re = /email:\s*"([^"]+)"/g;
let m: RegExpExecArray | null;
const out: { idx: number; hex: string; preview: string }[] = [];
while ((m = re.exec(text)) !== null) {
  const start = m.index;
  const before = text.slice(Math.max(0, start - 20), start + m[0].length + 5);
  out.push({
    idx: start,
    hex: Buffer.from(m[1]).toString("hex"),
    preview: before,
  });
}
console.log(JSON.stringify(out, null, 2));