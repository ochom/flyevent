import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

export class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: props.error_message
        }
    }
    refreshPage() {
        window.location.reload();
    }

    render() {
        return (
            <div className="page-cover row justify-content-center" >
                <div className="content-body col-md-6 col-lg-5">
                    <div className="col-12 text-center  mt-5">
                        <div className="alert alert-danger">{this.state.message}</div>
                        <div onClick={this.refreshPage} className="btn btn-sm btn-primary rounded">Click to refresh</div>
                    </div>
                </div>
            </div>
        )
    }
}

export class Loading extends Component {
    render() {
        return (
            <div className="page-cover row justify-content-center">
                <div className="content-body col-md-6 col-lg-5">
                    <div className="col-12 text-center mt-3">
                        <Spinner size="sm" color="primary" />
                    </div>
                </div>
            </div>
        )
    }
}
