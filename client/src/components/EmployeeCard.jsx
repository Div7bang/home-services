export default function EmployeeCard({ item, center = false, colClass = "col-12 col-sm-6 col-lg-4" }) {
  return (
    <div className={colClass}>
      <div className={`card h-100 employee-card ${center ? "text-center" : ""}`}>
        <img src={item.image} className="card-img-top employee-img" alt={item.name} />
        <div className="card-body employee-card-body">
          <h5 className="employee-name">{item.name}</h5>
          <p className="employee-role mb-0">{item.role}</p>
        </div>
      </div>
    </div>
  );
}
