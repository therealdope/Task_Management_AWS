import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default function Home() {
  // Check if user is logged in
  const cookieStore = cookies()
  const authCookie = cookieStore.get("auth-token")

  // If not logged in, redirect to login page
  if (!authCookie) {
    return redirect("/login")
  }

  // If logged in, redirect to dashboard
  return redirect("/dashboard")
}

