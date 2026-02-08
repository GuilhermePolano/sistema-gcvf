import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json()

    console.log('=== LOGIN ATTEMPT ===')
    console.log('Email:', email)
    console.log('Senha recebida:', senha ? '***' : 'vazia')

    if (!email || !senha) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário no banco
    const [rows]: any = await pool.query(
      `SELECT 
        u.id, u.email, u.senha_hash, u.perfil, u.ativo,
        f.id as funcionario_id, f.nome_completo, f.matricula,
        c.nome as cargo, s.nome as setor, e.sigla as entidade
      FROM usuarios u
      INNER JOIN funcionarios f ON u.id = f.usuario_id
      INNER JOIN cargos c ON f.cargo_id = c.id
      INNER JOIN setores s ON f.setor_id = s.id
      INNER JOIN entidades e ON f.entidade_id = e.id
      WHERE u.email = ? AND u.ativo = TRUE`,
      [email]
    )

    console.log('Usuários encontrados:', rows.length)

    if (rows.length === 0) {
      console.log('Nenhum usuário encontrado com email:', email)
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    const usuario = rows[0]
    console.log('Usuário encontrado:', usuario.email)
    console.log('Hash no banco:', usuario.senha_hash ? usuario.senha_hash.substring(0, 20) + '...' : 'vazio')

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash)
    console.log('Senha válida:', senhaValida)

    if (!senhaValida) {
      console.log('Senha inválida para:', email)
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    console.log('Login bem-sucedido para:', email)

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        perfil: usuario.perfil,
        funcionario_id: usuario.funcionario_id
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    // Dados do usuário para retornar
    const userData = {
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome_completo,
      matricula: usuario.matricula,
      cargo: usuario.cargo,
      setor: usuario.setor,
      entidade: usuario.entidade,
      perfil: usuario.perfil,
      funcionario_id: usuario.funcionario_id
    }

    return NextResponse.json({
      success: true,
      token,
      user: userData
    })

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    )
  }
}
