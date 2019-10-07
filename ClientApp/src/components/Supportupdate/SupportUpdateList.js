import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';
import { Link } from 'react-router-dom';

export default class SupportUpdateList extends Component {

    apiUrl = 'http://localhost:5001/api/supportupdate';  
     constructor(props) {
        super(props);
         this.state = {
             supportupdate: [],
             supportstatus: [],
             supportpriority: []
         };
    }
    componentDidMount() {
        this.getData();

    }

    getData() {

        axios.get('https://localhost:5001/api/supportupdate/supportupdatedetails?supportupdateid=0')
            .then(response => {
               // console.log('response.data ' + JSON.stringify(response.data));

                this.setState(
                    {
                        supportupdate: response.data.supportupdate,
                        supportstatus: response.data.supportstatus,
                        supportpriority: response.data.supportpriority
                    }
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    tabRow() {
        return this.state.supportupdate.map(function (object, i) {
            return <Table obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h4 align="center">Support Update List</h4>
                <Link to={"addsupportupdate"} className="btn btn-success">Add Support Update</Link>
                <table className="table table-striped" style={{ marginTop: 10 }}>
                    <thead>
                        <tr>
                            <th>ZD_ID</th>
                            <th>ZD Descr</th>
                            <th>Priority</th>
                            <th>Current Status</th>
                            <th>Time Spent</th>
                            <th>Date Worked</th>
                            <th>Staff Name</th>
                            <th>Staff Email</th>
                            <th colSpan="4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}  