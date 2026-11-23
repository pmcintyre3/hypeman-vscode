import test from "node:test";
import assert from "node:assert/strict";
import { addPhrase, pickPhrase, removePhrases, shouldHype } from "../hype";

test("pickPhrase returns undefined for an empty list", () => {
  assert.equal(pickPhrase([], undefined), undefined);
});

test("pickPhrase handles a single phrase without retrying", () => {
  assert.equal(pickPhrase(["a"], "a"), "a");
});

test("pickPhrase avoids the previous phrase", () => {
  for (const r of [0, 0.5, 0.999999, 1]) {
    assert.notEqual(pickPhrase(["a", "b", "c"], "b", () => r), "b");
  }
});

test("shouldHype respects enabled and cooldown", () => {
  assert.equal(shouldHype(false, 1000, undefined, 0), false);
  assert.equal(shouldHype(true, 1000, undefined, 30), true);
  assert.equal(shouldHype(true, 10_000, 1000, 30), false);
  assert.equal(shouldHype(true, 31_000, 1000, 30), true);
  assert.equal(shouldHype(true, 1000, 1000, 0), true);
});

test("addPhrase trims, rejects blanks and case-insensitive duplicates", () => {
  assert.deepEqual(addPhrase(["a"], "  b "), ["a", "b"]);
  assert.equal(addPhrase(["Nice"], "nice"), null);
  assert.equal(addPhrase(["a"], "   "), null);
});

test("removePhrases removes only the selected phrases", () => {
  assert.deepEqual(removePhrases(["a", "b", "c"], ["b"]), ["a", "c"]);
});
