// import mongoose from 'mongoose'

// let isConnected = false

// export const connectToDB = async () => {
//   mongoose.set('strictQuery', true)

//   if (isConnected) {
//     console.log('MongoDB is already connected')
//     return
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI as string, {
//       dbName: 'share_prompt',
//     })

//     isConnected = true

//     console.log('MongoDB connected')
//   } catch (error) {
//     console.log(error)
//   }
// }
import { Pool } from 'pg'

const portNum = Number(process.env.DATABASE_PORT)

console.log({
  host: process.env.DATABASE_HOST,
  port: portNum,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
})

console.log('listening to databaseeee')

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
