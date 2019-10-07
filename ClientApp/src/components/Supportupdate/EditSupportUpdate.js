import React from 'react';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios'
import '../supportupdate.css';

class EditSupportUpdate extends React.Component {
    constructor(props) {
        super(props)

     //   console.log(props);
       // console.log(this.props.match.params.supportupdateid);

        this.state = {
            supportupdateid: '',
            zdid: '',
            zddescr: '',
            priority: '',
            status: '',
            timespent: '',
            dateworked: '',
            staffname: '',
            supportupdate: [],
            supportstatus: [],
            supportpriority: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }

    componentDidMount() {

//        console.log('componentDidMount');

        axios.get('https://localhost:5001/api/supportupdate/supportupdatedetails?supportupdateid=' + this.props.match.params.supportupdateid)
            .then(response => {
                this.setState(
                    {
                        supportupdate: response.data.supportupdate,
                        supportstatus: response.data.supportstatus,
                        supportpriority: response.data.supportpriority
                    }
                );

                this.setState({
                    supportupdateid: response.data.supportupdate[0].SupportUpdateID,
                    zdid: response.data.supportupdate[0].ZD_ID,
                    zddescr: response.data.supportupdate[0].ZD_Descr,
                    priority: response.data.supportupdate[0].PriorityID,
                    status: response.data.supportupdate[0].CurrentStatusID,
                    timespent: response.data.supportupdate[0].TimeSpent,
                    dateworked: response.data.supportupdate[0].DateWorked,
                    staffname: response.data.supportupdate[0].Staff_Name
                  
                });

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }  

    onSubmit(e) {
        debugger;
        e.preventDefault();
        const obj = {
            SupportUpdateID: this.props.match.params.supportupdateid,
            ZD_ID: this.state.zdid,
            ZD_Descr: this.state.zddescr,
            PriorityID: this.state.priority,
            CurrentStatusID: this.state.status,
            TimeSpent: this.state.timespent,
            DateWorked: this.state.dateworked,
            Staff_Name: this.state.staffname
        };
        axios.post('https://localhost:5001/api/supportupdate/addeditsupportupdate/', obj)
            .then(json => {
                if (json.data === 'Success') {
                    //console.log(json.data);
                    // alert("Data Save Successfully");
                    this.props.history.push('/supportupdatelist')
                }
                else {
                    // alert('Data not Saved');
                    // debugger;
                    this.props.history.push('/supportupdatelist')
                }
            });
    }
    render() {


        let statuslist = this.state.supportstatus.length > 0 && this.state.supportstatus.map(v => (
            <option value={v.StatusID} selected={v.StatusID === this.state.status}>{v.StatusDescr}</option>
        ));

        let prioritylist = this.state.supportpriority.length > 0 && this.state.supportpriority.map(v => (
            <option value={v.PriorityID} selected={v.PriorityID === this.state.priority}>{v.Priority}</option>
        ));

        return (
            <Container className="App">
                <h4 className="PageHeading">Update Support Update</h4>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup row>
                            <Label for="zdid" sm={2}>ZD_ID</Label>
                            <Col sm={10}>
                                <Input type="number" name="zdid" value={this.state.zdid} onChange={this.handleChange} placeholder="Enter ZD ID" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="zddescr" sm={2}>ZD Descr</Label>
                            <Col sm={10}>
                                <Input type="text" name="zddescr" value={this.state.zddescr} onChange={this.handleChange} placeholder="Enter ZD Descr" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="priority" sm={2}>Priority</Label>
                            <Col sm={10}>
                                <select name="priority" value={this.state.priority} onChange={this.handleChange}>
                                    <option id="0">Select</option>
                                    {prioritylist}
                                </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="priority" sm={2}>Status</Label>
                            <Col sm={10}>
                                <select name="status" value={this.state.status} onChange={this.handleChange}>
                                    <option id="0">Select</option>
                                    {statuslist}
                                </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="staffname" sm={2}>Staff</Label>
                            <Col sm={10}>
                                <select name="staffname" value={this.state.staffname}  onChange={this.handleChange} >
                                    <option value="">Select</option>
                                    <option value="VP">VP</option>
                                    <option value="TA">TA</option>
                                    <option value="FZ">FZ</option>
                                    <option value="CM">CM</option>
                                    <option value="TT">TT</option>
                                    <option value="KT">KT</option>
                                </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="timespent" sm={2}>Time Spent</Label>
                            <Col sm={10}>
                                <Input type="text" name="timespent" value={this.state.timespent} onChange={this.handleChange} placeholder="Enter Time Spent" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="dateworked" sm={2}>Date Worked</Label>
                            <Col sm={10}>
                                <Input type="date" name="dateworked" value={this.state.dateworked} onChange={this.handleChange} placeholder="Enter Date Worked" da/>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Col sm={5}>
                            </Col>
                            <Col sm={1}>
                                <Button type="submit" color="success">Submit</Button>{' '}
                            </Col>
                            <Col sm={1}>
                                <Button color="danger">Cancel</Button>{' '}
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

export default EditSupportUpdate;  