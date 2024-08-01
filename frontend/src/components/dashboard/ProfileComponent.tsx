import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CgArrowsExpandRight } from "react-icons/cg";
import { Button } from "@/components/ui/button";
export default function ProfileComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOpenedStatus, setIsOpenedStatus] = useState(false);
  const [isOpenedPriority, setIsOpenedPriority] = useState(false);

  const handleOpenStatus = () => {
    setIsOpenedStatus(!isOpenedStatus);
  };

  const handleOpenPriority = () => {
    setIsOpenedPriority(!isOpenedPriority);
  };
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Bienvenid@
          </CardTitle>
          <CardDescription>November 23, 2023</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="flex justify-between items-center gap-5">
          <Avatar className="w-28 h-28">
            <AvatarImage src="/img/foto-perfil.jpeg" alt="foto de perfil" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Erika Hernández</h2>
            <p className="text-sm text-muted-foreground">erika@gmail.com</p>
            <p>Agradecida con la vida y con muchas ganas de aprender.</p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex justify-center items-center ">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
          />
        </div>
        <Separator className="my-4" />
        <div>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold mb-4"> Estatus</h3>
            <Button variant={`${isOpenedStatus?"default":"ghost"}`} onClick={handleOpenStatus}>
              <CgArrowsExpandRight />
            </Button>
          </div>
          <div className={`${isOpenedStatus? "inline-block": "hidden"}`}>
            <div className="flex justify-between items-center">
              <p>Tareas completadas</p>
              <p>15</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Tareas pendientes</p>
              <p>3</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Tareas en progreso</p>
              <p>3</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Tareas pausadas</p>
              <p>6</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Tareas canceladas</p>
              <p>2</p>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold mb-4">Prioridad</h3>
            <Button variant={`${isOpenedPriority?"default":"ghost"}`} onClick={handleOpenPriority}>
              <CgArrowsExpandRight />
            </Button>
          </div>

          <div
            className={`${isOpenedPriority? "inline-block": "hidden"}`}
          >
            <div className="flex justify-between items-center">
              <p>Tareas con prioridad alta</p>
              <p>20</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Tareas con prioridad media </p>
              <p>11</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Tareas con prioridad baja</p>
              <p>3</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
      </CardFooter>
    </Card>
  );
}
