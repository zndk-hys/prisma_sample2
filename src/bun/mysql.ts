// BunのMySQL組み込みクライアントを使用
import { SQL } from 'bun';

const mysql = new SQL({
  adapter: 'mysql',
  hostname: 'localhost',
  port: 3306,
  database: 'mydb',
  username: 'mysql',
  password: 'mysql',
});

async function main() {
  try {
    // 接続テスト
    const result = await mysql<{ version: string }[]>`SELECT VERSION() as version`;
    console.log('MySQL接続成功！');
    console.log('バージョン:', result[0]?.version);

    // テーブル作成例
    await mysql`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('\nusersテーブルを作成しました');

    // データ挿入例
    const name = 'Taro Yamada';
    const email = `taro${Date.now()}@example.com`;
    const inserted = await mysql`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
    `;
    console.log('\n挿入されたユーザーID:', inserted.lastInsertRowid);

    // 挿入したデータを取得
    const [insertedUser] = await mysql<{ id: number; name: string; email: string; created_at: Date }[]>`
      SELECT * FROM users WHERE id = ${inserted.lastInsertRowid}
    `;
    console.log('挿入されたユーザー:', insertedUser);

    // データ取得例
    const users = await mysql<{ id: number; name: string; email: string; created_at: Date }[]>`
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
    await mysql.close();
  }
}

main();
