import matplotlib
import matplotlib.pyplot as plt
from datetime import datetime 
f=open('../txtfiles/data.txt')
count=0
x=[]
y=[]
for i in f.read()[:-1].split('\n'):
	count+=1
	time = i.split(' ')[0] + " " + i.split(' ')[1]
	times =  datetime.strptime(time, "%Y-%m-%d %H:%M:%S")
	x.append(times)
	y.append(int(i.split(' ')[-1]))
plt.plot_date(x, y, linestyle="-")
plt.ylabel('Views')
plt.xlabel('Timestamp')
plt.show()
