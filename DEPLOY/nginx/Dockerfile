FROM nginx
WORKDIR /
EXPOSE 80
ENV PORT=80

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/backup

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY www /usr/share/nginx/html/
COPY nginx-forever.sh /nginx-forever.sh

# docker-compose need nginx to NOT run as daemon (b/c it will exit)
CMD ["nginx", "-g", "daemon off;"]