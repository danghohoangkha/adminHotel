
import React, { useState, useContext  } from 'react';
import callApi from '../utils/verifyAPI'
const LoginContext = React.createContext(null);
export function useLoginContext() {
    console.log("vddd")
    return useContext(LoginContext)
}
// export const LoginContext;
export default function LoginProvider({ children }) {
    // const [socket, setSocket] = useState( io(ENDPOINT));
    const [isLogin,setIsLogin]=useState(true);
    React.useEffect(() => {
        callApi('verifyToken','POST',{'Authorization':`Bearer ${localStorage.getItem("token")}`}).then(res=>{
            console.log("Đã login")
            setIsLogin(true)
        }).catch(error=>{
            console.log('Tai sao fail')
            console.log(error)
            setIsLogin(false)
        })
        
    }, [])
    return (
        <LoginContext.Provider value={[isLogin,setIsLogin]}>
            {children}
        </LoginContext.Provider>
    )
}