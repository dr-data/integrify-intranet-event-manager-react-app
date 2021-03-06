import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createEvent, resetEvent } from '../../store/actions/eventActions';

import '../../css/CreateEvent.css';
import NavbarWithDrawer from '../layout/NavbarWithDrawer/NavbarWithDrawer';

class CreateEvent extends Component {
    state = {
        name: '',
        description: '',
        type: 'Other',
        location: '',
        date: new Date(),
        time: {},
        moreInfo: ''
    };

    handleDate = date => {
        this.setState(
            {
                date
            },
            () => {
                console.log(this.state);
            }
        );
    };

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { date } = this.state;
        const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        console.log(`${day} ${months[month]}`, `${hour}:${minute}`);

        this.setState(
            {
                time: { day: `${day} ${months[month]}`, hourBegin: `${hour}:${minute}` }
            },
            () => {
                console.log('the event created with the following data:');
                console.log(this.state);
                this.props.createEvent(this.state);
            }
        );

        // this.props.history.push('/');
    };

    render() {
        const { eventName, eventDescription, eventType, eventLocation, date } = this.state;

        if (this.props.event.id) {
            // redirect after they add event
            // console.log(this.props.event);
            this.props.resetEvent();
            return <Redirect to={`/event/${this.props.event.id}`} />;
        }
        return (
            <>
                <NavbarWithDrawer pageName="Create Event" />
                <main>
                    <div className="CreateEvent">
                        <div className="CreateEvent-Form">
                            <form className="FormFields">
                                <div className="FormField">
                                    <label className="FormField-Label" htmlFor="eventName">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="eventName"
                                        value={eventName}
                                        className="FormField-Input"
                                        placeholder="Name of your event"
                                        name="name"
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="FormField">
                                    <label className="FormField-Label" htmlFor="eventDescription">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        id="eventDescription"
                                        value={eventDescription}
                                        className="FormField-Input"
                                        placeholder="What are you organising?"
                                        name="description"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="FormField">
                                    <label className="FormField-Label" htmlFor="eventType">
                                        Type of Event
                                    </label>
                                    <select
                                        className="FormField-Select"
                                        value={eventType}
                                        name="type"
                                        onChange={this.handleChange}
                                        required
                                    >
                                        <option value={this.state.type}>-- Select your Event --</option>
                                        <option value="Sport">Sport</option>
                                        <option value="Meetup">Meetup</option>
                                        <option value="Party">Party</option>
                                        <option value="Presentation">Presentation</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="FormField">
                                    <label className="FormField-Label" htmlFor="eventLocation">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="eventLocation"
                                        value={eventLocation}
                                        className="FormField-Input"
                                        placeholder="Place, room, or address"
                                        name="location"
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="FormField">
                                    <label className="FormField-Label" htmlFor="eventDate">
                                        Date
                                    </label>
                                    <DateTimePicker
                                        disableClock
                                        clearIcon={null}
                                        format="dd-MM-y HH:mm"
                                        type="date"
                                        className="FormField-Calendar"
                                        name="date"
                                        id="eventDate"
                                        onChange={this.handleDate}
                                        value={date}
                                    />
                                </div>

                                <div className="FormField">
                                    <label className="FormField-Label" htmlFor="eventExtra">
                                        Extra
                                    </label>
                                    <textarea
                                        className="FormField-Text-Area"
                                        cols="25"
                                        rows="4"
                                        placeholder="Extra Information"
                                    />
                                </div>

                                <div className="FormField">
                                    <button type="submit" className="FormField-Button" onClick={this.handleSubmit}>
                                        Create Event
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);

    return {
        event: state.event
    };
};

const mapDispatchToProps = dispatch => ({
    createEvent: event => dispatch(createEvent(event)),
    resetEvent: () => dispatch(resetEvent())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateEvent);
