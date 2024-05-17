

import { useState } from 'react';
import eventBackground from '../../../../../../../app/pages/alumni/assets/eventBackground.jpg'
import {NewsModal} from './newsModal'; // Import the EventModal component
interface News {
  Id: number;
  Name: string;
  Description: string;
  Image: string;
  NewsDate: Date; // Use Date instead of DateTime
}


const NewsPage:React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    // Function to open the modal
    const openModal = () => {
      setShowModal(true);
    };
  
    // Function to close the modal
    const closeModal = () => {
      setShowModal(false);
    };
  const news: News[] = [
{
  Id: 1,
  Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  Image: eventBackground,
  NewsDate: new Date('2023-01-01T00:00:00'),
},
{
  Id: 2,
  Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  Image: eventBackground,
  NewsDate: new Date('2023-01-01T00:00:00'),
},

{
  Id: 3,
  Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  Image:eventBackground,
  NewsDate: new Date('2023-01-01T00:00:00'),
},




  ];
  return (
    <div>

 
<div className="row mb-5">
  <div className="col-2 offset-10">
    
   <button className="btn btn-primary des" onClick={openModal} 
> Add new News</button>
  </div>
</div>
      <div className="row">
      
      <div className="position-relative mb-17">
  {/*begin::Overlay*/}
  <div className="overlay overlay-show">
    {/*begin::Image*/}
    <div
      className="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-250px"
      // style={{
      //   backgroundImage: 'url("../../../../../../../app/pages/alumni/assets/ayezan.jpg")'
      // }}
      style={{backgroundImage: `url(${eventBackground})`}}
    />
    {/*end::Image*/}
    {/*begin::layer*/}
    <div
      className="overlay-layer rounded bg-black"
      style={{ opacity: "0.4" }}
    />
    {/*end::layer*/}
  </div>
  {/*end::Overlay*/}
  {/*begin::Heading*/}
  <div className="position-absolute text-white mb-8 ms-10 bottom-0">
    {/*begin::Title*/}
    <h3 className="text-white fs-2qx fw-bold mb-3 m">DSU NEWS</h3>
    {/*end::Title*/}
    {/*begin::Text*/}
    <div className="fs-5 fw-semibold">
      You sit down. You stare at your screen. The cursor blinks.
    </div>
    {/*end::Text*/}
  </div>
  {/*end::Heading*/}
</div>

      </div>

      <div className="row">
  {news.map((newss, index) => (
    <div key={index} className="col-md-4">
      <div className="card-xl-stretch me-md-6">
        <a
          className="d-block overlay mb-4"
          data-fslightbox="lightbox-hot-sales"
          href={newss.Image}
        >
          <div
            className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px"
            style={{ backgroundImage: `url(${newss.Image})` }}
          />
          <div className="overlay-layer bg-dark card-rounded bg-opacity-25">
            <i className="ki-duotone ki-eye fs-2x text-white" />
          </div>
        </a>
        <div className="m-0">
          <a
            href="../../demo1/dist/pages/user-profile/overview.html"
            className="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base"
          >
            {newss.Name}
          </a>
          <div className="fw-semibold fs-5 text-gray-600 text-dark mt-3 mb-5">
            {newss.Description}
          </div>
          <div className="fs-6 fw-bold">
            <span className="text-muted">News Date: {newss.NewsDate.toDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


<NewsModal isOpen={showModal} onClose={closeModal} />
    </div>
  )
}

export default NewsPage