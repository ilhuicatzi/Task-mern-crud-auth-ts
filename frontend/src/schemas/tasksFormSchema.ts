import {z} from 'zod';

export const NewTaskSchema = z.object({
    title: z
      .string({
        message: "El título es requerido",
      })
      .min(3, {
        message: "El título debe tener al menos 3 caracteres",
      })
      .max(100, {
        message: "El título es muy largo",
      })
      .refine((value) => /^[a-zA-Z0-9_]+$/.test(value), {
        message: "El título no debe contener caracteres especiales",
      }),
  
    description: z
      .string({
        message: "La descripción es requerida",
      })
      .min(2, {
        message: "La descripción debe tener al menos 10 caracteres",
      })
      .max(300, {
        message: "La descripción es muy larga",
      }),
    tag: z
      .string({
        message: "La etiqueta es requerida",
      })
      .min(2, {
        message: "La etiqueta debe tener al menos 2 caracteres",
      })
      .max(50, {
        message: "La etiqueta es muy larga",
      })
      .refine((value) => /^[a-zA-Z0-9_]+$/.test(value), {
        message: "La etiqueta no debe contener caracteres especiales",
      }),
    status: z
      .string({
        message: "El estatus es requerido",
      })
      .refine(
        (value) =>
          [
            "completado",
            "en_progreso",
            "pendiente",
            "en_pausa",
            "cancelado",
          ].includes(value),
        {
          message: "El estatus no es válido",
        }
      ),
    priority: z
      .string({
        message: "La prioridad es requerida",
      })
      .refine((value) => ["baja", "media", "alta"].includes(value), {
        message: "La prioridad no es válida",
      }),
    duration: z
      .string({
        message: "La duración es requerida",
      })
      .min(2, {
        message: "La duración debe tener al menos 2 caracteres",
      })
      .max(50, {
        message: "La duración es muy larga",
      }),
  });