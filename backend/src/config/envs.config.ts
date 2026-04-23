import 'dotenv/config';
import { Logger } from '../utils';
import { z } from 'zod';

// Esquema de validación para las variables de entorno
const envSchema = z.object({
  // Puerto del servidor
  PORT: z.coerce.number().int().positive().default(3000),

  // Entorno de ejecución
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // URL de la base de datos 
  DATABASE_URL: z.string().optional(),

  // Secreto para JWT (opcional, si se usa autenticación)
  JWT_SECRET: z.string().min(32).optional(),

  // Configuración de CORS 
  CORS_ORIGIN: z.string().optional(),

  // Nivel de logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info')

});

// Función para validar y parsear las variables de entorno
const validateEnv = () => {
  try {
    const parsed = envSchema.parse(process.env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error('Error de validación de variables de entorno: ');
    } else {
      Logger.error(`Error desconocido al validar variables de entorno: ${error}`);
    }
    process.exit(1);
  }
}

// Exportar las variables de entorno validadas
export const envs = validateEnv();

// Exportar tipos para TypeScript
export type EnvConfig = z.infer<typeof envSchema>;

