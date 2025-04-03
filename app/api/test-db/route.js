import { testConnection } from '@/lib/db/database';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const isConnected = await testConnection();
        if (isConnected) {
            return NextResponse.json({ status: 'Connected to database successfully' });
        } else {
            return NextResponse.json({ error: 'Failed to connect to database' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// to test connection
// curl http://localhost:3000/api/test-db