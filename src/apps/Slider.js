import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'https://s27389.pcdn.co/wp-content/uploads/2019/05/devops-mobile-app-development.jpg',
    altText: 'App Development',
    caption: 'Lysofts Ke. is a leading expert company in the development of mobile applications both android,iOS and Windows',
    header: 'App Development',
    key: '1'
  },
  {
    src: 'https://s27389.pcdn.co/wp-content/uploads/2019/05/devops-mobile-app-development.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',
    key: '2'
  },
  {
    src: 'https://s27389.pcdn.co/wp-content/uploads/2019/05/devops-mobile-app-development.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  }
];

const Example = () => {
  return(
    <div id="slides" className="col-sm-12 col-md-10 col-lg-8">
        <UncontrolledCarousel style={{height:500+'px'}} items={items} />
    </div>
    );
}

export default Example;
