# Happy Board

This is a backend system designed to support a web application that allows users to create and manage ideas, comments, and user profiles. The system includes features such as authentication (sign-up, sign-in, sig-in with Google), WebSocket-based real-time status updates, cache data use Redis, full-text search with Elastic Search and CRUD operations.

## Technologies Used
- Node.js
- Express.js
- PostgreSQL 
- Sequelize
- Redis
- Elastic Search
- Firebase
- Cloudinary
- RabbitMQ
- Google Analytics 4
- WebSocket
- Docker
- GCP (VM instance) 
- AWS (EC2, RDS, S3, Route53, VPC, IAM, Certificate)

## Prerequisites
- Node.js >= v14
- npm
- PostgreSQL
- AWS CLI
- Docker 

## Install & Run (Window)

### 1. Clone the repository:
- git clone https://github.com/duy-mt/happyboard-be.git
- Build and develop code on dev branch, then push it to production, final version

### 2. Install dependencies:

```bash
npm install
```

### 3. Set up environment variables:
- Copy the `.env.example` file to `.env` and fill in the required values.

### 4. Run file setup-windows.bat
```bash
cd happyboard-be && setup-windows.bat
```

## Deployment

### 1. Set up Redis Cloud
- Create redis cloud account using free tier 30MB
- Get the User, Password, Url parameters and assign them to the corresponding values ​​in .env

### 2. Set up ES Cloud
- Create ES cloud account using free tier 14 day trial
- Get the CloudID, User, Password parameters and assign them to the corresponding values ​​in .env

### 3. Set up RDS
- Create a DB Postgres free tier in RDS Service
- Get Endpoint-Url, Username, Password, Database-Name parameters and assign them to the corresponding values ​​in .env

### 4. Certificate Domain with Certificate Service AWS
- Create record to cetificate domain (VD: *happyboard.io.vn)

### 5. Host Domain by Route53
- Create record to host domain then assign IP external to domain  

### 6. Add SSL for domain with Cloudflare
- Create project in Cloudflare then add ssl for domain

### 4. Deploy to AWS EC2
- Set up an EC2 instance with the required environment (Docker, Nginx, ...)








