import React from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiUrl = 'https://localhost:5001/api/status/'

class StatusList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { statuses: [] };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get(apiUrl + 'getstatusdetails?statusid=0')
            .then(response => {
                //console.log('response.data ' + JSON.stringify(response.data));
                this.setState({ statuses: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    deleteStatus(statusId) {
        const { statuses } = this.state;

        axios.delete(apiUrl + 'deletestatus?statusid=' + statusId).then(result => {

           // console.log('delete...' + JSON.stringify(result));
            //this.props.history.push('/statusList');

            if (result.data === 'Delete') {
                window.location.reload(false);
            }
            else {
                window.location.reload(false);
            }
        });
    }

    render() {
        const { error, statuses } = this.state;

        if (error) {
            return (
                <div>Error:{error.message}</div>
            )
        }
        else {
            return (
                <div>
                    <h4 align="center">Support status List</h4>
                    <Link to={"addstatus"} className="btn btn-success">Add Status</Link>
                    <table className="table table-striped" style={{ marginTop: 5}}>
                        <thead>
                          <tr>
                                <th>Status Descr</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statuses.map(user => (
                                <tr key={user.statusID}>
                                    <td>{user.statusDescr}</td>
                                    <td>
                                        <Link to={"editstatus/" + user.statusID} className="btn btn-success">Edit</Link>
                                    </td>
                                    <td>
                                        <button variant="danger" onClick={() => this.deleteStatus(user.statusID)} className="btn btn-danger">Delete</button>
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

export default StatusList;