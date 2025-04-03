"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import TaskManagement from "@/components/task-management"
import UserHeader from "@/components/user-header"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const authCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))

    if (!authCookie) {
      router.push('/login')
    }
  }, [router])

  return (
    <main className="flex min-h-screen flex-col">
      <UserHeader />
      <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        <TaskManagement />
      </div>
    </main>
  )
}

