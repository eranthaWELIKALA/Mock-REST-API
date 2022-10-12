#/bin/sh

if ! [ -z "$MONGODB_SERVER" ]; then
    npm start
else
    echo "Enter mongo db host address: "
    read MONGODB_SERVER
    if [ -z "${MONGODB_SERVER}" ];
    then
        echo "Please pass -e MONGODB_SERVER=<server_address> or run the container in interactive mode"
        echo "\n=== With the environment var ==="
        echo "docker run --name=mock-rest-api -e MONGODB_SERVER=<mongo_db_server> -p 3000:3000 eranthawelikala/mock-rest-api:latest"
        echo "\n=== Interactive Mode ==="
        echo "docker run --name=mock-rest-api -it -p 3000:3000 eranthawelikala/mock-rest-api:latest\n"
        exit 1
    else
        export MONGODB_SERVER=${MONGODB_SERVER}
        npm start
    fi
fi