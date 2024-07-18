import React from "react";
import img1 from "../assets/img1.jpg";


export default function Carousel() {
  return (
    <div classnames="carousel-item" style={{objectFit:"contain !important"}}>
      
      <img
      
        src={img1}
        className="d-block w-100"
        style={{ filter: "brightness(50%)" }}
        alt="Slide"
      />
         
       <div className="carousel-caption  " style={{zIndex: "10"}}>
       <div className="container-fluid">
    <form className="d-flex">

      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
        
      </div>
      <div className="carousel-caption d-none d-md-block">
        <h5>...</h5>
        <p>...</p>
      </div>
    </div>
  );
}
