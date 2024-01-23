import React, { useState } from "react";
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import './rating.css';

function AddRating() {

    const [sku, setSku] = useState("");
    const [rating, setRating] = useState(0); 
  
    const handleRatingSubmit = (e) => {
      e.preventDefault();
      console.log(sku, rating)
  
    };

    
    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Add Rating</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Add Rating</li>
                        </ol>
                    </nav>
                </div>

                <div className="container">
        <h3 className="text-center text-primary">
          <b>Add Rating</b>
        </h3>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 mt-4">
            <form onSubmit={handleRatingSubmit}>
              <label className="pro-fnt-num fw-bold mb-2">SKU Number:</label>
              <br />
              <div className="">
                <input
                  className="form-control in-form-box"
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  required
                />
              </div>

              <label className="pro-fnt-num mt-4 fw-bold">Rating:</label>
              <br />
              <div className="ratingStar">
                <RatingStar value={rating} onClick={(value) => setRating(value)}/>
              </div>

              <button
                className="px-5 py-2 bg-primary text-white rounded border-0 mt-4 mb-5 w-100"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

            </MainCategory>
        </>
    );
}

const RatingStar = ({ value, onClick }) => {
    const [hoverValue, setHoverValue] = useState(null);
  
    return (
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="cursor-pointer"
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(null)}
            onClick={() => onClick(star)}
      
          >
            {star <= (hoverValue || value) ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

export default AddRating;