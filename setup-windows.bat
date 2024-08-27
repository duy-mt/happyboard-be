@ECHO OFF

REM Check if the container hp-postgres exists
docker ps -a --format "{{.Names}}" | findstr hp-postgres >nul
IF %ERRORLEVEL% EQU 0 (
    ECHO Container hp-postgres exists, deleting...
    docker rm -f hp-postgres
) ELSE (
    ECHO Container hp-postgres does not exist.
)

REM Check if the container hb-elasticsearch exists
docker ps -a --format "{{.Names}}" | findstr hb-elasticsearch >nul
IF %ERRORLEVEL% EQU 0 (
    ECHO Container hb-elasticsearch exists, deleting...
    docker rm -f hb-elasticsearch
) ELSE (
    ECHO Container hb-elasticsearch does not exist.
)

REM Check if the container hb-redis exists
docker ps -a --format "{{.Names}}" | findstr hb-redis >nul
IF %ERRORLEVEL% EQU 0 (
    ECHO Container hb-redis exists, deleting...
    docker rm -f hb-redis
) ELSE (
    ECHO Container hb-redis does not exist.
)

REM Check if the container hb-rabbitmq exists
docker ps -a --format "{{.Names}}" | findstr hb-rabbitmq >nul
IF %ERRORLEVEL% EQU 0 (
    ECHO Container hb-rabbitmq exists, deleting...
    docker rm -f hb-rabbitmq
) ELSE (
    ECHO Container hb-rabbitmq does not exist.
)

REM Check if the network hp-network exists
docker network ls --format "{{.Name}}" | findstr hp-network >nul
IF %ERRORLEVEL% EQU 0 (
    ECHO Network hp-network exists, deleting...
    docker network rm hp-network
) ELSE (
    ECHO Network hp-network does not exist.
)

cd ./setup

REM Stop and remove all containers, networks, and volumes defined in docker-compose.yml
ECHO Stopping and removing all containers, networks, and volumes...
docker-compose down -v

REM Create new network
ECHO Creating new network hp-network...
docker network create hp-network

REM Build and start containers
ECHO Building and starting containers with docker-compose...
docker-compose up -d --build

cd ..

TIMEOUT /T 60

REM Migration db
npm run reset-db
