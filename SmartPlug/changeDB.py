import requests

headers = {
    'X-Appery-Database-Id': '599fcc3b2e22d77f55c2036d',
    'Content-Type': 'application/json',
}

data = '{"Logging":"false"}'

requests.put('https://api.appery.io/rest/1/db/collections/MachineState/59a1609e0f0d31612a2950d5', headers=headers, data=data)
