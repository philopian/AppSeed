ENVIRONMENT="production"
projectName="appseed"
composeFileName="docker-compose.yml"

echo "... Building the AppSeed Docker images."
docker-compose -f "$composeFileName" -p "$projectName" build

echo "... Running Docker-Compose."
docker-compose -f "$composeFileName" up -d