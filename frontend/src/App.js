import React, {useState, useEffect} from 'react';
import TransactionPage from "./pages/TransactionPage.js"
import SettingsPage from "./pages/SettingsPage.js"
import StatsPage from "./pages/StatsPage.js"
import LoginPage from "./pages/LoginPage.js"
import CreateAccPage from "./pages/CreateAccPage.js"
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

function App() {
    const [currentUser, setCurrentUser] = useState("");
    
    useEffect(() => {
        const asyncCallback = async () =>{
            setCurrentUser(localStorage.getItem('currentUser'));
        }
        asyncCallback();
    }, []);
    
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        {localStorage.getItem('currentUser') ? <Redirect to="/transactions" /> : <Redirect to="/login" />}
                    </Route>
                    
                    <Route path="/login">
                        <LoginPage curUser={currentUser} setCurUser={setCurrentUser}/>
                    </Route>
                    
                    <Route path="/signup">
                        <CreateAccPage curUser={currentUser} setCurUser={setCurrentUser}/>
                    </Route>

                    <Route path="/transactions">
                        <TransactionPage curUser={currentUser} setCurUser={setCurrentUser}/>
                    </Route>

                    <Route path="/stats">
                        <StatsPage curUser={currentUser} setCurUser={setCurrentUser}/>
                    </Route>

                    <Route path="/settings">
                        <SettingsPage curUser={currentUser} setCurUser={setCurrentUser}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
