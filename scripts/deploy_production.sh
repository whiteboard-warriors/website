#!/bin/bash
echo "Decrypting .env file"
openssl aes-256-cbc -K $encrypted_13d3112ed959_key -iv $encrypted_13d3112ed959_iv -in .env-production.enc -out .env-production -d 
echo "Placing env file..."
mv .env-production .env
echo "Client directory contents: "
cd client && ls
echo $TRAVIS_BUILD_DIR 
echo "Deploy path staging: " $DEPLOY_PATH_STAGING
cd $TRAVIS_BUILD_DIR/client && ls
echo $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
echo "Copying to server..."
# remember "/" after $TRAVIS_BUILD_DIR so don't get /website 
rsync -a --delete-after --quiet -e "ssh -o StrictHostKeyChecking=no" $TRAVIS_BUILD_DIR/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/website
echo "Done running copy..."