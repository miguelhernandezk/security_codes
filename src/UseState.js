import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }){
    const [state, setState] = React.useState({ // Working state as in classes
        value: "",
        error: false,
        loading: false,
    });

    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    console.log(state);

    React.useEffect(() => {
        console.log("Starting effect");
        if(!!state.loading) {// React detecs as a change the first render, thus setting loading to true        
            setTimeout(() => {
                console.log("Validating code");


                if(state.value === SECURITY_CODE){
                    setState({ // Work as in classes (NOT independent states)
                        ...state,
                        loading: false,
                        error: false,
                    });
                    // setError(false); // Should be combined with A
                }else{
                    setState({
                        ...state,
                        loading: false,
                        error: true,
                    });
                }
                

                console.log("Completed");
            }, 3000)
        };
        console.log("Ending effect");
    }, [state.loading]);


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
                    setState({
                        ...state,
                        value: event.target.value,
                    });
                }}
            />
            <button
                onClick={() => 
                    {
                        setState({
                            ...state,
                            loading: true,
                        });
                    }
                }
            >Let's go!</button>
        </div>
    );
}

export { UseState };