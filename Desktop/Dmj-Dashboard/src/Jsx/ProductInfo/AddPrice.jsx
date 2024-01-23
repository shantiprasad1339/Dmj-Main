import React,{ useEffect, useState } from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import "./price.css";
import { useDispatch } from "react-redux";
import Select from 'react-select';
import axios from "axios";


const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/category/maincategory';
const getColor = 'api/v1/colour/type/';
const getSize = 'api/v1/size/type/';
const getProductId = 'api/v1/products/sku/';
const updatePrice = 'api/v1/variantproduct';

function AddPrice() {

    const [skuNo, setSkuNo] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [disPrice, setDisPrice] = useState("");
  
    const [subSize, setSubSize] = useState([])
    const [subColor, setSubColor] = useState([])
  
    const [country, setCountry] = useState('');
  
    const [productId, setProductId] = useState(false)
  
    const [size, setSize] = useState(null)
    const [color, setColor] = useState(null)
    const [mainCategory, setMainCategory] = useState([])
  
  
  
    async function fetchMainCategory() {
      try {
        const res = await axios.get(`${url}${endPoint}`)
        setMainCategory(res.data.data)
      }
      catch (err) {
        console.log(err)
  
      }
    }
  
  
    useEffect(() => {
      fetchMainCategory()
    }, [])
  
  
    function emptyState() {
      setColor('')
      setSize('')
    }
  
    async function handlePrice(e) {
      e.preventDefault();
  
      try {
        const proRes = await axios.get(`${url}${getProductId}${skuNo}`)
        setProductId(proRes.data.data.id)
        if (productId) {
          try {
            const updatePriceRes = await axios.post(`${url}${updatePrice}`, {
              'color': color,
              'size': size,
              'price': disPrice,
              'discount': discount,
              'manualPrice': price,
              'productId': productId
            });
            console.log(updatePriceRes)
  
            alert(updatePriceRes.data.message)
  
          }
          catch (err) {
            console.log(err)
          }
  
        }
      }
      catch (err) {
        console.log(err)
        setProductId(false)
      }
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
  
  
    async function handleSizeColor(value) {
      try {
        const colorRes = await axios.get(`${url}${getColor}${value}`)
        const sizeRes = await axios.get(`${url}${getSize}${value}`)
        setSubSize(sizeRes.data.data)
        setSubColor(colorRes.data.data)
        // console.log(subColor)
      }
      catch (err) {
        console.log(err)
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
  
    // ];

    
    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Add Price</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Add Price</li>
                        </ol>
                    </nav>
                </div>

                <div className="seo-form-bg ">
        <h4 className="text-center text-primary mb-3"><b>Add Price</b></h4>

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
                <label className="pro-fnt-num fw-bold fw-bold mb-2">Category :</label>
                <select className="form-select in-form-box"
                  aria-label="Default select Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value)
                    handleSizeColor(e.target.value)
                  }}
                >
                  <option value=''>select</option>
                  {
                    mainCategory.map((cate) => {
                      return (
                        <option value={cate.type} key={cate.id}>{cate.type}</option>
                      )
                    })
                  }
                </select>
              </div>


              <div className="col-md-6 mt-4">
                <label className="pro-fnt-num fw-bold mb-2"> Price :</label>
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

              <div className="col-md-6 mt-4">
                <label className="pro-fnt-num fw-bold mb-2">Size :</label>
                <select className="form-select in-form-box"
                  aria-label="Default select Category"
                  value={size}
                  onChange={(e) => { setSize(e.target.value) }}
                >
                  <option value=''>select</option>
                  {
                    subSize.length > 0 && subSize.map(item => {
                      return (
                        <option value={item.name} key={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
              </div>

              <div className="col-md-6 mt-4">
                <label className="pro-fnt-num fw-bold mb-2">Color :</label>
                <select className="form-select in-form-box"
                  aria-label="Default select Category"
                  value={color}
                  onChange={(e) => { setColor(e.target.value) }}
                >
                  <option value=''>select</option>
                  {
                    subColor.length > 0 && subColor.map(item => {
                      return (
                        <option value={item.name} key={item.id} style={{backgroundColor:item.name}}>{item.name}</option>
                      )
                    })
                  }
                </select>
              </div>

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

export default AddPrice;