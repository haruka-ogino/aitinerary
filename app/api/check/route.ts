import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '@utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await pool.query('SELECT * FROM person')
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
