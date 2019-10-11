/// <reference path="../registerserviceworker.js" />
import React, { Component } from 'react';
import axios from 'axios';
//import { renderEmail } from 'react-html-email';
//import BasicEmail from '../BasicEmail';
//import * as emailjs from 'emailjs-com';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';

const apiUrl = 'https://localhost:5001/api/supportupdate/'

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            staff: [],
            dateworked : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
       // console.log(apiUrl + 'supportupdatesummary?staffid=2&dateworked=null');

        axios.get(apiUrl + 'supportupdatesummary?staffid=2&dateworked=null')
            .then(response => {

               // console.log(JSON.stringify(response.data.supportupdatesummary));
                this.setState({ staff: response.data.supportupdatesummary });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSubmit(dateworked) {

        console.log(dateworked);

        const Data = {
            DateWorked: dateworked, //this.state.dateworked,
            StaffID: 2//this.state.staffid
        }

        axios.post('https://localhost:5001/api/supportupdate/sendsummaryemail/', Data)
            .then(json => {
                if (json.data === 'Success') {
                    //  this.props.history.push('/')
                    window.location.reload(false);
                }
                else {
                    this.props.history.push('/')
                }
            });
    }

  /*  handleSubmit = event => {
        event.preventDefault();

        const Data = {
            DateWorked: '', //this.state.dateworked,
            StaffID: 2//this.state.staffid
        }

        axios.post('https://localhost:5001/api/supportupdate/sendsummaryemail/', Data)
            .then(json => {
                if (json.data === 'Success') {
                  //  this.props.history.push('/')
                    window.location.reload(false);
                }
                else {
                    this.props.history.push('/')
                }
            }) 
    }*/

    render() {

        const { staff } = this.state;

       // const messageHtml = renderEmail(<BasicEmail name='Thang' />);
        /*var template_params = {
            "reply_to": "reply_to_value",
            "from_name": "from_name_value",
            "to_name": "to_name_value",
            "message_html": "message_html_value"
        }

        var service_id = "default_service";
        var template_id = "template_NAlEKdqV";
        emailjs.send(service_id, template_id, template_params);
        */

        /*var template_params = {
            "reply_to": 'vaishali.pardesi@giantgroup.com',
            "from": 'thang (tt@giantgroup.com)',
            "dateworked": '09/10/2019',
            "subject": 'support date summary',
            "to": 'vaishali.pardesi@giantgroup.com',
            "message_html": '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Basic Email</title></head><body style="width:100%;margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%"><table width="100%" height="100%" cellPadding="0" cellSpacing="0" border="0" align="left" valign="top"><tbody><tr><td align="center" valign="top"><table width="600" align="center" cellPadding="0" cellSpacing="0" border="0" valign="top"><tbody><tr><td><div>Hello </div></td></tr></tbody></table></td></tr></tbody></table></body></html>'
        }

        var service_id = "default_service";
        var template_id = "supportupdatetemplate";*/
       // console.log(this.state.staff.length);


        return (
           // messageHtml         
           
               <Container className="App">
                <Form className="form">
                    <Col>
                        {staff.map(s => (
                            <FormGroup row>
                                <Col>{s.DateWorked} </Col>
                                <Col sm={10}>
                                    <button type="submit" className="btn btn-success" hidden={this.state.staff.length === 0} onClick={() => this.handleSubmit(s.DateWorked)}>Send Email</button>
                                </Col>
                            </FormGroup>
                            ))
                        }
                    </Col>
                </Form>
            </Container>
    );
  }
}
