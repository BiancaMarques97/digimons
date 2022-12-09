import { Home } from "./components/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { MyRoutes } from "./routes";
import './styles/styles.scss'

function App() {
  return (
    <>
      <Router>
        <MyRoutes />
      </Router>
    </>
  );
}

export default App;
