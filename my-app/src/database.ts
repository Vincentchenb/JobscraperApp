const Database = require('better-sqlite3');
const path = require('path');
const db = new Database('jobs.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );
  CREATE TABLE IF NOT EXISTS preferences (
    user_id INTEGER,
    job_category TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// User authentication functions
export function createUser(username: string, password: string) {
  try {
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    stmt.run(username, password);
    return { success: true, message: 'Account created successfully' };
  } catch (error: any) {
    if (error.message.includes('UNIQUE')) {
      return { success: false, message: 'Username already exists' };
    }
    return { success: false, message: 'Error creating account' };
  }
}

export function authenticateUser(username: string, password: string) {
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    const user = stmt.get(username, password);
    if (user) {
      return { success: true, message: 'Login successful', userId: user.id };
    }
    return { success: false, message: 'Invalid username or password' };
  } catch (error) {
    return { success: false, message: 'Error during login' };
  }
}

export default db;