import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>
      <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <div className="space-y-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

