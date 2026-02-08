import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const users = await query(
      `SELECT 
        u.id,
        u.email,
        f.nome,
        p.nome as perfil
      FROM usuarios u
      INNER JOIN funcionarios f ON u.funcionario_id = f.id
      INNER JOIN perfis_acesso p ON u.perfil_id = p.id
      WHERE u.ativo = 1
      ORDER BY p.id ASC
      LIMIT 10`,
      []
    )

    return NextResponse.json({ users })
  } catch (error: any) {
    console.error('Erro ao buscar usuários de teste:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar usuários de teste' },
      { status: 500 }
    )
  }
}
