from pyHS100 import smartplug
input = input("give your ip")
plug = smartplug.SmartPlug(input)


plug.turn_on()



