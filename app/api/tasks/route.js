import { executeQuery } from '@/lib/db/database';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const cookieStore = await cookies(); // Add await here
    const userId = cookieStore.get('auth-token')?.value;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = await executeQuery({
      query: 'SELECT * FROM tasks WHERE user_id = ?',
      values: [userId],
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Tasks fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies(); // Add await here
    const userId = cookieStore.get('auth-token')?.value;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description = '' } = await request.json();
    const taskId = uuidv4();

    await executeQuery({
      query: `
        INSERT INTO tasks (id, title, description, user_id)
        VALUES (?, ?, ?, ?)
      `,
      values: [taskId, title, description, userId],
    });

    const newTask = {
      id: taskId,
      title,
      description,
      user_id: userId,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    };

    return NextResponse.json(newTask);
  } catch (error) {
    console.error('Tasks POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}