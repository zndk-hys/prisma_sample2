- Bun + PostgreSQL（Docker）
- Bun + MySQL（Docker）
- Prisma + PostgreSQL（Docker）
- Prisma + MySQL（Docker）

## 初期設定

```
bun install
docker compose up -d # DBコンテナ起動
bun prisma migrate dev --config ./prisma/postgres/prisma.config.ts # Prismaクライアントコード生成 + マイグレーション実行
```

- PostgreSQL - `./prisma/postgres/prisma.config.ts`
- MySQL - `./prisma/mysql/prisma.config.ts`

## Bunから直接DBアクセス

```
bun src/bunclient.ts
```

## Prisma ClientからDBアクセス

```
bun src/prismaclient.ts
```

## データベース

- PostgreSQL - `docker/compose.postgres.yml`
- MySQL - `docker/compose.mysql.yml`

### コンテナの起動

```
docker compose -f docker/compose.postgres.yml up -d
```

### コンテナの終了

```
docker compose -f docker/compose.postgres.yml down
```

### コンテナの終了 + データベース削除

```
docker compose -f docker/compose.postgres.yml down -v
```

### ログを見る

```
docker compose -f docker/compose.postgres.yml logs
```