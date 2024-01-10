/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useState } from "react";


const initialState={

    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}

}


const reducer =(state,action)=>{

    switch(action.type){

        case 'login user':{
            localStorage.setItem('userInfo', JSON.stringify(action.payload))

            return {
                ...state,
                userInfo:action.payload
            }
        }

        case 'log out': {
            return {
                ...state,
                userInfo:{}
            }
        }

    }

}


const StoreContext = createContext()

const StoreProvider =({children})=>{
    const [visitasArrCtx, setVisitasArrCtx] = useState([])
    const [state, dispatch]= useReducer(reducer, initialState)
    const [modalShowCtx, setModalShowCtx] = useState(false);

  
    return (
        <StoreContext.Provider
        value={
            {
                state, 
                dispatch,
                visitasArrCtx,
                setVisitasArrCtx,
                modalShowCtx,
                setModalShowCtx
            }
        }
        >
            {children}
        </StoreContext.Provider>
    )
}


const useStoreContext = ()=>{
    return useContext(StoreContext)
}

export default useStoreContext
export {StoreProvider}