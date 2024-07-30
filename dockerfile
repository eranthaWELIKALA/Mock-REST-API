FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure run.sh is executable
RUN chmod +x run.sh

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["sh", "run.sh"]
