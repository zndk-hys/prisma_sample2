Bun + PostgreSQL（Docker）

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