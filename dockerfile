FROM alpine

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update 
RUN apk add mongodb
RUN apk add nodejs npm

VOLUME [ "/data/db" ]

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN cd /usr/src/app && npm install
RUN printf "#!/bin/bash\nmongod | npm start\n" > /usr/src/app/run.sh
RUN chmod u+x /usr/src/app/run.sh

EXPOSE 27017
EXPOSE 28017
EXPOSE 3000

CMD [ "sh", "/usr/src/app/run.sh" ]