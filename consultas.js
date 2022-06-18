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
            text: 'INSERT INTO skater (email, nombre, password, anos_experiencia, especialidad) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            values: [req.body.email, req.body.nombre, req.body.password, req.body.anos_experiencia, req.body.especialidad, req.body.foto, req.body.estado]
        }
        const result = await pool.query(sqlQuery)
        return result.rows

    } catch (error) {
        return error

    }
}


module.exports ={
    nuevoUsuario
}