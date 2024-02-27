import React from "react";

function Card({ foodname, options, imgSrc }) {
  return (
    <div>
      <div
        className="card mt-3"
        style={{ width: "18rem", maxHeight: "360px" }}
        id="card"
      >
        <img
          src="https://source.unsplash.com/random/200×200?food"
          className="card-img-top"
          alt="..."
        ></img>
        <div className="card-body">
          <h5 className="card-title">{foodname}</h5>
          <p className="card-text"></p>
          <div className="container w-100">
            <select className="m-2 h-100 w-20 bg-success rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success rounded">
              {/* {options.map((item,index) => {
                // Assuming each option object contains only one key
                const size = Object.keys(item)[0];
                const value = item[size];
                return (
                  <option value={value} key={index}>
                    {item}
                  </option>
                ); */}
              {/* })} */}
            </select>
            <div className="d-inline h-100 fs-5">Total Price</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
