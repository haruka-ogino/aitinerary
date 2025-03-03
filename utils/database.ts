import { Pool } from 'pg'
import fs from 'fs'

const portNum = Number(process.env.DATABASE_PORT)

export const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: portNum,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    // requestCert: true,
    rejectUnauthorized: false,
    // ca: fs.readFileSync('../ap-southeast-2-bundle.pem').toString(),
  },
})

// module.exports = {
//   query: (text: string, params) => pool.query(text, params),
// }
// cert: fs.readFileSync(__dirname + 'client-key.pem'),
// key: fs.readFileSync(__dirname + 'client-cert.pem'),
