FROM node:16.6.1-alpine3.14
#RUN addgroup app && adduser -S -G app app app
#RUN mkdir app && chown app:app /app
#USER app 
WORKDIR /app
COPY package.json .
RUN npm install
RUN apk update && apk add bash
RUN apk add --no-cache bash
COPY . .
RUN ["chmod", "+x", "/usr/local/bin/docker-entrypoint.sh"]
#"/usr/src/app/docker-entrypoint.sh
#/usr/local/bin/docker-entrypoint.sh:
CMD ["npm","run","dev"]