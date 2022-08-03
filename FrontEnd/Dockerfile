FROM node:16.16.0 as builder
WORKDIR /FrontEnd
COPY ./package*.json ./ 
RUN npm install
RUN npm run build


FROM nginx 
EXPOSE 3000
COPY ./test.conf /etc/nginx/sites-available/test.config
COPY --from=builder /FrontEnd/build  /usr/share/nginx/html