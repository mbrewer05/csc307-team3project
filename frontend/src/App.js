import ProfilePage from "./pages/ProfilePage.js"
import TransactionPage from "./pages/TransactionPage.js"
import SettingsPage from "./pages/SettingsPage.js"
import StatsPage from "./pages/StatsPage.js"
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <TransactionPage />
                    </Route>
                    <Route path="/profile">
                        <ProfilePage />
                    </Route>

                    <Route path="/transactions">
                        <TransactionPage />
                    </Route>

                    <Route path="/stats">
                        <StatsPage />
                    </Route>

                    <Route path="/settings">
                        <SettingsPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
