
import { Button } from "@/components/ui/button"

export function CardNewTaks() {
  return (
    <div
      className="h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          ¿Tienes una idea o proyecto?
        </h3>
        <p className="text-sm text-muted-foreground">
          Comienza a crear tu proyecto y da seguimiento a tus tareas.
        </p>
        <Button className="mt-4">
          Crear una Tarea
        </Button>
      </div>
    </div>
  )
}
