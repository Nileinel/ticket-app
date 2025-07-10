FROM alpine:latest

RUN apk add --no-cache curl

ARG ELASTICSEARCH_PASSWORD
ARG KIBANA_PASSWORD
ARG ES_URL

ENV ELASTICSEARCH_PASSWORD=${ELASTICSEARCH_PASSWORD}
ENV KIBANA_PASSWORD=${KIBANA_PASSWORD}
ENV ES_URL=${ES_URL}

COPY set-kibana-user.sh /usr/local/bin/set-kibana-user.sh
RUN chmod +x /usr/local/bin/set-kibana-user.sh

ENTRYPOINT ["/usr/local/bin/set-kibana-user.sh"]