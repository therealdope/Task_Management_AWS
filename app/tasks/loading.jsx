import { Skeleton } from "@/components/ui/skeleton"

export default function TasksLoading() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>
      <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72 mt-2" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-10 w-full sm:max-w-xs" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-10 w-[130px]" />
              <Skeleton className="h-10 w-[130px]" />
              <Skeleton className="h-10 w-[80px]" />
            </div>
          </div>

          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

