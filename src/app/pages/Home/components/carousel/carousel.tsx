import logo from '../../../alumni/assets/eventBackground.jpg';
import event1 from '../../../alumni/assets/event1.jpeg';
import event2 from '../../../alumni/assets/event2.jpeg'
import event3 from '../../../alumni/assets/event3.jpg';

const carousel: React.FC = () => {
  return (
    <>
      <div id="hero-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#hero-carousel"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#hero-carousel"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#hero-carousel"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active c-item">
            <img
              src={event2}
              height={'50%'}
              className="d-block w-100 c-img"
              alt="Slide 1"
            />
            <div className="carousel-caption top-0 mt-4">
              <p className="mt-5 fs-3 text-uppercase">DSUMUN IV Launch Ceremony</p>
              <h1 className="display-1 fw-bolder text-capitalize">
                DHA SUFFA
              </h1>
              {/* <button className="btn btn-primary px-4 py-2 fs-5 mt-5">
          Book a tour
        </button> */}
            </div>
          </div>
          <div className="carousel-item c-item">
            <img
              src={event1}
              className="d-block w-100 c-img"
              height={'50%'}
              alt="Slide 2"
            />
            <div className="carousel-caption top-0 mt-4">
              <p className="text-uppercase fs-3 mt-5">DSUMUN IV Launch Ceremony</p>
              <p className="display-1 fw-bolder text-capitalize"> DHA SUFFA</p>
              {/* <button
                className="btn btn-primary px-4 py-2 fs-5 mt-5"
                data-bs-toggle="modal"
                data-bs-target="#booking-modal"
              >
                Book a tour
              </button> */}
            </div>
          </div>
          <div className="carousel-item c-item">
            <img
              src={event3}
              className="d-block w-100 c-img"
              alt="Slide 3"
            />
            <div className="carousel-caption top-0 mt-4">
              <p className="text-uppercase fs-3 mt-5">DSUMUN IV Launch Ceremony</p>
              <p className="display-1 fw-bolder text-capitalize">DHA SUFFA</p>
              {/* <button
                className="btn btn-primary px-4 py-2 fs-5 mt-5"
                data-bs-toggle="modal"
                data-bs-target="#booking-modal"
              >
                Book a tour
              </button> */}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#hero-carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#hero-carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </>
  )
}

export default carousel