import pool from '../../../../db';
import { NextResponse } from 'next/server';

// Correct handler signature for Next.js 15 dynamic API routes
export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').slice(-2, -1)[0];
  try {
    const { rows } = await pool.query('SELECT * FROM reviews WHERE college_id = $1 ORDER BY created_at DESC', [id]);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews', details: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').slice(-2, -1)[0];
  try {
    const data = await request.json();
    const { user, rating, comment } = data;
    const result = await pool.query(
      `INSERT INTO reviews (college_id, user_name, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *`,
      [id, user, rating, comment]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add review', details: error }, { status: 500 });
  }
}
