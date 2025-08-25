export async function getAllPRLifts(db) {
    return await db.getAllAsync("SELECT * FROM historical_prs;");
}

export async function insertPR(db, exercise, weight) {
    return await db.runAsync(
        `INSERT INTO historical_prs (exercise, weight)
        VALUES (?, ?)
        ON CONFLICT(exercise) DO UPDATE SET weight = excluded.weight;`,
        [exercise, weight]
    );
}

export async function getAllBestLifts(db) {
    return await db.getAllAsync("SELECT * FROM best_lifts");
}


export async function insertBeastLift(db, exercise, reps, weight){
    return await db.runAsync(
        `INSERT INTO best_lifts (exercise, reps, weight)
        VALUES (?, ?, ?);`,
        [exercise, reps, weight]
    );
}

export async function deleteBestLift(db, id) {
    if (!id) throw new Error("Error exercise must be defined");
    return await db.runAsync(
        `DELETE FROM best_lifts WHERE id = ?;`,
        [id]
    );
} 