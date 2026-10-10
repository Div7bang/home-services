import usePageTitle from "../usePageTitle.js";
import usePublicData from "../components/usePublicData.js";
import DataGate from "../components/DataGate.jsx";
import PageHeader from "../components/PageHeader.jsx";
import AboutItems from "../components/AboutItems.jsx";
import EmployeeCard from "../components/EmployeeCard.jsx";

const STATS = [
  { value: "500+", label: "Happy Customers" },
  { value: "50+", label: "Skilled Technicians" },
  { value: "4", label: "Service Categories" },
  { value: "5★", label: "Average Rating" },
];

export default function About() {
  usePageTitle("About Us - Home Service");
  const { data, error } = usePublicData();

  return (
    <>
      <PageHeader title="About Us" subtitle="Trusted home service professionals serving your community" />

      <DataGate data={data} error={error}>
        {({ about, employee }) => (
          <>
            <section className="container py-5">
              <div className="row g-4 align-items-stretch">
                <div className="col-12 col-lg-5">
                  <div className="about-media-wrap">
                    <img src="/images/home_service.jpg" className="about-main-img" alt="About Us" />
                  </div>
                </div>
                <div className="col-12 col-lg-7">
                  <div className="about-content-wrap">
                    <h2 className="fw-bold mb-3">Who We Are</h2>
                    <p className="text-muted mb-4">
                      We are a professional home services company dedicated to delivering high-quality repair,
                      maintenance, and cleaning services right to your doorstep. With a team of certified and
                      experienced technicians, we ensure every job is done right the first time.
                    </p>
                    <AboutItems about={about} />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-dark text-white py-5">
              <div className="container">
                <div className="row text-center g-4">
                  {STATS.map((s) => (
                    <div className="col-6 col-md-3" key={s.label}>
                      <div className="fs-1 fw-bold text-primary">{s.value}</div>
                      <div className="text-white-50">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="container py-5">
              <h2 className="mb-4 text-center fw-bold">Meet Our Team</h2>
              <div className="row g-4 justify-content-center">
                {employee.map((item) => (
                  <EmployeeCard key={item.name} item={item} center colClass="col-12 col-sm-6 col-lg-3" />
                ))}
              </div>
            </section>
          </>
        )}
      </DataGate>
    </>
  );
}
