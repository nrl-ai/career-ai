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

**How to host Gemini AI proxy server:**

Prepare `litellm_config.yaml`:

```yaml
model_list:
  - model_name: gemini-pro
    litellm_params:
      model: gemini/gemini-pro
      api_key: os.environ/GEMINI_API_KEY
      api_base: os.environ/GEMINI_API_BASE
```

Start proxy server:

```sh
docker run \
    -d \
    -v $(pwd)/litellm_config.yaml:/app/config.yaml \
    -e LITELLM_MASTER_KEY=<litellm-key> \
    -e GEMINI_API_KEY=<gemini-key> \
    -p 4000:4000 \
    ghcr.io/berriai/litellm:main-latest \
    --config /app/config.yaml --detailed_debug
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
