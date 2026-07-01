import { z } from 'zod';

export const productoSchema = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres.')
    .max(100, 'El nombre es demasiado largo.'),

  raza: z
    .string()
    .min(3, 'La raza debe tener al menos 3 caracteres.')
    .max(100, 'La raza es demasiado larga.'),

  peso: z
    .number()
    .min(1, 'El peso debe ser mayor a 1.')
    .max(100, 'El peso es demasiado grande.'),

  color: z
    .string()
    .min(3, 'El color debe tener al menos 3 caracteres.')
    .max(100, 'El color es demasiado largo.'),

  // Fecha: validamos que sea un objeto Date válido
  fechaNacimiento: z
    .date()
    .min(new Date(), 'La fecha de nacimiento no puede ser en el futuro.'),

  microchip: z
    .string()
    .min(10, 'El microchip debe tener al menos 10 caracteres.')
    .max(100, 'El microchip es demasiado largo.'),
});

// export type RegisterPetForm = z.infer<typeof registerPetSchema>;