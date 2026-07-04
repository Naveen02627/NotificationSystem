FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy project files
COPY . .

# Expose Vite port
EXPOSE 5173

# Start Vite development server
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]