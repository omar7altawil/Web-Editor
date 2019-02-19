#!/usr/bin/env bash

npm install --registry http://scr.saal.ai:4873

docker run                  \
    --rm                    \
    --name=saale-authortool-practice       \
    --env "APP_HOST=localhost" \
    --env "APP_PORT=8090" \
    --env "USER_PROGRESS_URI=http://saal-user-progress-service:8090"  \
    --env "MONGO_DB_NAME=saale-knowledge-graph-mongodb" \
    --env "MONGO_DB_URL=mongodb://saale-knowledge-graph-mongodb:27017" \
    --env 'LOGGER_CONFIG={ "appenders": { "out": { "type": "stdout" } }, "categories": { "default": { "appenders": ["out"], "level": "trace" } } } '    \
    -v "${PWD}":/saal \
    -w "/saal"  \
    -p 8090:8090            \
    node:9.11.2-alpine \
    npm run dev
