FROM nginx:1.18
COPY ./test.conf /etc/nginx/sites-available/test.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html