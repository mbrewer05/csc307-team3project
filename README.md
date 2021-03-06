[![Build Status](https://travis-ci.com/mbrewer05/csc307-team3project.svg?branch=master)](https://travis-ci.com/mbrewer05/csc307-team3project)
## [Travis CI server](https://travis-ci.com/github/mbrewer05/csc307-team3project)

# Project Description

This project is a web-based budget tracker application. When accessing the web page users can create an account or login with a existing one. Once logged in, the main page users will be working with is the Transactions page. This page is where new transactions are displayed and created. Users can create new transactions, see abd delete old ones, and view their balance in the form of a remaining budget. Users can also view the Statistics page which gives them statistics on their spending. This page presents both a pie chart showing user spending in each of their categories, and a graph that shows their monthly spending. There is a Settings page that lets the user change their name, username, and password. Finally, there is a Log Out button that lets the user log out of their account.

## [UI Prototype](https://www.figma.com/file/IanX4UMOULQUXCnjJ5jdJN/CSC307-UI-prototype?node-id=0%3A1)

### [Use Case Diagram](https://github.com/mbrewer05/csc307-team3project/blob/master/images/307_Team3_UseCaseDiagram.png) [(source)](https://drive.google.com/file/d/1QuHNBLEVg9l8LJwk7Wt1yhMWETcB7eNF/view?usp=sharing)

### [Class Diagram](https://github.com/mbrewer05/csc307-team3project/blob/master/images/307_Team3_ClassDiagram.png) [(source)](https://drive.google.com/file/d/1lGRItUzJsuDAmmmoSrupw8gXLYrbK5rs/view?usp=sharing)

# Style guides:

## Python (PEP8):
https://www.python.org/dev/peps/pep-0008/

## Javascript/React:
https://google.github.io/styleguide/jsguide.html \
https://airbnb.io/javascript/react/

# Setup

## Setting up Backend Enviornment

Be sure to have python3 and pip3 installed.

Start the virtual enviornment by navigating to the backend directory and running:

### `. ./bin/activate`

Install the following packages with pip3 to be able to run the project:
* flask
* flask_cors
* flaskMongo
* dotenv
* cryptography
* dnspython

Set enviornmental FLASK_APP=flaskMain.py before running:
### `flask run`
in the backend directory to begin the backend server which will run on http://127.0.0.1:5000/.

Be sure to have the proper .env file with encryption key and mongo server credentials.

## Setting up Frontend Enviornment 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Be sure to have npm installed. 

Navigate to the frontend directory. Run:

### `npm install`

to initialize npm. Then install the following with npm:

### `npm install --save mdbreact`
### `npm i mdb-ui-kit`

Then Run:

### `npm start`

to begin the frontend server. Open [http://localhost:3000](http://localhost:3000) to access the web page. 

## Setting up Prettier on VSCode:
https://create-react-app.dev/docs/setting-up-your-editor \
Please enable 'format on save' and set 'tab width' to 4 in the Prettier settings

