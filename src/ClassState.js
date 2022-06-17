import React from "react";
import {Loading} from "./Loading";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: "",
            error: false,
            loading: false,
        };
    }
    //componentWillMount()
    // UNSAFE_componentWillMount(){
    //     console.log("componentWillMount")
    // }

    // componentDidMount(){
    //     console.log("componentDidMount")
    // }

    componentDidUpdate(){
        console.log("Major update");
        if(!!this.state.loading) {// React detecs as a change the first render, thus setting loading to true        
            setTimeout(() => {
                console.log("Validating code");

                if(SECURITY_CODE === this.state.value){
                    this.setState({error: false, loading: false});
                }else{
                    this.setState({error: true, loading: false})
                }

                console.log("Completed");
            }, 3000);
        };
    }

    render(){
        return(
            <div>
                <h2>Delete {this.props.name}</h2>
                <p>Please, write the secutiry code:</p>

                {(this.state.error && !this.state.loading)&& (
                    <p>Error: Incorrect code</p>
                )}

                {this.state.loading && (
                   <Loading />
                )}

                <input 
                    placeholder="Security code"
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({ value: event.target.value });
                    }}
                />
                <button
                    onClick={() => 
                        this.setState({loading: true})
                    }
                >Let's go!</button>
            </div>
        );
    }
}

export { ClassState };