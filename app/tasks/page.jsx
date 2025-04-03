"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import TasksView from "@/components/tasks-view"
import UserHeader from "@/components/user-header"

export default function TasksPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in using document.cookie
    const hasAuthCookie = document.cookie.split("; ").some((cookie) => cookie.startsWith("auth-token="))

    // If not logged in, redirect to login page
    if (!hasAuthCookie) {
      router.push("/login")
    }
  }, [router])

  return (
    <main className="flex min-h-screen flex-col">
      <UserHeader />
      <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        <TasksView />
      </div>
    </main>
  )
}

