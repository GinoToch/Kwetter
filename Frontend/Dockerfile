# Choose the Image which has Node installed already
FROM node:lts-alpine

RUN npm install -g http-server

# make the 'app' folder the current working directory                           
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 8080

# build app for production with minification
RUN npm run build

CMD [ "http-server", "dist", ""]