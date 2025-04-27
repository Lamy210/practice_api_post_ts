# Node.js 20 LTS Alpine (軽量) :contentReference[oaicite:8]{index=8}
FROM node:20-alpine

WORKDIR /app

# TypeScript, ts-node, nodemon をグローバルインストール :contentReference[oaicite:9]{index=9}
RUN npm install -g typescript ts-node nodemon

CMD ["sh"]
