#!/bin/bash

until mongosh --host mongodb --eval "db.adminCommand('ping')" &>/dev/null; do
  echo "Waiting for MongoDB to be ready..."
  sleep 2
done

echo "MongoDB is up. Initiating replica set..."
mongosh --host mongodb /init-replica.js

echo "Replica set initiated successfully."