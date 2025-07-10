#!/bin/sh
set -e

if [ -z "$ELASTICSEARCH_PASSWORD" ] || [ -z "$KIBANA_PASSWORD" ]; then
  echo "ERROR: ELASTICSEARCH_PASSWORD or KIBANA_PASSWORD is not set."
  exit 1
fi

echo "ELASTICSEARCH_PASSWORD=${ELASTICSEARCH_PASSWORD}"
echo "KIBANA_PASSWORD=${KIBANA_PASSWORD}"

until curl -s -u elastic:$ELASTICSEARCH_PASSWORD "$ES_URL/_cluster/health" | grep -q '"status"'; do
  echo "🔄 Still waiting for Elasticsearch to respond..."
  sleep 2
done

echo "Elasticsearch is up and running."

curl -X POST -u elastic:$ELASTICSEARCH_PASSWORD "$ES_URL/_security/user/kibana_system/_password" \
  -H "Content-Type: application/json" \
  -d "{\"password\": \"$KIBANA_PASSWORD\"}"

echo "kibana_system password updated."