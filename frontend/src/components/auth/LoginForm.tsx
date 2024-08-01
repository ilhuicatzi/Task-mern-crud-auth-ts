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
import { loginFormSchema } from "@/schemas/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isAuthenticated, errosResponse } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    try {
      login(values);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-3xl">Inicio de Sesión</CardTitle>
        <CardDescription>
          {errosResponse ? (
            <div className="border border-destructive text-red-500 py-2 px-3 rounded-md mt-2">
              {errosResponse.message}
            </div>
          ) : (
            <div className="mt-2">
              Ingresa tus credenciales para acceder a tu cuenta
            </div>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2 mb-2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      autoComplete="email"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2 mb-2">
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <FormControl>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
        </Form>
        <div className="mt-4 flex gap-2 justify-center text-sm">
          <span>¿No tienes una cuenta?</span>
          <Link to="/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
