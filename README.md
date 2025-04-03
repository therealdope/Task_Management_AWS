```markdown:/Users/shwetkheni/Desktop/CS/web-dev/AWS/taskmanager/README.md
# Task Manager Application

A modern task management application built with Next.js and MySQL, featuring user authentication, task management, and theme customization.

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
- MySQL
- TailwindCSS
- AWS RDS
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
mysql -h your-database-host -u your-user -p your-database < lib/db/schema.sql
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

1. Configure RDS MySQL instance
2. Set up EC2 instance
3. Install dependencies on EC2
4. Use PM2 for process management

## Project Structure

```plaintext
/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utilities and database
└── styles/          # Global styles
```

## License

MIT License
```