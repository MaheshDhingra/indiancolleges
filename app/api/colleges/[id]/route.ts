import pool from '../../../db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: { id: string } }) {
  const { params } = context;
  try {
    const { rows } = await pool.query('SELECT * FROM colleges WHERE id = $1', [params.id]);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch college', details: error }, { status: 500 });
  }
}
