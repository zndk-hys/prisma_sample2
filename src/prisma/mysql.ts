import { PrismaClient } from '../generated/prisma/mysql/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb(process.env.MYSQL_DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    // 接続テスト
    const result = await prisma.$queryRaw<{ version: string }[]>`SELECT version()`;
    console.log('MySQL接続成功！');
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
  }
}

main();
