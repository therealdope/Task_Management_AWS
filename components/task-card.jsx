"use client"

import { Trash2, Calendar, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function TaskCard({ task, onToggle, onDelete }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(task.created_at))

  return (
    <Card className={cn("transition-all hover:shadow-md", task.status === 'completed' && "bg-muted/50")}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-3 min-w-0">
          <Checkbox
            checked={task.status === 'completed'}
            onCheckedChange={handleToggle}
            disabled={isUpdating}
            id={`card-task-${task.id}`}
            className={cn("mt-1 flex-shrink-0", isUpdating && "opacity-50")}
          />
          <div className="flex-1 min-w-0">
            <label
              htmlFor={`card-task-${task.id}`}
              className={cn(
                "text-base font-medium cursor-pointer break-words line-clamp-2 leading-normal",
                task.status === 'completed' && "line-through text-muted-foreground",
                isUpdating && "opacity-50"
              )}
            >
              {task.title}
              {isUpdating && <Loader2 className="ml-2 h-3 w-3 animate-spin inline" />}
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 pt-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3 flex-shrink-0" />
          {formattedDate}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isDeleting}
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          <span className="sr-only">Delete task</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

