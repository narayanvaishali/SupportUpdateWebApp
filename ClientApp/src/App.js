import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import StatusList from './components/Status/StatusList';
import AddStatus from './components/Status/AddStatus';
import EditStatus from './components/Status/EditStatus';

import PriorityList from './components/Priority/PriorityList';
import AddPriority from './components/Priority/AddPriority';
import EditPriority from './components/Priority/EditPriority';

import AddSupportUpdate from './components/Supportupdate/AddSupportUpdate';
import SupportUpdateList from './components/Supportupdate/SupportUpdateList';
import EditSupportUpdate from './components/Supportupdate/EditSupportUpdate';  

import AddSupportStaff from './components/Staff/AddStaff';
import SupportStaffList from './components/Staff/StaffList';
import EditSupportStaff from './components/Staff/EditStaff';  


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/supportupdatelist' component={SupportUpdateList} />
            <Route exact path='/addsupportupdate' component={AddSupportUpdate} />
            <Route exact path='/editsupportupdate/:supportupdateid' component={EditSupportUpdate} />         
            <Route path='/statuslist' component={StatusList} />
            <Route path='/addstatus' component={AddStatus} />
            <Route exact path='/editstatus/:statusid' component={EditStatus} />        

            <Route path='/prioritylist' component={PriorityList} />
            <Route path='/addpriority' component={AddPriority} />
            <Route exact path='/editpriority/:priorityid' component={EditPriority} />  

            <Route path='/stafflist' component={SupportStaffList} />
            <Route path='/addstaff' component={AddSupportStaff} />
            <Route exact path='/editstaff/:staffid' component={EditSupportStaff} />  
      </Layout>
    );
  }
}
