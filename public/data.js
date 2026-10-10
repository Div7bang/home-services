const about = [
  {
    title: "Trusted Technicians",
    description: "Background-checked professionals for plumbing, electrical, HVAC, and home repairs—on your schedule.",
    link: "Read More"
  },
  {
    title: "Expert Workers",
    description: "Our team consists of experienced home service professionals with a wide range of skills to tackle any household task with confidence.",
    link: "Read More"
  },
  {
    title: "Clear Pricing",
    description: "Upfront estimates with no surprise add-ons. You approve work before we start, and we use only quality materials.",
    link: "Read More"
  }
];

const services = [
  {
    title: "Plumbing & Leaks",
    slug: "plumbing-leaks",
    image: "/images/plumbing.jpg",
    description: "Expert plumbing repairs: leaky pipes, drain clogs, tap replacements, bathroom fittings and full plumbing installations.",
    price: 800,
    duration: "1–2 hours"
  },
  {
    title: "Electrical & Fixtures",
    slug: "electrical-fixtures",
    image: "/images/electrical.jpg",
    description: "Safe electrical work: wiring, fan and light fixture installation, circuit breakers, switchboards and outlet repairs.",
    price: 600,
    duration: "1 hour"
  },
  {
    title: "HVAC & Cooling",
    slug: "hvac-cooling",
    image: "/images/ac.jpg",
    description: "AC installation, servicing and repair. Keep your home cool with our certified HVAC technicians.",
    price: 1200,
    duration: "2 hours"
  },
  {
    title: "Deep Cleaning",
    slug: "deep-cleaning",
    image: "/images/cleaning.jpg",
    description: "Complete home deep cleaning: kitchen, bathrooms, floors, windows and upholstery cleaned to perfection.",
    price: 1500,
    duration: "3–4 hours"
  }
];

const employee = [
  { name: "Rajesh Kumar", role: "Operations Manager", image: "/images/p1.webp" },
  { name: "Marcus Reid", role: "Master Electrician", image: "/images/melectrician.jpg" },
  { name: "James Ruiz", role: "Plumbing Supervisor", image: "/images/plumber.jpg" },
  { name: "Elena Okafor", role: "Scheduling & Support", image: "/images/p4.avif" }
];

const Clients = [
  { name: "Priya Sharma", feedback: "Excellent service! The plumber arrived on time and fixed the leak quickly. Very professional.", image: "/images/c1.jpg" },
  { name: "Amit Verma", feedback: "Highly recommend! The electrician was skilled and explained everything clearly. Fair pricing.", image: "/images/c2.jpg" },
  { name: "Sunita Rao", feedback: "The deep cleaning team was thorough and left our home spotless. Will definitely book again!", image: "/images/c3.jpg" },
  { name: "Vikram Singh", feedback: "AC servicing was done quickly and professionally. The technician was knowledgeable and courteous.", image: "/images/c4.jpg" }
];

module.exports = { about, services, employee, Clients };
