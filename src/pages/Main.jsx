import React  from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BoardGameDetail from "./boardgame/BoardGameDetail";
import BasicInfo from "./dashboard/BasicInfo";
import NotFound from "./NotFound";
import Rating from "./Rating";
import SearchResult from "./search/SearchResult";
import SignIn from "./user/SignIn";
import UserDetail from "./user/UserDetail";


export default function Main() {

  return (
    <>
      {/* <Navbar /> */}
        <Router>
          <Switch>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/">
              <BasicInfo />
            </Route>
            <Route path="/user/:nanoid" >
              <UserDetail />
            </Route>
            <Route path="/search">
              <SearchResult />
            </Route>
            <Route path="/boardgame/:boardid">
              <BoardGameDetail />
            </Route>
            <Route path="/rating">
              <Rating />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      {/* <Navigation /> */}
    </>
  );
}