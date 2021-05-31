from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from flaskMongo import *

app = Flask(__name__)
CORS(app)

@app.route('/users', methods=['GET', 'POST'])
def get_users():
    if request.method == 'GET':
        search_username = request.args.get('username')
        if search_username:
            users = User().find_by_name(search_username)
        else:
            users = User().find_all()
        return {"user_list": users}
    elif request.method == 'POST':
        userToAdd = request.get_json()
        newUser = User(userToAdd)
        newUser.save()
        resp = jsonify(newUser), 201
        return resp
        
        
@app.route('/users/<userID>', methods=['GET', 'POST', 'DELETE', 'PATCH'])
def get_user(userID):
    if request.method == 'GET':
        user = User({"_id": userID})
        if user.reload():
            return user
        else:
            return jsonify({"error": "User not found"}), 404
    elif request.method == 'POST':
        userToUpdate = request.get_json()
        updatedUser = User(userToUpdate)
        updatedUser.save()
        resp = jsonify(updatedUser), 201
        return resp
    elif request.method == 'DELETE':
        user = User({"_id": userID})
        if user.reload():
            user.remove()
        return jsonify({"error": "User not found"}), 404
    elif request.method == 'PATCH':
        user = User({"_id": ObjectId(userID)})
        settingsToChange = request.get_json()
        if user.reload():
            user.patch(settingsToChange, userID)
            return jsonify({"done": "nothing left"}), 355
        return jsonify({"done": "nothing left"}), 255
        
        
@app.route('/users/<userId>/transactions', methods=['GET', 'POST'])
def get_transactions(userId):
    if request.method == 'GET':
        transactions = Transaction().find_by_user(userId)
        
        search_category = request.args.get('category') 
        search_spent = request.args.get('spent')

        if search_spent and not search_category:
            transactions = Transaction().find_by_spent(search_spent)
        if search_category and not search_spent:
            transactions = Transaction().find_by_category(search_category)
        if search_category and search_spent:
            transactions = Transaction().find_by_category_spent(search_category, search_spent)
        return {"transaction_list": transactions}

    elif request.method == 'POST':
        transactionToAdd = request.get_json()
        transactionToAdd["userID"] = userId
        newTransaction = Transaction(transactionToAdd)
        newTransaction.save()
        resp = jsonify(newTransaction), 201
        return resp
        
        
@app.route('/users/<userID>/transactions/<transactionID>', methods=['GET', 'POST', 'DELETE'])
def get_transaction(userID, transactionID):
        if request.method == 'GET':
            transaction = Transaction({"_id": transactionID})
            if transaction.reload():
                return transaction
            else:
                return jsonify({"error": "Transaction not found"}), 404

        elif request.method == 'POST':
            transactionToUpdate = request.get_json()
            updatedTransaction = Transaction(transactionToUpdate)
            updatedTransaction.save()
            resp = jsonify(updatedTransaction), 201
            return resp
        elif request.method == 'DELETE':
            transaction = Transaction({"_id": transactionID})
            if transaction.reload():
                transaction.remove()
            else:
                return jsonify({"error": "Transaction not found"}), 404
        
    