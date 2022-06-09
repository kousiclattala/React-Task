import "./App.css";
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
