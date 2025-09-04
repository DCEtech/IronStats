export default async function InitDb(db) {
  try {
    await db.execAsync(`PRAGMA journal_mode=WAL;`);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS historical_prs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exercise TEXT NOT NULL UNIQUE,
        weight NUMERIC NOT NULL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS best_lifts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exercise TEXT NOT NULL,
        reps NUMERIC NOT NULL,
        weight NUMERIC NOT NULL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS iron_vision_rm (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        exercise TEXT NOT NULL UNIQUE,
        teorical_weight NUMERIC NOT NULL
        );  
    `);

    console.log("✅ Tables correctly created.");
    const rows = await db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table'");
    console.log("📂 Existing tables:", rows);
  } catch (error) {
    console.error("❌ Error InitDb:", error);
  }
}