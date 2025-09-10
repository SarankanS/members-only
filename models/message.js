const pool = require("../db/pool");

async function createMessage(title,content, userId) {
    return await pool.query(
        `INSERT INTO messages (title,content,author_ID)
        VALUES ($1,$2,$3)`, [title,content,userId]
    )    
}

async function getMessageByUser(userID){
    const results = await pool.query(
        `SELECT * FROM messages WHERE author_id = $1 ORDER BY created_at DESC`, [userID]
    );
    return result.rows;
}

async function getAllMessages() {
    const results = await pool.query(
        `SELECT messages.id, messages.title, messages.content, messages.timestamp, users.firstname || ' ' || users.lastname AS authorname
        FROM messages
        JOIN users ON messages.author_id = users.id
        ORDER BY messages.timestamp DESC`
    );

    return results.rows;   
}

async function getMessages(limit, offset) {
  const result = await pool.query(
    'SELECT * FROM messages ORDER BY timestamp DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return result.rows;
}

async function getMessageCount() {
  const result = await pool.query('SELECT COUNT(*) FROM messages');
  return parseInt(result.rows[0].count);
}


module.exports = {
    createMessage,
    getMessageByUser,
    getAllMessages,
    getMessages,
    getMessageCount
}