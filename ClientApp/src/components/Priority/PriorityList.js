import React from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiUrl = 'https://localhost:5001/api/priority/'

class PriorityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { statuses: [] };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get(apiUrl + 'getprioritydetails?statusid=0')
            .then(response => {
                this.setState({ statuses: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    deletePriority(priorityid) {
        const { statuses } = this.state;
        axios.delete(apiUrl + 'deletepriority?priorityid=' + priorityid).then(result => {

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
                    <h4 align="center">Support priority List</h4>
                    <Link to={"addpriority"} className="btn btn-success">Add Priority</Link>
                    <table className="table table-striped" style={{ marginTop: 5}}>
                        <thead>
                          <tr>
                                <th>Priority</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statuses.map(user => (
                                <tr key={user.priorityID}>
                                    <td>{user.priority}</td>
                                    <td>
                                        <Link to={"editpriority/" + user.priorityID} className="btn btn-success">Edit</Link>
                                    </td>
                                    <td>
                                        <button variant="danger" onClick={() => this.deletePriority(user.priorityID)} className="btn btn-danger">Delete</button>
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

export default PriorityList;