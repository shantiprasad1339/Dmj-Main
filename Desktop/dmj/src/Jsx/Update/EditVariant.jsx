import React, { useEffect, useState } from "react";
import MainCategory from "../../Dashboard/MainCategory/MainCategory";
import { Link, useParams } from "react-router-dom";
import "../Variation/variation.css";
import { useDispatch } from "react-redux";
import Select from "react-select";
import axios from "axios";
import Loader from "../loader/Loader";
import { multipleImages, singleImage } from "../../Js/uploadImg";
import { PrecisionManufacturing } from "@mui/icons-material";

const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/category/maincategory";
const getColor = "api/v1/colour/type/";
const getSize = "api/v1/size/type/";
const getProductEnd = "api/v1/products/sku/";
const variantProEnd = "api/v1/variantproduct";
const uploadImgEnd = "api/v1/productImages";
const skuColorEnd = "api/v1/productImages/sku?sku=";
// const stockEnd = 'api/v1/stock/add';
const matEnd = "api/v1/metal/type/";

const varaintEnd = "api/v1/variantproduct/";

const EditVariant = () => {
  const { pId } = useParams();

  const [skuNo, setSkuNo] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [disPrice, setDisPrice] = useState("");
  const [minimumOrder, setMinimumOrder] = useState("1");
  const [subSize, setSubSize] = useState([]);
  const [subColor, setSubColor] = useState([]);
  const [colorId, setColorId] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [country, setCountry] = useState("India");

  const [productId, setProductId] = useState(false);
const [defaultColor,setDefaultColor] = useState('')
  // const [variantId, setVariantId] = useState('')
  const [product_heigth, setProduct_heigth] = useState("");
  const [product_width, product_setWidth] = useState("");
  const [product_depth, product_setDepth] = useState("");
  const [product_weight, product_setWeight] = useState("");
  // const [product_length, product_setLength] = useState('')
  // const [product_breadth, product_setBreadth] = useState('')
  const [materail, setMaterail] = useState("");

  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [mainCategory, setMainCategory] = useState([]);

  const [manufacturing, setManufacturing] = useState("");
  const [packing, setPacking] = useState("");
  const [packageHeigth, setPackageHeight] = useState("");
  const [package_breadth, set_package_breadth] = useState("");
  const [package_length, set_package_length] = useState("");
  const [package_weight, set_package_weight] = useState("");
const [metal,setMetal] = useState()
  const [stock, setStock] = useState("");

  const [images, setImages] = useState([]);

  const [matValue, setMaterailValue] = useState([]);
  const [isSku, setIsSku] = useState(false);

  const [variantDetails, setVariantDetails] = useState([]);
console.log(materail);
  async function fetchMainCategory() {
    try {
      const res = await axios.get(`${url}${endPoint}`);
      const varaintRes = await axios.get(url + varaintEnd + pId);
      // console.log(varaintRes.data.data.color)
      setMetal(varaintRes.data.data.material);
      // setDefaultColor(varaintRes.data.data.color)
      setColor(varaintRes.data.data.color)
    //   setMaterailValue(varaintRes.data.data.material);
      setVariantDetails(varaintRes.data.data);
      setMainCategory(res.data.data);
      // console.log(variantDetails)
    } catch (err) {
      // console.log(err)
      console.log(err);
      setMainCategory([]);
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
    fetchMainCategory();
  }, []);
  function emptyState() {
    // setColorId('')
    setSize("");
    setDiscount("");
    setPrice("");
    setStock("");
  }
  
  async function handleVariant(e) {
    setLoading(true);
    e.preventDefault();
    // const productId = await getProductId()
    console.log("colorId",color)

    try {
      const mainRes = await axios.post(url + variantProEndd, {
        minimum_order: minimumOrder,
        material: materail,
        product_width: product_width,
        product_heigth: product_heigth,
        product_weight: product_weight,
        product_depth: product_depth,
        package_length: package_length,
        package_breadth: package_breadth,
        package_heigth: packageHeigth,
        package_weight: package_weight,
        manufacturer_details: manufacturing,
        packer_details: packing,
        country: "India",
        color: colorId,
        size: size,
        price: price,
        discount: discount,
        manualPrice: disPrice,
        p_status: false ,
        productImagesId: color,
        weight: "4k",
        stock: stock,
      });
      // setVariantId(mainRes.data.data)

      alert(mainRes.data.message);
    } catch (err) {
      // console.log(err)
      alert(err.response.data.message);
    }
    setLoading(false);
    // uploadStock()
    emptyState();
  }

  async function fetchMetal(category) {
    try {
      const matRes = await axios.get(url + matEnd + category);

      // console.log("12344",matRes.data)

      setMaterailValue(matRes.data.data);
    } catch (err) {
      console.log(err);
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

  async function handleCategory(e) {
    setCategory(e.target.value);
    handleColor(e.target.value)
    handleSize(e.target.value);
    await fetchMetal(e.target.value);
  }

  async function handleColor(val) {
    console.log("val",val);
    try {
      const colorRes = await axios.get(`${url}${getColor}${val}`);
      console.log("color",colorRes.data.data)
      setSubColor(colorRes.data.data);
      setIsSku(false);
    } catch (err) {
      // console.log(err)
      if (err.response.data.message === "SKU  is Not Found ") {
        setIsSku(true);
      }
    }
  }
  useEffect(()=>{},[])

  async function handleSize(value) {
    try {
      const sizeRes = await axios.get(`${url}${getSize}${value}`);
      setSubSize(sizeRes.data.data);
      // console.log(subColor)
    } catch (err) {
      // console.log(err)/
      alert(err.response.data.message);
    }
  }

  return (
    <>
      <MainCategory>
        <div className="pagetitle">
          <h1>Edit Variant</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Edit Variant</li>
            </ol>
          </nav>
        </div>

        {!isLoading ? (
          <div className="seo-form-bg mt-2">
            <h4 className="text-center text-primary mb-3">
              <b>Edit Variant</b>
            </h4>

            <div className="container">
              <form onSubmit={handleVariant}>
                <div className="row">
                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold">Category :</label>
                    <select
                      className="form-select in-form-box"
                      aria-label="Default select Category"
                      value={variantDetails.category}
                      required
                      onChange={(e) => {
                        handleCategory(e);
                      }}
                    >
                      <option value="">select</option>
                      {mainCategory.map((cate) => {
                        return (
                          <option value={cate.type} key={cate.id}>
                            {cate.type}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold ">SKU Number :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={variantDetails.skuNo}
                        required
                        onChange={(e) => {
                          setSkuNo(e.target.value);
                          // handleColor(e.target.value)
                        }}
                        disabled
                      />
                      {/* {isSku && <span style={{ color: 'red', marginLeft: '8px' }} >Please Enter a Correct SKU Number</span>} */}
                    </div>
                  </div>

                  {/* Price Details */}
                  <h4 className="text-center text-primary mt-5 mb-3">
                    <b>Price Detail</b>
                  </h4>

                  {/* <div className="col-md-6 mt-4">
                                        <label className="pro-fnt-num fw-bold mb-2">Color :</label>
                                        <select className="form-select in-form-box"
                                            aria-label="Default select Category"
                                            value={color}
                                            required
                                            onChange={(e) => {

                                                const selectedColor = e.target.value
                                                setColor(selectedColor)
                                                // console.log(e.target.value)

                                                subColor.map((item) => {
                                                    if (item.id == selectedColor) {
                                                        // console.log(item)
                                                        setImages(item.pictures)
                                                        setColorId(item.color)
                                                    }


                                                })


                                            }}
                                        >
                                            <option value=''>select</option>
                                            {
                                                subColor.length > 0 && subColor.map(item => {
                                                    // console.log(item)
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.color} <span className='colr-span' style={{ backgroundColor: item.name }}></span></option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div> */}

                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold mb-2"> Price :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={variantDetails.price}
                        required
                        onChange={(e) => {
                          if (e.target.value === "") setDisPrice("");
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold mb-2">
                      Discount % :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={variantDetails.discount}
                        required
                        onChange={handleDiscount}
                      />
                      <span>
                        Price After Discount : {variantDetails.manualPrice}
                      </span>
                    </div>
                  </div>

                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold mb-2">
                      {" "}
                      Munimum Order :
                    </label>
                    <br />
                    <div className="">
                      <select
                        className="form-select in-form-box"
                        value={variantDetails.minimumOrder}
                        onChange={(e) => {
                          setMinimumOrder(e.target.value);
                        }}
                      >
                        <option value="">Select Order</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        {/* <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option> */}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mt-4 mb-2">
                    <label className="pro-fnt-num fw-bold mb-2"> Stock :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={variantDetails.stock}
                        required
                        onChange={(e) => {
                          setStock(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  {/* Product Descriptions */}

                  <h4 className="text-center text-primary mt-5 mb-3">
                    <b>Product Description</b>
                  </h4>

                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold mb-2">Color :</label>
                    <select
                      className="form-select in-form-box"
                      aria-label="Default select Category"
                      value={color}
                    
                      onChange={(e) => {
                        const selectedColor = e.target.value;
                        setColor(selectedColor);
                        console.log(e.target.value)

                        subColor.map((item) => {
                          if (item.id == selectedColor) {
                            console.log(item)
                            // setImages(item.pictures);
                            setColorId(item.color);
                          }
                        });
                      }}
                    >
                      <option value="">select</option>
                      <option value={defaultColor}>{defaultColor}</option>

                      
                      {subColor.length > 0 &&
                        subColor.map((item) => {
                          // console.log(item)
                          return (
                            <option value={item.id} key={item.id}>
                              {item.name}
                              <span
                                className="colr-span"
                                style={{ backgroundColor: item.name }}
                              ></span>
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold mb-2">Size :</label>
                    <select
                      className="form-select in-form-box"
                      aria-label="Default select Category"
                      value={size}
                      required
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                    >
                      <option value="">select</option>
                      {subSize.length > 0 &&
                        subSize.map((item) => {
                          return (
                            <option value={item.name} key={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="col-md-6 mt-4 mb-2">
                    <label className="pro-fnt-num fw-bold mb-2">
                      {" "}
                      Height :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={variantDetails.product_heigth}
                        required
                        onChange={(e) => {
                          setProduct_heigth(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4 mb-2">
                    <label className="pro-fnt-num fw-bold mb-2"> Width :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={variantDetails.product_width}
                        required
                        onChange={(e) => {
                          product_setWidth(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4 mb-2">
                    <label className="pro-fnt-num fw-bold mb-2"> Depth :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={variantDetails.product_depth}
                        required
                        onChange={(e) => {
                          product_setDepth(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4 mb-2">
                    <label className="pro-fnt-num fw-bold mb-2">
                      {" "}
                      Weight :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={variantDetails.product_weight}
                        required
                        onChange={(e) => {
                          product_setWeight(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold mb-2">
                      Material :
                    </label>
                    <select
                      className="form-select in-form-box"
                      aria-label="Default select Category"
                      value={variantDetails.materail}
                      required
                      onChange={(e) => {
                        setMaterail(e.target.value);
                      }}
                    >
                      <option value=''>Select Option</option>
                      <option value={metal}>{metal}</option>
                      {matValue.length > 0 &&
                        matValue.map((cate) => {
                          // console.log("cate", cate);
                          return (
                            <option value={cate.name} key={cate.id}>
                              {cate.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  {/* Packaging Details */}

                  <h4 className="text-center text-primary mt-5 mb-3">
                    <b>Package Detail</b>
                  </h4>

                  <div className="col-md-6 mt-4 mb-2">
                    <label className="pro-fnt-num fw-bold mb-2">
                      {" "}
                      Length :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={variantDetails.package_length}
                        required
                        onChange={(e) => {
                          set_package_length(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4 mb-2">
                    <label className="pro-fnt-num fw-bold mb-2">
                      {" "}
                      Height :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={variantDetails.package_heigth}
                        required
                        onChange={(e) => {
                          setPackageHeight(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4 mb-2">
                    <label className="pro-fnt-num fw-bold mb-2">
                      {" "}
                      Breadth:
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={variantDetails.package_breadth}
                        required
                        onChange={(e) => {
                          set_package_breadth(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4 mb-2">
                    <label className="pro-fnt-num fw-bold mb-2">
                      {" "}
                      Weight :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={variantDetails.package_weight}
                        required
                        onChange={(e) => {
                          set_package_weight(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  {/* Manufacturing Details */}
                  <h4 className="text-center text-primary mt-5 mb-3">
                    <b>Manufacturing Details</b>
                  </h4>

                  <div className="col-md-3 mt-4"></div>
                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold mb-2">
                      Country :
                    </label>
                    <br />
                    <div className="">
                      <input
                        type="text"
                        className="form-control in-form-box"
                        placeholder="India"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-4"></div>

                  <div className="col-md-6 mt-4 mb-2">
                    <label className="pro-fnt-num fw-bold mb-2">
                      {" "}
                      Manufacturing Details :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={variantDetails.manufacturer_details}
                        required
                        onChange={(e) => {
                          setManufacturing(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4 mb-2">
                    <label className="pro-fnt-num fw-bold mb-2">
                      {" "}
                      Packing Details :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={variantDetails.packer_details}
                        required
                        onChange={(e) => {
                          setPacking(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-3 sumbit-btn">
                    <button
                      className="px-5 py-2 bg-primary text-white rounded border-0 mt-4 w-100"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <div className="">
                    {images.length > 0 &&
                      images.map((file, index) => (
                        <img
                          key={index}
                          src={url + "images/" + file}
                          alt={`Product Image ${index}`}
                          className="multiImage"
                        />
                      ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </MainCategory>
    </>
  );
};

export default EditVariant;
