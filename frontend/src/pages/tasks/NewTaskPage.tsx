import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
//import {NewTaskSchema} from "@/validations/NewTaskSchema";

function NewTaskPage() {
  return (
    <main className="flex justify-center items-center">
      <Card className="w-[700px] mt-10">
        <CardHeader>
          <CardTitle className="text-2xl">Nueva Tarea</CardTitle>
          <CardDescription>
            Crea una nueva tarea y da seguimiento a tus pendientes.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-5 w-full">
          <div className="col-span-2">
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="title" className="px-2">
                Nombre de la tarea
              </Label>
              <Input id="title" placeholder="Escribe el título de tu tarea" />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="description" className="px-2">
                Descripción
              </Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Escribe una descripción de tu tarea"
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="tag" className="px-2">
                Etiqueta
              </Label>
              <Input
                id="tag"
                placeholder="Escribe una palabra clave de tu tarea "
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="status" className="px-2">
                Estatus
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleciona un estatus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completado">Completado</SelectItem>
                  <SelectItem value="en_progreso">En progreso</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="en_pausa">En pausa</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <RadioGroup defaultValue="media" className="my-5">
              <Label>Prioridad</Label>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="baja" id="r1">
                  Baja
                </RadioGroupItem>
                <Label htmlFor="r1">Baja</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="media" id="r2">
                  Media
                </RadioGroupItem>
                <Label htmlFor="r2">Media</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="alta" id="r3">
                  Alta
                </RadioGroupItem>
                <Label htmlFor="r3">Alta</Label>
              </div>
            </RadioGroup>
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="duration" className="px-2">
                Duración
              </Label>
              <Input
                id="duration"
                type="text"
                placeholder="Escribe un tiempo estimado"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-end">
          <Button>Crear Tarea</Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default NewTaskPage;
