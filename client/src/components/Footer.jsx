export default function Footer() {
  return (
    <div className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row gy-3">
          <div className="col-md-4">
            <h6 className="fw-bold">🏠 HOME SERVICE</h6>
            <p className="small text-white-50">Trusted home repair and maintenance services delivered to your doorstep across the city.</p>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold">Our Services</h6>
            <ul className="list-unstyled small text-white-50">
              <li>Plumbing &amp; Leaks</li>
              <li>Electrical &amp; Fixtures</li>
              <li>HVAC &amp; Cooling</li>
              <li>Deep Cleaning</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold">Contact Us</h6>
            <p className="mb-0 small text-white-50">Email: info@homeservice.com</p>
            <p className="mb-0 small text-white-50">Phone: (123) 456-7890</p>
            <p className="mb-0 small text-white-50">Address: 123 Main Street, Ludhiana, Punjab</p>
          </div>
        </div>
        <hr className="border-secondary my-3" />
        <p className="mb-0 text-center small text-white-50">
          &copy; {new Date().getFullYear()} Home Service. All rights reserved.
        </p>
      </div>
    </div>
  );
}
