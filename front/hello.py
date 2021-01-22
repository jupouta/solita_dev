import argparse
import http.client
import json


def names_to_alphabetical_order(data):  # List names in alphabetical order
    data = sorted(data, key=lambda k: k['name'])
    for name in data:
        print(name['name'])

def order_by_amount(data):  # List names and amounts, order by amount, most popular first
    data = sorted(data, key=lambda k: k['amount'], reverse=True)
    for element in data:
        print(element['name'] + '\t', element['amount'])

def total_amount(data): # total amount of all the names
    total_amount = 0
    for element in data:
        amount = element['amount']
        total_amount += amount
    print('Total amount of all the names:', total_amount)

def person_amount(data, name):
    name = name.capitalize()
    for element in data:
        if element['name'] == name:
            print(name + ':', element['amount'])
            return
    print(f'Didn\'t find a person named {name}!')

def main():
    parser = argparse.ArgumentParser(description='Process arguments.')
    parser.add_argument('-a', '--alpha', action='store_true',
                        help='list names in alphabetical order')
    parser.add_argument('-o', '--amount', action='store_true',
                        help='order names by amount')
    parser.add_argument('-n', '--name', nargs=1,
                        help='amount of the given name')
    parser.add_argument('-t', '--total', action='store_true',
                        help='total amount of all names')
    args = parser.parse_args()
    
    connection = http.client.HTTPConnection('localhost:3001')
    
    connection.request('GET', '/api/names/', 'BODY')
    response = connection.getresponse()
    data = response.read().decode()
    json_data = json.loads(data)
    
    if args.alpha:
        names_to_alphabetical_order(json_data)
    elif args.amount:
        order_by_amount(json_data)
    elif args.name:
        name = args.name[0]
        person_amount(json_data, name)
    elif args.total:
        total_amount(json_data)
    else:
        print(json_data)

if __name__ == "__main__":
    main()
