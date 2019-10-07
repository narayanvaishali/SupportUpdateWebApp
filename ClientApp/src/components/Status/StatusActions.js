import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import StatusList from './StatusList';
import AddStatus from './AddStatus';
import axios from 'axios';
const apiUrl = 'https://localhost:5001/api/status/';

class StatusActions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddStatus: false,
            error: null,
            response: {},
            statusData: {},
            isEditStatus: false,
            isStatusDetails: true,
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onCreate() {
        this.setState({ isAddStatus: true });
        this.setState({ isStatusDetails: false });       

     //   this.props.history.push('/addstatus');
    }
    onDetails() {
        this.setState({ isStatusDetails: true });
        this.setState({ isAddStatus: false });
    }

    onFormSubmit(data) {
        this.setState({ isAddStatus: true });
        this.setState({ isStatusDetails: false });

        if (this.state.isEditStatus) {
            axios.put(apiUrl + 'addeditstatus', data).then(result => {
              //  alert(result.data);
                this.setState({
                    response: result,
                    isAddStatus: false,
                    isEditStatus: false
                })
            });
        } else {

            axios.post(apiUrl + 'addeditstatus', data).then(result => {
                //alert(result.data);
                this.setState({
                    response: result,
                    isAddStatus: false,
                    isEditStatus: false
                })
            });
        }

    }

    editStatus = statusId => {
        //console.log('editstatus : ' + apiUrl + "getstatusdetails?statusid=" + statusId);

        this.setState({ isStatusDetails: false });
        axios.get(apiUrl + "getstatusdetails?statusid=" + statusId).then(result => {

            console.log('editstatus : ' + JSON.stringify(result.data));

            this.setState({
                isEditStatus: true,
                isAddStatus: true,
                statusData: result.data
            });
        },
            (error) => {
                this.setState({ error });
            }
        )

    }

    render() {

        let userForm;
        if (this.state.isAddStatus || this.state.isEditStatus) {

            userForm = <AddStatus onFormSubmit={this.onFormSubmit} status={this.state.statusData} />
        }
        return (
            <div className="App">
                <Container>
                    <h1 style={{ textAlign: 'center' }}>Status</h1>
                    <hr></hr>
                    {!this.state.isStatusDetails && <Button variant="primary" onClick={() => this.onDetails()}> Status Details</Button>}
                    {!this.state.isAddStatus && <Button variant="primary" onClick={() => this.onCreate()}>Add Status</Button>}
                    <br></br>
                    {!this.state.isAddStatus && <StatusList editStatus={this.editStatus} />}
                    {userForm}
                </Container>
            </div>
        );
    }
}
export default StatusActions;  