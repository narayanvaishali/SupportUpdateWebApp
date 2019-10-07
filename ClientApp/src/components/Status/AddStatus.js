import React from 'react';
import axios from 'axios';
import '../supportupdate.css'
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';

const initialState = {
    statusID: "",
    statusDescr: "",
    statusError: ""
};

class AddStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.AddStatus = this.AddStatus.bind(this);
        this.Back = this.Back.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate = () => {
        let statusError = "";

        if (!this.state.statusDescr) {
            statusError = "status descr cannot be blank";
        }

        if (statusError) {
            this.setState({ statusError });
            return false;
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();

        if (isValid) {
            console.log(this.state);

            const Data = {
                StatusID: 0,
                StatusDescr: this.state.statusDescr,
            }
            axios.post('https://localhost:5001/api/status/addeditstatus/', Data)
                .then(json => {
                    if (json.data === 'Success') {
                        this.props.history.push('/statusList')
                    }
                    else {
                        this.props.history.push('/statusList')
                    }
                })
            // clear form
            this.setState(initialState);
        }
    };

    AddStatus = () => {
        const Data = {
            StatusID: 0,
            StatusDescr: this.state.statusdescr,
        }
   
        axios.post('https://localhost:5001/api/status/addeditstatus/', Data)
            .then(json => {
                if (json.data === 'Success') {
                     this.props.history.push('/statusList')
                }
                else {
                    this.props.history.push('/statusList')
                }
            })
    }
    Back = () => {
        this.props.history.push('/statusList')
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
                <h2>Add Status</h2>
                <Form className="form" onSubmit={this.handleSubmit}>
                    <Col>
                        <FormGroup row>
                            <Label for="statusDescr" sm={2}>Status Descr</Label>
                            <Col sm={10}>
                                <Input type="text" name="statusDescr"  onChange={this.handleChange} placeholder="Enter Status Descr" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.statusError}</Label>
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

export default AddStatus; 