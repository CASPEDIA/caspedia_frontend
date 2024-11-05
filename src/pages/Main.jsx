import React  from 'react'
import { Routes, Route } from "react-router-dom";
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
      <Routes>
        <Route path="signin" element={<SignIn />}/>
        <Route exact path="/">
          <Route exact index element={<BasicInfo />}/>
          <Route path="user/:nanoid" element={<UserDetail />}/>
          <Route path="search" element={<SearchResult />}/>
          <Route path="boardgame/:boardid" element={<BoardGameDetail />}/>
          <Route path="rating" element={<Rating />}/>
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
      {/* <Navbar /> */}
        {/* <Routes>
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
        </Routes> */}
      {/* <Navigation /> */}
    </>
  );
}