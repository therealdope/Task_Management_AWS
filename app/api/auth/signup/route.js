import { executeQuery } from '@/lib/db/database';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await executeQuery({
      query: 'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
      values: [userId, username, email, hashedPassword],
    });

    // Set the cookie
    const response = NextResponse.json({ 
      message: 'User created successfully',
      user: { id: userId, username, email }
    });

    // Set cookie with proper options
    response.cookies.set('auth-token', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}