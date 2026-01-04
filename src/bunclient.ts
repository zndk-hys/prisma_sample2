// Bunの組み込みPostgreSQLクライアントを使用
const sql = new Bun.SQL({
  hostname: 'localhost',
  port: 5432,
  database: 'mydb',
  username: 'postgres',
  password: 'postgres',
});

async function main() {
  try {
    // 接続テスト
    const result = await sql<{ version: string }[]>`SELECT version()`;
    console.log('PostgreSQL接続成功！');
    console.log('バージョン:', result[0]?.version);

    // テーブル作成例
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('\nusersテーブルを作成しました');

    // データ挿入例
    const name = 'Taro Yamada';
    const email = `taro${Date.now()}@example.com`;
    const inserted = await sql<{ id: number; name: string; email: string; created_at: Date }[]>`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
      RETURNING *
    `;
    console.log('\n挿入されたユーザー:', inserted[0]);

    // データ取得例
    const users = await sql<{ id: number; name: string; email: string; created_at: Date }[]>`
      SELECT * FROM users ORDER BY id DESC LIMIT 5
    `;
    console.log('\n最新のユーザー一覧:');
    users.forEach(user => {
      console.log(`  ${user.id}: ${user.name} (${user.email})`);
    });

  } catch (error) {
    console.error('エラーが発生しました:', error);
  } finally {
    // 接続を閉じる
    await sql.close();
  }
}

main();
