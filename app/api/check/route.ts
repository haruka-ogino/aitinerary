import { pool } from '@utils/database'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const result = await pool.query('SELECT * FROM person')

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error executing query', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
