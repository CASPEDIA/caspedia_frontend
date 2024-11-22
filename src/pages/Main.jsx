import React  from 'react'
import { Routes, Route } from "react-router-dom";
import BoardGameDetail from "pages/boardgame/BoardGameDetail";
import BasicInfo from "pages/dashboard/BasicInfo";
import NotFound from "pages/NotFound";
import Rating from "pages/Rating";
import SearchResult from "pages/search/SearchResult";
import SignIn from "pages/user/SignIn";
import UserDetail from "pages/user/UserDetail";


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
          <Route path="rating/:boardid" element={<Rating />}/>
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  );
}