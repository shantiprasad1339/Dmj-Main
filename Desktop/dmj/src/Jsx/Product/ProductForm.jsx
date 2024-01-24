import { useEffect, useState } from "react";
import "./productform.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { addColor, addProductInfo, addSize } from "../../redux/productSlice";
import SeoForm from "./SeoForm";
// import UploadImg from "./UploadImg";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/category/maincategory";
const sizeEnd = "api/v1/size/type/";
const colorEnd = "api/v1/colour/type/";
const postEndPoint = "api/v1/products";
const subSubEndPoint = "api/v1/category/subcategory/";

const header = {
  "Content-Type": "multipart/form-data",
};

function ProductForm() {
  const [skuNo, setSkuNo] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [slug, setSlug] = useState("");
  const [sub_SubCate, setSubSubCate] = useState("");
  const [mainSubSubCate, setMainSubSubCate] = useState([]);
  const [mainSubSubValue, setMainSubSubValue] = useState();

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [isAcitveTab, setIsActiveTab] = useState("mainform");
  const [disPrice, setDisPrice] = useState("");

  const [category, setCategory] = useState([]);
  const [cateOption, setCategoryOption] = useState("");

  const [subCat, setSubCat] = useState([]);
  const [subCatOption, setSubCatOtion] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [subSubCate, setSubSubCateOption] = useState([]);
  const [subSubValue, setSubSubValue] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [parent, setParentId] = useState("");
  console.log(parent);
  const navigate = useNavigate();

  async function fetchMainCate() {
    try {
      const res = await axios.get(url + endPoint);
      // console.log(res)
      setCategory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchMainCate();
  }, []);
 
  async function getSubcategory(val) {
    try {
      const subCatRes = await axios.get(url + endPoint + "Name/" + val);
      // console.log(subCatRes.data);
      if (subCatRes.data.data === null) {
        setSubCat([]);
      } else {
        setSubCat(subCatRes.data.data);
      }
    } catch (err) {
      console.log(err);
      setSubCat([]);
    }
  }

  const seoInfo = useSelector((state) => state.product.seoInfo.payload);
  // const color = useSelector(state => state.product.color.payload)
  // const size = useSelector(state => state.product.size.payload)
  const productInfo = useSelector((state) => state.product.productInfo.payload);

  async function handleProduct(e) {
    e.preventDefault();

    const model = {
      name: productInfo[0].name,
      type: productInfo[0].type,
      sku: productInfo[0].skuNo,
      // "price": parPrice,
      // "discount": productInfo[0].discount,
      p_status: 1,
      description: productInfo[0].des,
      slug: "ay",
      seo_title: seoInfo[0].seoTitle,
      seo_description: seoInfo[0].seoTitle,
      categoryId: productInfo[0].subcat,
    };

    const formdata = new FormData();
    // console.log(prodImg)
    // console.log(thumbImg)

    prodImg.forEach((file) => {
      formdata.append("pictures", file);
    });
    // formdata.append("pictures", thumbImg)

    formdata.append("thumbImage", thumbImg);

    formdata.append("model", JSON.stringify(model));

    try {
      const res1 = await axios.post(url + postEndPoint, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res1);
    } catch (err) {
      console.log(err);
    }
  }

  // function onSelectOpt(val, fn) {
  //   fn(val);
  // }

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

  console.log(productName,skuNo,status,description,parent,seoTitle)
  async function addProductInfo() {
    setLoading(true);
    try {
      const proRes = await axios.post(url + postEndPoint, {
        name: productName,
        // "type": subCat,
        sku: skuNo,
        p_status: status,
        description: description,
        slug: seoTitle,
        seo_title: seoTitle,
        seo_description: seoDescription,
        categoryId: parseInt(parent),
        search_keywords: searchKeyword,
      });

      if (proRes.data.message === "successfully added") {
        alert("Product Added Successfully");
        navigate("/addvariantimages");
      }
    } catch (err) {
      // console.log(err)
      alert(err.response.data.message);
    }
    setLoading(false);
  }

  async function getSubSubCate(value) {
    try {
      const res = await axios.get(url + subSubEndPoint + value);
      // console.log(res.data.data)
      if (!res.data.data) {
        setSubSubCateOption([]);
      } else {
        setSubSubCateOption(res.data.data);
      }
    } catch (err) {
      console.log(err);
      setSubSubCateOption([]);
    }
  }
  async function getMainSubSubCate(value) {
    try {
      const res = await axios.get(url + subSubEndPoint + value);
      // console.log(res.data.data)
      if (!res.data.data) {
        setMainSubSubCate([]);
      } else {
        setMainSubSubCate(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  function handleProductDetails(e) {
    e.preventDefault();
    addProductInfo();
  }
  // console.log(mainSubSubCate);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <form className="container mt-2" onSubmit={handleProductDetails}>
            {/* <div className="pro-btn-add-1">
          <button className="up-img-btn" type="submit" >Submit All Details</button>
        </div> */}

            <div style={{ position: "relative" }}>
              
              <div className="mb-4 row mt-4">
                {/* <div className="pro-btn-add mb-3">
                      <button className="up-img-btn" onClick={() => handleProductDetails()}>Add Product Details</button>
                    </div> */}

                <div className="col-md-6 mt-3">
                  <label className="form-label pro-fnt-num fw-bold mb-2">
                    Category
                  </label>
                  <select
                    className="form-select in-form-box w-100"
                    value={cateOption}
                    onChange={(e) => {
                      getSubcategory(e.target.value);
                      setCategoryOption(e.target.value);
                    }}
                    required
                  >
                    <option value="">Select Option</option>
                    {category.length > 0 &&
                      category.map((cate) => {
                        
                        return (
                          <option value={cate.type} key={cate.id}>
                            {cate.type}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="col-md-6 mt-3">
                  <label className="form-label pro-fnt-num fw-bold">
                    Main Category
                  </label>
                  <select
                    className="form-select in-form-box w-100"
                    value={subCatOption}
                    onChange={(e) => {
                      if (e.target.value == "") {
                        setSubSubCateOption("");
                      }

                      setSubCatOtion(e.target.value);
                      getSubSubCate(e.target.value);
                      // console.log(parent)
                    }}
                    required
                  >
                    <option value="">Select Any Category</option>
                    {subCat.length > 0 &&
                      subCat.map((cate) => {
                        // console.log(cate)
                        return (
                          <option value={cate.id} key={cate.id}>
                            {cate.type}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="col-md-6 mt-3">
                  <label className="form-label pro-fnt-num fw-bold">
                    Parent Sub Category
                  </label>
                  <select
                    className="form-select in-form-box w-100"
                    value={subSubValue}
                    onChange={(e) => {
                      if (e.target.value == "") {
                        setSubCatOtion("");
                      }
                      // setSubCatOtion(e.target.value)
                      getMainSubSubCate(e.target.value);
                      setSubSubValue(e.target.value);
                      setParentId(e.target.value);
                      // console.log(e)
                      // console.log(parent)
                    }}
                  >
                    <option value="">Select Any Category</option>
                    {subSubCate.length > 0 &&
                      subSubCate.map((cate) => {
                        // console.log(cate)
                        return (
                          <option value={cate.id} key={cate.id}>
                            {cate.type}
                          </option>
                        );
                      })}
                  </select>
                </div>

                {/* <div className="col-md-6">
                    <label className="pro-fnt-num fw-bold mt-3 mb-2">Slug :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}.0

                        required
                      />
                    </div>
                  </div> */}

                <div className="col-md-6 mt-3">
                  <label className="form-label pro-fnt-num fw-bold">
                    Sub Category
                  </label>
                  <select
                    className="form-select in-form-box w-100"
                    value={mainSubSubValue}
                    onChange={(e) => {
                      if (e.target.value == "") {
                        setParentId("");
                      }

                      setParentId(e.target.value);
                     setSubSubValue(e.target.value)
                    }}
                  >
                    <option value="">Select Any Category</option>
                    {mainSubSubCate.length > 0 &&
                      mainSubSubCate.map((cate) => {
                        console.log(cate.id);
                           return (
                          <option value={cate.id} key={cate.id}>
                            {cate.type}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="col-md-6 mt-3">
                  <label className="pro-fnt-num fw-bold mb-2">
                    SKU Number :
                  </label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={skuNo}
                      onChange={(e) => setSkuNo(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <label className="pro-fnt-num fw-bold mb-2">
                    Product Name :
                  </label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="pro-fnt-num mt-3  fw-bold mb-2">
                    Search Keyword :
                  </label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                  <label className="pro-fnt-num fw-bold mb-2">Status</label>
                  <select
                    className="form-select in-form-box"
                    aria-label="Default select Category"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    required
                  >
                    <option value="">Select</option>
                    <option value="true">Active</option>
                    <option value="false">Disable</option>
                  </select>
                </div>

                {/* <div className="col-md-4 mt-3">
                      <Size
                        sizeInfo={subSize}
                      />
                    </div>

                    <div className="col-md-4 mt-3">
                      <Color
                        colorInfo={subColor}
                      />
                    </div> */}
                <div className="col-md-12 mt-3">
                  <label className="pro-fnt-num fw-bold mb-2">
                    Description :
                  </label>
                  <br />
                  <div className="">
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={(value) => setDescription(value)}
                      required
                    ></ReactQuill>
                  </div>
                </div>

                <div className="container">
                  <div className="mb-4 row mt-4">
                    <div className="col-md-12">
                      <label className="pro-fnt-num fw-bold mb-2">
                        SEO Title :
                      </label>
                      <br />
                      <div className="">
                        <input
                          className="form-control in-form-box"
                          type="text"
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6"></div>

                    <div className="col-md-12 mt-3">
                      <label className="pro-fnt-num fw-bold mb-2">
                        SEO Description :
                      </label>
                      <br />
                      <div className="">
                        <textarea
                          className="form-control in-form-box"
                          value={seoDescription}
                          onChange={(e) => setSeoDescription(e.target.value)}
                          rows="4"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-3"></div>

                    {/* <div className="col-md-12 seo-submit-btn">
                            <button className="seo-btn btn btn-primary" onClick={() => handleSeoSubmit()}>Submit SEO</button>
                        </div> */}
                  </div>
                </div>

                <div className="col-md-12 mt-3 d-flex justify-content-center">
                  <button className="btn">Add Product Details</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

// const MultiSelect = (defValue, option, setValue) => {
//   return (
//     <>
//       <div className="col-md-4 mt-3">
//         <label className="pro-fnt-num fw-bold">Size</label>
//         <Select
//           defaultValue={defValue}
//           onChange={setValue}
//           options={option}
//           isMulti
//         />
//       </div>
//     </>
//   )
// }

const Size = ({ sizeInfo }) => {
  const [size, setSize] = useState([]);

  const dispatch = useDispatch();

  const handleSizeChange = async (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSize(selectedValues);

    dispatch(addSize(selectedValues));
  };

  return (
    <>
      <label className="pro-fnt-num fw-bold mb-2">Size</label>
      <Select
        defaultValue={size}
        onChange={handleSizeChange}
        options={sizeInfo}
        isMulti
      />
    </>
  );
};

const Color = ({ colorInfo }) => {
  const [colors, setColors] = useState([]);

  const dispatch = useDispatch();

  const handleSizeChange = async (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);

    setColors(selectedValues);
    dispatch(addColor(selectedValues));
  };

  return (
    <>
      <label className="pro-fnt-num fw-bold mb-2">Color</label>
      <Select
        defaultValue={colors}
        onChange={handleSizeChange}
        options={colorInfo}
        isMulti
      />
    </>
  );
};

export default ProductForm;
export { Size, Color };
