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

## III. Technologies

- Frontend: React, Vite, TailwindCSS, Zustand, React Query, React Router.
- Backend: NestJS, Prisma, Postgres, Minio, Chrome (Browserless), SMTP Server.
- Authentication: GitHub OAuth, Google OAuth.
- AI: Google Gemini, ChatGPT, Azure APIs.
- Deployment: Docker, Docker Compose.

## IV. Known Issues

### 1. Could not download resume as PDF

Check the container `chrome` service if it has internet access. Uninstalling `ufw` on the host machine may help.
