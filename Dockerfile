
FROM node:15.11.0-alpine as node

RUN mkdir -p  /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli@10.0.3

COPY . .

CMD npm build-prod

FROM nginx:alpine
COPY --from=node /usr/src/app/dist/WMS-BMM /usr/share/nginx/html
COPY  nginx.conf /etc/nginx/sites-enabled/default
