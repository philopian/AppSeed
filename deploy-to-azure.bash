#!/bin/bash -ex

if [ "$BITBUCKET_BRANCH" = "DEV" ]; then
 ftp_username=$FTP_USERNAME_DEV
 ftp_password=$FTP_PASSWORD_DEV
elif [ "$BITBUCKET_BRANCH" = "STAGING" ]; then
 ftp_username=$FTP_USERNAME_STAGING
 ftp_password=$FTP_PASSWORD_STAGING
elif [ "$BITBUCKET_BRANCH" = "master" ]; then
 ftp_username=$FTP_USERNAME_PROD
 ftp_password=$FTP_PASSWORD_PROD
else
 exit 1 # not dev, staging or master branch. Exit without deploying.
fi

ncftpput -v -u "$ftp_username" -p "$ftp_password" -R $FTP_HOST $FTP_SITE_ROOT dist/*

echo Finished uploading files to $FTP_HOST$FTP_SITE_ROOT.