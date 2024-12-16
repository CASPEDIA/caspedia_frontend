// import React  from 'react'
// import { Routes, Route } from "react-router-dom";
// import BoardGameDetail from "pages/boardgame/BoardGameDetail";
// import BasicInfo from "pages/dashboard/BasicInfo";
// import NotFound from "pages/NotFound";
// import Rating from "pages/Rating";
// import SearchResult from "pages/search/SearchResult";
// import SignIn from "pages/user/SignIn";
// import UserDetail from "pages/user/UserDetail";
// import RequireAuth from 'hooks/RequireAuth';
// import ScrollToTop from './ScrollToTop';


// export default function Main() {

//   return (
//     <>
//       <Routes>
//         <Route path="signin" element={<SignIn />}/>
//         <Route exact path="/">
//           <Route exact index element={
//             <RequireAuth>
//               <ScrollToTop />
//               <BasicInfo />
//             </RequireAuth>
//           }/>
//           <Route path="user/:nanoid" element={
//             <RequireAuth>
//               <ScrollToTop />
//               <UserDetail />
//             </RequireAuth>
//           }/>
//           <Route path="search" element={
//             <RequireAuth>
//               <ScrollToTop />
//               <SearchResult />
//             </RequireAuth>
//           }/>
//           <Route path="boardgame/:boardid" element={
//             <RequireAuth>
//               <ScrollToTop />
//               <BoardGameDetail />
//             </RequireAuth>
//           }/>
//           <Route path="rating/:boardid" element={
//             <RequireAuth>
//               <ScrollToTop />
//               <Rating />
//             </RequireAuth>
//           }/>
//         </Route>
//         <Route path="*" element={<NotFound />}/>
//       </Routes>
//     </>
//   );
// }