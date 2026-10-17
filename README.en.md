
# PiggyXP - Back-End API

**Author:** Pietro Miranda
🌐 **Read this README in other languages:**
- 🇺🇸 [English Version](https://github.com/pietros133/Piggyxp---Backend/blob/main/README.en.md)

---

Back-end developed as part of the TCC (final-year project), responsible for all authentication logic, user progression, and business rules of a gamified financial education application.

The system manages users, secure authentication, stages, progress, XP, levels, and rewards, following good architectural practices and separation of responsibilities.

## Project Objective

To create a robust and well-organized API to serve as the foundation for a gamified application that encourages young people to learn about financial education through missions, stages, and virtual rewards.

This project was designed not only as an academic assignment but also as a professional portfolio project, applying real-world industry concepts.

## Technologies Used

- Node.js
- JavaScript (ES Modules)
- TypeORM
- JWT (JSON Web Token)
- Bcrypt
- SQL/NoSQL Database
- Dotenv
- HTML Email Templates

## Back-End Architecture

The application follows a layered architecture, ensuring organization, scalability, and ease of maintenance.

Back-end developed as part of the TCC (final-year project), responsible for all authentication logic, user progression, and business rules of a gamified financial education application.

The system manages users, secure authentication, stages, progress, XP, levels, and rewards, following good architectural practices and separation of responsibilities.

## Project Objective

To create a robust and well-organized API to serve as the foundation for a gamified application that encourages young people to learn about financial education through missions, stages, and virtual rewards.

This project was designed not only as an academic assignment but also as a professional portfolio project, applying real-world industry concepts.

## Technologies Used

- Node.js
- JavaScript (ES Modules)
- TypeORM
- JWT (JSON Web Token)
- Bcrypt
- SQL Database
- Dotenv
- HTML Email Templates

## Back-End Architecture

The application follows a layered architecture, ensuring organization, scalability, and ease of maintenance.

### 1. Folder Structure

```text
src/
    ├── auth/        → Authentication (JWT, middlewares, token generation)
    ├── config/      → Database configuration, dotenv, global instances
    ├── controllers/ → Receive requests and call services
    ├── models/      → Database models (Prisma / Sequelize / Mongoose)
    ├── routes/      → Route files (endpoints → controllers)
    ├── services/    → Business logic (without req/res)
    └── migrations/  → Versioned database changes
    └── middlewares/ → Functions that intercept HTTP requests for validation, flow control, etc.
└── email-templates/ → Folder containing the application's email templates
```

### 2. Back-End Workflow

Standard application flow:

**Route → Middleware(s) → Controller → Service → Model → Service → Controller → Response**

#### Responsibilities

- **Route:** Defines which controller handles each URL.
- **Controller:** Receives the request, performs basic validation, and calls the service.
- **Service:** Executes the application's business logic.
- **Model:** Accesses and modifies the database.
- **Middleware:** Intercepts requests before they reach the controller.

The service returns the result to the controller, which sends the final response to the user.

### 3. General Project Rules

#### Best Practices

- Controllers must remain lightweight, without heavy business logic.
- All business rules must be implemented in services.
- Models are exclusively responsible for database access.
- Avoid code duplication by using middlewares.
- Always use `try/catch` for error handling.

#### Branch Usage

- Never commit directly to `main`.
- Develop on the `dev` branch or an equivalent branch.
- Test everything before merging.
- Once stable, merge `dev` into `main`.

#### Organization Standards

- Use clear names for files and functions.
- Maintain consistent naming conventions and folder structures.
- Do not modify files inside `config/` without notifying the team.
- Create small, descriptive commits.

### 4. How to Submit a Change

Switch to the correct branch:

```bash
git checkout branchName
```

Update the branch:

```bash
git pull origin branchName
```

Stage all files:

```bash
git add .
```

Or stage a specific file:

```bash
git add fileName
```

Create a commit:

```bash
git commit -m "description of the changes"
```

Push the changes to the repository:

```bash
git push origin branchName
```

### 5. Migrations

#### 5.1 Generate a Migration Automatically

```bash
npm run generate-migration
```

The `-d` parameter specifies the path to the `dbconnect.js` file.

#### 5.2 Run Migrations

```bash
npm run run-migration
```

#### 5.3 Revert the Last Migration

```bash
npm run revert-migration
```

## Environment Variables

The `.env` file must be located in the project's root directory.

- `DB_HOST` — Database server address
- `DB_PORT` — Database server port
- `DB_USER` — Database username
- `DB_PASSWORD` — Database password
- `DB_NAME` — Name of the database used by the application
- `PORT` — Port on which the API will run
- `JWT_SECRET` — Secret key used to generate authentication tokens
- `JWT_REFRESH_SECRET` — Secret key used to generate refresh tokens
- `nodemailer_key` — Email service password
- `CLOUDINARY_CLOUD_NAME` — Available in the Cloudinary dashboard
- `CLOUDINARY_API_KEY` — Available in the Cloudinary dashboard
- `CLOUDINARY_API_SECRET` — Available in the Cloudinary dashboard

## Environment Variables

The `.env` file must be located in the project's root directory.

- `DB_HOST` — Database server address
- `DB_PORT` — Database server port
- `DB_USER` — Database username
- `DB_PASSWORD` — Database password
- `DB_NAME` — Name of the database used by the application
- `PORT` — Port on which the API will run
- `JWT_SECRET` — Secret key used to generate authentication tokens
- `JWT_REFRESH_SECRET` — Secret key used to generate refresh tokens
- `nodemailer_key` — Email service password
- `CLOUDINARY_CLOUD_NAME` — Available in the Cloudinary dashboard
- `CLOUDINARY_API_KEY` — Available in the Cloudinary dashboard
- `CLOUDINARY_API_SECRET` — Available in the Cloudinary dashboard

## File Extension

**Use the `.js` file extension.**

## Acknowledgments

I would like to thank everyone who participated in this project and for strictly following the established guidelines.

© 2026 PiggyXP by VSS
