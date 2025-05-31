import pool from '../../../../db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: { id: string } }) {
  const { params } = context;
  try {
    const { rows } = await pool.query('SELECT * FROM reviews WHERE college_id = $1 ORDER BY created_at DESC', [params.id]);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews', details: error }, { status: 500 });
  }
}

export async function POST(request: Request, context: { params: { id: string } }) {
  const { params } = context;
  try {
    const data = await request.json();
    const { user, rating, comment } = data;
    const result = await pool.query(
      `INSERT INTO reviews (college_id, user_name, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *`,
      [params.id, user, rating, comment]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add review', details: error }, { status: 500 });
  }
}
