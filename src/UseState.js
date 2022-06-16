import React from "react";

function UseState({ name }){
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log("Starting effect");
        if(!!loading) {// React detecs as a change the first render, thus setting loading to true        
            setTimeout(() => {
                console.log("Validating code");

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


            <input placeholder="Security code"/>
            <button
                onClick={() => setLoading(true)}

            >Let's go!</button>
        </div>
    );
}

export { UseState };