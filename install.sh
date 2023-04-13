#!/bin/bash
echo "Installing Commitizen Globally"
npm install -g commitizen
echo "Installing tail commits"
npm install -g tail-cz
echo "Creating a global config file"
echo '{ "path": "/usr/local/lib/node_modules/tail-cz/" }' > ~/.czrc
