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
    .positive("El Peso debe ser un número positivo")
    .max(50, 'El peso debe estar entre 0 y 50 kg'), // Ajuste de límite máximo

  color: z
    .string()
    .min(3, 'El color debe tener al menos 3 caracteres.')
    .max(100, 'El color es demasiado largo.'),

  // Validar la fecha como un objeto Date
  fechaNacimiento: z.date({
    required_error: "La fecha de nacimiento es requerida",
    invalid_type_error: "El formato de fecha no es válido"
  })
  .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro.'),

  microchip: z.string() // Validar como cadena para verificar la longitud
    .min(10, 'El número de chip debe tener al menos 10 caracteres.')
    .max(20, 'El número de chip es demasiado largo.') // Ajuste de límite máximo

});

// export type RegisterPetForm = z.infer<typeof registerPetSchema>;
