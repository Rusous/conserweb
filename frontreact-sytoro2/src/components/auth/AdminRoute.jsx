/* eslint-disable react/prop-types */


import {Navigate}  from 'react-router-dom'
import useStoreContext from '../../context/StoreProvider'

const AdminRoute = ({children}) => {

  const {state} = useStoreContext()



  return (
   state.userInfo?.name && state.userInfo.role == 'admin' ? children : <Navigate to={'/'} replace />
  )
}

export default AdminRoute