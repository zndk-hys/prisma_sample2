- Bun + PostgreSQL（Docker）
- Prisma + PostgreSQL（Docker）

## 初期設定

```
bun install
docker compose up -d # DBコンテナ起動
bun prisma migrate dev --config ./prisma/postgres/prisma.config.ts # Prismaクライアントコード生成 + マイグレーション実行
```

## Bunから直接DBアクセス

```
bun src/bunclient.ts
```

## Prisma ClientからDBアクセス

```
bun src/prismaclient.ts
```

## データベース

### コンテナの起動

```
docker compose up -d
```

### コンテナの終了

```
docker compose down
```

### コンテナの終了 + データベース削除

```
docker compose down -v
```

### ログを見る

```
docker compose logs -f postgres
```