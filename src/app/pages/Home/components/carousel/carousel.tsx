// import logo from '../../../alumni/assets/eventBackground.jpg';
// import Carousel1 from '../../../alumni/assets/carousel1.png'
// import  Carouse2  from '../../../alumni/assets/carousel2.jpg';
// import Carousel3 from '../../../alumni/assets/carousel3.jpg'
// import Carousel4 from '../../../alumni/assets/carousel4.jpg'
// import Carosel5 from '../../../alumni/assets/carousel5.png'

// const carouselItems = [
//     {
//       src: Carouse2,
//       alt: 'Slide 1',
//       caption: '',
//       title: '',
//       isActive: true,
//     },
//     {
//       src: Carousel1,
//       alt: 'Slide 2',
//       caption: '',
//       title: '',
//       isActive: false,
//     },
//     {
//       src: Carousel3,
//       alt: 'Slide 3',
//       caption: '',
//       title: '',
//       isActive: false,
//     },
//     {
//         src: Carousel4,
//         alt: 'Slide 4',
//         caption: '',
//         title: '',
//         isActive: false,
//       },
//       {
//         src: Carosel5,
//         alt: 'Slide 5',
//         caption: '',
//         title: '',
//         isActive: false,
//       },
//   ];

// const carousel: React.FC = () => {
//   return (
//     <>
//       <div id="hero-carousel" className="carousel slide" data-bs-ride="carousel" style={{marginTop:"175px"}}>
//       <div className="carousel-indicators">
//         {carouselItems.map((item, index) => (
//           <button
//             key={index}
//             type="button"
//             data-bs-target="#hero-carousel"
//             data-bs-slide-to={index}
//             className={item.isActive ? 'active' : ''}
//             aria-current={item.isActive ? 'true' : 'false'}
//             aria-label={`Slide ${index + 1}`}
//           />
//         ))}
//       </div>
//       <div className="carousel-inner">
//         {carouselItems.map((item, index) => (
//           <div
//             key={index}
//             className={`carousel-item c-item ${item.isActive ? 'active' : ''}`}
//           >
//             <img
//               src={item.src}
//               className="d-block w-100 c-img"
//               alt={item.alt}
//               height={'50%'}
//             />
//             <div className="carousel-caption top-0 mt-4">
//               <p className="mt-5 fs-3 text-uppercase">{item.caption}</p>
//               <h1 className="display-1 fw-bolder text-capitalize">
//                 {item.title}
//               </h1>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button
//         className="carousel-control-prev"
//         type="button"
//         data-bs-target="#hero-carousel"
//         data-bs-slide="prev"
//       >
//         <span className="carousel-control-prev-icon" aria-hidden="true" />
//         <span className="visually-hidden">Previous</span>
//       </button>
//       <button
//         className="carousel-control-next"
//         type="button"
//         data-bs-target="#hero-carousel"
//         data-bs-slide="next"
//       >
//         <span className="carousel-control-next-icon" aria-hidden="true" />
//         <span className="visually-hidden">Next</span>
//       </button>
//     </div>

//     </>
//   )
// }

// export default carousel
// Import necessary assets
import logo from '../../../alumni/assets/eventBackground.jpg';
import Carousel1 from '../../../alumni/assets/carousel1.png'
import Carouse2 from '../../../alumni/assets/carousel2.jpg';
import Carousel3 from '../../../alumni/assets/carousel3.jpg'
import Carousel4 from '../../../alumni/assets/carousel4.jpg'
import Carosel5 from '../../../alumni/assets/carousel5.png'

// Array of carousel items
const carouselItems = [
  {
    src: Carouse2,
    alt: 'Slide 1',
    caption: '',
    title: '',
    isActive: true,
  },
  {
    src: Carousel1,
    alt: 'Slide 2',
    caption: '',
    title: '',
    isActive: false,
  },
  {
    src: Carousel3,
    alt: 'Slide 3',
    caption: '',
    title: '',
    isActive: false,
  },
  {
    src: Carousel4,
    alt: 'Slide 4',
    caption: '',
    title: '',
    isActive: false,
  },
  {
    src: Carosel5,
    alt: 'Slide 5',
    caption: '',
    title: '',
    isActive: false,
  },
];

// Carousel component
const Carousel: React.FC = () => {
  return (
    <div className="row" >
      <div className="row">
        <div className="col-12" style={{ padding: 0 }}>
          <div id="hero-carousel" className="carousel slide" data-bs-ride="carousel" style={{ marginTop: "175px", width: "100vw", overflowX: "hidden" }}>
            <div className="carousel-indicators">
              {carouselItems.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#hero-carousel"
                  data-bs-slide-to={index}
                  className={item.isActive ? 'active' : ''}
                  aria-current={item.isActive ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="carousel-inner">
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item ${item.isActive ? 'active' : ''}`}
                >
                  <img
                    src={item.src}
                    className="d-block w-100"
                    alt={item.alt}
                  />
                  <div className="carousel-caption top-0 mt-4">
                    <p className="mt-5 fs-3 text-uppercase">{item.caption}</p>
                    <h1 className="display-1 fw-bolder text-capitalize">
                      {item.title}
                    </h1>
                  </div>
                </div>
              ))}
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
        </div>
      </div>
    </div>
  );
}

export default Carousel;
