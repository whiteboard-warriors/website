#!/bin/bash
echo "Stopping Website..."
ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "forever stop website"
echo "Deploy Staging, decrypting encrypted .env file"
openssl aes-256-cbc -K $encrypted_13c03eac0538_key -iv $encrypted_13c03eac0538_iv -in .env-production.enc -out .env-staging -d
echo "Placing env file..."
mv .env-prod .env 
echo "Copying to server..."
rsync -r --delete-after --quiet -e "ssh -o StrictHostKeyChecking=no" $TRAVIS_BUILD_DIR $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
echo "Restarting website..."
ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "cd htdocs/website && forever start -a --uid 'website' server/index.js"
