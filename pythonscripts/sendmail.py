import smtplib

########################################################################### Setting Up Login Parameters #########################################################################################################

sender = 'samsung@co.uk'               # Senders address
receivers = ['user2049@gmail.com']          # Receivers address
username = "coolrakeshrakesh96@gmail.com"      # username for gamil login
password = "rakeshrak"                         # Password for gmail login

############################################################################## Actual Message Format ############################################################################################################

message = """From: Animesh <samsung@co.uk>                            
To: To Person <to@todomain.com>
Subject: SMTP e-mail test

Your Script has stopped Working

"""

####################################################################################### Sending Message  #######################################################################################################

try:
   smtpObj = smtplib.SMTP("smtp.gmail.com:587")                   # Request to Gmail Smtp Server
   smtpObj.starttls()
   smtpObj.login(username,password)
   smtpObj.sendmail(sender, receivers, message)         
   print "Successfully sent email"
except SMTPException:
   print "Error: unable to send email"
