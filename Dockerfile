# -------- DEVELOPMENT ---------- 
FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000
# -------- END ---------- 

# -------- BUILD ---------- 
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

# Just in case we need to use some dev dependency
COPY --from=development /app/node_modules ./node_modules

COPY . .

# we need to declare environment variables before build command
ENV NODE_ENV=production
ENV VITE_API_URL=http://localhost:3000

# Run the build command which creates the production bundle
RUN npm run build
# -------- END ---------- 

# -------- PRODUCTION ---------- 
# TODO: find out how to implement better production phase
FROM node:18-alpine AS production

WORKDIR /app

COPY package.json ./

COPY vite.config.ts ./

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD [ "npm", "run", "preview" ]
# -------- END ---------- 