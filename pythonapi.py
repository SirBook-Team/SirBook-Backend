import flask

app = flask.Flask(__name__)


@app.route('/api/<table>', methods=['post'])
def apipost(table):
    dic = flask.request.get_json()
    dic['id'] = 4
    print(table, dic)
    return flask.jsonify(dic), 200

users = [
    {
        'id': 1,
        'email': 'zeyad.hany2003@gmail.com',
        'password': '@Aasdasd123',
        'firstname': 'zyad',
        'lastname': 'hany',
        'gender': 'mail',
        'dateOfBirth': '20/11/2003',
        'phoneNumber': '01551669872'
    },
    {
        'id': 2,
        'email': 'asd@gmail.com',
        'password': '123@asdv',
        'firstname': 'asd',
        'lastname': 'asd',
        'gender': 'mail',
        'dateOfBirth': '20/11/2003',
        'phoneNumber': '01551669872'
    } 
]


@app.route('/api/<table>', methods=['get'])
def apiget(table):
    dic = flask.request.args.to_dict()
    print(table, dic)
    #return flask.jsonify([]), 200
    return flask.jsonify(users), 200

@app.route('/api/<table>/<int:id>', methods=['put'])
def apiput(table, id):
    dic = flask.request.get_json()
    print(table, id, dic)
    return flask.jsonify(dic), 200

@app.route('/api/<table>/<int:id>', methods=['delete'])
def apidelete(table, id):
    print(table, id)
    return '', 200

@app.route('/')
def index():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=2000)
