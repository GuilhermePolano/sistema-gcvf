// Configuração de conexão com o banco de dados MariaDB/MySQL
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root123',
  database: process.env.DB_NAME || 'gcvf_fiergs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000, // 60 segundos
  acquireTimeout: 60000, // 60 segundos
  timeout: 60000, // 60 segundos
  charset: 'utf8mb4'
})

// Testar conexão ao iniciar
pool.getConnection()
  .then(connection => {
    console.log('✅ Conexão com banco de dados estabelecida com sucesso!')
    console.log(`📊 Database: ${process.env.DB_NAME}`)
    console.log(`🔌 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`)
    connection.release()
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao banco de dados:', err.message)
    console.error('Verifique se o MariaDB está rodando e as credenciais estão corretas')
  })

export default pool
