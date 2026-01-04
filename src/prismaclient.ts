import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    // 接続テスト
    const result = await prisma.$queryRaw<{ version: string }[]>`SELECT version()`;
    console.log('PostgreSQL接続成功！');
    console.log('バージョン:', result[0]?.version);

    // データ挿入例
    const name = 'Taro Yamada';
    const email = `taro${Date.now()}@example.com`;
    const inserted = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    console.log('\n挿入されたユーザー:', inserted);

    // データ取得例
    const users = await prisma.user.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 5,
    });
    console.log('\n最新のユーザー一覧:');
    users.forEach(user => {
      console.log(`  ${user.id}: ${user.name} (${user.email})`);
    });

  } catch (error) {
    console.error('エラーが発生しました:', error);
  } finally {
    // 接続を閉じる
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
