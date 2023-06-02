#使用基础镜像库
FROM nginx:alpine

#创建工作路径
# RUN mkdir -p /data/web/
# WORKDIR /data/web/

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ /usr/share/nginx/html
# COPY nginx.template /tmp/

# CMD envsubst '$API_URL' < /tmp/nginx.template > /etc/nginx/nginx.conf && nginx -g "daemon off;"
CMD nginx -g "daemon off;"
