import React from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withError = (WrappedCopoment,axios)=>{
    return class extends React.Component {

        state = {
            error: null
        }

        componentDidMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});

                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res,error => {
                this.setState({error: error})
            });
        }

        copomentWillUnmount(){  
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        confirmError = ()=>{
            this.setState({error: null})
        }

        render(){
            return(
                <React.Fragment>
                    <Modal 
                    show = {this.state.error !== null}
                    click = {this.confirmError}>
                        {this.state.error !== null ? this.state.error.message : null}
                    </Modal>
                    <WrappedCopoment {...this.props}/>
                </React.Fragment>
            );
        }
    }

}

export default withError