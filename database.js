const sqlite3 = require('sqlite3').verbose();

// Create a new database instance
const db = new sqlite3.Database('./data.db', (err) => {
    if (err) {
        console.error("Error opening database", err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            country TEXT,
            rate REAL
        )`, (err) => {
            if (err) {
                console.error("Error creating table", err.message);
            }
        });
    }
});

module.exports = db;
