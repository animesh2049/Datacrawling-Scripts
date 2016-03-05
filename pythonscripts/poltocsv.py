import csv
import json
import sys

############################################################################## Command line Processsing of files ###############################################################################################


filename_with_path = sys.argv[1]                                                            # Input filename with path
json_filename = filename_with_path.split('/')                                               # Only filename
json_directoryname = "/".join(json_filename[0:(len(json_filename)-2)])                      # Directory name
filename = json_filename[-1].split('.')[0]                                                  # Filename without extension

################################################################################# Loading JSON #################################################################################################################

f = open(filename_with_path)                                                                # File opening
try:                                                                           
    data = json.load(f)                                                                     # Taking Json from file
except ValueError:
    print "Sorry No Json Decoded"
    exit(1)

f.close()

########################################################################### Function for decoding into Ascii ###################################################################################################

def byteify(input):						# for decoding the json to ascii
    if isinstance(input, dict):
        return {byteify(key):byteify(value) for key,value in input.iteritems()}
    elif isinstance(input, list):
        return [byteify(element) for element in input]
    elif isinstance(input, unicode):
        return input.encode('utf-8')
    else:
        return input

data = byteify(data)
f = csv.writer(open(json_directoryname + "/csvdata/" + filename + ".csv","a"))                     # Csv file to be written



################################################################################ Parsing Fields to CSV ########################################################################################################

for level0 in data:
    if isinstance(data[level0],dict):                 #posts
        for level1 in data[level0]:
            if isinstance(data[level0][level1],list):                 #data
                for level2 in xrange(0,len(data[level0][level1])):
                    if isinstance(data[level0][level1][level2],dict):
                        if "message" in data[level0][level1][level2]:
                            for level3 in data[level0][level1][level2]:
                                if level3 == "comments":                          # Comments
                                    for level4 in data[level0][level1][level2][level3]:
                                        if isinstance(data[level0][level1][level2][level3][level4],list):
                                            for level5 in xrange(0,len(data[level0][level1][level2][level3][level4])):
                                                if isinstance(data[level0][level1][level2][level3][level4][level5],dict):
                                                    for level6 in data[level0][level1][level2][level3][level4][level5]:
                                                        if level6 == "comments":                                              # Replies
                                                            for level7 in data[level0][level1][level2][level3][level4][level5][level6]:
                                                                if level7 == "data":
                                                                    for level8 in xrange(0,len(data[level0][level1][level2][level3][level4][level5][level6][level7])):
                                                                        f.writerow([data[level0][level1][level2]["message"],data[level0][level1][level2]["created_time"],data[level0][level1][level2]["likes"]["summary"]["total_count"],data[level0][level1][level2][level3][level4][level5]["message"],data[level0][level1][level2][level3][level4][level5]["from"]["name"],data[level0][level1][level2][level3][level4][level5]["likes"]["summary"]["total_count"],data[level0][level1][level2][level3][level4][level5]["created_time"],data[level0][level1][level2][level3][level4][level5][level6][level7][level8]["message"],data[level0][level1][level2][level3][level4][level5][level6][level7][level8]["from"]["name"],data[level0][level1][level2][level3][level4][level5][level6][level7][level8]["likes"]["summary"]["total_count"],data[level0][level1][level2][level3][level4][level5][level6][level7][level8]["created_time"]])

                                                    if "comments" not in data[level0][level1][level2][level3][level4][level5]:
                                                        f.writerow([data[level0][level1][level2]["message"],data[level0][level1][level2]["created_time"],data[level0][level1][level2]["likes"]["summary"]["total_count"],data[level0][level1][level2][level3][level4][level5]["message"],data[level0][level1][level2][level3][level4][level5]["from"]["name"],data[level0][level1][level2][level3][level4][level5]["likes"]["summary"]["total_count"],data[level0][level1][level2][level3][level4][level5]["created_time"]])
                            if "comments" not in data[level0][level1][level2]:
                                f.writerow([data[level0][level1][level2]["message"],data[level0][level1][level2]["created_time"],data[level0][level1][level2]["likes"]["summary"]["total_count"]])

        
    elif isinstance(data[level0],list):
        pass
    elif isinstance(data[level0],str):
        pass
        
