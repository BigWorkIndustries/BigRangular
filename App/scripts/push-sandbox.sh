#!/bin/bash
echo $(date) > ../public/date.txt && git add ../. && git commit -m "Heroku sandbox push $(date)"
heroku config:set APP_VERSION=$(cat ../public/version.txt) GIT_HASH=$(git log --pretty=format:'%h' -n 1) DEPLOY_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
git push sandbox development:master --force
