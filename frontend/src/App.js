import Appbar from "./components/Appbar.js";
import ProfilePage from "./components/ProfilePage.js"
import SettingsPage from "./components/SettingsPage.js"
import "./App.css";

function App() {
    return (
        <div className="App">
            <Appbar />
            <ProfilePage />
            <header className="App-header">
            </header>
        </div>
    );
}

export default App;
