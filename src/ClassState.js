import React from "react";

class ClassState extends React.Component{
    render(){
        return(
            <div>
                <h2>Delete ClassState</h2>
                <p>Please, write the secutiry code:</p>
                <input placeholder="Security code"/>
                <button>Let's go!</button>
            </div>
        );
    }
}

export { ClassState };