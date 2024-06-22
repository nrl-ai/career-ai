sudo docker compose -f tools/compose/traefik-secure.yml --env-file .env.production stop
sudo docker compose -f tools/compose/traefik-secure.yml --env-file .env.production up -d