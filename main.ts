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

// ---------------------------------------------------------------------------
// Limits imposed by the bounty: exactly 100 words, at most 600 characters
// and 600 UTF-8 bytes, and the entry must not be blank.
// ---------------------------------------------------------------------------
const EXPECTED_WORDS = 100;
const MAX_CHARS = 600;
const MAX_BYTES = 600;

const OUT_DIR = "/output";
const OUT_PATH = `${OUT_DIR}/entry.txt`;

/** Sentences are spoken as one continuous paragraph, so they join on one space. */
const LINE_SEPARATOR = " ";

// ---------------------------------------------------------------------------
// The monologue, one sentence per line. The lines are joined with a single
// space into one paragraph of speakable dialogue, exactly 100 words.
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Assembly
// ---------------------------------------------------------------------------

/** A sentence must be a single line of dialogue: no embedded line breaks. */
function validateLine(line: string, index: number): void {
  if (/[\r\n]/.test(line)) {
    throw new Error(`sentence ${index} contains a line break`);
  }
  if (line.trim().length === 0) {
    throw new Error(`sentence ${index} is empty`);
  }
}

/** Join the checked sentences into the single-paragraph entry text. */
function formatEntry(lines: string[]): string {
  lines.forEach(validateLine);
  return lines.join(LINE_SEPARATOR);
}

// ---------------------------------------------------------------------------
// Measurement helpers
// ---------------------------------------------------------------------------

function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function countChars(text: string): number {
  return [...text].length;
}

function countBytes(text: string): number {
  return Buffer.byteLength(text, "utf8");
}

/** Measure the entry once so validation and reporting agree on the numbers. */
function measureEntry(text: string): { words: number; chars: number; bytes: number } {
  return { words: countWords(text), chars: countChars(text), bytes: countBytes(text) };
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/** The entry must be exactly one non-blank line of the right size. */
function assertSingleLine(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
}

function validateEntry(text: string): void {
  assertSingleLine(text);

  const words = countWords(text);
  if (words !== EXPECTED_WORDS) {
    throw new Error(`word count is ${words}, expected exactly ${EXPECTED_WORDS}`);
  }

  const chars = countChars(text);
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`character count is ${chars}, expected 1-${MAX_CHARS}`);
  }

  const bytes = countBytes(text);
  if (bytes > MAX_BYTES) {
    throw new Error(`byte length is ${bytes}, expected at most ${MAX_BYTES}`);
  }
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

/** Persist the validated entry and report its size. */
function writeEntry(text: string): void {
  const { words, chars, bytes } = measureEntry(text);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_PATH, text, "utf8");
  console.log(`wrote ${OUT_PATH}: ${words} words, ${chars} chars, ${bytes} bytes`);
}

function main(): void {
  const entry = formatEntry(SENTENCES);
  validateEntry(entry);
  writeEntry(entry);
}

main();
