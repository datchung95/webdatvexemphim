import './App.css';
import { Router, Switch } from 'react-router-dom'
import history from './util/libs/history'
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Detail from './pages/Detail/Detail';
import Chectout from './pages/Chectout/Chectout';
import Login from './pages/Login/Login';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { ChectoutTemplate } from './templates/ChectoutTemplate/ChectoutTemplate';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Film from './pages/Admin/Film/Film';
import ShowTime from './pages/Admin/ShowTime/ShowTime';
import Users from './pages/Admin/Users/Users';
import AddFilm from './pages/Admin/Film/AddFilm/AddFilm';
import EditFilm from './pages/Admin/Film/EditFilm/EditFilm';
import { AccountTemplate } from './templates/AccountTemplate/AccountTemplate';
import Register from './pages/Register/Register';
import AddUser from './pages/Admin/Users/AddUser/AddUser';
import EditUser from './pages/Admin/Users/EditUser/EditUser';
import TrailerPopup from './components/CardFilm/TrailerPopup';

function App() {
  return (
    <Router history={history}>
      <Loading />
      <TrailerPopup />
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/trangchu" exact Component={Home} />
        <HomeTemplate path="/lienhe" exact Component={Contact} />
        <HomeTemplate path="/tintuc" exact Component={News} />
        <HomeTemplate path="/phim/:id" exact Component={Detail} />
        <HomeTemplate path="/trangcanhan" exact Component={Profile} />
        <AccountTemplate path="/dangnhap" exact Component={Login} />
        <AccountTemplate path="/dangky" exact Component={Register} />
        <ChectoutTemplate path="/datve/:id" exact Component={Chectout} />
        <AdminTemplate path="/quantri" exact Component={Users} />
        <AdminTemplate path="/quantri/quanlynguoidung" exact Component={Users} />
        <AdminTemplate path="/quantri/quanlynguoidung/themnguoidung" exact Component={AddUser} />
        <AdminTemplate path="/quantri/quanlynguoidung/chinhsuanguoidung/:taiKhoan" exact Component={EditUser} />
        <AdminTemplate path="/quantri/quanlyphim" exact Component={Film} />
        <AdminTemplate path="/quantri/quanlyphim/themphim" exact Component={AddFilm} />
        <AdminTemplate path="/quantri/quanlyphim/capnhatphim/:id" exact Component={EditFilm} />
        <AdminTemplate path="/quantri/lichchieu/:id/:tenphim" exact Component={ShowTime} />
      </Switch>
    </Router>
  );
}

export default App;
