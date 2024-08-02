FROM nginx

COPY scripts/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY scripts/nginx/nginx.conf /etc/nginx/nginx.conf

COPY dist/ /usr/share/nginx/html/

EXPOSE 80
