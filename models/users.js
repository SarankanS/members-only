const pool = require("../db/pool");

async function createUser(firstname, lastname, email, password) {
    return await pool.query(
        `INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4)`,[firstname, lastname,email,password]        
    );
}

async function getUserByEmail(email) {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1", [email]
    );  
    return result.rows[0];
}

async function getUserById(id) {
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1", [id]
    )
    return result.rows[0]
    
}


async function updateMembership(id, status){
    await pool.query(
        "UPDATE users SET is_member = $1 WHERE id = $2", [status, id]
    );
}
module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateMembership
}