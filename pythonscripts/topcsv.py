import sys
import csv

filename_with_path = sys.argv[1]
f = csv.writer(open(filename_with_path, "a"))
f.writerow(["Post","Timestamp","Likes","Comment","Comment_By","Likes_on_Comment","Comment_Timestamp","Reply","Replied_By","Likes_on_Reply","Reply_Timestamp"])      # Writing Column name of csv file

