/**
 * Test chunking functionality for large documents.
 *
 * Ported from: docs-local/hindsight-api-tests/test_chunking.py
 */
import { describe, expect, it } from "vitest";

import { chunkText } from "../engine/retain/fact-extraction";

describe("chunkText", () => {
  /**
   * Test that small text is not chunked.
   */
  it("should not chunk small text", () => {
    const text = "This is a short text. It should not be chunked.";
    const chunks = chunkText(text, { maxChars: 1000 });

    expect(chunks, "Small text should not be chunked").toHaveLength(1);
    expect(chunks[0]).toBe(text);
  });

  /**
   * Test that large text is chunked at sentence boundaries.
   */
  it("should chunk large text at sentence boundaries", () => {
    // Create a text with 10 sentences of ~100 chars each
    const sentences = Array.from(
      { length: 10 },
      (_, index) => `This is sentence number ${index}. ` + "x".repeat(80),
    );
    const text = sentences.join(" ");

    // Chunk with max 300 chars -
    // should create multiple chunks
    const chunks = chunkText(text, { maxChars: 300 });

    expect(chunks.length, "Large text should be chunked").toBeGreaterThan(1);

    // Verify all chunks are under the limit
    for (const chunk of chunks) {
      expect(
        chunk.length,
        `Chunk exceeds maxChars: ${chunk.length}`,
      ).toBeLessThanOrEqual(300);
    }

    // Verify we didn't lose any content
    const combined = chunks.join(" ");
    // Account for possible whitespace differences
    const combinedNoSpaces = combined.replace(/ /g, "");
    const textNoSpaces = text.replace(/ /g, "");
    expect(combinedNoSpaces.length).toBeGreaterThanOrEqual(
      textNoSpaces.length * 0.95,
    );
  });

  /**
   * Test chunking a 64k character text
   * (like a podcast transcript).
   */
  it("should chunk 64k character text", () => {
    // Create a 64k character text
    const sentence = "This is a typical podcast conversation sentence. ";
    const repeatCount = Math.floor(64000 / sentence.length);
    const text = sentence.repeat(repeatCount);

    const chunks = chunkText(text, { maxChars: 120000 });

    // Should create at least 1 chunk (if text fits) or more
    expect(chunks.length).toBeGreaterThanOrEqual(1);

    // All chunks should be under the limit
    for (const chunk of chunks) {
      expect(
        chunk.length,
        `Chunk exceeds maxChars: ${chunk.length}`,
      ).toBeLessThanOrEqual(120000);
    }

    // Verify we didn't lose content
    const combinedLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    expect(
      combinedLength,
      "Lost too much content during chunking",
    ).toBeGreaterThanOrEqual(text.length * 0.95);
  });
});
