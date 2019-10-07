import React from 'react';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios'
import '../supportupdate.css';

class EditStatus extends React.Component {
    constructor(props) {
        super(props)

        console.log(props);
        //console.log(this.props.match.params.supportupdateid);

        this.state = {
            statusid: '',
            statusdescr: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }

    componentDidMount() {

        axios.get('https://localhost:5001/api/status/getstatusdetails?statusid=' + this.props.match.params.statusid)
            .then(response => {
                this.setState({
                    sstatusid: response.data[0].statusID,
                    statusdescr: response.data[0].statusDescr
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
            StatusID: this.props.match.params.statusid,
            StatusDescr: this.state.statusdescr,
        };
        axios.post('https://localhost:5001/api/status/addeditstatus/', obj)
            .then(json => {
                if (json.data === 'Success') {
                    //console.log(json.data);
                    // alert("Data Save Successfully");
                    this.props.history.push('/statusList')
                }
                else {
                    // alert('Data not Saved');
                    // debugger;
                    this.props.history.push('/statusList')
                }
            })}

    render() {
        return (
            <Container className="App">
                <h4 className="PageHeading">Update Suport Status</h4>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup row>
                            <Label for="statusdescr" sm={2}>Status</Label>
                            <Col sm={10}>
                                <Input type="text" name="statusdescr" value={this.state.statusdescr} onChange={this.handleChange} placeholder="Enter Status Descr" />
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
                                <Button type="submit" color="danger">Cancel</Button>{' '}
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

export default EditStatus;  