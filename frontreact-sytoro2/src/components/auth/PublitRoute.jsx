/* eslint-disable react/prop-types */


import {Navigate} from 'react-router-dom'
import useStoreContext from '../../context/StoreProvider'



const PublicRoute = ({children}) => {

    const {state} = useStoreContext()
    const {userInfo} = state


  
    return (
    !userInfo.name ? children : <Navigate to={'/homepage'} replace/>
  )
}



export default PublicRoute