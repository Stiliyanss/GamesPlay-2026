import { Routes, Route } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import GameCatalog from './components/game-catalog/GameCatalog'
import GameCreate from './components/game-create/GameCreate'
import GameDetails from './components/game-details/GameDetails'
import GameEdit from './components/game-edit/GameEdit'
import Logout from './components/logout/Logout.jsx'
import { UserProvider } from './providers/UserProvider.jsx'
import AuthGuard from './components/guards/AuthGuard.jsx'
import GuestGuard from './components/guards/GuestGuard.jsx'
import { lazy, Suspense } from 'react'
import {ToastContainer} from 'react-toastify'
// import Admin from './components/admin/Admin.jsx'
const Admin = lazy(()=> import('./components/admin/Admin.jsx'))


function App() {

  
  return (
    <UserProvider>
   <div id='box'>
    <Header/>

    <main id="main-content">
      <Routes>
        <Route index element={<Home/>}/>
        <Route element={<GuestGuard/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        </Route>
        <Route path='/games' element={<GameCatalog/>}/>
        <Route element={<AuthGuard/>}>
          <Route path='/games/create' element={<GameCreate/>}/>
          <Route path='games/:gameId/edit' element={<GameEdit/>}/>
        <Route path='/logout' element={<Logout/>}/>
        </Route>
        <Route path='/games/:gameId/details' element={<GameDetails/>}/>
          <Route path='/admin' element={<Suspense fallback={<p>Loading...</p>}>
            <Admin/>
            </Suspense>
          }/>
      </Routes>
    </main>
    <ToastContainer/>
   </div>
   </UserProvider>
  ) 
}

export default App
