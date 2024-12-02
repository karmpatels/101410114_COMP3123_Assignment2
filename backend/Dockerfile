FROM node:18

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --build-from-source  # Force building from source to ensure compatibility

# Copy the rest of your application code
COPY . .

CMD npm start
