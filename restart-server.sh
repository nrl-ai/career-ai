docker compose -f compose-prod.yml --env-file .env stop
docker compose -f compose-prod.yml --env-file .env up -d
