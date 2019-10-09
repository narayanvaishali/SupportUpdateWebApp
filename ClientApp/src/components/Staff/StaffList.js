import React from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiUrl = 'https://localhost:5001/api/staff/'

class StaffList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { staff: [] };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get(apiUrl + 'getstaffdetails?staffid=0')
            .then(response => {

                console.log(JSON.stringify(response.data));

                this.setState({ staff : response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    deleteStaff(staffid) {

        axios.delete(apiUrl + 'deletestaff?staffid=' + staffid).then(result => {

            if (result.data === 'Delete') {
                window.location.reload(false);
            }

            else {
                window.location.reload(false);
            }
        });
    }

    render() {
        const { error, staff } = this.state;

        if (error) {
            return (
                <div>Error:{error.message}</div>
            )
        }
        else {
            return (
                <div>
                    <h4 align="center">Support staff List</h4>
                    <Link to={"addstaff"} className="btn btn-success">Add Staff</Link>
                    <table className="table table-striped" style={{ marginTop: 5}}>
                        <thead>
                          <tr>
                                <th>Staff Name</th>
                                <th>Staff Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map(user => (
                                <tr key={user.staffName}>
                                    <td>{user.staffEmail}</td>
                                    <td>
                                        <Link to={"editstaff/" + user.staffID} className="btn btn-success">Edit</Link>
                                    </td>
                                    <td>
                                        <button variant="danger" onClick={() => this.deleteStaff(user.staffID)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default StaffList;