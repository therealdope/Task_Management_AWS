"use client"

import { Trash2, Calendar, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function TaskItem({ task, onToggle, onDelete }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(task.created_at))

  const handleToggle = async () => {
    setIsUpdating(true)
    await onToggle(task.id)
    setIsUpdating(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(task.id)
    setIsDeleting(false)
  }

  return (
    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm">
      <div className="flex items-center space-x-4 min-w-0">
        <Checkbox 
          checked={task.status === 'completed'}
          onCheckedChange={handleToggle}
          disabled={isUpdating}
          className={isUpdating ? 'opacity-50' : ''}
        />
        <div className="flex flex-col gap-1 min-w-0">
          <span className={cn(
            "text-sm font-medium leading-normal break-words line-clamp-2",
            task.status === 'completed' && "line-through text-muted-foreground",
            isUpdating && "opacity-50"
          )}>
            {task.title}
            {isUpdating && <Loader2 className="ml-2 h-3 w-3 animate-spin inline" />}
          </span>
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="mr-1 h-3 w-3 flex-shrink-0" />
            {formattedDate}
          </span>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-destructive hover:bg-destructive/10 hover:text-destructive flex-shrink-0"
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        <span className="sr-only">Delete task</span>
      </Button>
    </div>
  )
}

