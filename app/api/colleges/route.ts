import pool from '../../db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM colleges ORDER BY name ASC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch colleges', details: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, type, location, top_package, cutoff, description, image, rating, reviews } = data;
    const result = await pool.query(
      `INSERT INTO colleges (name, type, location, top_package, cutoff, description, image, rating, reviews)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, type, location, top_package, cutoff, description, image, rating, reviews]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add college', details: error }, { status: 500 });
  }
}
