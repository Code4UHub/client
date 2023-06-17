#!/bin/bash

echo "Building image"
docker build -t code4u-client:1.0 .

echo -e "\nStarting container..."
docker kill code4u-client
docker rm code4u-client

docker run -d -p 9151:3000 --restart unless-stopped --name code4u-client code4u-client:1.0