FROM node:16.16.0 as builder

RUN mkdir /usr/src/drinkus-front
WORKDIR /usr/src/drinkus-front
ENV PATH /usr/src/drinkus-front/node_modeuls/.bin:$PATH
COPY package.json /usr/src/drinkus-front/package.json
RUN npm install 
RUN npm install react-scripts@5.0.1 -g 

CMD [ "npm", "start" ]