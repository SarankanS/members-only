const { use } = require("passport");
const pool = require("./pool");

async function createMessage(title,content, userId) {
    return await pool.query(
        `INSERT INTO messages (title,content,userID)
        VALUES ($1,$2,$3)`, [title,content,userId]
    )    
}

async function getMessageByUser(userID){
    const results = await pool.query(
        `SELECT * FROM messages WHERE author_id = $1 ORDER BY created_at DESC`, [userID]
    );
    return result.rows;
}

module.exports = {
    createMessage,
    getMessageByUser
}