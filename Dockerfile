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

# Just in case we need to call some dev dependency
COPY --from=development /app/node_modules ./node_modules

COPY . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --omit=dev && npm cache clean --force
# -------- END ---------- 

# TODO: find out how to implement production phase