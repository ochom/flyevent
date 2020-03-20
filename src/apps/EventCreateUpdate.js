import React, { Component, Fragment } from 'react';
import { Card, CardBody, CardFooter } from 'reactstrap';
import { Error, Loading } from './commons';

import EventService from './EventService';
import EventImages from './EventImages';

const eventService = new EventService();

class CreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            is_new_event: true,
            current_event: null,
            images: [],
            file: null,
            PK: null,
            Name: '',
            Description: '',
            Location: '',
            Date: '',
            StartTime: '',
            EndTime: '',
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        const self = this;
        const { match: { params } } = this.props;
        if (params && params.pk) {
            eventService.getEvent(params.pk).then((response) => {
                const event = response.event;
                self.setState({
                    isLoaded: true,
                    is_new_event: false,
                    current_event: event,
                    images: event.event_images,
                    PK: event.id,
                    Name: event.name,
                    Description: event.description,
                    Location: event.location,
                    Date: event.date,
                    StartTime: event.start_time,
                    EndTime: event.end_time
                });
            }).catch((error) => {
                self.setState({ error: error })
            })
        } else {
            self.setState({ isLoaded: true })
        }
    }

    createEvent() {
        const { Name, Description, Location, Date, StartTime, EndTime } = this.state
        eventService.createEvent(
            {
                "name": Name,
                "description": Description,
                "location": Location,
                "date": Date,
                "start_time": StartTime,
                "end_time": EndTime
            }
        ).then((result) => {
            this.setState({ isLoaded: true, is_new_event: false, PK: result.event.id });
        }).catch((error) => {
            this.setState({ isLoaded: true, error: error });
        });
    }

    updateEvent() {
        const { PK, Name, Description, Location, Date, StartTime, EndTime } = this.state
        eventService.updateEvent(
            {
                "pk": PK,
                "name": Name,
                "description": Description,
                "location": Location,
                "date": Date,
                "start_time": StartTime,
                "end_time": EndTime
            }
        ).then(() => {
            window.location = "/event/" + PK;
            this.setState({ isLoaded: true });
        }).catch((error) => {
            this.setState({ isLoaded: true, error: error });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isLoaded: false });
        if (this.state.PK !== null) {
            this.updateEvent();
        } else {
            this.createEvent();
        }
    }

    render() {
        let { error, isLoaded, is_new_event } = this.state;
        let image_div;
        if (!is_new_event) {
            image_div = <EventImages pk={this.state.PK} images={this.state.images} />
        } else {
            image_div = <div className="col-12 text-primary text-center"><b>Create event and add photos</b></div>
        }
        if (!isLoaded) {
            return (<Loading />)
        } else if (error) {
            return (<Error error_message={error.message} />)
        } else {
            return (
                <div className="page-cover row justify-content-center">
                    <div className="content-body col-md-8 col-lg-6  justify-content-center bg-light">
                        <Card className="my-5 col-11 p-0 mx-auto">
                            <Fragment>
                                {/* Event images create remove */}
                                {image_div}
                                {/* Event details update */}
                                <form onSubmit={this.handleSubmit}>
                                    <CardBody className="p-3">
                                        <div className="form-row">
                                            <div className="form-group col-12">
                                                <label>Event Title:</label>
                                                <input className="form-control" type="text" required={true}
                                                    name='Name' onChange={this.handleInputChange} value={this.state.Name} />
                                            </div>
                                            <div className="form-group col-12">
                                                <label>Description:</label>
                                                <textarea
                                                    style={{
                                                        height: "150px"
                                                    }}
                                                    className="form-control" type="text" required={true}
                                                    name='Description' onChange={this.handleInputChange} value={this.state.Description} >{this.state.description}</textarea>
                                            </div>
                                            <div className="form-group col-12">
                                                <label>Venue/Location:</label>
                                                <input className="form-control" type="text" required={true}
                                                    name='Location' onChange={this.handleInputChange} value={this.state.Location} />
                                            </div>
                                            <div className="form-group col-12">
                                                <label>Date:</label>
                                                <input className="form-control" type="date" required={true}
                                                    name='Date' onChange={this.handleInputChange} value={this.state.Date} />
                                            </div>
                                            <div className="form-group col-12  col-md-6">
                                                <label> Start Time:</label>
                                                <input className="form-control" type="time" required={true}
                                                    name='StartTime' onChange={this.handleInputChange} value={this.state.StartTime} />
                                            </div>
                                            <div className="form-group col-12  col-md-6">
                                                <label>End Time:</label>
                                                <input className="form-control" type="time" required={true}
                                                    name='EndTime' onChange={this.handleInputChange} value={this.state.EndTime} />
                                            </div>
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        <input className="btn btn-primary" type="submit" value="Save" />
                                    </CardFooter>
                                </form>
                            </Fragment>
                        </Card>
                    </div>
                </div >
            );
        }
    }
}

export default CreateUpdate;