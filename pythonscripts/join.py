import csv
import json
import sys
import commands


filename_with_path = sys.argv[1]                                                            # Input filename with path
json_filename = filename_with_path.split('/')                                               # Only filename
json_directoryname = "/".join(json_filename[0:(len(json_filename)-1)])                      # Directory name
filename_with_extension = json_filename[-1].split('.')                                      # filename with extension
filename = (".").join(filename_with_extension[0:len(filename_with_extension)-1])            # Filename without extension

def check_and_append(obj):
    try :
        a = obj["paging"]["next"]
        print 'curl -s -X GET "%s"' % str(a)
        status, output = commands.getstatusoutput('curl -s -X GET "%s"' % str(a))
        print output
        return output
    except:
        return "Got error"

#check_and_append(main_json)

f = open(filename_with_path)

# try:
#     main_json_of_first_request = json.load(f)
#     data_to_write = check_and_append(main_json_of_first_request['posts'])
#     tempf = open('/home/user/crawl/tmp/test1.json', 'w')
#     tempf.write(data_to_write)
#     tempf.close()
# except:
#     print "Sorry No Json Decoded"

# f.close()
# i=1

def append_post():
    try:
        main_json_of_first_request = json.load(f)
        data_to_write = check_and_append(main_json_of_first_request['posts'])
        tempf = open('/home/user/crawl/tmp/test1.json', 'w')
        tempf.write(data_to_write)
        tempf.close()
    except:
        print "Sorry No Json Decoded"
    f.close()
    i=1
    while 1==1:
        f = open("/home/user/crawl/tmp/test" + str(i) + ".json")                                                                # File opening
        try:                                                                           
            main_json = json.load(f)                                                                     # Taking Json from file
            if len(main_json['data']) == 0:
                break
            check_and_append(main_json)
            data_to_write = check_and_append(main_json)
            file_no = "/home/user/crawl/tmp/test" + str(i+1) + ".json"
            tempf = open(file_no, 'w')
            tempf.write(data_to_write)
            tempf.close()
            tempf = open(file_no)
            json_data_to_append = json.load(tempf)
            for comment in json_data_to_append['data']:
                main_json_of_first_request['posts']['data'].append(comment)
        except ValueError:
            print "Sorry No Json Decoded"
            exit(1)
        f.close()
        i += 1

def append_comment():
    while 1==1:
        f = open()



final_file_to_write = json_directoryname + "/" + filename + "_final.json"
f = open(final_file_to_write, "w")
json.dump(main_json_of_first_request, f)
f.close()
