import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  CircleCheck,
  CircleHelp,
  CircleAlert,
  CircleX,
  CirclePause,
  MoveDown,
  MoveRight,
  MoveUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableData = [
  {
    task: "Crear una Rest Api",
    tag: "Programacion",
    status: "Completada",
    priority: "Baja",
    start: "2024-11-23",
    duration: "3 semanas",
  },
  {
    task: "Diseñar Landing Page",
    tag: "Diseño",
    status: "En progreso",
    priority: "Media",
    start: "2024-11-23",
    duration: "2 semanas",
  },
  {
    task: "Crear un Dashboard",
    tag: "Proyecto",
    status: "Pendiente",
    priority: "Alta",
    start: "2024-11-23",
    duration: "4 semanas",
  },
  {
    task: "Clases de Cocina",
    tag: "Cocina",
    status: "En pausa",
    priority: "Baja",
    start: "2024-11-23",
    duration: "2 semanas",
  },
];

const dataStatus: { [key: string]: { icon: JSX.Element; text: string } } = {
  Completada: {
    icon: <CircleCheck className="h-5 w-5 text-muted-foreground" />,
    text: "Completada",
  },
  "En progreso": {
    icon: <CircleHelp className="h-5 w-5 text-muted-foreground" />,
    text: "En progreso",
  },
  Pendiente: {
    icon: <CircleAlert className="h-5 w-5 text-muted-foreground" />,
    text: "Pendiente",
  },
  Cancelada: {
    icon: <CircleX className="h-5 w-5 text-muted-foreground" />,
    text: "Cancelada",
  },
  "En pausa": {
    icon: <CirclePause className="h-5 w-5 text-muted-foreground" />,
    text: "En pausa",
  },
};

const dataPriority: { [key: string]: { icon: JSX.Element; text: string } } = {
  Baja: {
    icon: <MoveDown className="h-5 w-5 text-muted-foreground" />,
    text: "Baja",
  },
  Media: {
    icon: <MoveRight className="h-5 w-5 text-muted-foreground" />,
    text: "Media",
  },
  Alta: {
    icon: <MoveUp className="h-5 w-5 text-muted-foreground" />,
    text: "Alta",
  },
};


export function ViewTaskTable() {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="text-xl">Tareas de Erika</CardTitle>
          <CardDescription className="hidden sm:flex">Ultimas tareas designadas por Erika</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="#">
            <span className="hidden sm:flex">Ver todas</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="h-12">
              <TableHead className="table-cell">Tarea</TableHead>
              <TableHead className="hidden sm:table-cell">Estatus</TableHead>
              <TableHead className="hidden md:table-cell">Prioridad</TableHead>
              <TableHead className="hidden lg:table-cell">Inicio</TableHead>
              <TableHead className="hidden lg:table-cell">Duración</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {TableData.map((data, index) => (
              <TableRow key={index} className="h-12">
                <TableCell className="table-cell">
                  <div className="flex items-center gap-2">
                    <span>{data.task}</span>
                    <Badge className="hidden lg:inline-block" variant="outline">
                      {data.tag}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-2">
                    {dataStatus[data.status].icon}
                    <span>{dataStatus[data.status].text}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    {dataPriority[data.priority].icon}
                    <span>{dataPriority[data.priority].text}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    <span>{data.start}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{data.duration}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
