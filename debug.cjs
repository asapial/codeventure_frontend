const { z } = require("zod");
const b = require("fs").readFileSync("D:/Project/CodeVenture/codeventure_frontend/src/types/auth.test.ts");
const idx = b.indexOf("email:");
console.log("hex:", b.slice(idx, idx + 60).toString("hex"));
console.log("utf8:", b.slice(idx, idx + 60).toString("utf-8"));
console.log("contains [email redacted marker? ", b.includes("[email"));
const s = z.string().email();
const m = b.toString("utf-8").match(/email:\s*"([^"]+)"/);
console.log("first match val:", JSON.stringify(m[1]));
console.log("zod parses?", s.safeParse(m[1]).success);

const goodEmail = ["a", "d", "a", "@", "e", "x", "a", "m", "p", "l", "e", ".", "c", "o", "m"].join("");
const badEmail = "";

console.log("goodEmail literal:", JSON.stringify(goodEmail));
console.log("goodEmail parses?", s.safeParse(goodEmail).success);

const r2 = s.safeParse("[email protected]");
console.log("literal-string parses?", r2.success, r2.error?.issues?.[0]?.message);