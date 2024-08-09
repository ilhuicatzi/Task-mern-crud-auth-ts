import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "@/schemas/authFormSchema";
import { useAuth } from "@/hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export function RegisterForm() {
  const navigate = useNavigate();
  const { register, isAuthenticated, errosResponse } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

   function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values);
    try {
      register(values);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="mx-auto min-w-80 w-[500px]">
      <CardHeader>
        <CardTitle className="text-3xl">Registro</CardTitle>
        <CardDescription>
          {errosResponse ? (
            <div className="border border-destructive text-red-500 py-2 px-3 rounded-md mt-2">
              {errosResponse.message}
            </div>
          ) : (
            <div className="mt-2">Ingresa tus datos para crear una cuenta</div>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem className="grid gap-2 mb-2">
                  <FormLabel htmlFor="firstName">Nombre</FormLabel>
                  <Input
                    {...field}
                    id="firstName"
                    type="text"
                    placeholder="Nombre"
                    autoFocus
                    required
                    autoComplete="firstName"
                  />
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormItem className="grid gap-2 mb-2">
                  <FormLabel htmlFor="lastName">Apellido</FormLabel>
                  <Input
                    {...field}
                    id="lastName"
                    type="text"
                    placeholder="Apellido"
                    autoFocus
                    required
                    autoComplete="lastName"
                  />
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="grid gap-2 mb-2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                  />
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem className="grid gap-2 mb-2">
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-2 text-lg"
                    >
                      {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                    </button>
                  </div>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormControl>
              <Button type="submit" className="w-full">
                Registrarse
              </Button>
            </FormControl>
          </form>
        </Form>
        <div className="mt-4 flex gap-2 justify-center text-sm">
          <span>¿Ya tienes una cuenta?</span>
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
