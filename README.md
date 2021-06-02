[![Build Status](https://travis-ci.com/mbrewer05/csc307-team3project.svg?branch=master)](https://travis-ci.com/mbrewer05/csc307-team3project)

# Style guides:

## Python (PEP8):
https://www.python.org/dev/peps/pep-0008/

## Javascript/React:
https://google.github.io/styleguide/jsguide.html \
https://airbnb.io/javascript/react/

# Setting up Backend Enviornment

Be sure to have python3 and pip3 installed.

We are running python3 flask for out backend server. Use:
### `pip3 install flask`
to install flask. 

Install the following packages with pip3 to be able to run the project:
* flask_cors
* flaskMongo
* dotenv
* cryptography
* dnspython

Set enviornmental FLASK_APP=flaskMain.py before running:
### `flask run`
in the backend directory to begin the backend server which will run on http://127.0.0.1:5000/.

Be sure to have the proper .env file with encryption key and mongo server credentials.

# Setting up Frontend Enviornment 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Be sure to have npm installed. 

Navigate to the frontend directory. Run:

### `npm install`

to install the necessary modules and packages:
* @material-ui/core
* --save mdbreact
* mdb-react-ui-kit

Then Run:

### `npm start`

to begin the frontend server. Open [http://localhost:3000](http://localhost:3000) to access the web page. 

# Setting up Prettier on VSCode:
https://create-react-app.dev/docs/setting-up-your-editor \
Please enable 'format on save' and set 'tab width' to 4 in the Prettier settings

