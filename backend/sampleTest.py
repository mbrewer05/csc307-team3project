import pytest
from flaskMongo import *

testUserID = "60b6fa44b65b73db02a27417"

def test_user_find_by_username():
   expected = [{'_id': '60b6fa44b65b73db02a27417',
               'budget': 0, 'name': 'TEST TEST',
               'password': 'gAAAAABgtvpE6RFUslCbvUrYg9O6YVMjCqJ2-SbW6kEYpl7JPVMXhuLonmHOKTBo6cT_2OTaqT5QC-ICAFuXDwBD3AyeYyNjNQ==',
               'username': 'test'}]
   assert User().find_by_username("test") == expected

def test_user_find_by_username_and_password():
   expected = [{'_id': '60b6fa44b65b73db02a27417',
               'budget': 0, 'name': 'TEST TEST',
               'password': 'gAAAAABgtvpE6RFUslCbvUrYg9O6YVMjCqJ2-SbW6kEYpl7JPVMXhuLonmHOKTBo6cT_2OTaqT5QC-ICAFuXDwBD3AyeYyNjNQ==',
               'username': 'test'}]
   assert User().find_by_username_and_password('test', 'test') == expected

def test_transaction_find_by_user():
  assert Transaction().find_by_user(testUserID)[0]['amount'] == 20

def test_transaction_find_by_category():
  assert Transaction().find_by_category(testUserID, 'Groceries')[0]['amount'] == 20

def test_transaction_find_by_category_spent():
   assert Transaction().find_by_category_spent(testUserID, 'Groceries', '1')[0]['amount'] == 20

def test_find_by_spent():
  assert Transaction().find_by_spent(testUserID, '1')[0]['amount'] == 20

