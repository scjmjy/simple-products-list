FROM node:8.11.2

RUN mkdir -p /usr/src/online-store
COPY dist /usr/src/online-store/dist
COPY authMiddleware.js /usr/src/online-store/
COPY data.json /usr/src/online-store/
COPY server.js /usr/src/online-store/server.js
COPY package-deploy.json /usr/src/online-store/package.json

WORKDIR /usr/src/online-store

RUN npm install

EXPOSE 4040

CMD ["node", "server.js"]