import csv
import json
import sys

############################################################################## Command line Processsing of files ###############################################################################################

filename_with_path = sys.argv[1]                                                                                              # Full path of the input file
json_filename = filename_with_path.split('/')                                                                                 # Only filename because of spliting on the basis of '/'
json_directoryname = "/".join(json_filename[0:(len(json_filename)-2)])                                                        # Directory Name
filename = json_filename[-1].split('.')[0]                                                                                    # Filename

################################################################################# Loading JSON #################################################################################################################

f = open(filename_with_path)                                                                                                  # File open 
try:
    data = json.load(f)                                                                                                           # Loading Json from file
except ValueError:
    print "No Json exits"
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

################################################################################ Writing CSV ###################################################################################################################

f = csv.writer(open(json_directoryname + "/csvmetadata/" + filename + ".csv","a"))    # name of the output csv file
thingtoprint = [item for item in data]            #Fields to print
f.writerow(thingtoprint)                          # Writing to csv file
valueofthings = [data[item] for item in data]     #Value of Fields
f.writerow(valueofthings)
