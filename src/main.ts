import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables before anything else
dotenv.config();

async function bootstrap() {
  console.log('🔧 Iniciando aplicación Roomiefy...');
  console.log('📋 Variables de entorno cargadas:');
  console.log('  - NODE_ENV:', process.env.NODE_ENV);
  console.log('  - LOG_LEVEL:', process.env.LOG_LEVEL);
  console.log('  - DATABASE_URL existe:', !!process.env.DATABASE_URL);

  const app = await NestFactory.create(AppModule);

  // Configurar CORS si es necesario
  app.enableCors();

  await app.listen(3000);
  console.log('🚀 Roomiefy está corriendo en http://localhost:3000');
  console.log('💾 Configuración de base de datos:');
  console.log('  - Host:', process.env.POSTGRES_HOST);
  console.log('  - Puerto:', process.env.POSTGRES_PORT);
  console.log('  - Usuario:', process.env.POSTGRES_USER);
  console.log('  - Base de datos:', process.env.POSTGRES_DB);
}

bootstrap();
