import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardImg, CardTitle, CardBody, Row, Col } from 'reactstrap';
import { Carousel } from 'react-bootstrap';
import classnames from 'classnames';
import { FaUserFriends, FaRegComment, FaShareSquare, FaMapMarkerAlt, FaCalendar, FaPencilAlt } from "react-icons/fa";

import EventService from './EventService';
import { Error, Loading } from './commons';
import { Link } from 'react-router-dom';

import photo_thumbnail from './photo_thumbnail.png'

const eventService = new EventService();

class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            case_event: null,
            isSending: false,
        }
        this.postComment = this.postComment.bind(this)
        this.replyComment = this.replyComment.bind(this)
        this.shareEvent = this.shareEvent.bind(this)
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    componentDidMount() {
        const self = this;
        const { match: { params } } = this.props;
        eventService.getEvent(params.pk).then((result) => {
            self.setState({ case_event: result.event, isLoaded: true });
        }).catch((error) => {
            self.setState({ isLoaded: true, error: error });
        })
    }

    postComment = (e) => {
        e.preventDefault();
        var comment_text = this.refs.Comment.value
        if (comment_text === "") {
            return;
        }
        this.setState({ isSending: true })
        const { match: { params } } = this.props;
        eventService.postComment(params.pk, { "body": comment_text }).then((result) => {
            this.setState({ case_event: result.event, isSending: false });
            this.refs.Comment.value = "";
        }).catch((error) => {
            this.setState({ isSending: false, error: error });
        });
    }



    replyComment = (e, comment_id) => {
        var text = e.target.value;
        if (text === "") {
            return;
        }
        this.setState({ isSending: true })
        if (e.keyCode === 13) {
            eventService.replyComment(comment_id, { "body": text }).then((result) => {
                this.setState({ case_event: result.event, isSending: false });
            }).catch((error) => {
                this.setState({ isSending: false, error: error });
            });
            e.target.value = "";
        }
    }

    shareEvent = (e) => {
        e.preventDefault();
        var contact = this.refs.Contact.value
        if (contact === "") {
            return;
        }
        this.setState({ isSending: true })
        const { match: { params } } = this.props;
        eventService.shareEvent(params.pk, { "contact": contact }).then((result) => {
            this.setState({ case_event: result.event, isSending: false });
            this.refs.Contact.value = "";
        }).catch((error) => {
            this.setState({ isSending: false, error: error });
        });
    }

    render() {
        const { error, isLoaded, case_event, activeTab } = this.state;

        // Map all images and design GUI
        const images_map = case_event && case_event.event_images.map(image => {
            return (
                < Carousel.Item key={image.id}>
                    <CardImg top
                        style={{
                            border: "0px",
                            height: "300px", backgroundImage: {photo_thumbnail},
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }} src={image.image_url} />
                </Carousel.Item>
            )
        })
        //  Map all comments and design GUI
        const comment_maps = case_event && case_event.event_comments.map(comment => {
            return (
                <div key={comment.id} className="card p-2 comments-list mt-3 col-12">
                    < div className="Comment-body" >
                        <div><b className="text-primary">{comment.author}</b></div>
                        <span>
                            {comment.body}
                        </span>
                    </div >
                    {comment.comment_replies.map(reply => {
                        return (
                            <div key={reply.id} className="reply-body"><b className="text-primary">{reply.author}</b><br />{reply.body}</div>
                        )
                    })}
                    <div className="reply-body">
                        <input type="text" onKeyDown={(e) => { this.replyComment(e, comment.id) }} className="form-control form-control-sm" placeholder="Leave a reply ..." />
                    </div>
                </div >
            )
        });

        const { onClickTabItem } = this;
        if (!isLoaded) {
            return (<Loading />)
        } else if (error) {
            return (<Error error_message={error.message} />)
        } else {
            return (
                <div className="page-cover row justify-content-center">
                    <div className="content-body col-md-8 col-lg-6">
                        <Card key={case_event.id}
                            style={{
                                minHeight: "100vh",
                            }}>
                            <CardTitle>
                                <Carousel
                                    style={{
                                        border: "0px",
                                        height: "300px", backgroundImage: {photo_thumbnail},
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }} >{images_map}
                                </Carousel>
                            </CardTitle>
                            <CardBody className="card-body mt-0 p-2">
                                <span className="card-title text-success">{case_event.name}</span><br />
                                <span className="text-secondary"
                                    style={{
                                        fontSize: "15px", padding: "10px 0 0 0", marginTop: "10px",
                                    }}>
                                    <FaMapMarkerAlt size={14} /> {case_event.location}
                                </span>
                                <p className="card-subtitle my-2"><i>{case_event.description}</i></p>
                                <span className="text-secondary"
                                    style={{
                                        fontSize: "15px", padding: "10px 0 0 0", marginTop: "10px",
                                    }}>
                                    <FaCalendar size={14} /> <span className="text-success"> {case_event.date} </span>  from <span className="text-success">{case_event.start_time}</span>   to  <span className="text-success">{case_event.end_time}</span> <br />
                                    <FaUserFriends size={14} /> <span className="text-success"> {case_event.attendees}  </span>People attending <br />
                                    <Link to={"/events/update/" + case_event.id}  ><FaPencilAlt /> Edit Event</Link>
                                </span>
                                <Nav tabs className="row p-0 mt-2">
                                    <NavItem className="col-4 text-center">
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => { onClickTabItem('1'); }}
                                        >
                                            <FaRegComment /> {case_event.comments}
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="col-4 text-center">
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' })}
                                            onClick={() => { onClickTabItem('2'); }}
                                        >
                                            <FaUserFriends /> {case_event.attendees}
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="col-4 text-center">
                                        <NavLink
                                            className={classnames({ active: activeTab === '3' })}
                                            onClick={() => { onClickTabItem('3'); }}
                                        >
                                            <FaShareSquare /> {case_event.shares}
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col sm="12">
                                                {comment_maps}
                                                {/* Constant textarea for creating a comment */}
                                                <div className="m-3">
                                                    <form onSubmit={this.postComment}>
                                                        <textarea type="text" ref="Comment" className="form-control form-control-sm" placeholder="Comment or ask a question and we will get back to you here." ></textarea>
                                                        <button className="btn btn-sm btn-primary mt-1">Post</button>
                                                    </form>
                                                </div>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col sm="12">
                                                <Card body className="col-12 content-justify-center mt-3 p-1">
                                                    <b>Ochom</b>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Row>
                                            <Col sm="12 mt-3 px-5">
                                                <form onSubmit={this.shareEvent}>
                                                    <input type="text" className="form-control p-3 mt-3" placeholder="Phone number or Email" ref="Contact" />
                                                    <button className="mt-3 btn btn-sm  btn-primary"><FaShareSquare /> Share</button>
                                                </form>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </div >
                </div >
            );
        }
    }
}

export default EventDetails;