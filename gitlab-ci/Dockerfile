FROM eu.gcr.io/dev-country-188109/profitelo-nginx:base
MAINTAINER loord igor.gerasimow@ratel.io

#name of app branch
ARG branch=stage

#name of common-config branch
ARG common=master

# build env
ARG env=build-dev

#RUN rm -rf /profitelo-frontend

RUN git clone git@git.contactis.pl:itelo/profitelo-frontend.git /profitelo-frontend -b $branch

WORKDIR /profitelo-frontend

#RUN git submodule update --init --recursive

RUN mkdir /common-config && git clone git@git.contactis.pl:itelo/common-config.git -b $common /common-config

RUN mkdir -p /profitelo-frontend/src/main/resources/common-config && cp -r /common-config/*.json /profitelo-frontend/lib/common-config/submodule

ENV PROFITELO_ENV=$env

RUN npm install && npm run ci-deploy

RUN rm -rf /profitelo-frontend/node_modules

#RUN rm /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /profitelo-frontend

ENTRYPOINT ["nginx", "-g", "daemon off;"]
