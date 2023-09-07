FROM node:16

WORKDIR /usr/src/app

copy package*.json ./

RUN npm install  

RUN yarn install

COPY . .

Expose 3000

CMD [ "node", "/usr/src/app/saveDataToFile.js" ]
