#!/usr/bin/env bash

npm install --registry http://scr.saal.ai:4873

docker run                  \
    --rm                    \
    --name=saal-service-test       \
    --env "APP_HOST=localhost" \
    --env "APP_PORT=8087" \
    --env "USER_PROGRESS_URI=http://saal-user-progress-service:8090"  \
    --env "KNOWLEDGE_GRAPH_URI=http://saal-knowledge-graph-service:8090"  \
    --env 'LOGGER_CONFIG={ "appenders": { "out": { "type": "stdout" } }, "categories": { "default": { "appenders": ["out"], "level": "trace" } } } '    \
    -v "${PWD}":/saal \
    -w "/saal"  \
    -p 8096:8087 \
    node:9.11.2-alpine  \
    npm run test
