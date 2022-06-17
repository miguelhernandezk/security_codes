import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }){
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    console.log(value);

    React.useEffect(() => {
        console.log("Starting effect");
        if(!!loading) {// React detecs as a change the first render, thus setting loading to true        
            setTimeout(() => {
                console.log("Validating code");


                if(value !== SECURITY_CODE){
                    setError(true);
                }
                setLoading(false);

                console.log("Completed");
            }, 3000)
        };
        console.log("Ending effect");
    }, [loading]);


    return(
        <div>
            <h2>Delete { name }</h2>
            <p>Please, write the secutiry code:</p>

            {error && (
                <p>Error: Incorrect code</p>
            )}

            {loading && (
                <p>Loading...</p>
            )}


            <input 
                value = {value}
                placeholder="Security code"
                onChange={(event) =>{
                    setValue(event.target.value);
                }}
            />
            <button
                onClick={() => setLoading(true)}
            >Let's go!</button>
        </div>
    );
}

export { UseState };