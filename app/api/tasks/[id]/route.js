import { executeQuery } from '@/lib/db/database';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE(request, { params }) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('auth-token')?.value;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const taskId = params.id;

    // Delete the task
    const result = await executeQuery({
      query: 'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      values: [taskId, userId],
    });

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete task error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}