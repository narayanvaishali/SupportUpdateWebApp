import React from 'react';
import axios from 'axios';
import '../supportupdate.css'
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';

const initialState = {
    priorityID: "",
    priority: "",
    priorityError: ""
};

class AddPriority extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.AddPriority = this.AddPriority.bind(this);
        this.Back = this.Back.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate = () => {
        let priorityError = "";

        if (!this.state.priority) {
            priorityError = "priority cannot be blank";
        }

        if (priorityError) {
            this.setState({ priorityError});
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
                PriorityID: 0,
                Priority: this.state.priority,
            }

            axios.post('https://localhost:5001/api/priority/addeditpriority/', Data)
                .then(json => {
                    if (json.data === 'Success') {
                        this.props.history.push('/priorityList')
                    }
                    else {
                        this.props.history.push('/priorityList')
                    }
                })
            // clear form
            this.setState(initialState);
        }
    };

    AddPriority = () => {

        const Data = {
            PriorityID: 0,
            Priority: this.state.priority,
        }
        
        axios.post('https://localhost:5001/api/priority/addeditpriority/', Data)
            .then(json => {
                if (json.data === 'Success') {
                    this.props.history.push('/priorityList')
                }
                else {
                    this.props.history.push('/priorityList')
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

        return (
            <Container className="App">
                <h2>Add Priority</h2>
                <Form className="form" onSubmit={this.handleSubmit}>
                    <Col>
                        <FormGroup row>
                            <Label for="priority" sm={2}>Priority</Label>
                            <Col sm={10}>
                                <Input type="text" name="priority" onChange={this.handleChange} placeholder="Enter Priority"/>
                            </Col> 
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <Label style={{ fontSize: 12, color: "red" }}> {this.state.priorityError}</Label>
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

export default AddPriority; 