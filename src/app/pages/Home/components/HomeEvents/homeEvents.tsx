

import Event1 from '../../../alumni/assets/event1.jpeg'
import Event2 from '../../../alumni/assets/event2.jpeg'
import Event3 from '../../../alumni/assets/event3.jpg'
import './HomeEvents.css'
interface Events {
  Id: number;
  Name: string;
  Description: string;
  Image: string;
  EventDate: Date; // Use Date instead of DateTime
}


const HomeEvents:React.FC = () => {


  const events: Events[] = [
{
  Id: 1,
  Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  Image: Event1,
  EventDate: new Date('2023-01-01T00:00:00'),
},
{
  Id: 2,
  Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  Image: Event2,
  EventDate: new Date('2023-01-01T00:00:00'),
},

{
  Id: 3,
  Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  Image:Event3,
  EventDate: new Date('2023-01-01T00:00:00'),
},




  ];
  return (
    <div>

<div className='row'>
<h1 className='text-css'>Events</h1>
</div>

      <div className="row">
  {events.map((event, index) => (
    <div key={index} className="col-md-4">
      <div className="card-xl-stretch me-md-6">

        <a
          className="d-block overlay mb-4"
          data-fslightbox="lightbox-hot-sales"
          href={event.Image}
        >
          <div
            className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px"
            style={{ backgroundImage: `url(${event.Image})` }}
          />
          <div className="overlay-layer bg-dark card-rounded bg-opacity-25">
          
            <i className="ki-duotone ki-eye fs-2x text-white" />
          </div>
          <div className="position-absolute text-white mb-8 ms-10 bottom-0">
 

    {/*end::Text*/}
  </div>
        </a>
        <div className="m-0">
          <a
            href="../../demo1/dist/pages/user-profile/overview.html"
            className="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base"
          >
            {event.Name}
          </a>


          <div className="fw-semibold fs-5 text-gray-600 text-dark mt-3 mb-5">
            {event.Description}
          </div>
          <div className="fs-6 fw-bold">
            <span className="text-muted">Event Date: {event.EventDate.toDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


    </div>
  )
}

export default HomeEvents