// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface JournalEntry {
  id: number;
  title: string;
  text: string;
  updatedText: string | null;
  sentiment: number | null;
}

const db = new Dexie('reframedb') as Dexie & {
  entries: EntityTable<
    JournalEntry,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  entries: '++id, text, updatedText, sentiment'
});

export type { JournalEntry };
export { db };
