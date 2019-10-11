import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Table extends Component {
    constructor(props) {
        super(props);

       // console.log(this.props);
    }

    DeleteSupportUpdate = () => {
        //console.log(this.props.history);
        debugger;

        axios.delete('https://localhost:5001/api/supportupdate/deletesupportupdate?supportupdateid=' + this.props.obj.SupportUpdateID)
            .then(res => console.log(res.data));
             window.location.reload(false);
    }
    render() {

        return (
            <tr>
                <td>
                    {this.props.obj.ZD_ID}
                </td>
                <td>
                    {this.props.obj.ClientName}
                </td>
                <td>
                    {this.props.obj.ZD_Descr}
                </td>
                <td>
                    {this.props.obj.Priority}
                </td>
                <td>
                    {this.props.obj.StatusDescr}
                </td>
                <td>
                    {this.props.obj.TimeSpent}
                </td>
                <td>
                    {this.props.obj.DateWorked}
                </td>
                <td>
                    {this.props.obj.StaffName}
                </td>
                <td>
                    {this.props.obj.Staffemail}
                </td>
                <td>
                    &nbsp;
                </td>
                <td>
                    <Link to={"/editsupportupdate/" + this.props.obj.SupportUpdateID} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={this.DeleteSupportUpdate} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default Table;  