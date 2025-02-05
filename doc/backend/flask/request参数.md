## request 参数

```py
from flask import Flask, request

app = Flask(__name__)

@app.route('/index', methods=['GET'])
def index():
    """
    测试query参数
    """
    query = request.args.to_dict()
    print('GET QUERY参数', query['name'])
    return 'Hello World!'

@app.route('/detail/<path_id>')
def detail(path_id):
    """
    测试PATH参数
    """
    print('GET PATH参数', path_id)
    return 'Hello World!'

@app.route('/add', methods=["POST"])
def add():
    """
    测试JSON参数
    """
    json = request.get_json()
    print('POST JSON参数', json, json["name"])
    return '新增成功'

@app.route('/login', methods=['POST'])
def login():
    """
    测试FormData参数
    """
    username = request.form.get('username')
    password = request.form.get('password')
    print('POST JSON参数', username, password)
    return '登录成功'

if __name__ == '__main__':
    app.run()

```
