#!/bin/bash
echo "Stopping staging-website"
ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "forever stop website-staging"
openssl aes-256-cbc -K $encrypted_13c03eac0538_key -iv $encrypted_13c03eac0538_iv -in .env-staging.enc -out .env-staging -d 
echo "Placing env file..."
mv .env-staging .env
echo "Copying to server..."
rsync -r --delete-after --quiet -e "ssh -o StrictHostKeyChecking=no" $TRAVIS_BUILD_DIR/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH_STAGING
echo "Restarting staging-website"
ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "cd htdocs/website-staging && forever start -a --uid 'website-staging' server/index.js"