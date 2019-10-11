import React from 'react';
import axios from 'axios';
import '../supportupdate.css'
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';


const initialState = {
    supportupdateid: '',
    zdid: '',
    zddescr: '',
    priority: '',
    status: '',
    timespent: '',
    dateworked: '',
    staffid: '',
    clientid : '',
    supportupdate: [],
    supportstatus: [],
    supportpriority: [],
    supportstaff: [],
    supportclients: [],

    supportupdateidError: "",
    zdidError: '',
    zddescrError: '',
    priorityError: '',
    statusError: '',
    timespentError: '',
    dateworkedError: '',
    staffnameError: '',
    clientnameError : ''

};

class AddSupportUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.AddSupportUpdate = this.AddSupportUpdate.bind(this); 
        this.Back = this.Back.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    validate = () => {
        let supportupdateidError = "";
        let zdidError = "";
        let zddescrError = "";
        let priorityError = "";
        let statusError = "";
        let timespentError = "";
        let dateworkedError = "";
        let staffnameError = "";
        let clientnameError = "";

        if (!this.state.zdid) {
            zdidError = "please enter ZD ID";
        }

        if (!this.state.zddescr) {
            zddescrError = "please enter ZD Descr";
        }

        if (!this.state.priority) {
            priorityError = "please select priority";
        }

        if (!this.state.status) {
            statusError = "please select status";
        }

        if (!this.state.timespent) {
            timespentError = "priority cannot be blank";
        }

        if (!this.state.dateworked) {
            dateworkedError = "please enter date worked";
        }

        if (!this.state.staffid) {
            staffnameError = "please enter staff name";
        }

        if (!this.state.clientid) {
            clientnameError = "please select client";
        }

        if (zdidError || zddescrError || priorityError || statusError || timespentError || dateworkedError || staffnameError || clientnameError) {
            this.setState({ zdidError, priorityError, statusError, timespentError, dateworkedError, staffnameError, clientnameError });
            return false;
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();

        if (isValid) {
            //console.log(this.state);

            const Data = {
                SupportUpdateID: 0,
                ZD_ID: this.state.zdid,
                ZD_Descr: this.state.zddescr,
                PriorityID: this.state.priority,
                ClientID: this.state.clientid,
                CurrentStatusID: this.state.status,
                TimeSpent: this.state.timespent,
                DateWorked: this.state.dateworked,
                StaffID: this.state.staffid
            }

            axios.post('https://localhost:5001/api/supportupdate/addeditsupportupdate/', Data)
                .then(json => {
                    if (json.data === 'Success') {
                        this.props.history.push('/supportupdatelist')
                    }
                    else {
                        this.props.history.push('/supportupdatelist')
                    }
                }) 
            // clear form
            this.setState(initialState);
        }
    };

    getData() {
        axios.get('https://localhost:5001/api/supportupdate/supportupdatedetails?supportupdateid=0')
            .then(response => {

                this.setState(
                    {
                        supportupdate: response.data.supportupdate,
                        supportstatus: response.data.supportstatus,
                        supportpriority: response.data.supportpriority,
                        supportstaff: response.data.supportstaff,
                        supportclients: response.data.supportclients
                    }
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    AddSupportUpdate = () => {

        const Data = {
            SupportUpdateID : 0,
            ZD_ID: this.state.zdid,
            ZD_Descr: this.state.zddescr,
            PriorityID: this.state.priority,
            ClientID: this.state.clientid,
            CurrentStatusID: this.state.status,
            TimeSpent: this.state.timespent,
            DateWorked: this.state.dateworked,
            StaffID: this.state.staffid
        }
  
        axios.post('https://localhost:5001/api/supportupdate/addeditsupportupdate/', Data)
            .then(json => {
                if (json.data === 'Success') {
                    this.props.history.push('/supportupdatelist')
                }
                else {
                    this.props.history.push('/supportupdatelist')
                }
            })     
    }
    Back = () => {
        this.props.history.push('/priorityList')
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }  

    render() {

        let statuslist = this.state.supportstatus.length > 0 && this.state.supportstatus.map(v => (
            <option value={v.StatusID}>{v.StatusDescr}</option>
        ));

        let prioritylist = this.state.supportpriority.length > 0 && this.state.supportpriority.map(v => (
            <option value={v.PriorityID}>{v.Priority}</option>
        ));

        let stafflist = this.state.supportstaff.length > 0 && this.state.supportstaff.map(v => (
            <option value={v.StaffID}>{v.StaffName}</option>
        ));

        let clientlist = this.state.supportclients.length > 0 && this.state.supportclients.map(v => (
            <option value={v.supportClientID}>{v.ClientName}</option>
        ));

        return (
            <Container className="App">
                <h4 className="PageHeading">Add Support Update</h4>
                <Form className="form" onSubmit={this.handleSubmit}>
                    <Col>
                        <FormGroup row>
                            <Label for="zdid" sm={2}>ZD_ID</Label>
                            <Col sm={10}>
                                <Input type="number" name="zdid" onChange={this.handleChange} placeholder="Enter ZD ID" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.zdidError}</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="zddescr" sm={2}>ZD Descr</Label>
                            <Col sm={10}>
                                <Input type="text" name="zddescr" onChange={this.handleChange}  placeholder="Enter ZD Descr" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.zddescrError}</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="clientid" sm={2}>Clients</Label>
                            <Col sm={10}>
                                <select name="clientid" value={this.state.clientid} onChange={this.handleChange}>
                                    <option id="0">Select</option>
                                    {clientlist}
                                </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.clientnameError}</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="priority" sm={2}>Priority</Label>
                            <Col sm={10}>
                                <select name="priority" value={this.state.value} onChange={this.handleChange}>
                                    <option id="0">Select</option>
                                    {prioritylist}
                                </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.priorityError}</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="status" sm={2}>Status</Label>
                            <Col sm={10}>
                                <select name= "status" value={this.state.value} onChange={this.handleChange}>
                                    <option id="0">Select</option>
                                        {statuslist}
                                    </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.statusError}</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="staffid" sm={2}>Staff</Label>
                            <Col sm={10}>

                                <select name="staffid" value={this.state.value} onChange={this.handleChange}>
                                    <option id="0">Select</option>
                                    {stafflist}
                                </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.staffnameError}</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="timespent" sm={2}>Time Spent</Label>
                            <Col sm={10}>
                                <Input type="text" name="timespent" onChange={this.handleChange}  placeholder="Enter Time Spent" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.timespentError}</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="dateworked" sm={2}>Date Worked</Label>
                            <Col sm={10}>
                                <Input type="date" name="dateworked" onChange={this.handleChange} placeholder="Enter Date Worked" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.dateworkedError}</Label>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Col sm={5}>
                            </Col>
                            <Col sm={1}>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </Col>
                            <Col sm={1}>
                                <Button color="danger" type="button" onClick={this.Back} >Cancel</Button>{' '}
                            </Col>
                            <Col sm={5}>
                            </Col>
                        </FormGroup>
                    </Col>
                </Form>
            </Container>
        );
    }

}

export default AddSupportUpdate; 