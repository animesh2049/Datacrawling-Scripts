############################################################################ This Part is For Getting Acess Token  ###################################################################################

app_id=*********************                                  # App id of created app
app_secret=**************************************             # App secret of created app
access_token_raw=`curl -s "https://graph.facebook.com/oauth/access_token?type=client_cred&client_id=$app_id&client_secret=$app_secret"`        # Acess token generated on the basis of app id and secret. It is raw because it is of format access_token = something 
access_token=`echo $access_token_raw|cut -d "=" -f 2`             # Acess Token. This command takes the second field on the delimeter =


######################################################################### For Calculating Time stamp and checking the directory structure #####################################################################


time=`echo "\`date +%s\` - \`echo \"3600*24\"\`"|bc`              # This command generates unix time stamp of one hour before
mkdir -p ~/crawl/politics/jsonmetadata                           # Following four lines check if directory exist if not they create of leave
mkdir -p ~/crawl/politics/csvmetadata
mkdir -p ~/crawl/movies/jsonmetadata
mkdir -p ~/crawl/movies/csvmetadata

############################################################################## Request from Curl and loop starts ################################################################################################

cat ~/crawl/txtfiles/politics.txt | while read line                # Reads input from txtfile
do
curl -i -s -X GET "https://graph.facebook.com/v2.5/$line?fields=posts.since($time)%7Blikes.limit(0).summary(true)%2Ccomments%7Bfrom%2Ccreated_time%2Cmessage%2Ccomments%7Blikes.limit(0).summary(true)%2Cmessage%2Cfrom%2Ccreated_time%7D%2Clikes.limit(0).summary(true)%7D%2Ccreated_time%2Cmessage%7D&access_token=$access_token" > ~/crawl/politics/jsondata/"$line".json          # Actual request with graph api

##################################################################################### Check Response code ###############################################################################################

res=`cat ~/crawl/politics/jsondata/"$line.json" | grep HTTP/1.1 | awk {'print $2'}`               # This stores the response code from the facebook graph api

if [[ $res -ne 200 ]]                                                                             # If response code is not 200 i.e. Unsucessful, send mail 
then
    python ~/crawl/pythonscripts/sendmail.py
else
    a=`cat ~/crawl/politics/jsondata/"$line".json | egrep "^{.*$"` #> ~/crawl/politics/jsondata/"$line".json           # It takes the response and remove headers so that result is Json now
    echo $a > ~/crawl/politics/jsondata/"$line".json

    ls ~/crawl/politics/csvdata/"$line".csv > /dev/null 2>/dev/null                                                    # Checks if csv exists then just appends else write the column name on the first line

    if [ $? -ne 0 ]; then
	python ~/crawl/pythonscripts/topcsv.py ~/crawl/politics/csvdata/"$line".csv
    fi
    python ~/crawl/pythonscripts/join.py ~/crawl/politics/jsondata/"$line".json
    python ~/crawl/pythonscripts/poltocsv.py ~/crawl/politics/jsondata/"$line"_final.json                                    # Json goes for Parsing 
    echo "done $line"
fi

######################################################################################### Checking Complete ###################################################################################################

done

######################################################################################## Politics loop ends ####################################################################################################


########################################################################################## Movie loop starts ###################################################################################################
                                                     # Similar Process Exist for Movies 
cat ~/crawl/txtfiles/movies.txt | while read line
do
curl -i -s -X GET "https://graph.facebook.com/v2.5/$line?fields=posts%7Blikes.limit(0).summary(true)%2Ccomments%7Bfrom%2Ccreated_time%2Cmessage%2Ccomments%7Blikes.limit(0).summary(true)%2Cmessage%2Cfrom%2Ccreated_time%7D%2Clikes.limit(0).summary(true)%7D%2Ccreated_time%2Cmessage%7D&access_token=$access_token" > ~/crawl/movies/jsondata/"$line".json

######################################################################################## Checking Response code ###############################################################################################

res=`cat ~/crawl/movies/jsondata/"$line.json" | grep HTTP/1.1 | awk {'print $2'}`

if [[ $res -ne 200 ]]
then
    python ~/crawl/pythonscripts/sendmail.py
else
    a=`cat ~/crawl/movies/jsondata/"$line".json | egrep "^{.*$"`
    echo $a > ~/crawl/movies/jsondata/"$line".json

    ls ~/crawl/movies/csvdata/"$line".csv > /dev/null 2>/dev/null

    if [ $? -ne 0 ]; then
	python ~/crawl/pythonscripts/topcsv.py ~/crawl/movies/csvdata/"$line".csv
    fi
    python ~/crawl/pythonscripts/poltocsv.py ~/crawl/movies/jsondata/"$line".json
    echo "done $line"
fi

#################################################################################### Checking Done ############################################################################################################

done


##################################################################################### Movie loop ends ###########################################################################################################
