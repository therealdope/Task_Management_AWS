"use client"

import { useRouter } from "next/navigation"
import { LogOut, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import Link from "next/link"
import ThemeSwitcher from "./theme-switcher"

export default function UserHeader() {
  const router = useRouter()
  const { toast } = useToast()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [username, setUsername] = useState("User") // Add this line

  useEffect(() => {
    const userName = document.cookie
      .split('; ')
      .find(row => row.startsWith('user-name='))
      ?.split('=')[1];
    
    if (userName) {
      setUsername(decodeURIComponent(userName));
    }
  }, []);

  const handleLogout = () => {
    // Clear the auth cookie
    document.cookie = "auth-token=; path=/; max-age=0"

    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })

    // Redirect to login page
    router.push("/login")
  }

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container-fluid flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">Task Management</h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="text-sm font-medium hover:text-primary relative after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Dashboard
            </Link>
            <Link 
              href="/tasks" 
              className="text-sm font-medium hover:text-primary relative after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              All Tasks
            </Link>
          </nav>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <div className="hidden md:flex items-center gap-2 bg-secondary/70 px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-secondary/70 cursor-pointer">
            <User className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{username}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout} 
            className="hidden md:flex text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/tasks"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Tasks
            </Link>
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2 bg-secondary/70 px-3 py-1.5 rounded-full">
                <User className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{username}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

