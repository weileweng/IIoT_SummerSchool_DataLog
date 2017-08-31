import requests

def getturnonsignal():
    # header information -H in curl
    headers = {
        'X-Appery-Database-Id': '599fcc3b2e22d77f55c2036d',
    }
    # link the same as curl
    link = 'https://api.appery.io/rest/1/db/collections/MachineState'
    r = requests.get(link, headers=headers)
    # as json
    rjson = r.json()
    # first part of the list(is a dict)
    firstrobotdata = rjson[0]
    #search dict with key 'Logging' return bool
    Logging = firstrobotdata['Logging']
    print(Logging)
    if(Logging):
        return 1
    else:
        return 0








