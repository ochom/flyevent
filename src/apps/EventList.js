import React, { Component, Fragment } from 'react';
import { Card, CardImg, CardBody, CardFooter } from 'reactstrap';
import { FaCommentAlt, FaShareAlt, FaUserFriends, FaMapMarkerAlt } from "react-icons/fa";
import { Reveal } from 'react-reveal';
import { Error, Loading } from './commons';

import EventService from './EventService';
import { Link } from 'react-router-dom';

import photo_thumbnail from './photo_thumbnail.png'

const eventService = new EventService();

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            events: []
        };
    }

    componentDidMount() {
        var self = this;
        eventService.getEvents().then((result) => {
            self.setState({ events: result, isLoaded: true })
        }).catch((err) => {
            self.setState({ isLoaded: true, error: err });
            console.log(err);
        })
    }

    render() {
        const { error, isLoaded, events } = this.state;
        if (!isLoaded) {
            return (<Loading />)
        } else if (error) {
            return (<Error error_message={error.message} />)
        } else {
            return (
                <div className="page-cover row justify-content-center">
                    <div className="content-body col-md-8 col-lg-6">
                        {/* <div
                            className="page-info row justify-content-center text-light" style={{ backgroundImage: this.main_bg, }}>
                            <h2 className="page-title   col-12"><strong>Fly</strong><b>Events</b></h2>
                            <Link className="btn btn-warning" to={"/events/create/"} style={{ textDecoration: 'none', color: "#fff" }} >Create event</Link>
                        </div> */}
                        <Fragment>
                            {
                                events.map(case_event =>
                                    <Link key={case_event.event.id} className="event-list-item" to={"/event/" + case_event.event.id} >
                                        <Reveal effect="fadeInUp">
                                            <Card className="m-2">
                                                <CardImg top
                                                    style={{
                                                        border: "0px solid #fff",
                                                        height: "200px", backgroundImage: { photo_thumbnail },
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}
                                                    src={case_event.image.image_url} alt="" />
                                                <CardBody className="card-body mt-0 p-2">
                                                    <span className="card-title">{case_event.event.name}</span ><br />
                                                    <FaMapMarkerAlt /> {case_event.event.location}
                                                </CardBody>
                                                <CardFooter className="card-footer bg-transparent">
                                                    <div className="row col-12 text-secondary">
                                                        <div className="col-4 text-center"><FaCommentAlt /> {case_event.event.comments}</div>
                                                        <div className="col-4 text-center"><FaUserFriends /> {case_event.event.attendees}</div>
                                                        <div className="col-4 text-center"><FaShareAlt /> {case_event.event.shares}</div>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </Reveal>
                                    </Link>
                                )
                            }
                        </Fragment>
                    </div >
                </div >
            );
        }
    }
}

export default EventList;