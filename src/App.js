import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from './components/layout/Navbar';
import DashBoard from './components/dashboard/Dashboard';
import CreateEvent from './components/events/CreateEvent';
import EventDetail from './components/events/EventDetail';
import Home from './components/layout/Home';
import AttendingEvents from './components/events/AttendingEvents';
import LogIn from './components/auth/LogIn';
import Logout from './components/auth/Logout';
import UserEvents from './components/events/UserEvents';
import EventEdit from './components/events/EventEdit';

import './css/Base.css';
import NavbarWithDrawer from './components/layout/NavbarWithDrawer/NavbarWithDrawer';

class App extends Component {
    render() {
        const { auth } = this.props;
        console.log(this.props);

        if (!auth.uid) {
            return <LogIn />;
        }
        return (
            <BrowserRouter>
                <div className="App">
                    {/* <NavBar /> */}
                    <Switch>
                        <Route exact path="/dashboard" component={DashBoard} />
                        <Route exact path="/create-event" component={CreateEvent} />
                        <Route path="/event/edit/:id" component={EventEdit} />
                        <Route exact path="/event/:id" component={EventDetail} />
                        <Route path="/attending" component={AttendingEvents} />
                        <Route path="/my-events" component={UserEvents} />
                        <Route path="/log-out" component={Logout} />
                        {/* <Route exact path="/sign-in" component={LogIn} /> */}
                        <Route path="/" component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);

    return {
        auth: state.firebase.auth
    };
};

export default connect(mapStateToProps)(App);
