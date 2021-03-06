########################################################################### For getting access_token ########################################################################################################

app_id=***************                                     #App id
app_secret=********************************                #App Secret
access_token_raw=`curl -s "https://graph.facebook.com/oauth/access_token?type=client_cred&client_id=$app_id&client_secret=$app_secret"`     #Acess token of format Acess token in the form access_token=somevalue
access_token=`echo $access_token_raw|cut -d "=" -f 2`                                                                                       # Actual acess token

########################################################################### For Checking Directory Structure ###################################################################################################

mkdir -p ~/crawl/politics/jsonmetadata                            # checks if directory exist
mkdir -p ~/crawl/politics/csvmetadata
mkdir -p ~/crawl/movies/jsonmetadata
mkdir -p ~/crawl/movies/csvmetadata

########################################################################## Actual loop starts with request from curl ###########################################################################################


cat ~/crawl/txtfiles/politics.txt | while read line              # Reads input from txtfile
do
    curl -s -X GET "https://graph.facebook.com/v2.4/$line?fields=bio%2Ccategory%2Cawards%2Cartists_we_like%2Cbirthday%2Cbusiness%2Cdescription%2Cemails%2Cfounded%2Cgeneral_info%2Chometown%2Cglobal_brand_page_name%2Cinfluences%2Cname%2Cnew_like_count%2Cpersonal_info%2Cpersonal_interests%2Cphone%2Cpress_contact%2Cusername%2Ctalking_about_count%2Clikes%2Cbooking_agent%2Cdirected_by%2Cdescription_html%2Cgenre%2Cproduced_by%2Cstarring%2Cstudio%2Cwritten_by&access_token=$access_token" > ~/crawl/politics/jsonmetadata/"$line".json                       # Actual Request

############################################################################## For Parsing #####################################################################################################################

python ~/crawl/pythonscripts/metadata_poltocsv.py ~/crawl/politics/jsonmetadata/"$line".json                                         # Goes for Parsing into csv
done

############################################################################# Loop Ends ########################################################################################################################
                                                
                                       # Similar Process for Movies

cat ~/crawl/txtfiles/movies.txt | while read line
do
    curl -s -X GET "https://graph.facebook.com/v2.4/$line?fields=bio%2Ccategory%2Cawards%2Cartists_we_like%2Cbirthday%2Cdescription%2Cemails%2Cfounded%2Cgeneral_info%2Chometown%2Cglobal_brand_page_name%2Cinfluences%2Cname%2Cnew_like_count%2Cpersonal_info%2Cpersonal_interests%2Cphone%2Cpress_contact%2Cusername%2Ctalking_about_count%2Clikes%2Cbooking_agent%2Cdirected_by%2Cdescription_html%2Cgenre%2Cproduced_by%2Cstarring%2Cstudio%2Cwritten_by&access_token=$access_token" > ~/crawl/movies/jsonmetadata/"$line".json
python ~/crawl/pythonscripts/metadata_poltocsv.py ~/crawl/movies/jsonmetadata/"$line".json
done




# Fields are -
# Bio 
# Category
# Awards
# Artists we like
# Birthday
# Business
# Description
# Emails
# Founded
# Genearl Info
# Hometown
# Global Brand Page Name
# Influences
# Name
# New Like Count
# Personal Info
# Personal Interests
# Phone
# Press Contact
# Username
# No of time posts shared
# Likes


