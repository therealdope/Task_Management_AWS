import { executeQuery } from '@/lib/db/database';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function PUT(request, { params }) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('auth-token')?.value;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const taskId = params.id;

    // Get current task status
    const [task] = await executeQuery({
      query: 'SELECT status FROM tasks WHERE id = ? AND user_id = ?',
      values: [taskId, userId],
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Toggle status
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';

    await executeQuery({
      query: 'UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?',
      values: [newStatus, taskId, userId],
    });

    // Get updated task
    const [updatedTask] = await executeQuery({
      query: 'SELECT * FROM tasks WHERE id = ?',
      values: [taskId],
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Task toggle error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}