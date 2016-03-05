cat /home/animesh/crawl/youtube/txtfiles/prodhouses.txt | while read line                                        # loop for all lines in the production house urls
do
    prodhousename=`echo $line | cut -d " " -f 1`                                                                 # production house name
    prodhouseurl=`echo $line | cut -d " " -f 2`                                                                  # production house url
    firsturloffullscrean=`curl -s $prodhouseurl | grep media:content | head -1 | cut -d "\"" -f 2`               # url of the first video
    firsturl=`echo $firsturloffullscrean | sed 's/v\//watch?v=/g' | sed 's/\?[^?]*$//g'`
    title=`curl -s $prodhouseurl | grep media:title | head -1 | cut -d '>' -f 2 | cut -d '<' -f 1`               # title of video
    titlewithoutspaces=`echo $title | sed 's/ //g'`

    cat /home/animesh/crawl/youtube/urls/"$prodhousename"urls.txt > /dev/null 2> /dev/null                       # check if there is a file of url of this production house if not create it
    if [ $? -ne 0 ]; then
	touch /home/animesh/crawl/youtube/urls/"$prodhousename"urls.txt
    fi 

    firstlineoffile=`cat /home/animesh/crawl/youtube/urls/"$prodhousename"urls.txt | tail -1 | cut -d ";" -f 2`  #check if the last url in file is matching with the first url in prod house video
    if [ "$firsturl" != "$firstlineoffile" ]; then                                                               # if not then put it in the file at last
	echo "$titlewithoutspaces;$firsturl" >> /home/animesh/crawl/youtube/urls/"$prodhousename"urls.txt
    fi
done

# sed -i 's/v\//watch?v=/g' /home/animesh/crawl/youtube/urls/*
# sed -i 's/\?[^?]*$//g' /home/animesh/crawl/youtube/urls/* 

