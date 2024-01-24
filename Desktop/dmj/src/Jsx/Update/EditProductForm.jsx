import { useEffect, useState } from "react";
import "./productform.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { addColor, addProductInfo, addSize } from "../../redux/productSlice";
// import SeoForm from "../../Jsx/Product/SeoForm";
// import UploadImg from "./UploadImg";
import { useDispatch, useSelector, useStore } from "react-redux";
import Select from 'react-select';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";



const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/category/maincategory';
const sizeEnd = 'api/v1/size/type/';
const colorEnd = 'api/v1/colour/type/';
const postEndPoint = 'api/v1/products'

const header = {
  'Content-Type': 'multipart/form-data',
}

// var proId = localStorage.getItem("editproductId")



function EditProductForm() {

  const { proId } = useParams()

  const [skuNo, setSkuNo] = useState("");
  const [productName, setProductName] = useState("");
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState([]);

  const [subCat, setSubCat] = useState([]);


  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [categoryId, setCategoryId] = useState('')


  const [isLoading, setLoading] = useState(false)


  const [proDetails, setProDetails] = useState([])


  const [productId, setProId] = useState('')
  // const [subcateId, setSubCateId] = useState('')

  // const [thumbImg, setThumbImg] = useState(null);
  // const [prodImg, setProdImg] = useState(null)

  // const [subSize, setSubSize] = useState([])
  // const [subColor, setSubColor] = useState([])

  // const [size, setSize] = useState(null)
  // const [color, setColor] = useState(null)


  const navigate = useNavigate()



  async function fetchMainCate() {
    try {
      const res = await axios.get(url + endPoint)
      // console.log(res)
      setCategory(res.data.data)
    }
    catch (err) {
      console.log(err)
    }
  }


  async function fetchProductData(id) {

    if (id) {
      try {
        const proRes = await axios.get(url + postEndPoint + '/' + proId);
        let proInfo = await proRes.data.data;
        console.log(proInfo)
        setSkuNo(proInfo.sku)
        setProductName(proInfo.name)
        setSearchKeyword(proInfo.search_keywords)
        setStatus(proInfo.p_status)
        setDescription(proInfo.description)
        setSeoTitle(proInfo.seo_title)
        setSeoDescription(proInfo.seo_description)
        // setCategoryOption(proInfo.)
        setCategoryId(proInfo.categoryId)

      }
      catch (err) {
        console.log(err)
      }
    }

  }



  useEffect(() => {
    // proId = localStorage.getItem("editproductId")
    fetchMainCate()
    fetchProductData(proId)
  }, [proId])


  async function getSubcategory(val) {
    try {
      const subCatRes = await axios.get(url + endPoint + "Name/" + val)
      console.log(subCatRes.data)
      if (subCatRes.data.data === null) {
        setSubCat([])
      }
      else {
        setSubCat(subCatRes.data.data)
      }


    }
    catch (err) {
      console.log(err)
      setSubCat([])
    }
  }



  const seoInfo = useSelector(state => state.product.seoInfo.payload)
  // const color = useSelector(state => state.product.color.payload)
  // const size = useSelector(state => state.product.size.payload)
  // const productInfo = useSelector(state => state.product.productInfo.payload)



  async function addProductInfo(e) {
    e.preventDefault()


    setLoading(true)
    console.log(description)
    try {
      const proRes = await axios.put(url + postEndPoint + '/' + proId, {
        "name": productName,
        // "type": subCat,
        "sku": skuNo,
        "p_status": status,
        "description": description,
        "seo_title": seoTitle,
        "seo_description": seoDescription,
        "search_keywords": searchKeyword,
        "categoryId": categoryId
      })

      // console.log(proRes.data)
      if (proRes.data.message === 'Updated SuccessFully') {
        alert("Product Updated Successfully")
        // console.log(seoDescription)
        // navigate('/addvariantimages')

      }
    }
    catch (err) {
      console.log(err)
      // alert(err.response)
    }
    setLoading(false)
  }



  return (
    <>
      {
        isLoading ? <Loader /> :

          <div>

            <form className="container mt-2" onSubmit={addProductInfo} >


              <div style={{ position: 'relative' }}>


                <div className="mb-4 row mt-4">


                  <div className="col-md-6">
                    <label className="pro-fnt-num fw-bold mb-2">SKU Number :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={skuNo}
                        onChange={(e) => setSkuNo(e.target.value)}
                        required
                        disabled
                      />
                    </div>
                  </div>

                  {/* <div className="col-md-6">
                    <label className="pro-fnt-num fw-bold mt-3 mb-2">Slug :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                      />
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <label className="pro-fnt-num mt-3  fw-bold mb-2">Search Keyword :</label><br />
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

                  {/* <div className="col-md-6 ">
                    <label className="form-label mt-3 pro-fnt-num fw-bold">
                      Sub Category
                    </label>
                    <select className="form-select in-form-box w-100"
                      value={subCatOption}
                      onChange={(e) => {

                        setSubCatOtion(e.target.value)
                        // console.log(e)
                        // console.log(parent)
                      }}
                      required
                    >
                      <option value=''>Select Any Category</option>
                      {

                        subCat.length > 0 && subCat.map((cate) => {
                          // console.log(cate)
                          return (
                            <option value={cate.id} key={cate.id}>{cate.type}</option>
                          )

                        })

                      }
                    </select>
                  </div> */}


                  <div className="col-md-6 mt-3">
                    <label className="pro-fnt-num fw-bold mb-2">Product Name :</label>
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





                  <div className="col-md-6 mt-3">
                    <label className="pro-fnt-num fw-bold mb-2">Status</label>
                    <select className="form-select in-form-box"
                      aria-label="Default select Category"
                      value={status}
                      onChange={(e) => { setStatus(e.target.value) }}
                      required

                    >
                      <option value=''>Select</option>
                      <option value='true'>Active</option>
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
                    <label className="pro-fnt-num fw-bold mb-2">Description :</label>
                    <br />
                    <div className="">

                      <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={(value) => {
                          // console.log(value)
                          setDescription(value)
                        }}

                        required
                      ></ReactQuill>
                    </div>
                  </div>

                  <div className="container">
                    <div className="mb-4 row mt-4">
                      <div className="col-md-12">
                        <label className="pro-fnt-num fw-bold mb-2">SEO Title :</label><br />
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
                        <label className="pro-fnt-num fw-bold mb-2">SEO Description :</label><br />
                        <div className="">
                          <textarea
                            className="form-control in-form-box"
                            value={seoDescription}
                            onChange={(e) => {

                              setSeoDescription(e.target.value)
                            }}
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

                  <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={skuNo}
                        onChange={(e) => setSkuNo(e.target.value)}
                        required
                        disabled
                      />
                    </div>

                  <div className="col-md-12 mt-3 d-flex justify-content-center">
                    <button className="btn" type="submit">
                      Update Product Details
                    </button>
                  </div>

                </div>
              </div>
            </form>


          </div>
      }
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
    dispatch(addColor(selectedValues))

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


export default EditProductForm;
export { Size, Color };