# CareerAI

![](apps/client/public/screenshots/careerai.png)

## I. Development

- See [DEVELOPMENT.md](DEVELOPMENT.md).

## II. Production Deployment

- Install Docker.

- Install NodeJS with [nvm](https://github.com/nvm-sh/nvm).

- Install pnpm, NodeJS environment and build the UI:

```
npm install -g pnpm
pnpm install
pnpm run build
```

- Copy `.env.example` to `.env`. Update the environment variables if necessary.

- Run the server:

```sh
bash build-and-restart.sh
```

## III. Built With

- React (Vite), for the frontend
- NestJS, for the backend
- Postgres (primary database)
- Prisma ORM, for database access
- Minio (for object storage: to store avatars, resume PDFs and previews)
- Browserless (for headless chrome, to print PDFs and generate previews)
- SMTP Server (to send password recovery emails)
- GitHub/Google OAuth (for authentication)
