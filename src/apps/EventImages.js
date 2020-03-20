import React, { Component } from 'react';
import { CardBody, Row, Button } from 'reactstrap';
import EventService from './EventService';
import { FaTrashAlt } from 'react-icons/fa';
import photo_thumbnail from './photo_thumbnail.png'

const eventService = new EventService();

class EventImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pk: props.pk,
            images: props.images,
            file: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('image', this.state.file, this.state.file.name);
        eventService.createEventImages(
            this.state.pk, form_data
        ).then((response) => {
            this.setState({ images: response, })
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }


    handleDelete(delete_image) {
        const self = this;
        eventService.deleteEventImages(delete_image).then(() => {
            var array = [...self.state.images]; // make a separate copy of the array
            var index = array.indexOf(delete_image)
            if (index !== -1) {
                array.splice(index, 1);
                self.setState({ images: array });// update state with the new array
            }
        });
    }

    render() {
        const { images } = this.state;
        const image_maps = images.map(maps =>
            <div key={maps.id} className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3 py-3" >
                <img
                    style={{
                        width: "100%",
                        height: "150px",
                        borderRadius: "5px",
                        backgroundImage: {photo_thumbnail},
                        backgroundSize: "cover",
                        backgroundPosition: 'center',
                        backgroundRepeat: "no-repeat",
                    }}
                    src={maps.image_url}
                    alt=""
                />
                <Button
                    style={{
                        backgroundColor: "rgba(200,255,0,0.5)",
                        border: "none",
                        position: "absolute",
                        bottom: "16px",
                        right: "16px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "5px 20px",
                    }}
                    onClick={this.handleDelete.bind(this, maps)}>
                    <FaTrashAlt size={'14'} />
                </Button>
            </div >
        )
        return (
            <form onSubmit={this.handleSubmit}>
                <div
                    className="row m-0">
                    <CardBody className="p-3">
                        <Row className="py-3">
                            <input className="form-control form-control-sm col-7 col-md-6 ml-3" type="file" accept="image/*" onChange={this.onChange} />
                            <input className="btn btn-sm btn-primary ml-3" type="submit" value="Upload" />
                        </Row>
                        <Row>
                            {image_maps}
                        </Row>
                    </CardBody>
                </div>
            </form>
        );
    }
}

export default EventImages;