FROM node:6.9
MAINTAINER bump-app <https://github.com/bump-app>

# RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.20.0
# ENV PATH="/root/.yarn/bin:${PATH}"
RUN mkdir -p /opt/bump/client

# Preinstall dependencies in an earlier layer so we don't reinstall every time
# any file changes.
COPY ./package.json /opt/bump/client/
# COPY ./yarn.lock /opt/bump/client/
WORKDIR /opt/bump/client
RUN npm install

# *NOW* we copy the codebase in
COPY . /opt/bump/client

ENTRYPOINT ["./node_modules/.bin/ember"]
CMD ["serve", "--port=80", "--environment=development", "--live-reload-port=57777"]
EXPOSE 57777
EXPOSE 80
