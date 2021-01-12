import argparse
import http.client
import json

def names_to_alphabetical_order():
    for names in data:
        data.sort()
    return data

def order_by_amount():
    for amount in data:
        data.sort()
    return data

def total_amount():
    total_amount = 0
    for amount in data:
        total_amount += amount
    return total_amount

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
    connection.request('GET', '/api/names/Anna', 'BODY')
    r1 = connection.getresponse()
    data = r1.read().decode()
    json_data = json.loads(data)
    print(json_data)

    
    if args.alpha:
        return names_to_alphabetical_order()
    elif args.amount:
        return order_by_amount()
    elif args.name:
        return data[args.name]
    elif args.total:
        return total_amount()

if __name__ == "__main__":
    main()
