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

const App = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className='app-container component-background'>
        <Navbar />
        <div className="main-content">
          <Outlet />
        </div>
        <Navigation />
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
