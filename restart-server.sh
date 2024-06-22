docker compose -f compose.yml --env-file .env stop
docker compose -f tools/compose/traefik-secure.yml --env-file .env up -d