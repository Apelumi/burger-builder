import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        constructor(props){
            super(props);
            this.state={
                error: null
            };
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null}) 
                return req// so that our app isn't looking for error again sending request
            })
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                console.log(error)
                this.setState({error: error}) //setting the error to the error we are getting
            })

            
            console.log("will unmount", this.resInterceptors, this.reqInterceptors)
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)
            
        }

        
        

        // componentWillMount () {
        //     axios.interceptors.request.use(req => {
        //         this.setState({error: null}) 
        //         return req// so that our app isn't looking for error again sending request
        //     })
        //     axios.interceptors.response.use(res => res, error => {
        //         console.log(error)
        //         this.setState({error: error}) //setting the error to the error we are getting
        //     })
        // }

        errorHandlerClicked = () => {
            this.setState({error: null})
        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error}
                        modalClosed ={this.errorHandlerClicked}>
                        {this.state.error? this.state.message.error : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    } 
}

export default withErrorHandler;