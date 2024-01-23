import React, { useEffect, useState } from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import "./variation.css";
import { useDispatch } from "react-redux";
import Select from 'react-select';
import axios from "axios";
import Loader from '../loader/Loader';
import { multipleImages, singleImage } from '../../Js/uploadImg';


const url = 'http://137.184.3.191:8080/DMJ/';
const endPoint = 'api/v1/category/maincategory';
const getColor = 'api/v1/colour/type/';
const getSize = 'api/v1/size/type/';
const getProductEnd = 'api/v1/products/sku/';
const variantProEnd = 'api/v1/variantproduct';
const uploadImgEnd = 'api/v1/productImages';

function Variation() {

  const [skuNo, setSkuNo] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [disPrice, setDisPrice] = useState("");

  const [subSize, setSubSize] = useState([])
  const [subColor, setSubColor] = useState([])

  const [isLoading, setLoading] = useState(false)

  const [country, setCountry] = useState('');

  const [productId, setProductId] = useState(false)

  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [mainCategory, setMainCategory] = useState([])

  const [singleImg, setSingleImg] = useState('')
  const [multImg, setMultImg] = useState('')

  const [singleSelectedFile, setSingleSelectedFile] = useState(null);
  const [multiSelectedFiles, setMultiSelectedFiles] = useState([]);

  const [stock, setStock] = useState("")


  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setSingleSelectedFile(URL.createObjectURL(file));
    setSingleImg(file)
  }

  const handleChangeManyImage = (e) => {
    const filesArray = Array.from(e.target.files);
    setMultiSelectedFiles(filesArray.map(file => URL.createObjectURL(file)));
    setMultImg(filesArray)
  }

  async function fetchMainCategory() {
    try {
      const res = await axios.get(`${url}${endPoint}`)
      setMainCategory(res.data.data)
    }
    catch (err) {
      // console.log(err)
      console.log(err)
    }
  }

  // async function handleDiscount(e) {
  //   if (price === "") {
  //     alert("Enter Price First");
  //     setDisPrice("");
  //   } else {
  //     setDiscount(e.target.value);
  //     const discount = await e.target.value;
  //     const disPrice = price - (discount * price) / 100;
  //     setDisPrice(disPrice);
  //   }
  // }

  useEffect(() => {
    fetchMainCategory()
  }, [])


  function emptyState() {
    setColor('')
    setSize('')
  }



  async function getProductId() {
    try {
      const proRes = await axios.get(url + getProductEnd + skuNo)
      console.log(proRes.data.data.id)
      return (proRes.data.data.id)
    }
    catch (err) {
      console.log(err)
    }
  }


  async function productImgUpload(id, th_img, m_img) {
    try {
      const res = await axios.post(url + uploadImgEnd, {
        "thum_image": th_img.thum_image,
        "picturesMulti": m_img.pictures,
        "color": color,
        "productId": id
      })

      console.log(res.data)
      return (res.data.data)
    }
    catch (err) {
      console.log(err)
      alert(err.response.data.message)
    }
  }

  async function handlePrice(e) {
    setLoading(true)
    e.preventDefault();
    const productId = await getProductId()
    const thum_img = await singleImage(singleImg)
    const multi_img = await multipleImages(multImg)

    const imgId = await productImgUpload(productId, thum_img, multi_img)

    try {
      const mainRes = await axios.post(url + variantProEnd, {
        "color": color,
        "size": size,
        "price": price,
        "discount": discount,
        "manualPrice": disPrice,
        "country": "India",
        "p_status": true,
        "productImagesId": imgId
      })
      console.log(mainRes)
    }
    catch (err) {
      console.log(err)
    }
    setLoading(false)
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

  async function handleCategory(e) {
    setCategory(e.target.value)
    handleColor(e.target.value)
    handleSize(e.target.value)
  }

  async function handleColor(val) {

    try {
      const colorRes = await axios.get(`${url}${getColor}${val}`)
      setSubColor(colorRes.data.data)
    }
    catch (err) {
      // console.log(err)
      alert(err.response.data.message)
    }

  }

  async function handleSize(value) {
    try {

      const sizeRes = await axios.get(`${url}${getSize}${value}`)
      setSubSize(sizeRes.data.data)
      // console.log(subColor)
    }
    catch (err) {
      // console.log(err)/
      alert(err.response.data.message)
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

  function handleVariant(e) {
    e.preventDefault();
    console.log(skuNo, price, disPrice, color, stock)
  }


  return (
    <>

      <MainCategory>

        <div className="pagetitle">
          <h1>Add Variation</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Add Variation</li>
            </ol>
          </nav>
        </div>
        {
          !isLoading ?
            <>
              <div className="seo-form-bg ">
                <h4 className="text-center text-primary mb-3"><b>Add Variation Image</b></h4>

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
                          onChange={(e) => {
                            handleCategory(e)
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
                        <label className="pro-fnt-num fw-bold text-end mb-2">Single Image</label><br />
                        <div className="">
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleChangeImage}
                          />
                          {singleSelectedFile && (
                            <img
                              src={singleSelectedFile}
                              alt="Product Image"
                              className="singleImage"
                            />
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 mt-4">
                        <label className="pro-fnt-num fw-bold text-end mb-2">Many Images</label><br />
                        <div className="">
                          <input
                            type="file"
                            className="form-control"
                            multiple
                            onChange={handleChangeManyImage}
                          />
                          {multiSelectedFiles.map((file, index) => (
                            <img
                              key={index}
                              src={file}
                              alt={`Product Image ${index}`}
                              className="multiImage"
                            />
                          ))}
                        </div>

                      </div>

                      {/* <div className="col-md-6 mt-4">
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
                      </div> */}

                      {/* <div className="col-md-6 mt-4">
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
                      </div> */}

                      {/* <div className="col-md-6 mt-4">
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
                      </div> */}

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
                                <option value={item.name} key={item.id}>{item.name} <span className='colr-span' style={{ backgroundColor: item.name }}></span></option>
                              )
                            })
                          }
                        </select>
                      </div>

                      {/* <div className="col-md-6 mt-4 mb-2">
                        <label className="pro-fnt-num fw-bold"> Stock :</label>
                        <br />
                        <div className="">
                          <input
                            className="form-control in-form-box"
                            type="number"
                            value={stock}
                            onChange={(e) => { setStock(e.target.value) }}
                          />
                        </div>
                      </div> */}

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
                      <div className="col-md-6 mt-4"></div>

                      <div className="col-md-3 sumbit-btn">
                        <button className="px-5 py-2 bg-primary text-white rounded border-0 mt-4 w-100" type="submit">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>



              <div className="seo-form-bg mt-5">
                <h4 className="text-center text-primary mb-3"><b>Add Variant</b></h4>

                <div className="container">

                  <form onSubmit={handleVariant}>
                    <div className="row">

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
                                <option value={item.name} key={item.id}>{item.name} <span className='colr-span' style={{ backgroundColor: item.name }}></span></option>
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

                      <div className="col-md-6 mt-4 mb-2">
                        <label className="pro-fnt-num fw-bold mb-2"> Stock :</label>
                        <br />
                        <div className="">
                          <input
                            className="form-control in-form-box"
                            type="number"
                            value={stock}
                            onChange={(e) => { setStock(e.target.value) }}
                          />
                        </div>
                      </div>


                      <div className="col-md-3 sumbit-btn">
                        <button className="px-5 py-2 bg-primary text-white rounded border-0 mt-4 w-100" type="submit">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
            :
            <Loader />
        }
      </MainCategory>

    </>
  );
}

export default Variation;