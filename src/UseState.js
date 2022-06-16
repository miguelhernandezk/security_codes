import React from "react";

function UseState({ name }){
    const [error, setError] = React.useState(false);
    return(
        <div>
            <h2>Delete { name }</h2>
            <p>Please, write the secutiry code:</p>

            {error && (
                <p>Error: Incorrect code</p>
            )}

            <input placeholder="Security code"/>
            <button
                onClick={() => setError(!error)}
            >Let's go!</button>
        </div>
    );
}

export { UseState };