import logo from "./logo.svg";
import "./App.css";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import HomeScreen from "./screens/HomeScreen";
import DecideNavigator from "./navigators/DecideNavigator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <DecideNavigator />
      <ToastContainer />
    </div>
  );
}

export default App;
