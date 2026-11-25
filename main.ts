// The Tired Dark Lord: A 100-Word Villain Monologue
//
// Writes one 100-word monologue, spoken by a fantasy villain who is
// secretly just very tired, to /output/entry.txt.
//
// The tiredness lives in the voice, not in a statement of it: short
// sentences, pauses, small deflections (cold flagstones, a packed lunch,
// a kettle worth keeping). The villain stays a villain: six hundred
// years of waiting, four heroes heard out, a throne to hand over — on
// his own terms, with a sting in the last line.
//
// Node 22, no dependencies. Run: node main.ts
import { mkdirSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";

// One sentence per line; joined with a single space into one paragraph
// of speakable dialogue, exactly 100 words.
const SENTENCES: string[] = [
  "Sit down, hero.",
  "No—don't kneel; the flagstones are cold, and frankly, so am I.",
  "You've come to end my reign, yes?",
  "Sword, prophecy, the whole parade.",
  "I've heard it four times now.",
  "The first lad wept.",
  "The second brought a lute.",
  "You brought a packed lunch.",
  "I respect that.",
  "Six hundred years I've waited.",
  "My knees gave up at four hundred.",
  "The dragon quit—said the commute was killing him.",
  "The curse expired.",
  "The crown pinches.",
  "The vault's empty.",
  "The ravens unionised last spring.",
  "Strike, hero.",
  "Take the throne.",
  "Just leave the kettle—it's the only thing here that still loves me.",
];

const ENTRY = SENTENCES.join(" ");

function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function main(): void {
  const words = countWords(ENTRY);
  if (words !== 100) {
    throw new Error(`word count is ${words}, expected exactly 100`);
  }

  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 600) {
    throw new Error(`character count is ${chars}, expected 1-600`);
  }

  const bytes = Buffer.byteLength(ENTRY, "utf8");
  if (bytes > 600) {
    throw new Error(`byte length is ${bytes}, expected at most 600`);
  }

  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");

  console.log(`wrote ${OUT_PATH}: ${words} words, ${chars} chars, ${bytes} bytes`);
}

main();
