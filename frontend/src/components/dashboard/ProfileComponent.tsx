import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function ProfileComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="overflow-hidden pb-2">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid  gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Bienvenid@
          </CardTitle>
          <CardDescription>November 23, 2023</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 ">
        <div className="flex flex-col justify-center items-center gap-5">
          <Avatar className="w-28 h-28">
            <AvatarImage src="/img/foto-perfil.jpeg" alt="foto de perfil" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center items-center sm:items-start ">
            <h2 className="text-lg font-semibold">Erika Hernández</h2>
            <p className="text-sm text-muted-foreground">erika@gmail.com</p>
          </div>
        </div>
        
        <div className="hidden sm:flex lg:flex-col gap-3">
        <Separator orientation="vertical" className="hidden sm:flex lg:hidden" />
        <Separator className="hidden lg:block my-6" />
          <div className="flex justify-center items-center w-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
          />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
