import axios from 'axios';
import Cookies from 'js-cookie'
const API_URL = "https://sales-api-266411.appspot.com/api/event";
// const API_URL = "http://127.0.0.1:8000/api/event";

export default class EventService {

    constructor() {
        const csrftoken = Cookies.get('csrftoken');
        const headers = {
            headers: { "X-CSRFToken": csrftoken }
        }
    }


    getEvents() {
        const url = `${API_URL}/events/`;
        return axios.get(url).then(response => response.data);
    }

    getEvent(pk) {
        const url = `${API_URL}/events/${pk}`;
        return axios.get(url).then(response => response.data);
    }

    deleteEvent(pk) {
        const url = `${API_URL}/events/${pk}`;
        return axios.delete(url, this.headers);
    }

    createEvent(event) {
        const url = `${API_URL}/events/`;
        return axios.post(url, event, this.headers).then(response => response.data);
    }

    updateEvent(event) {
        const url = `${API_URL}/events/${event.pk}`;
        return axios.put(url, event, this.headers);
    }

    // Adding and deleting event Images
    getEventImages(event_pk) {
        const url = `${API_URL}/images/events/${event_pk}`;
        return axios.get(url).then(response => response.data);
    }

    createEventImages(event_pk, formData) {
        const url = `${API_URL}/images/events/${event_pk}`;
        var headerss = {
            headers: {
                'content-type': 'multipart/form-data',
                "X-CSRFToken": this.csrftoken,
            }
        };
        return axios.post(url, formData, headerss).then(response => response.data);
    }

    deleteEventImages(image) {
        const url = `${API_URL}/images/${image.id}`;
        return axios.delete(url, this.headers);
    }

    // Comments post and reply
    postComment(event_pk, comment) {
        const url = `${API_URL}/comment/${event_pk}`;
        return axios.post(url, comment, this.headers).then(response => response.data);
    }

    replyComment(comment_pk, reply) {
        const url = `${API_URL}/reply/comment/${comment_pk}`;
        return axios.post(url, reply, this.headers).then(response => response.data);
    }

    //Share Event
    shareEvent(event_pk, contact) {
        const url = `${API_URL}/share/event/${event_pk}`;
        return axios.post(url, contact, this.headers).then(response => response.data);
    }

}