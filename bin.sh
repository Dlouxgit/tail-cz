#!/bin/bash
i="install"
r="reset"
if [ $1 == $i ]
then
    echo "Installing Commitizen Globally"
    npm install -g commitizen
    echo "Installing tail commits"
    npm install -g tail-cz
    echo "Creating a global config file"
    echo '{ "path": "/usr/local/lib/node_modules/tail-cz/" }' > ~/.czrc
fi

if [ $1 == $r ]
then
    echo "Reset commitizen global config file"
    if [ -f /usr/local/lib/node_modules/tail-cz/tails.json ]
    then
        echo '[]' > /usr/local/lib/node_modules/tail-cz/tails.json
        echo 'Reset Success.'
    else
        echo 'No such config file.'
    fi
fi

