"use client"

import { useState, useEffect } from "react"
import { ArrowUpDown, Search, Grid, List, X, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import TaskItem from "./task-item"
import TaskCard from "./task-card"
import Link from "next/link"

// Mock tasks data for demonstration
const mockTasks = [
]

export default function TasksView() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("list")
  const [isLoading, setIsLoading] = useState(true)

  // Replace mock data loading with real API call
  // First useEffect for loading tasks
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/tasks')
        const data = await response.json()
        if (response.ok) {
          setTasks(data)
        } else {
          throw new Error(data.error)
        }
      } catch (error) {
        console.error("Failed to load tasks:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])

  // Second useEffect for filtering and sorting
  useEffect(() => {
    let result = [...tasks]

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((task) => (statusFilter === "completed" ? task.status === 'completed' : task.status === 'pending'))
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((task) => task.title.toLowerCase().includes(query))
    }

    // Apply sorting with proper date handling
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        break
      case "oldest":
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        break
      case "alphabetical":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "completed":
        result.sort((a, b) => {
          if (a.status === b.status) {
            return new Date(b.created_at) - new Date(a.created_at)
          }
          return a.status === 'completed' ? -1 : 1
        })
        break
    }

    setFilteredTasks(result)
  }, [tasks, searchQuery, sortOption, statusFilter])

  const toggleTaskCompletion = async (id) => {
    try {
      const userId = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token='))
        ?.split('=')[1];

      const response = await fetch(`/api/tasks/${id}/toggle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId
        }
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(task => 
          task.id === id ? updatedTask : task
        ));
      } else {
        throw new Error('Failed to update task status');
      }
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const userId = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token='))
        ?.split('=')[1];

      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userId}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete task');
      }

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">All Tasks</h1>
          <p className="text-muted-foreground">View, search, and manage all your tasks in one place</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-8"
            disabled={isLoading}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={clearSearch}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)} disabled={isLoading}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[130px]" disabled={isLoading}>
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOption("newest")}>Newest First</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("oldest")}>Oldest First</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("alphabetical")}>Alphabetical</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("completed")}>Completion Status</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex rounded-md border">
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none rounded-l-md"
              onClick={() => setViewMode("list")}
              disabled={isLoading}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none rounded-r-md"
              onClick={() => setViewMode("grid")}
              disabled={isLoading}
            >
              <Grid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No tasks found</p>
          {searchQuery && (
            <Button variant="outline" onClick={clearSearch} className="mt-4">
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
          {filteredTasks.map((task) =>
            viewMode === "grid" ? (
              <TaskCard key={task.id} task={task} onToggle={toggleTaskCompletion} onDelete={deleteTask} />
            ) : (
              <TaskItem key={task.id} task={task} onToggle={toggleTaskCompletion} onDelete={deleteTask} />
            ),
          )}
        </div>
      )}

      {!isLoading && (
        <div className="pt-4 text-sm text-muted-foreground">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </div>
      )}
    </div>
  )
}

