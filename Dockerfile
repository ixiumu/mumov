FROM php:7-alpine

COPY . /opt
VOLUME /data

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.cloud.tencent.com/g' /etc/apk/repositories && \
    apk add --no-cache zip libzip-dev libpng-dev libjpeg-turbo-dev freetype-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-configure zip && \
    docker-php-ext-install zip gd pdo_mysql && \
    chmod +x /opt/mumov && \
    mv /opt/mumov /bin && \
    mv /opt/htdocs/upload /opt/data && \
    ln -s /data/upload /opt/htdocs/upload && \
    sed -i "s/ROOT_PATH . \'..\//'\//g" /opt/htdocs/application/database.php && \
    mv /opt/htdocs/application/extra /opt/data && \
    ln -s /data/extra /opt/htdocs/application/extra && \
    mv /opt/htdocs/static/player /opt/data && \
    ln -s /data/player /opt/htdocs/static/player

WORKDIR /opt/htdocs
EXPOSE 8088

CMD [ "mumov" ]
