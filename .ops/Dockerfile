FROM node:12.16-alpine

WORKDIR /chatting-bk

COPY ./ ./

RUN npm install && \
    npm ci --only=production

ENV PORT 3100
EXPOSE 3100

ENTRYPOINT ["npm", "start"]
