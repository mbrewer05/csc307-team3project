from bson import ObjectId
import dns
import os
from dotenv import load_dotenv
from cryptography.fernet import Fernet
from pymongo import MongoClient

class Model(dict):
    """
    A simple model that wraps mongodb document
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    def save(self):
        if not self._id:
            self.collection.insert(self)
        else:
            self.collection.update(
                { "_id": ObjectId(self._id) }, self)
        self._id = str(self._id)

    def reload(self):
        if self._id:
            result = self.collection.find_one({"_id": ObjectId(self._id)})
            if result :
                self.update(result)
                self._id = str(self._id)
                return True
        return False

    def remove(self):
        if self._id:
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp

class User(Model):
    load_dotenv()
    MONGODB_URL = os.environ['MONGODB_URL']
    db_client = MongoClient(MONGODB_URL)
    collection = db_client["budget_tracker"]["user_list"]

    def find_all(self):
        users = list(self.collection.find())
        for user in users:
            user["_id"] = str(user["_id"])
            user["password"] = str(user["password"])
        return users

    def find_by_username(self, username):
        users = list(self.collection.find({"username": username}))
        for user in users:
            user["_id"] = str(user["_id"])
            user["password"] = str(user["password"])
        return users
        
    def find_by_username_and_password(self, username, password):
        fernet = Fernet(os.environ['FERNET_KEY'])
        unfilteredUsers = list(self.collection.find({"username": username}))
        filteredUsers = []
        for user in unfilteredUsers:
            user["_id"] = str(user["_id"])
            if password == fernet.decrypt(bytes(user['password'], 'utf-8')).decode():
                filteredUsers.append(user)
            user["password"] = str(user["password"])
        return filteredUsers
    
    def patch(self, settingsToChange, id):
        fernet = Fernet(os.environ['FERNET_KEY'])
        users = (self.collection.find_one({"_id": ObjectId(id)}))
        if settingsToChange['user']['name'] != '':
            users['name'] = settingsToChange['user']['name']
        if settingsToChange['user']['username'] != '':
            users['username'] = settingsToChange['user']['username']
        if settingsToChange['user']['password'] != '':
            users['password'] = fernet.encrypt(bytes(settingsToChange['user']['password'], 'utf-8')).decode()
        if settingsToChange['user']['budget'] != '':
            users['budget'] = settingsToChange['user']['budget']
        self.collection.update(
            { "_id": ObjectId(self._id) }, users)
        
        
class Transaction(Model):
    load_dotenv()
    MONGODB_URL = os.environ['MONGODB_URL']
    db_client = MongoClient(MONGODB_URL)
    collection = db_client["budget_tracker"]["transaction_list"]

    def find_all(self):
        transactions = list(self.collection.find())
        for transaction in transactions:
            transaction["_id"] = str(transaction["_id"])
        return transactions

    def find_by_user(self, user):
        transactions = list(self.collection.find({"userID": user}))
        for transaction in transactions:
            transaction["_id"] = str(transaction["_id"])
        return transactions
    
    def find_by_category(self, user, category):
        transactions = list(self.collection.find({"userID": user, "category": category}))
        for transaction in transactions:
            transaction["_id"] = str(transaction["_id"])
        return transactions  
    
    def find_by_category_spent(self, user, category, spent):
        transactions = list(self.collection.find({"userID": user, "category": category, "spent": spent}))
        for transaction in transactions:
            transaction["_id"] = str(transaction["_id"])
        return transactions
    
    def find_by_spent(self, user, spent):
        transactions = list(self.collection.find({"userID": user, "spent": spent}))
        for transaction in transactions:
            transaction["_id"] = str(transaction["_id"])
        return transactions


class RemainingBalance(Model):
    load_dotenv()
    MONGODB_URL = os.environ['MONGODB_URL']
    db_client = MongoClient(MONGODB_URL)
    collection = db_client["budget_tracker"]["remaining_balance"]

    def get_val(self, userID):
        remaining = list(self.collection.find({"userID": userID}))
        for balance in remaining:
            balance["_id"] = str(balance["_id"])
        return remaining
    
    def add_to_balance(self, userID, val):
        remaining = list(self.collection.find({"userID": userID}))
        remaining[0]["balance"] += val
        self.collection.update({"userID": userID}, remaining[0])

    def sub_from_balance(self, userID, val):
        remaining = list(self.collection.find({"userID": userID})) 
        remaining[0]["balance"] -= val 
        self.collection.update({"userID": userID}, remaining[0])