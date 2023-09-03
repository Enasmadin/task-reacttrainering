import { createContext, useReducer } from "react"
import darkModeReducer from "./darkModeReducer";

const INTIAL_STATE={
    darkMode:false
}
export const DarkModeContext= createContext(INTIAL_STATE);
export const DarkModeContextProvider=({children})=>{
    const[state,dispatch]=useReducer(darkModeReducer,INTIAL_STATE);
    return(
        <DarkModeContext.Provider value={{ darkMode:state.darkMode ,dispatch }}>
            {children}
        </DarkModeContext.Provider>
    )

  
}