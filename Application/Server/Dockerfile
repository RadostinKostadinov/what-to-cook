FROM node:lts-alpine
WORKDIR /server
COPY . .
RUN npm install
CMD ["node", "./src/transformData_step1.js"]