import React from "react";

class ClassState extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: false,
        };
    }
    render(){
        return(
            <div>
                <h2>Delete {this.props.name}</h2>
                <p>Please, write the secutiry code:</p>

                {this.state.error && (
                    <p>Error: Incorrect code</p>
                )}

                <input placeholder="Security code"/>
                <button
                    onClick={() => this.setState(prevState => ({error: !prevState.error}))}
                >Let's go!</button>
            </div>
        );
    }
}

export { ClassState };