import TableTasks from "@/components/tasks/TableTasks"

function TasksPage() {
  return (
    <main className="px-4pb-5 xl:px-10 2xl:px-20">
      <h1 className="text-2xl font-semibold text-muted-foreground">Tareas</h1>
      <TableTasks />
    </main>
  )
}

export default TasksPage