#!/bin/sh

# Expand the template with env vars to actual config.toml
envsubst < /config.toml.template > /config.toml

# Run monstache with the generated config
exec monstache -f /config.toml