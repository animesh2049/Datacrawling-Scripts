############################################################################## For access_token #############################################################################################################

app_id=***************                                     #App id
app_secret=********************************                #App Secret
access_token_raw=`curl -s "https://graph.facebook.com/oauth/access_token?type=client_cred&client_id=$app_id&client_secret=$app_secret"`     #Acess token of format Acess token in the form access_token=somevalue
access_token=`echo $access_token_raw|cut -d "=" -f 2`                                                                                       # Actual acess token

####################################################################### Checking Directory Structure ###########################################################################################################

mkdir -p ~/crawl/politics/jsondata/

############################################################################# Curl Request #####################################################################################################################

curl -s -X GET "https://graph.facebook.com/v2.5/narendramodi?fields=about%2Caffiliation%2Caccess_token%2Capp_id%2Cartists_we_like%2Cattire%2Cawards%2Cband_interests%2Cband_members%2Cbest_page%2Cbio%2Cbirthday%2Cbooking_agent%2Cbuilt%2Cbusiness%2Ccan_post%2Ccategory%2Ccategory_list%2Ccompany_overview%2Ccover%2Cculinary_team%2Ccurrent_location%2Cdescription%2Cdescription_html%2Cdirected_by%2Cemails%2Cfeatures%2Cfood_styles%2Cfounded%2Cgeneral_info%2Cgeneral_manager%2Cgenre%2Cglobal_brand_page_name%2Chas_added_app%2Chometown%2Chours%2Cid%2Cinfluences%2Cis_always_open%2Cis_permanently_closed%2Cis_community_page%2Cis_published%2Cis_unclaimed%2Cis_verified%2Ckeywords%2Clink%2Clocation%2Cmission%2Cname%2Cnetwork%2Cnew_like_count%2Cparking%2Cpersonal_info%2Cpersonal_interests%2Cpharma_safety_info%2Cphone%2Cplot_outline%2Cpress_contact%2Cprice_range%2Cproduced_by%2Cproducts%2Cpublic_transit%2Crecord_label%2Crelease_date%2Cschedule%2Cscreenplay_by%2Cseason%2Cstarring%2Cstore_number%2Cstudio%2Ctalking_about_count%2Cunread_message_count%2Cunseen_message_count%2Cusername%2Cwebsite%2Cunread_notif_count%2Cwere_here_count%2Cwritten_by%2Calbums%2Cbusinessprojects%2Ccheckins%2Cevents%2Cfeed%2Cglobal_brand_children%2Clikes%2Clocations%2Cmembers%2Cmilestones%2Coffers%2Cpicture%2Cphotos%2Cplace_topics%2Ctagged%2Cuserpermissions%2Cvideos&access_token=CAACEdEose0cBAK9B2PyzWnXPIC6K84XXz5meXcYn3JIh8ArtwTZCVeV1qXMdhUBgIxNVS83Mk8ukqHc6J46tKZBgDOoUgJnrIsac44RdEBjRE1hxBiDj4aHxYHtqZAwPHkUvEEibOTreOC28R0YzEfWeUaBCKyZCBLGWHAnDUZAaODD9GNn2ZAJMcg1acLJ59iMl981TfhhKHGHaCge8ZBZA" > ~/crawl/politics/jsondata/alldata.json

python ~/crawl/pythonscripts/metadata_poltocsv.py ~/crawl/politics/jsondata/alldata.json



