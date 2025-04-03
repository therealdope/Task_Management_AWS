import { executeQuery } from '@/lib/db/database';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { email, password, name, action } = await request.json();
    console.log('Auth action:', action); // Debug log

    if (action === 'register') {
      // Check if user already exists
      const existingUser = await executeQuery({
        query: 'SELECT id FROM users WHERE email = ?',
        values: [email],
      });

      if (existingUser.length > 0) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = uuidv4();

      console.log('Registering user:', { userId, email, name }); // Debug log

      await executeQuery({
        query: 'INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)',
        values: [userId, email, hashedPassword, name],
      });

      return NextResponse.json({
        id: userId,
        email,
        name,
      });
    }

    if (action === 'login') {
      const users = await executeQuery({
        query: 'SELECT * FROM users WHERE email = ?',
        values: [email],
      });

      if (users.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const user = users[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }

      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    }
  } catch (error) {
    console.error('Auth error:', error); // Debug log
    return NextResponse.json(
      { error: 'Registration failed: ' + error.message },
      { status: 500 }
    );
  }
}