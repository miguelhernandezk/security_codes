import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }){
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => {
        dispatch({type: actionTypes.confirm});
    };

    const onWrite = (newValue) =>  {
        dispatch({type: actionTypes.write, payload: newValue});
    };

    const onError = () => {
        dispatch({type: actionTypes.error});
    };

    const onCheck = () => {
        dispatch({type: actionTypes.check});
    }

    const onDelete = () =>{
        dispatch({type: actionTypes.delete});
    };

    const onReset = () => {
        dispatch({type: actionTypes.reset});
    }; 

    React.useEffect(() => {
        console.log("Starting effect");
        if(!!state.loading) {// React detecs as a change the first render, thus setting loading to true        
            setTimeout(() => {
                console.log("Validating code");


                if(state.value === SECURITY_CODE){
                    onConfirm();
                    // setError(false); // Should be combined with A
                }else{
                    onError();
                }
                

                console.log("Completed");
            }, 3000)
        };
        console.log("Ending effect");
    }, [state.loading]);

    if(!state.deleted && !state.confirmed){
        return(
            <div>
                <h2>Delete { name }</h2>
                <p>Please, write the secutiry code:</p>
    
                {(state.error && !state.loading) && (  // A:  This works without updating the state
                    <p>Error: Incorrect code</p>
                )}
    
                {state.loading && (
                    <p>Loading...</p>
                )}
    
    
                <input 
                    value = {state.value}
                    placeholder="Security code"
                    onChange={(event) =>{
                            onWrite(event.target.value);
                            // onWrite(event.target.value);
                        }
                    }
                />
                <button
                    onClick={onCheck}
                >Let's go!</button>
            </div>
        );
    }else if(!!state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <p>Are you sure you want to delete UseState?</p>
                <button
                    onClick={onDelete}
                >
                    Yes, delete!</button>
                <button
                    onClick={onReset}
                >
                    Nope, I changed my mind</button>
            </React.Fragment>
        );
    }else{
        return(
            <React.Fragment>
                <p>Element deleted</p>
                <button
                    onClick={ onReset }
                >
                    Reset UseState</button>
            </React.Fragment>
        );
    }    
}

const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    confirm: "CONFIRM",
    write: "WRITE",
    delete: "DELETE",
    error: "ERROR",
    reset: "RESET",
    check: "CHECK",
}

// 3. 
const reducerObject = (state, payload) => ({ // action is an object
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.confirm]: {
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    },
    [actionTypes.write]: {
        ...state,
        value: payload,
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: "",
    }
});

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){// Asks if there is an object called as "action.type" inside reducerObject
        return reducerObject(state, action.payload)[action.type]
    } else{
        return state;
    }
};


export { UseReducer };