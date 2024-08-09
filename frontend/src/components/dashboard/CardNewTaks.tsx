
import { Button } from "@/components/ui/button"

export function CardNewTaks() {
  return (
    <div
      className="h-full lg:h-80 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <div className="flex flex-col items-center gap-1 text-center px-2 py-5">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
          ¿Tienes una idea o proyecto?
        </h3>
        <p className="hidden sm:block text-sm text-muted-foreground">
          Comienza a crear tu proyecto y da seguimiento a tus tareas.
        </p>
        <Button variant="outline" className="mt-4">
          Crear una Tarea
        </Button>
      </div>
    </div>
  )
}
