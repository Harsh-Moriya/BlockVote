import Context from "./AlertContext";
import { useState } from "react";

const AlertStates = (props) => {

    const [alert, setAlert] = useState(null);

    const showAlert = (message, type)=>{
        setAlert({
          msg: message,
          type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    const voteTransaction = (message, type, processed)=>{
        if (!processed) { 
            setAlert({
              msg: message,
              type: type
            })
        }
        if (processed) {
            setTimeout(() => {
                setAlert(null);
            }, 2000);
        }
    }

    return (
        <Context.Provider value={{alert, showAlert, voteTransaction}}>
            {props.children}
        </Context.Provider>
    )

}

export default AlertStates;