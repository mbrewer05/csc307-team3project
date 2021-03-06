from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from flaskMongo import *
import os
from dotenv import load_dotenv
from cryptography.fernet import Fernet

app = Flask(__name__)
CORS(app)

load_dotenv()
fernetKey = os.environ['FERNET_KEY']
fernet = Fernet(fernetKey)

@app.route('/users', methods=['GET', 'POST'])
def get_users():
    if request.method == 'GET':
        search_username = request.args.get('username')
        search_password = request.args.get('password')
        if search_username and search_password:
            users = User().find_by_username_and_password(search_username, search_password)
        elif search_username:
            users = User().find_by_username(search_username)
        else:
            users = User().find_all()
        return {"user_list": users}
    elif request.method == 'POST':
        userToAdd = request.get_json()
        newUser = User(userToAdd)
        newUser['password'] = fernet.encrypt(bytes(newUser['password'], 'utf-8')).decode()
        checkUsernameList = User().find_by_username(newUser['username'])
        
        if len(checkUsernameList):
            return jsonify({"error": "Username already exists"}), 409
        else:
            newUser.save()
            newRemainingBalance = RemainingBalance({"userID": newUser["_id"], "balance": 0})
            newRemainingBalance.save()
            resp = jsonify(newUser), 201
            return resp
        
        
@app.route('/users/<userID>', methods=['GET', 'DELETE', 'PATCH'])
def get_user(userID):
    if request.method == 'GET':
        user = User({"_id": userID})
        if user.reload():
            return user
        else:
            return jsonify({"error": "User not found"}), 404
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
        search_category = request.args.get('category') 
        search_spent = request.args.get('spent')
        if search_category and search_spent:
            transactions = Transaction().find_by_category_spent(userId, search_category, search_spent)
        elif search_category and not search_spent:
            transactions = Transaction().find_by_category(userId, search_category)
        elif not search_category and search_spent:
            transactions = Transaction().find_by_spent(userId, search_spent)
        else:
            transactions = Transaction().find_by_user(userId)
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

@app.route('/users/<userID>/remainingBalance', methods=['GET', 'PATCH', 'DELETE'])
def get_remaining_balance(userID):
    if request.method == 'GET':
        remainingBalance = list(RemainingBalance().get_val(userID))
        return remainingBalance[0]
    
    elif request.method == 'PATCH':
        transaction = request.get_json()

        if transaction["spent"] == "1":
            RemainingBalance().sub_from_balance(userID, transaction["amount"])
        elif transaction["spent"] == "0":
            RemainingBalance().add_to_balance(userID, transaction["amount"])
        return jsonify({"Success": "Balance updated"}), 900

    elif request.method == 'DELETE':
        transaction = request.get_json()
        
        if transaction["spent"] == "1":
            RemainingBalance().add_to_balance(userID, transaction["amount"])
        elif transaction["spent"] == "0":
            RemainingBalance().sub_from_balance(userID, transaction["amount"])
        return jsonify({"Success": "Balance updated"}), 800

    
