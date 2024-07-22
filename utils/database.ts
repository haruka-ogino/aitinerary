import { Pool } from 'pg'

const portNum = Number(process.env.DATABASE_PORT)

export const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: portNum,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
})

// module.exports = {
//   query: (text: string, params) => pool.query(text, params),
// }
