import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }){
    const [state, setState] = React.useReducer(reducer, initialState);

    const onConfirm = () => {
        setState({ // Work as in classes (NOT independent states)
            ...state,
            loading: false,
            error: false,
            confirmed: true,
        });
    };

    const onWrite = (newValue) =>  {
        setState({
            ...state,
            value: newValue,
        })
    };

    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true,
        });
    };

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        });
    }

    const onDelete = () =>{
        setState({
            ...state,
            deleted: true,
        });
    };

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: "",
        });
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
                        }
                    }
                />
                <button
                    onClick={() => 
                        {
                            onCheck();
                        }
                    }
                >Let's go!</button>
            </div>
        );
    }else if(!!state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <p>Are you sure you want to delete UseState?</p>
                <button
                    onClick={() => {
                        onDelete();
                    }}
                >
                    Yes, delete!</button>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >
                    Nope, I changed my mind</button>
            </React.Fragment>
        );
    }else{
        return(
            <React.Fragment>
                <p>Element deleted</p>
                <button
                    onClick={() => {
                        onReset();
                    }}
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

// Thre forms of creating a reducer

// const reducer = (state, action) => {
// }

// 1. 
const reducerIf = (state, action) => { // action is an object
    if(action.type === "ERROR" ){
        return {
            ...state,
            error: true,
            loading: false,
            };
        }else if (action.type === "CHECK"){
            return {
                ...state,
                loading: true,
            };     
        }else {
            return{
                ...state,
            };
    }
};

// 2. 
const reducerSwitch = (state, action) => { // action is an object
    switch(action.type){
        case "ERROR":
            return{
                ...state,
                error: true,
                loading: false,
            }; // "break" is not needes since we ar eusing return
        case "CHECK":
            return{
                ...state,
                loading: true,
            };
        default:
            return{
                ...state,
            };
    }
};

// 3. 
const reducerObject = (state) => ({ // action is an object
    "ERROR": {
        ...state,
        error: true,
        loading: false,
    },
    "CHECK": {
        ...state,
        loading: true,
    }
});

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){// Asks if there is an object called as "action.type" inside reducerObject
        return reducerObject(state)[action.type]
    } else{
        return state;
    }
};


export { UseReducer };