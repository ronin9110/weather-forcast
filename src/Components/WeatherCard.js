export function WeatherCard({ val, Theme, handleRemove }) {
  console.log(val);
  return (
    <div class="col card p-4 m-1 text-center" >
      <div class="d-flex justify-content-between mb-2 text-start">
        <div>
          <h3>{val.city}</h3>
        </div>
        {handleRemove==null?null:<div onClick={(e) => handleRemove(val.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill={`#${Theme == "dark" ? "FFFFFF" : "000000"}`}
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </div>
        }
      </div>
      <div>
        <p class="fs-1 fw-bold text-danger">{val.temperature}</p>
        <img
          src={val.icon}
          alt={val.description}
          style={
            Theme == "dark" ? { filter: "invert(0)" } : { filter: "invert(1)" }
          }
        />
      </div>
      <p className="fs-5 text-capitalize fw-medium">{val.description}</p>
      <div
        className="row row-cols-2 row-cols-md-2 g-2 pb-2 border shadow bg-body-tertiary roundedtext-wrap "
        style={{ fontSize: 14 }}
      >
        <div class="col">
          <strong>Min:</strong> {val.minTemp}
        </div>
        <div class="col">
          <strong>Max:</strong> {val.maxTemp}
        </div>
        <div class="col">
          <strong>Humidity:</strong> {val.humidity}
        </div>
        <div class="col">
          <strong>Wind Speed:</strong> {val.windSpeed}
        </div>
      </div>
    </div>
  );
}