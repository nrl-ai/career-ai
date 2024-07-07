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

Check `/etc/default/docker` to ensure it doesn't have the following line:

```
DOCKER_OPTS="--iptables=false"
```

Also check `/etc/docker/daemon.json` to ensure it doesn't have the following key:

```
{
"iptables":false
}
```

We added this on one server to get UFW working with docker. We then changed to an external firewall. Spent ages looking for the reason external networking wasn't working because it was removed from our deploy guide. Hope this helps someone else.

**Source:** <https://stackoverflow.com/questions/39867602/no-internet-inside-docker-compose-service>.
