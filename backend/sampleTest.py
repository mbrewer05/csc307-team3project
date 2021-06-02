import pytest
from flaskMongo import *

testUserID = "60b6fa44b65b73db02a27417"

def test_user_find_all():
   users = User().find_all()
   testUser = {}
   for user in users:
      if user["_id"] == testUserID:
         testUser = user
   assert testUser != {}

def test_user_find_by_username():
   expected = {'_id': '60b6fa44b65b73db02a27417',
               'budget': 0, 'name': 'TEST TEST',
               'password': 'restricted',
               'username': 'test'}
   users = User().find_by_username('test')
   testUser = {}
   for user in users:
      if user["_id"] == testUserID:
         testUser = user
   assert testUser == expected

def test_user_find_by_username_and_password():
   expected = [{'_id': '60b6fa44b65b73db02a27417',
               'budget': 0, 'name': 'TEST TEST',
               'password': 'restricted',
               'username': 'test'}]
   assert User().find_by_username_and_password('test', 'test') == expected

def test_user_patch():
   user = {'name': '', 'username': '', 'password': ''}
   settingsToChange = {'user': user}
   settingsToChange['user']['name'] = 'notTestName'
   settingsToChange['user']['username'] = 'notTestUsername'
   settingsToChange['user']['password'] = 'notTestPassword'
   User().patch(settingsToChange, testUserID)
   settingsToChange['user']['name'] = 'test'
   settingsToChange['user']['username'] = 'test'
   settingsToChange['user']['password'] = 'test'
   User().patch(settingsToChange, testUserID)

def test_transaction_find_by_user():
  assert Transaction().find_by_user(testUserID)[0]['amount'] == 20

def test_transaction_find_by_category():
  assert Transaction().find_by_category(testUserID, 'Groceries')[0]['amount'] == 20

def test_transaction_find_by_category_spent():
   assert Transaction().find_by_category_spent(testUserID, 'Groceries', '1')[0]['amount'] == 20

def test_find_by_spent():
  assert Transaction().find_by_spent(testUserID, '1')[0]['amount'] == 20

""" 
    PLEASE structure tests so 'balance' will be 0 at the end
"""
def test_RemBal_get_val():
   assert RemainingBalance().get_val(testUserID)[0]['balance'] == -20


def test_RemBal_add_to_balance():
   preAdd = RemainingBalance().get_val(testUserID)[0]['balance']
   RemainingBalance().add_to_balance(testUserID, 10)
   postAdd = RemainingBalance().get_val(testUserID)[0]['balance']

   assert postAdd == preAdd + 10


def test_RemBal_sub_from_balance():
   preAdd = RemainingBalance().get_val(testUserID)[0]['balance']
   RemainingBalance().sub_from_balance(testUserID, 10)
   postAdd = RemainingBalance().get_val(testUserID)[0]['balance']

   assert postAdd == preAdd - 10

def test_user_reload_true():
    user = User({"_id": "60b6fa44b65b73db02a27417"})
    assert user.reload()

def test_user_realod_false():
    user = User({"_id": "60b6fa44b65b73db02a27747"})
    assert not(user.reload())

def test_user_create():
    user = User({"username":"testCreate", "password":"examplePass", "name":"testCreate"})
    user.save()
    assert user.reload()
    
def test_user_update():
    user = User({'_id': "60b6fa44b65b73db02a27417"})
    user.reload()
    user._id = ObjectId(user._id)
    user.save()
    assert user.reload()
    
def test_user_delete():
    user = User(User().find_by_username("testCreate")[0])
    user.remove()
    assert not(user.reload())
    