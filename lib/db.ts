// SQLite database for RecallMeet application metadata.

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { DEMO_TRANSCRIPTS } from './demo-transcripts';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'recallmeet.db');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = OFF');
    initSchema(_db);
    ensureAcmeDemoDataSeeded(_db);
    _db.pragma('foreign_keys = ON');
  }
  return _db;
}

function initSchema(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS meetings (
      id TEXT PRIMARY KEY,
      client_id TEXT NOT NULL,
      client_name TEXT NOT NULL,
      title TEXT NOT NULL,
      participants TEXT NOT NULL DEFAULT '',
      date TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      audio_path TEXT,
      is_demo_mode INTEGER NOT NULL DEFAULT 0,
      memories_stored INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS transcripts (
      meeting_id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      segments TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS analyses (
      meeting_id TEXT PRIMARY KEY,
      summary TEXT NOT NULL,
      decisions TEXT NOT NULL DEFAULT '[]',
      requirements TEXT NOT NULL DEFAULT '[]',
      action_items TEXT NOT NULL DEFAULT '[]',
      deadlines TEXT NOT NULL DEFAULT '[]',
      commitments TEXT NOT NULL DEFAULT '[]',
      unresolved_issues TEXT NOT NULL DEFAULT '[]',
      preferences TEXT NOT NULL DEFAULT '[]',
      responsibilities TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_meetings_client ON meetings(client_id);
    CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
    CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(date);
  `);
}

export function ensureAcmeDemoDataSeeded(db?: Database.Database): void {
  const targetDb = db || getDb();
  
  const clientId = 'acme-fitness-client-id';
  targetDb.prepare('INSERT OR IGNORE INTO clients (id, name, slug) VALUES (?, ?, ?)').run(
    clientId,
    'Acme Fitness',
    'acme-fitness'
  );

  const existingCount = (targetDb.prepare('SELECT COUNT(*) as count FROM meetings WHERE client_id = ?').get(clientId) as { count: number }).count;
  if (existingCount > 0) return;

  for (const demo of DEMO_TRANSCRIPTS) {
    targetDb.prepare(`
      INSERT OR IGNORE INTO meetings (id, client_id, client_name, title, participants, date, description, status, is_demo_mode, memories_stored)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      demo.id,
      clientId,
      demo.clientName,
      demo.title,
      demo.participants,
      demo.date,
      demo.description,
      'completed',
      1,
      7
    );

    targetDb.prepare(`
      INSERT OR IGNORE INTO transcripts (meeting_id, text, segments) VALUES (?, ?, ?)
    `).run(demo.id, demo.text, JSON.stringify([]));

    targetDb.prepare(`
      INSERT OR IGNORE INTO analyses
      (meeting_id, summary, decisions, requirements, action_items, deadlines, commitments, unresolved_issues, preferences, responsibilities)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      demo.id,
      demo.summary,
      JSON.stringify(demo.decisions),
      JSON.stringify(demo.requirements),
      JSON.stringify(demo.commitments.map((c) => ({ task: c, assignee: 'Rahul', deadline: 'December', status: 'open' }))),
      JSON.stringify(['December 2026']),
      JSON.stringify(demo.commitments),
      JSON.stringify(demo.openItems),
      JSON.stringify(['Prefers simple one-time pricing & WhatsApp integration']),
      JSON.stringify(['Rahul: Proposal & Delivery', 'Priya: Requirements & Credentials'])
    );
  }
}

// CLIENT OPERATIONS
export function getOrCreateClient(name: string, slug: string): DbClient {
  const db = getDb();
  const existing = db
    .prepare('SELECT * FROM clients WHERE slug = ?')
    .get(slug) as DbClient | undefined;
  if (existing) return existing;

  const id = generateId();
  db.prepare(
    'INSERT INTO clients (id, name, slug) VALUES (?, ?, ?)'
  ).run(id, name, slug);

  return db.prepare('SELECT * FROM clients WHERE id = ?').get(id) as DbClient;
}

export function getAllClients(): DbClient[] {
  return getDb().prepare('SELECT * FROM clients ORDER BY name').all() as DbClient[];
}

export function getClientBySlug(slug: string): DbClient | undefined {
  return getDb()
    .prepare('SELECT * FROM clients WHERE slug = ?')
    .get(slug) as DbClient | undefined;
}

// MEETING OPERATIONS
export function createMeeting(data: {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  participants: string;
  date: string;
  description?: string;
  isDemoMode?: boolean;
}): DbMeeting {
  const db = getDb();
  db.prepare(`
    INSERT INTO meetings (id, client_id, client_name, title, participants, date, description, is_demo_mode)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    data.id,
    data.clientId,
    data.clientName,
    data.title,
    data.participants,
    data.date,
    data.description || null,
    data.isDemoMode ? 1 : 0
  );

  return getMeetingById(data.id)!;
}

export function getMeetingById(id: string): DbMeeting | undefined {
  return getDb()
    .prepare('SELECT * FROM meetings WHERE id = ?')
    .get(id) as DbMeeting | undefined;
}

export function getAllMeetings(): DbMeeting[] {
  const db = getDb();
  return db
    .prepare('SELECT * FROM meetings ORDER BY created_at ASC, date ASC')
    .all() as DbMeeting[];
}

export function getMeetingsByClient(clientId: string): DbMeeting[] {
  return getDb()
    .prepare('SELECT * FROM meetings WHERE client_id = ? ORDER BY created_at ASC, date ASC')
    .all(clientId) as DbMeeting[];
}

export function updateMeetingStatus(
  id: string,
  status: string,
  memoriesStored?: number
): void {
  if (memoriesStored !== undefined) {
    getDb()
      .prepare(
        'UPDATE meetings SET status = ?, memories_stored = ? WHERE id = ?'
      )
      .run(status, memoriesStored, id);
  } else {
    getDb()
      .prepare('UPDATE meetings SET status = ? WHERE id = ?')
      .run(status, id);
  }
}

export function deleteMeeting(id: string): boolean {
  const db = getDb();
  db.prepare('DELETE FROM transcripts WHERE meeting_id = ?').run(id);
  db.prepare('DELETE FROM analyses WHERE meeting_id = ?').run(id);
  const result = db.prepare('DELETE FROM meetings WHERE id = ?').run(id);
  return result.changes > 0;
}

export function getStats(): { totalMeetings: number; totalClients: number } {
  const db = getDb();
  const meetings = db.prepare('SELECT COUNT(*) as count FROM meetings').get() as { count: number };
  const clients = db.prepare('SELECT COUNT(*) as count FROM clients').get() as { count: number };
  return {
    totalMeetings: meetings.count,
    totalClients: clients.count,
  };
}

// TRANSCRIPT OPERATIONS
export function saveTranscript(
  meetingId: string,
  text: string,
  segments: unknown[]
): void {
  getDb()
    .prepare(
      'INSERT OR REPLACE INTO transcripts (meeting_id, text, segments) VALUES (?, ?, ?)'
    )
    .run(meetingId, text, JSON.stringify(segments));
}

export function getTranscript(
  meetingId: string
): { text: string; segments: unknown[] } | undefined {
  const row = getDb()
    .prepare('SELECT * FROM transcripts WHERE meeting_id = ?')
    .get(meetingId) as { text: string; segments: string } | undefined;
  if (!row) return undefined;
  return {
    text: row.text,
    segments: JSON.parse(row.segments),
  };
}

// ANALYSIS OPERATIONS
export function saveAnalysis(
  meetingId: string,
  analysis: Record<string, unknown>
): void {
  getDb()
    .prepare(`
      INSERT OR REPLACE INTO analyses
      (meeting_id, summary, decisions, requirements, action_items, deadlines, commitments, unresolved_issues, preferences, responsibilities)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      meetingId,
      analysis.summary as string,
      JSON.stringify(analysis.decisions || []),
      JSON.stringify(analysis.requirements || []),
      JSON.stringify(analysis.actionItems || []),
      JSON.stringify(analysis.deadlines || []),
      JSON.stringify(analysis.commitments || []),
      JSON.stringify(analysis.unresolvedIssues || []),
      JSON.stringify(analysis.preferences || []),
      JSON.stringify(analysis.responsibilities || [])
    );
}

export function getAnalysis(meetingId: string): Record<string, unknown> | undefined {
  const row = getDb()
    .prepare('SELECT * FROM analyses WHERE meeting_id = ?')
    .get(meetingId) as DbAnalysis | undefined;
  if (!row) return undefined;

  return {
    summary: row.summary,
    decisions: JSON.parse(row.decisions),
    requirements: JSON.parse(row.requirements),
    actionItems: JSON.parse(row.action_items),
    deadlines: JSON.parse(row.deadlines),
    commitments: JSON.parse(row.commitments),
    unresolvedIssues: JSON.parse(row.unresolved_issues),
    preferences: JSON.parse(row.preferences),
    responsibilities: JSON.parse(row.responsibilities),
  };
}

export interface DbClient {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface DbMeeting {
  id: string;
  client_id: string;
  client_name: string;
  title: string;
  participants: string;
  date: string;
  description: string | null;
  status: string;
  audio_path: string | null;
  is_demo_mode: number;
  memories_stored: number;
  created_at: string;
}

interface DbAnalysis {
  meeting_id: string;
  summary: string;
  decisions: string;
  requirements: string;
  action_items: string;
  deadlines: string;
  commitments: string;
  unresolved_issues: string;
  preferences: string;
  responsibilities: string;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
