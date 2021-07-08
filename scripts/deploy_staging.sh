#!/bin/bash
echo "Decrypting .env file"
openssl aes-256-cbc -K $encrypted_13c03eac0538_key -iv $encrypted_13c03eac0538_iv -in .env-staging.enc -out .env-staging -d 
echo "Placing env file..."
mv .env-staging .env
echo "Client directory contents: "
cd client && ls
echo $TRAVIS_BUILD_DIR 
echo "Deploy path staging: " $DEPLOY_PATH_STAGING
cd $TRAVIS_BUILD_DIR/client && ls
echo $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH_STAGING
echo "Copying to server..."
rsync -ae "ssh -o StrictHostKeyChecking=no" $TRAVIS_BUILD_DIR $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH_STAGING
echo "Done running copy..."