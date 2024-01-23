import React, { useState } from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import "./price.css";
import { useDispatch } from "react-redux";
import Select from 'react-select';
const url = 'https://api.diwamjewels.com/DMJ/'

function EditPrice() {

    const [skuNo, setSkuNo] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [disPrice, setDisPrice] = useState("");
  
    const [subSize, setSubSize] = useState([])
    const [subColor, setSubColor] = useState([])
  
    const [country, setCountry] = useState('');
  
    // const [size, setSize] = useState(null)
    // const [color, setColor] = useState(null)
  
  
    function handlePrice(e) {
      e.preventDefault();
      console.log(skuNo, category, price, discount, disPrice, subSize, subColor, country)
    }
  
    async function handleDiscount(e) {
      if (price === "") {
        alert("Enter Price First");
        setDisPrice("");
      } else {
        setDiscount(e.target.value);
        const discount = await e.target.value;
        const disPrice = price - (discount * price) / 100;
        setDisPrice(disPrice);
      }
    }
  
    // const countryData = [
    //   { id: 1, name: 'India', symbol: '₹' },
    //   { id: 2, name: 'United States', symbol: '$' },
    //   { id: 3, name: 'United Kingdom', symbol: '£' },
    //   { id: 4, name: 'Canada', symbol: '$' },
    //   { id: 5, name: 'China', symbol: '¥' },
    //   { id: 6, name: 'Russia', symbol: '₽' },
    //   { id: 7, name: 'South Korea', symbol: '₩' },
    //   { id: 8, name: 'South Africa', symbol: 'R' },
    //   { id: 9, name: 'Singapore', symbol: 'S$' },
    //   { id: 10, name: 'Malaysia', symbol: 'RM' },
    // ]

    
    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Edit Price</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Edit Price</li>
                        </ol>
                    </nav>
                </div>

                <div className="seo-form-bg ">
        <h4 className="text-center text-primary mb-3"><b>Edit Price</b></h4>

        <div className="container">

          <form onSubmit={handlePrice}>
            <div className="row ">
              <div className="col-md-6 mt-4">
                <label className="pro-fnt-num fw-bold mb-2">SKU Number :</label>
                <br />
                <div className="">
                  <input
                    className="form-control in-form-box"
                    type="text"
                    value={skuNo}
                    onChange={(e) => setSkuNo(e.target.value)}
                  />
                </div>
              </div>


              <div className="col-md-6 mt-4">
                <label className="pro-fnt-num fw-bold mb-2">Category :</label>
                <select className="form-select in-form-box"
                  aria-label="Default select Category"
                  value={category}
                  onChange={(e) => { setCategory(e.target.value) }}
                >
                  <option value=''>select</option>
                  <option value="Rings">Rings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Bangles">Bangles</option>
                  <option value="Chains">Chains</option>
                  <option value="Earrings">Earrings</option>
                </select>
              </div>


              <div className="col-md-6 mt-4">
                <label className="pro-fnt-num fw-bold mb-2">Price :</label>
                <br />
                <div className="">
                  <input
                    className="form-control in-form-box"
                    type="number"
                    value={price}
                    onChange={(e) => {
                      if (e.target.value === "") setDisPrice("");
                      setPrice(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="col-md-6 mt-4">
                <label className="pro-fnt-num fw-bold mb-2">Discount % :</label>
                <br />
                <div className="">
                  <input
                    className="form-control in-form-box"
                    type="number"
                    value={discount}
                    onChange={handleDiscount}
                  />
                  <span>Price After Discount : {disPrice}</span>
                </div>
              </div>

              <Size
                sizeInfo={subSize}
              />

              <Color
                colorInfo={subColor}
              />

              {/* <div className="col-md-12 mt-4">
                <label className="pro-fnt-num fw-bold">Country :</label>
                <select
                  className="form-control in-form-box"
                  aria-label="Default select Country"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  {countryData.map((item) => (
                    <option value={item.name} key={item.id}>
                      {`${item.symbol} ${item.name}`}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="col-md-3 sumbit-btn">
                <button className="px-5 py-2 bg-primary text-white rounded border-0 mt-4 w-100" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>

            </MainCategory>
        </>
    );
}

const Size = ({ sizeInfo }) => {

    const [size, setSize] = useState([]);
  
    const dispatch = useDispatch();
  
  
    const handleSizeChange = async (selectedOptions) => {
  
      const selectedValues = selectedOptions.map((option) => option.value);
      setSize(selectedValues);
  
      dispatch(addSize(selectedValues))
    };
  
    return (
      <>
        <div className="col-md-6 mt-4 ">
          <label className="pro-fnt-num fw-bold mb-2">Size</label>
          <div className="">
            <Select
              defaultValue={size}
              onChange={handleSizeChange}
              options={sizeInfo}
              isMulti
            />
          </div>
        </div>
      </>
  
    );
  };
  
  
  
  
  const Color = ({ colorInfo }) => {
  
    const [colors, setColors] = useState([]);
  
    const dispatch = useDispatch();
  
  
    const handleSizeChange = async (selectedOptions) => {
      const selectedValues = selectedOptions.map((option) => option.value);
  
      setColors(selectedValues);
      dispatch(addColor(selectedValues))
  
    };
  
    return (
      <>
        <div className="col-md-6 mt-4">
          <label className="pro-fnt-num fw-bold mb-2">Color</label>
          <div className="">
            <Select
              defaultValue={colors}
              onChange={handleSizeChange}
              options={colorInfo}
              isMulti
            />
          </div>
        </div>
      </>
  
    );
  };
  
export default EditPrice;