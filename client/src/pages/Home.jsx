import { Link } from "react-router-dom";
import usePageTitle from "../usePageTitle.js";
import usePublicData from "../components/usePublicData.js";
import DataGate from "../components/DataGate.jsx";
import AboutItems from "../components/AboutItems.jsx";
import EmployeeCard from "../components/EmployeeCard.jsx";

export default function Home() {
  usePageTitle("Home Service Booking");
  const { data, error } = usePublicData();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content container">
          <h1>Home Services At<br />Your Doorstep</h1>
          <p className="mb-4">Trusted professionals for plumbing, electrical, HVAC and cleaning — on your schedule.</p>
          <Link to="/service" className="btn btn-primary btn-lg me-2">Book a Service</Link>
          <a href="#about" className="btn btn-outline-light btn-lg">Learn More</a>
        </div>
      </section>

      <DataGate data={data} error={error}>
        {({ about, services, employee, Clients }) => (
          <>
            {/* About */}
            <section id="about" className="container py-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">About Us</h2>
                <Link to="/about" className="btn btn-outline-secondary btn-sm">More about us</Link>
              </div>
              <div className="row g-4 align-items-stretch">
                <div className="col-12 col-lg-5">
                  <div className="about-media-wrap">
                    <img src="/images/home_service.jpg" className="about-main-img" alt="About Home Service" />
                  </div>
                </div>
                <div className="col-12 col-lg-7">
                  <div className="about-content-wrap">
                    <AboutItems about={about} />
                    <Link to="/about" className="btn btn-dark about-cta-btn">Read more about us</Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Services */}
            <section id="service" className="container py-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Popular Services</h2>
                <Link to="/service" className="btn btn-outline-primary btn-sm">View All</Link>
              </div>
              <div className="row g-4">
                {services.map((item) => (
                  <div className="col-12 col-sm-6 col-lg-3" key={item.slug}>
                    <div className="card h-100 service-card">
                      <img src={item.image} className="card-img-top service-card-img" alt={item.title} />
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <Link to={`/book/${item.slug}`} className="btn btn-dark service-book-btn">Book Now</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Team */}
            <section id="team" className="container py-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Our Team</h2>
              </div>
              <div className="row g-4">
                {employee.slice(0, 3).map((item) => (
                  <EmployeeCard key={item.name} item={item} />
                ))}
              </div>
              {employee.length > 3 && (
                <div className="row g-4 mt-1 justify-content-center">
                  {employee.slice(3).map((item) => (
                    <EmployeeCard key={item.name} item={item} />
                  ))}
                </div>
              )}
            </section>

            {/* Clients */}
            <section className="container py-5">
              <h2 className="mb-4">What Our Clients Say</h2>
              <div className="row g-4">
                {Clients.map((item) => (
                  <div className="col-12 col-sm-6 col-lg-3" key={item.name}>
                    <div className="card h-100 shadow-sm">
                      <img src={item.image} className="card-img-top client-img" alt={item.name} />
                      <div className="card-body">
                        <p className="card-text fst-italic">"{item.feedback}"</p>
                        <h6 className="card-title fw-bold mb-0">— {item.name}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </DataGate>

      {/* Banner CTA */}
      <section className="banner-section mt-3">
        <div className="container banner-content-wrap">
          <div className="banner-content">
            <p className="banner-kicker mb-2">Trusted Home Care</p>
            <h2 className="banner-title">Licensed Pros for Repairs, Installs &amp; Home Care</h2>
            <p className="banner-lead">
              Skip the phone tag. Tell us what you need, pick a time window, and we confirm your appointment.
              Same trusted team for plumbing, electrical, HVAC and deep cleaning.
            </p>
            <p className="mb-0">
              Emergency? Call our hotline. For everything else, booking online gets the right technician with the right tools to your door.
            </p>
            <div className="banner-actions d-flex flex-wrap gap-2">
              <Link to="/service" className="btn btn-primary px-4">Book a Service</Link>
              <Link to="/contact" className="btn btn-outline-light px-4">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
