// Hindsight Cloud integration — the persistent memory layer of RecallMeet.
// All calls go to https://api.hindsight.vectorize.io
// Uses @vectorize-io/hindsight-client (official SDK)

import { HindsightClient } from '@vectorize-io/hindsight-client';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Allow local environment SSL proxy certificates for HTTPS requests
if (typeof process !== 'undefined' && process.env) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const HINDSIGHT_BASE_URL =
  process.env.HINDSIGHT_BASE_URL || 'https://api.hindsight.vectorize.io';

let _client: HindsightClient | null = null;

function getClient(): HindsightClient {
  if (!_client) {
    const apiKey = process.env.HINDSIGHT_API_KEY || '';
    _client = new HindsightClient({
      baseUrl: HINDSIGHT_BASE_URL,
      apiKey: apiKey,
    });
  }
  return _client;
}

/**
 * Convert a client/company name to a safe Hindsight bank ID.
 * Bank IDs must be lowercase alphanumeric with hyphens.
 */
export function clientToBank(clientName: string): string {
  return clientName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

/**
 * Store a memory in Hindsight for a given client's memory bank.
 * This is the core "learn" operation.
 */
export async function retainMemory(
  bankId: string,
  content: string
): Promise<void> {
  const client = getClient();
  await client.retain(bankId, content);
}

/**
 * Retrieve relevant memories from Hindsight for a given query.
 * Returns raw memory snippets.
 */
export async function recallMemories(
  bankId: string,
  query: string
): Promise<string[]> {
  try {
    const client = getClient();
    const results = await client.recall(bankId, query);

    if (!results) return [];

    if (Array.isArray(results)) {
      return results.map((r: unknown) => {
        if (typeof r === 'string') return r;
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          return String(obj.text || obj.content || obj.memory || JSON.stringify(r));
        }
        return String(r);
      });
    }

    if (typeof results === 'string') return [results];

    return [];
  } catch (error: any) {
    if (error?.statusCode === 404 || error?.message?.includes('not found')) {
      return [];
    }
    console.error('[Hindsight] Recall error:', error);
    return [];
  }
}

/**
 * Generate a synthesized, context-aware answer using Hindsight's reflect operation.
 * This is the "intelligence" that makes RecallMeet valuable — cross-meeting reasoning.
 */
export async function reflectOnMemories(
  bankId: string,
  query: string
): Promise<string> {
  try {
    const client = getClient();
    const result = await client.reflect(bankId, query);

    if (!result) return '';
    if (typeof result === 'string') return result;

    if (typeof result === 'object') {
      const obj = result as Record<string, unknown>;
      return String(obj.text || obj.response || obj.content || obj.answer || JSON.stringify(result));
    }

    return String(result);
  } catch (error: any) {
    if (error?.statusCode === 404 || error?.message?.includes('not found')) {
      return `No memories recorded yet for this client. Process a meeting to start accumulating context.`;
    }
    console.error('[Hindsight] Reflect error:', error);
    return `Unable to query memory bank: ${error?.message || 'Unknown error'}`;
  }
}

/**
 * Check if Hindsight is reachable and configured.
 */
export async function checkHindsightHealth(): Promise<boolean> {
  try {
    const apiKey = process.env.HINDSIGHT_API_KEY || '';
    if (!apiKey) {
      console.warn('[Hindsight] HINDSIGHT_API_KEY is not set');
      return false;
    }
    const client = getClient();
    await client.retain('recallmeet-health', 'health check ' + Date.now());
    return true;
  } catch (error) {
    console.error('[Hindsight] Health check failed:', error);
    return false;
  }
}
