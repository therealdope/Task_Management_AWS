# Task Manager Application

A modern task management application built with Next.js and AWS's RDS MySQL, featuring user authentication, task management, and theme customization.

> Currently, the AWS is temporarily stopped. Please go to Vercel deployment to see the project in action.

[![🖥️ EC2 Instance](https://img.shields.io/badge/🖥️-EC2%20Instance-orange)](https://taskmanage.duckdns.org/) [![⚡ Vercel Deploy](https://img.shields.io/badge/⚡-Vercel%20Deploy-blue)](https://task-management-skheni.vercel.app)
---
### Video Preview
- Both EC2 and Vercel

[![Watch the video](https://img.youtube.com/vi/xbcYH4EKyPY/0.jpg)](https://youtu.be/xbcYH4EKyPY)

**Note:** The AWS EC2, RDS MySQL instance is currently stopped to minimize costs. Please contact the administrator if you'd like to test the live demo.
- the database will be started upon request.
- vercel database is changed to Avien mysql so project can be deployed on vercel and can be used anytime. 

## Features

- User Authentication (Login/Register)
- Create, Read, Update, Delete Tasks
- Task Status Management
- Dark/Light Theme Toggle
- Responsive Design
- Real-time Updates

## Tech Stack

- Next.js
- React
- TailwindCSS
- AWS RDS mySQL
- AWS EC2

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create `.env.local` file with:
```plaintext
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
DB_PORT=3306
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

Run the schema file:
```bash
mysql -h your-database-host(END POINT of RSD mySQL) -u your-user -P your-database-port -p your-password < lib/db/schema.sql
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm run start 3000
```

## AWS Deployment
- while doing this do not forget to add port in security group
1. Configure RDS MySQL instance
2. Set up EC2 instance
3. Install dependencies on EC2
4. Use PM2 for process management
5. Configure environment variables
6. Use nginx for reverse proxy refer to nginx_setup.txt file
7. Set up domain with DuckDNS
8. Set up SSL with Certbot refer to certbot_setup.txt file

- check important_commands.txt for important commands
## Project Structure

```plaintext
/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utilities and database
└── styles/          # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
