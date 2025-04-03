"use client"

import { useState, useEffect } from "react"
import { PlusCircle, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TaskItem from "./task-item"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Maximum number of tasks to show on the dashboard
const MAX_DASHBOARD_TASKS = 5

export default function TaskManagement() {
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddingTask, setIsAddingTask] = useState(false)
  const { toast } = useToast()

  const fetchTasks = async () => {
    try {
      const userId = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token='))
        ?.split('=')[1];
      const response = await fetch('/api/tasks', {
        headers: {
          'user-id': userId,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Error fetching tasks",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const addTask = async () => {
    if (newTaskTitle.trim() === "") return;
    setIsAddingTask(true);
  
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTaskTitle,
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
  
      await fetchTasks();
      setNewTaskTitle("");
      toast({
        title: "Task added",
        description: "Your task has been added successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to add task",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsAddingTask(false);
    }
  };

  // Update the toggleTaskCompletion function
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
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive"
      });
    }
  };

  // Update the deleteTask function
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
      toast({
        title: "Task deleted",
        description: "Task has been deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Add this useEffect to fetch tasks when component mounts

  // Sort tasks by date (newest first) and then filter
  // Update the sorting logic to handle ISO date strings
  const sortedAndFilteredTasks = [...tasks]
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    })
    .filter((task) => {
      if (activeTab === "all") return true;
      if (activeTab === "active") return task.status === 'pending';
      if (activeTab === "completed") return task.status === 'completed';
      return true;
    });

  // Limit the number of tasks shown on dashboard
  const MAX_DASHBOARD_TASKS = 5;
  const hasMoreTasks = sortedAndFilteredTasks.length > MAX_DASHBOARD_TASKS;
  const displayedTasks = sortedAndFilteredTasks.slice(0, MAX_DASHBOARD_TASKS);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <Button onClick={addTask} disabled={isAddingTask}>
          {isAddingTask && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Task
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <TaskList 
            tasks={displayedTasks} 
            onToggle={toggleTaskCompletion} 
            onDelete={deleteTask} 
          />
          {hasMoreTasks && (
            <div className="mt-4 flex justify-center">
              <Link href="/tasks">
                <Button variant="outline" size="sm">
                  View More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No tasks found</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  )
}

