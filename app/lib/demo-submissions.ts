import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const dbDirectory = path.join(process.cwd(), "data");
const dbPath =  path.join(dbDirectory, "demo-submissions.sqlite");

let database: Database.Database | null = null;

function getDatabase() {
  if (database) {
    return database;
  }

  fs.mkdirSync(dbDirectory, { recursive: true });

  database = new Database(dbPath);
  database.pragma("journal_mode = WAL");
  database.exec(`
    CREATE TABLE IF NOT EXISTS demo_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      agency_name TEXT NOT NULL,
      location TEXT NOT NULL,
      plan TEXT NOT NULL,
      contact_methods TEXT NOT NULL,
      message TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return database;
}

export interface DemoSubmissionInput {
  fullName: string;
  phone: string;
  agencyName: string;
  location: string;
  plan: string;
  contactMethods: string[];
  message?: string;
}

interface DemoSubmissionRow {
  id: number;
  full_name: string;
  phone: string;
  agency_name: string;
  location: string;
  plan: string;
  contact_methods: string;
  message: string | null;
  created_at: string;
}

export function saveDemoSubmission(submission: DemoSubmissionInput) {
  const statement = getDatabase().prepare(`
    INSERT INTO demo_submissions (
      full_name,
      phone,
      agency_name,
      location,
      plan,
      contact_methods,
      message
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = statement.run(
    submission.fullName.trim(),
    submission.phone.trim(),
    submission.agencyName.trim(),
    submission.location.trim(),
    submission.plan.trim(),
    JSON.stringify(submission.contactMethods),
    submission.message?.trim() || null
  );

  return {
    id: Number(result.lastInsertRowid),
  };
}
export function getDemoSubmissions() {
  const statement = getDatabase().prepare(`
    SELECT
      id,
      full_name,
      phone,
      agency_name,
      location,
      plan,
      contact_methods,
      message,
      created_at
    FROM demo_submissions
    ORDER BY created_at DESC
  `);

  return (statement.all() as DemoSubmissionRow[]).map((row) => ({
    ...row,
    contact_methods: JSON.parse(row.contact_methods) as string[],
  }));
}