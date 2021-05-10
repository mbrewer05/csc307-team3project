from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from mongo import User

app = Flask(__name__)
CORS(app)

@app.route('/users', methods=['GET', 'POST'])
def get_users():
    if request.method == 'GET':
        search_username = request.args.get('name')
        if search_username:
            users = User().find_by_name(search_username)
        else:    
            users = User().find_all()
        return {"users_list": users}
    elif request.method == 'POST':
        userToAdd = request.get_json()
        newUser = User(userToAdd)
        newUser.save()
        resp = jsonify(newUser), 201
        return resp
    
@app.route('/users/<id>', methods=['GET', 'POST', 'DELETE'])
def get_user(id):
    if request.method == 'GET':
        user = User({"_id": id})
        if user.reload():
            return user
        else:
            return jsonify({"error": "User not found"}), 404
    elif request.method == 'POST':
        user = User({"_id": id})
        if not(user.reload()):
            return jsonify({"error": "User not found"}), 404
        updatedUser = request.get_json()
        #potentially add some checks and whatnot here
        newUser = User(userToAdd)
        newUser.save()
        resp = jsonify(success=True)
        return resp
    elif request.method == 'DELETE':
        user = User({"_id": id})
        if user.reload():
            user.remove()
        return jsonify({"error": "User not found"}), 404
        
@app.route('/users/<id>/transactions', methods=['GET', 'POST'])
def get_transactions():
    

@app.route('/users/<id>/transactions/<id>', methods=['GET', 'POST', 'DELETE'])
def get_transactions(id):
    