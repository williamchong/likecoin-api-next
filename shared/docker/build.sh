#!/usr/bin/env bash
mv ./shared shared.bak
cp -r ../../shared shared
cp ../../yarn.lock yarn.lock
docker build . "$@"
rm -r ./shared
rm yarn.lock
mv ./shared.bak shared
