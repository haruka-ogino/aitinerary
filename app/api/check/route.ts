import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '@utils/database'

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await pool.query('SELECT * FROM person')
    console.log(result)

    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
