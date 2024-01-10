
import { Outlet } from 'react-router-dom'
import HeaderLayout from './HeaderLayout'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Root = () => {

  return (

    <div className='d-flex flex-column vh-100 '>
      <header className=''>
        <ToastContainer />
        <HeaderLayout />
      </header>

      <main className='container-xl shadow-lg mt-5 flex-fill border'>
        <Outlet />
      </main>

      <footer className='text-center py-3'>footer aqui</footer>
    </div>


  )
}

export default Root