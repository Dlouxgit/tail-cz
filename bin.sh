#!/bin/bash
i="install"
r="reset"
CURRENT_DIR=$(cd `dirname $0`; pwd)
GLOBAL_DIR=$(cd `npm root -g`; cd ./tail-cz; pwd)
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
    echo "Reset commitizen config file"
    echo $GLOBAL_DIR
    if [ -f $CURRENT_DIR/tails.json ]
    then
        echo '[]' > $CURRENT_DIR/tails.json
        echo 'Reset Success.'
    elif [ -f $GLOBAL_DIR/tails.json ]
    then
        echo '[]' > $GLOBAL_DIR/tails.json
        echo 'Reset Global Config Success.'
    else    
        echo 'No such config file.'
    fi
fi

