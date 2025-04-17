# use the official node.js image
FROM node:20

#Create app directory
WORKDIR /app

#Install app dependencies
COPY package*.json .

RUN npm install

# COPY prisma ./prisma

## copy the rest of the code
COPY . .

RUN npx prisma generate

## Build 
RUN npm run build

EXPOSE 3000

# default command to run the server
CMD ["npm","run","dev"]