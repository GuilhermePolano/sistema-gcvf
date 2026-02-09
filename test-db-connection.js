// Script para testar conexão com banco de dados
const mysql = require('mysql2/promise')

// Carregar variáveis de ambiente manualmente
const DB_HOST = '127.0.0.1' // Mudado de localhost para 127.0.0.1
const DB_PORT = 3306
const DB_USER = 'root'
const DB_PASSWORD = 'root123'
const DB_NAME = 'gcvf_fiergs'

async function testConnection() {
  console.log('🔍 Testando conexão com banco de dados...')
  console.log(`Host: ${DB_HOST}`)
  console.log(`Port: ${DB_PORT}`)
  console.log(`User: ${DB_USER}`)
  console.log(`Database: ${DB_NAME}`)
  console.log('')

  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      connectTimeout: 10000
    })

    console.log('✅ Conexão estabelecida com sucesso!')

    // Testar query
    const [rows] = await connection.query('SELECT COUNT(*) as total FROM usuarios')
    console.log(`📊 Total de usuários no banco: ${rows[0].total}`)

    // Testar query de login
    const [users] = await connection.query(
      `SELECT u.id, u.email, u.perfil, f.nome_completo 
       FROM usuarios u 
       INNER JOIN funcionarios f ON u.id = f.usuario_id 
       WHERE u.email = ?`,
      ['joao.silva@fiergs.org.br']
    )

    if (users.length > 0) {
      console.log('✅ Query de login funcionando!')
      console.log(`   Usuário encontrado: ${users[0].nome_completo}`)
      console.log(`   Perfil: ${users[0].perfil}`)
    } else {
      console.log('❌ Nenhum usuário encontrado')
    }

    await connection.end()
    console.log('\n✅ Teste concluído com sucesso!')
    process.exit(0)

  } catch (error) {
    console.error('❌ Erro ao conectar:', error.message)
    console.error('Código do erro:', error.code)
    console.error('\n💡 Possíveis soluções:')
    console.error('   1. Verifique se o Docker Desktop está rodando')
    console.error('   2. Verifique se o container MariaDB está ativo: docker ps')
    console.error('   3. Verifique as credenciais no arquivo .env')
    console.error('   4. Tente reiniciar o container: docker restart gcvf-mariadb')
    process.exit(1)
  }
}

testConnection()
