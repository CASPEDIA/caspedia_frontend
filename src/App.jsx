import './App.css'
import { createBrowserRouter, Outlet } from 'react-router-dom';
// import Main from 'pages/Main';
import Navbar from 'components/common/Navbar';
import Navigation from 'components/common/Navigation';
import BoardGameDetail from 'pages/boardgame/BoardGameDetail';
import BasicInfo from 'pages/dashboard/BasicInfo';
import NotFound from 'pages/NotFound';
import Rating from 'pages/Rating';
import SearchResult from 'pages/search/SearchResult';
import SignIn from 'pages/user/SignIn';
import UserDetail from 'pages/user/UserDetail';
import RequireAuth from 'hooks/RequireAuth';
import ScrollToTop from 'pages/ScrollToTop';
import 'bootstrap/dist/css/bootstrap.min.css';
import RequireAdmin from 'hooks/RequireAdmin';
import AdminPage from 'pages/admin/AdminPage';
import { ToastContainer } from 'react-toastify';
import ScoreRankDetail from 'pages/rank/ScoreRankDetail';
import RatingRankDetail from 'pages/rank/RatingRankDetail';
import TaggedGames from 'pages/tagged/TaggedGames';
import RatingDetail from 'pages/rating/RatingDetail';

const App = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className='app-container component-background'>
        <Navbar />
        <div className="main-content">
          <Outlet />
        </div>
        {/* <Navigation /> */}
        <ToastContainer position="bottom-center" autoClose={2000} />
      </div>
    ),
    children: [
      {
        path: '',
        element: (
          <RequireAuth>
            <ScrollToTop />
            <BasicInfo />
          </RequireAuth>
        ),
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'user/:nanoid',
        element: (
          <RequireAuth>
            <ScrollToTop />
            <UserDetail />
          </RequireAuth>
        ),
      },
      {
        path: 'search',
        element: (
          <RequireAuth>
            <ScrollToTop />
            <SearchResult />
          </RequireAuth>
        ),
      },
      {
        path: 'boardgame/:boardid',
        element: (
          <RequireAuth>
            <ScrollToTop />
            <BoardGameDetail />
          </RequireAuth>
        ),
      },
      {
        path: 'rating/:boardid',
        element: (
          <RequireAuth>
            <ScrollToTop />
            <Rating />
          </RequireAuth>
        ),
      },
      {
        path: 'ratingdetail/:ratingkey',
        element: (
          <RequireAuth>
            <ScrollToTop />
            <RatingDetail />
          </RequireAuth>
        )
      },
      {
        path: 'tagged/:tagid',
        element: (
          <RequireAuth>
            <ScrollToTop />
            <TaggedGames />
          </RequireAuth>
        ),
      },
      {
        path: 'rank/score',
        element: (
          <RequireAuth>
            <ScrollToTop />
            <ScoreRankDetail />
          </RequireAuth>
        ),
      },
      {
        path: 'rank/rating',
        element: (
          <RequireAuth>
            <ScrollToTop />
            <RatingRankDetail />
          </RequireAuth>
        ),
      },
      {
        path: 'admin',
        element: (
          <RequireAdmin>
            <ScrollToTop />
            <AdminPage />
          </RequireAdmin>
        )
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default App;
