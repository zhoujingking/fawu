FROM nginx

COPY scripts/nginx/ /etc/nginx/conf.d/

COPY dist/ /usr/share/nginx/html/

EXPOSE 80
