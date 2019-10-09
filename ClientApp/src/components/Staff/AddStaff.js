import React from 'react';
import axios from 'axios';
import '../supportupdate.css'
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';

const initialState = {
    staffid: "",
    staffname: "",
    staffemail: "",
    staffNameError: "",
    staffEmailError: ""
};

class AddStaff extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.AddStaff = this.AddStaff.bind(this);
        this.Back = this.Back.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate = () => {
        let staffNameError = "", staffEmailError = "";

       // console.log('here ' + this.state.staffname + ' ' + this.state.staffemail);


        if (!this.state.staffname) {
            staffNameError = "Staff Name cannot be blank";
        }

        if (!this.state.staffemail) {
            staffEmailError = "Staff Email cannot be blank";
        }

        if (staffNameError || staffEmailError) {
            this.setState({ staffNameError, staffEmailError});
            return false;
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
          //  console.log(this.state);

            const Data = {
                StaffID: 0,
                StaffName: this.state.staffname,
                StaffEmail: this.state.staffemail
            }

            axios.post('https://localhost:5001/api/staff/addeditstaff/', Data)
                .then(json => {
                    if (json.data === 'Success') {
                        this.props.history.push('/StaffList')
                    }
                    else {
                        this.props.history.push('/StaffList')
                    }
                })
            // clear form
            this.setState(initialState);
        }
    };

    AddStaff = () => {

        const Data = {
            StaffID: 0,
            StaffName: this.state.staffname,
            StaffEmail: this.state.staffemail
        }
        
        axios.post('https://localhost:5001/api/Staff/addeditstaff/', Data)
            .then(json => {
                if (json.data === 'Success') {
                    this.props.history.push('/StaffList')
                }
                else {
                    this.props.history.push('/StaffList')
                }
            })
    }
    Back = () => {
        this.props.history.push('/StaffList')
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    render() {

        return (
            <Container className="App">
                <h2>Add Staff</h2>
                <Form className="form" onSubmit={this.handleSubmit}>
                    <Col>
                        <FormGroup row>
                            <Label for="staffname" sm={2}>Staff</Label>
                            <Col sm={10}>
                                <Input type="text" name="staffname" onChange={this.handleChange} placeholder="Enter Staff Name"/>
                            </Col> 
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.staffNameError}</Label>
                            </Col> 
                        </FormGroup>
                        <FormGroup row>
                            <Label for="staffemail" sm={2}>Staff</Label>
                            <Col sm={10}>
                                <Input type="email" name="staffemail" onChange={this.handleChange} placeholder="Enter Staff Email" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.staffEmailError}</Label>
                            </Col>
                        </FormGroup>
                    </Col>
                    
                    <br/><br/>
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

export default AddStaff; 