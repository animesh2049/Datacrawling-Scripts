############################################################################ This Part is For Getting Acess Token  ###################################################################################

app_id=***************                                  # App id of created app
app_secret=********************************             # App secret of created app
access_token_raw=`curl -s "https://graph.facebook.com/oauth/access_token?type=client_cred&client_id=$app_id&client_secret=$app_secret"`        # Acess token generated on the basis of app id and secret. It is raw because it is of format access_token = something 
access_token=`echo $access_token_raw|cut -d "=" -f 2`             # Acess Token. This command takes the second field on the delimeter =
echo $access_token
######################################################################################### Get the output of URL  ################################################################################################

url_to_check=$1

