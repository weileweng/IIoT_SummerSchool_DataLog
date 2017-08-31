from pyHS100 import smartplug, smartdevice
import PullfromDB
input = input("Give your ip as string")
device = smartdevice.SmartDevice(input)
plug = smartplug.SmartPlug(device.ip_address)
# while true loop
# install requirements
# pip3 install -r requirements.txt



while(True):
    if(PullfromDB.getturnonsignal() and plug.is_off):
        plug.turn_on()
    elif(PullfromDB.getturnonsignal() == 0 and plug.is_on):
        plug.turn_off()






