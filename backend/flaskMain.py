from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from mongo import User

app = Flask(__name__)
CORS(app)

@app.route('/users', methods=['GET', 'POST'])
def get_users():
    
@app.route('/users/<id>', methods=['GET', 'POST', 'DELETE'])
def get_user(id):
        
@app.route('/users/<userId>/transactions', methods=['GET', 'POST'])
def get_transactions(userId):
    

@app.route('/users/<userID>/transactions/<transactionID>', methods=['GET', 'POST', 'DELETE'])
def get_transaction(userID, transactionID):
    