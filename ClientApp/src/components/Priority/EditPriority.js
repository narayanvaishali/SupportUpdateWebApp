import React from 'react';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios'
import '../supportupdate.css';

class EditPriority extends React.Component {
    constructor(props) {
        super(props)

        console.log(props);
        //console.log(this.props.match.params.supportupdateid);

        this.state = {
            priorityid: '',
            priority: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }

    componentDidMount() {

//        console.log('componentDidMount');

        axios.get('https://localhost:5001/api/priority/getprioritydetails?statusid=' + this.props.match.params.priorityid)
            .then(response => {
                console.log(JSON.stringify(response.data));

                this.setState({
                    priorityid: response.data[0].priorityID,
                    priority: response.data[0].priority
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
            PriorityID: this.props.match.params.priorityid,
            Priority: this.state.priority,
        };
        axios.post('https://localhost:5001/api/priority/addeditpriority/', obj)
            .then(json => {
                if (json.data === 'Success') {
                    //console.log(json.data);
                    // alert("Data Save Successfully");
                    this.props.history.push('/prioritylist')
                }
                else {
                    // alert('Data not Saved');
                    // debugger;
                    this.props.history.push('/prioritylist')
                }
            })}

    render() {
        return (
            <Container className="App">
                <h4 className="PageHeading">Update Priority Status</h4>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup row>
                            <Label for="priority" sm={2}>Priority</Label>
                            <Col sm={10}>
                                <Input type="text" name="priority" value={this.state.priority} onChange={this.handleChange} placeholder="Enter Priority" />
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

export default EditPriority;  