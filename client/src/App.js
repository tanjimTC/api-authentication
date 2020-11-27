import "./App.css";
import Home from "./containers/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpContainer from "./containers/SignUpContainer";
import SignInContainer from "./containers/SignInContainer";
import DeshBoardContainer from "./containers/DeshBoardContainer";
import SignOutContainer from "./containers/SignOutContainer";
import showResults from "./showResults";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <SignUpContainer onSubmit={showResults} />
          </Route>
          <Route path="/signin">
            <SignInContainer />
          </Route>
          {/* <Route path="/signout">
            <SignOutContainer />
          </Route> */}
          <Route path="/deshboard">
            <DeshBoardContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
