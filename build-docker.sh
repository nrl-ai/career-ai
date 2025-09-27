set -e
pnpm run build # Prevent issue: https://github.com/AmruthPillai/Reactive-Resume/issues/1854
docker build . -t vietanhdev/career-ai