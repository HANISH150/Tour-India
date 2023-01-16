import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import Title from './components/Title/Title';
import {useSelector} from 'react-redux'
import {Route,Routes} from 'react-router-dom'
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Developer from './components/Developer/Developer';
import NewPlace from './components/NewPlace/NewPlace';
import Places from './components/Places/Places';
import Favourites from './components/Favourites/Favourites';

function App() {
  let userTheme = useSelector(state=>state.theme)

  return (
    <>
    <div className={userTheme===false?'body1':'body2'}>
      <Title/>
      <Routes>
        <Route path="/newplace" element={<NewPlace/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/places" element={<Places/>}/>
        <Route path="/favourites" element={<Favourites/>}/>
      </Routes>
      {/* swiper */}
      <div className="my-0" ><Footer/></div>
    </div>
    </>
  );
}

export default App;
