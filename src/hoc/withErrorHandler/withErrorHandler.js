import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props)
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log(error)
                this.setState({
                    error: error
                })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        state = {
            eror: null
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        clicked={this.errorConfirmedHandler}>{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;