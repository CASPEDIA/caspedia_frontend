// import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Navbar from './components/common/Navbar';
import Navigation from './components/common/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='app-container component-background'>
      <BrowserRouter>
        <Navbar />
          <div className='main-content'>
            <Main />
          </div>
        <Navigation />
      </BrowserRouter>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

//https://velog.io/@jungsw586/React-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0-2.-React-Router-%EC%84%A4%EC%B9%98