const { Client } = require('pg');
require('dotenv').config();

const client = new Client(process.env.DATABASE_URL);

async function testConnection() {
  try {
    console.log('🔌 Intentando conectar a Azure Cosmos DB PostgreSQL...');
    await client.connect();
    console.log('✅ ¡Conexión exitosa a Azure Cosmos DB PostgreSQL!');

    // Test query
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Consulta ejecutada con éxito:', result.rows[0]);

    // Verificar si existe la tabla roomies
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'roomies'
      );
    `);

    if (tableCheck.rows[0].exists) {
      console.log('✅ La tabla Roomies existe');
      const countResult = await client.query('SELECT COUNT(*) as count FROM roomies');
      console.log(`✅ La tabla Roomies tiene ${countResult.rows[0].count} registros`);
    } else {
      console.log('❌ La tabla Roomies no existe');
    }

  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
    console.error('Error completo:', err);
  } finally {
    await client.end();
    console.log('Conexión cerrada');
  }
}

testConnection();