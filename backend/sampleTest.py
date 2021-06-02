import pytest
from flaskMongo import *

testUserID = "60b6fa44b65b73db02a27417"

""" 
    PLEASE structure tests so 'balance' will be 0 at the end
"""
def test_RemBal_get_val():
   assert RemainingBalance().get_val(testUserID)[0]['balance'] == 0


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