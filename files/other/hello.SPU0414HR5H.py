#
# hello.SPU0414HR5H.py
#
# plot SPU0414HR5H microphone audio
#    hello.SPU0414HR5H.py serial_port
#
# Neil Gershenfeld 11/17/15
# (c) Massachusetts Institute of Technology 2015
#
# This work may be reproduced, modified, distributed,
# performed, and displayed for any purpose. Copyright is
# retained and must be preserved. The work is provided
# as is; no warranty is provided, and users accept all 
# liability.
#

from tkinter import *
import serial
from datetime import datetime
import pandas as pd


NX = 500 
NY = 500
nloop = 100
path = []
baseline = 0
baseline_filt = 0.01
gain = 5

def idle(parent,canvas):
   global path, baseline
   #
   # idle routine
   #
   # look for framing
   #
   byte2 = 0
   byte3 = 0
   byte4 = 0
   while 1:
      byte1 = byte2
      byte2 = byte3
      byte3 = byte4
      byte4 = ord(ser.read())
      if ((byte1 == 1) & (byte2 == 2) & (byte3 == 3) & (byte4 == 4)):
         break
   path = []
   for i in range(nloop):
      lo = ord(ser.read()) #152 anywhere between 0 and 256 
      hi = ord(ser.read()) #3 anywhere between 0 and 4 ATD converter 0 and 4 adds up to 1024
      reading = 256*hi + lo #920 
      baseline = baseline_filt*reading + (1-baseline_filt)*baseline # 9.2+ (.99*0) - for next i it will be 9.2
      value = NY/2 + gain*(reading - baseline) #4,804
      path.append(i*NY/float(nloop))
      path.append(value)


   
   canvas.delete("path")
   canvas.create_line(path,tag="path",width=3,fill="#e823ca")
   parent.after_idle(idle,parent,canvas)

#
#  check command line arguments

if (len(sys.argv) != 2):
   print ("command line: hello.SPU0414HR5H.py serial_port")
   sys.exit()
port = sys.argv[1]
#
# open serial port
#
ser = serial.Serial(port,9600)



#get a data chunk
# record data
byteRead = []
sigTime = []

for m in range(1000):
   byteVal = ord(ser.read(1))
   t = datetime.utcnow().isoformat()
   byteRead.insert(m,byteVal)
   sigTime.insert(m,t)

df = pd.DataFrame()
byteSeries = pd.Series(byteRead)
timeSeries = pd.Series(sigTime)
df['bite-size'] = byteSeries
df['signal-time'] = timeSeries

df.to_csv('data_dump.csv', index=False)



#
# start plotting
#
root = Tk()
root.title('hello.SPU0414HR5H.py')
root.bind('q','exit')
canvas = Canvas(root, width=NX, height=NY, background='white')
canvas.pack()
root.after(100,idle,root,canvas)
root.mainloop()
