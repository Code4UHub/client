FROM node:16-alpine

# Install bash to enter the terminal
RUN apk update && apk add bash
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies
RUN npm install --package-lock-only
RUN npm ci
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production

# Start the application
CMD [ "npx", "serve", "build" ]
