/**
 * Fact extraction module for processing and chunking text.
 *
 * Ported from: hindsight_api.engine.retain.fact_extraction
 */

/**
 * Options for the chunkText function.
 */
export interface ChunkTextOptions {
  /**
   * Maximum characters per chunk.
   */
  maxChars: number;
}

/**
 * Splits text into chunks at sentence boundaries,
 * respecting the maximum character limit.
 *
 * @param text - The text to chunk
 * @param options - Chunking options
 * @returns Array of text chunks
 *
 * @example
 * ```ts
 * const chunks = chunkText(
 *   "Long text here...",
 *   { maxChars: 1000 }
 * );
 * ```
 */
export function chunkText(text: string, options: ChunkTextOptions): string[] {
  const { maxChars } = options;

  // If text fits within limit, return as single chunk
  if (text.length <= maxChars) {
    return [text];
  }

  // Split into sentences (keep the delimiter attached)
  const sentences = splitIntoSentences(text);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (!trimmedSentence) continue;

    // Check if adding this sentence would exceed the limit
    const potentialChunk = currentChunk
      ? `${currentChunk} ${trimmedSentence}`
      : trimmedSentence;

    if (potentialChunk.length <= maxChars) {
      // Sentence fits, add it to current chunk
      currentChunk = potentialChunk;
    } else if (currentChunk) {
      // Current chunk is full, start a new one
      chunks.push(currentChunk);
      currentChunk = trimmedSentence;

      // Handle case where single sentence exceeds maxChars
      if (currentChunk.length > maxChars) {
        const splitSentences = splitLongSentence(currentChunk, maxChars);
        // Add all but the last split as complete chunks
        chunks.push(...splitSentences.slice(0, -1));
        currentChunk = splitSentences.at(-1) ?? "";
      }
    } else {
      // First sentence and it exceeds maxChars
      const splitSentences = splitLongSentence(trimmedSentence, maxChars);
      chunks.push(...splitSentences.slice(0, -1));
      currentChunk = splitSentences.at(-1) ?? "";
    }
  }

  // Don't forget the last chunk
  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Splits text into sentences, keeping punctuation attached.
 * Handles common sentence endings: . ! ?
 */
function splitIntoSentences(text: string): string[] {
  // Split on sentence-ending punctuation followed by
  // whitespace or end of string. Uses positive lookbehind
  // to keep the punctuation with the sentence.
  return text.split(/(?<=[.!?])\s+/);
}

/**
 * Splits a sentence that exceeds maxChars into smaller
 * pieces. Tries to split at word boundaries when possible.
 */
function splitLongSentence(sentence: string, maxChars: number): string[] {
  const pieces: string[] = [];
  let remaining = sentence;

  while (remaining.length > maxChars) {
    // Find the last space before maxChars
    let splitIndex = remaining.lastIndexOf(" ", maxChars);

    // If no space found, force split at maxChars
    if (splitIndex === -1) {
      splitIndex = maxChars;
    }

    pieces.push(remaining.slice(0, splitIndex).trim());
    remaining = remaining.slice(splitIndex).trim();
  }

  if (remaining) {
    pieces.push(remaining);
  }

  return pieces;
}
