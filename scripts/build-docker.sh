#! /usr/bin/bash

echo "start building"

npm install
npm run build
npm run docker

echo "build finished"