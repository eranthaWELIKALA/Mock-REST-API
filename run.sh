#!/bin/sh

if [ ! -z "$MONGO_CONNECTION_STRING" ]; then
    npm start
else
    echo "Enter MongoDB Connection String: "
    read MONGO_CONNECTION_STRING
    if [ -z "$MONGO_CONNECTION_STRING" ]; then
        echo ""
        echo "Please pass -e MONGO_CONNECTION_STRING=<mongo_db_connection_string> or run the container in interactive mode."
        echo ""
        echo "=== With the environment var ==="
        echo "docker run -d --name=mock-rest-api -e MONGO_CONNECTION_STRING=<mongo_db_connection_string> -p 3000:3000 eranthawelikala/mock-rest-api:latest"
        echo "=== Interactive Mode ==="
        echo "docker run --name=mock-rest-api -it -p 3000:3000 eranthawelikala/mock-rest-api:latest"
        echo "Then provide the mongo db connection string."
        echo ""
        exit 1
    else
        export MONGO_CONNECTION_STRING
        npm start
    fi
fi
