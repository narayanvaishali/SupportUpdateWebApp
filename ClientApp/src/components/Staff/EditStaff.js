import React from 'react';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios'
import '../supportupdate.css';

class Editstaff extends React.Component {
    constructor(props) {
        super(props)

        console.log(props);
        //console.log(this.props.match.params.supportupdateid);

        this.state = {
            staffid: '',
            staffname: '',
            staffemail: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }

    componentDidMount() {

//        console.log('componentDidMount');

        axios.get('https://localhost:5001/api/staff/getstaffdetails?staffid=' + this.props.match.params.staffid)
            .then(response => {
                console.log(JSON.stringify(response.data));

                this.setState({
                    staffid: response.data[0].staffID,
                    staffname: response.data[0].staffName,
                    staffemail: response.data[0].staffEmail
                });

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

       // console.log('name ' + name);
      //  console.log('value ' + value);

        this.setState({
            [name]: value
        })
    }  

    onSubmit(e) {
        debugger;
        e.preventDefault();
        const obj = {
            staffID: this.props.match.params.staffid,
            staffname: this.state.staffname,
            staffemail: this.state.staffemail
        };
        axios.post('https://localhost:5001/api/staff/addeditstaff/', obj)
            .then(json => {
                if (json.data === 'Success') {
                    //console.log(json.data);
                    // alert("Data Save Successfully");
                    this.props.history.push('/stafflist')
                }
                else {
                    // alert('Data not Saved');
                    // debugger;
                    this.props.history.push('/stafflist')
                }
            })}

    render() {
        return (
            <Container className="App">
                <h4 className="PageHeading">Update Staff</h4>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup row>
                            <Label for="staffname" sm={2}>Staff Name</Label>
                            <Col sm={10}>
                                <Input type="text" name="staff" value={this.state.staffname} onChange={this.handleChange} placeholder="Enter staff name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="staffemail" sm={2}>Staff</Label>
                            <Col sm={10}>
                                <Input type="email" name="staffemail" value={this.state.staffemail} onChange={this.handleChange} placeholder="Enter Staff Email" />
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

export default Editstaff;  