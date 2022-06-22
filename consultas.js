const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'skatepark_db',
    password: '1234',
    port: 5432,
})

async function nuevoUsuario(email, nombre, password, anos_experiencia, especialidad) {
    try {
        const sqlQuery = {
            text: 'INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            values: [email, nombre, password, anos_experiencia, especialidad]
        }
        const result = await pool.query(sqlQuery)
        return result.rows[0]
    } catch (error) {
        return error
    }
}

async function getUsuarios() {
    try {
        const sqlQuery = {
            text: 'SELECT * FROM skaters'
        }
        const result = await pool.query(sqlQuery)
        return result.rows
    } catch (error) {
        return
    }
}
async function setUsuarioStatus(id, auth) {
    try {
        const sqlQuery = {
            text: 'UPDATE skaters SET auth = $1 WHERE id = $2 RETURNING *',
            values: [auth, id]
        }
        const result = await pool.query(sqlQuery)
        return result.rows[0]
    } catch (error) { 

    }
}

async function getUsuario(email, password) {
    try {
        const sqlQuery = {
            text: 'SELECT * FROM skaters WHERE email = $1 AND password = $2',
            values: [email, password]
        }
        const result = await pool.query(sqlQuery)
        return result.rows[0]
    } catch (error) {
        return (error)
    }
}



module.exports = {
    nuevoUsuario, 
    getUsuarios,
    setUsuarioStatus,
    getUsuario
}