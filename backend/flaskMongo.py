import pymongo
from bson import ObjectId
import dns
import os
from dotenv import load_dotenv

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
    db_client = pymongo.MongoClient(MONGODB_URL)
    collection = db_client["budget_tracker"]["user_list"]

    def find_all(self):
        users = list(self.collection.find())
        for user in users:
            user["_id"] = str(user["_id"])
        return users

    def find_by_userName(self, username):
        users = list(self.collection.find({"username": username}))
        for user in users:
            user["_id"] = str(user["_id"])
        return users
    
    def patch(self, settingsToChange, id):
        users = (self.collection.find_one({"_id": ObjectId(id)}))
        if settingsToChange['user']['name'] != '':
            users['name'] = settingsToChange['user']['name']
        if settingsToChange['user']['username'] != '':
            users['username'] = settingsToChange['user']['username']
        if settingsToChange['user']['password'] != '':
            users['password'] = settingsToChange['user']['password']
        if settingsToChange['user']['budget'] != '':
            users['budget'] = settingsToChange['user']['budget']
        self.collection.update(
            { "_id": ObjectId(self._id) }, users)
        
        
class Transaction(Model):
    load_dotenv()
    MONGODB_URL = os.environ['MONGODB_URL']
    db_client = pymongo.MongoClient(MONGODB_URL)
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
    
    def find_by_category(self, category):
        transactions = list(self.collection.find({"category": category}))
        for transaction in transactions:
            transaction["_id"] = str(transaction["_id"])
        return transactions  
    
    def find_by_category_spent(self, category, spent):
        transactions = list(self.collection.find({"category": category, "spent": spent}))
        for transaction in transactions:
            transaction["_id"] = str(transaction["_id"])
        return transactions
    
    def find_by_spent(self, spent):
        transactions = list(self.collection.find({"spent": spent}))
        for transaction in transactions:
            transaction["_id"] = str(transaction["_id"])
        return transactions