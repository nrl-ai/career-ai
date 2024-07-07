set -e
pnpm run build
bash build-docker.sh
bash restart-server.sh
