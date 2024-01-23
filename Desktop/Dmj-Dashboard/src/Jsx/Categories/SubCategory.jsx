import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import MainCategory from "../../Dashboard/Leftcategory/MainCategory";
import { useEffect, useState } from "react";
import axios from "axios";
import { singleImage } from "../../Js/uploadImg";
import Loader from "../loader/Loader";




const getMainEndPoint = 'api/v1/category/maincategory';
const getSubCateEnd = 'api/v1/category/subcategory/'
const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/category/maincategory';
const subPost = 'api/v1/category';
const subSubEndPoint = "api/v1/category/subcategory/";

const SubCategory = () => {
  const [subCategory, setSubCategory] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [slug, setSlug] = useState('')
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDes, setSeoDes] = useState('')
  const [image, setImage] = useState('')
  const [parent, setParentId] = useState('')
  const [img, setImg] = useState('')
  const [subCate, setSubCate] = useState([])
  const [subCat, setSubCat] = useState([]);
  const [subCatOption, setSubCatOtion] = useState('')
  const [category, setCategory] = useState([]);
  const [cateOption, setCategoryOption] = useState('')

  const [isLoading, setLoading] = useState(false)

  const [mainCategory, setMainCategory] = useState([])

  const [subsubcate, setSubSubCat] = useState([])
  const[subSubCateOtion,setSubSubOption] = useState('')

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setImg(file)
  };



  async function handleSubCategory(e) {
    e.preventDefault();
    setLoading(true)
    const tknImg = await singleImage(img)

    // formdata.append("image", img)
    // console.log(tknImg)
    // console.log(parent)

    let model = {
      "name": name,
      "type": type,
      "slug": seoTitle,
      "seo_title": seoTitle,
      "seo_description": seoDes,
      "parent": parseInt(parent),
      "image": tknImg,
    }

    // console.log(model)

    // formdata.append('model', model)

    try {
      const res = await axios.post(url + subPost, model);
      if (res.data.message === 'successfully added') {
        alert("Category Added Successfully")
      }
    }
    catch (err) {
      console.log(err)
      alert(err.response.data.message)
    }



    setLoading(false)
  }


  async function getMainCate() {
    try {
      const resMain = await axios.get(url + getMainEndPoint);
      // console.log(resMain.data.data)
      setMainCategory(resMain.data.data)
      // console.log(mainCategory)
    }
    catch (err) {
      console.log(err)
    }
  }


  async function fetchMainCate() {
    try {
      const res = await axios.get(url + endPoint)
      // console.log(res.data)
      setCategory(res.data.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  async function getSubSubCate(value) {
    // console.log(value)
    try {
      const res = await axios.get(url + subSubEndPoint + value);
      // console.log(res.data.data)
      if (!res.data.data) {
        setSubSubCat([]);
      } else {
        setSubSubCat(res.data.data);
      }
    } catch (err) {
      console.log(err);
      setSubSubCat([]);
    }

  }



  useEffect(() => {
    fetchMainCate()
  }, [])


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



  return (
    <>
      {!isLoading ?
        <div className="seo-form-bg">
          {/* <h4 className="text-center text-primary">
            <b>Add Sub Category</b>
          </h4> */}
          <div className="container">
            <form onSubmit={(e) => { handleSubCategory(e) }}>
              <div className="row">
                {/* <div className="col-md-3"></div> */}
                <div className="col-md-6 mt-3">
                  <label className="form-label pro-fnt-num fw-bold mb-2">
                    Category
                  </label>
                  <select className="form-select in-form-box w-100"
                    value={cateOption}
                    onChange={(e) => {
                      const selectedIndex = e.target.selectedIndex;
                      const selectedOption = e.target.options[selectedIndex];
                      const selectedKey = selectedOption.getAttribute('name');
                      // console.log(selectedKey)
                      setParentId(selectedKey)
                      // const selectedKey = e.target.options[e.target.selectedIndex].getAttribute('key');
                      getSubcategory(e.target.value)
                      setCategoryOption(e.target.value)
                      setSubSubOption('')
                      // console.log(selectedKey)
                    }}
                    required
                  >
                    <option value=''>Select Option</option>
                    {
                      category.length > 0 && category.map((cate) => {
                        return (
                          <option value={cate.type} key={cate.id} name={cate.id}>{cate.type}</option>
                        )

                      })
                    }
                  </select>
                </div>

                <div className="col-md-6 mt-3">
                  <label className="form-label pro-fnt-num fw-bold">
                    Main Category
                  </label>
                  <select className="form-select in-form-box w-100"
                    value={subCatOption}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setCategoryOption('')
                      }
                      setSubCatOtion(e.target.value)
                      setParentId(e.target.value)
                      getSubSubCate(e.target.value)
                      // console.log(e)
                      // console.log(e.target.value)
                    }}

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
                </div>


                <div className="col-md-6 mt-3">
                  <label className="form-label pro-fnt-num fw-bold">
                    Parent Sub Category
                  </label>
                  <select className="form-select in-form-box w-100"
                    value={subSubCateOtion}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setCategoryOption('')
                      }
                      setSubSubOption(e.target.value)
                      setParentId(e.target.value)
                      // console.log(e.target.value)
                      // console.log(e)
                      // console.log(parent)
                    }}

                  >
                    <option value=''>Select Any Category</option>
                    {

                      subsubcate.length > 0 && subsubcate.map((cate) => {
                        // console.log(cate)
                        return (
                          <option value={cate.id} key={cate.id}>{cate.type}</option>
                        )

                      })

                    }
                  </select>
                </div>


                {/* <div className="col-md-3"></div> */}
                <div className="col-md-6">
                  <label className="form-label mt-3 la-font-sz fw-bold mb-2">Name</label>
                  <input type="text" required className="form-control cate-input-box"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label mt-3 la-font-sz fw-bold mb-2">Type</label>
                  <input type="text" required className="form-control cate-input-box"
                    value={type}
                    onChange={(e) => { setType(e.target.value) }}
                  />
                </div>
                {/* <div className="col-md-6">
                  <label className="form-label mt-3 la-font-sz fw-bold mb-2">Slug</label>
                  <input type="text" required className="form-control cate-input-box"
                    value={slug}
                    onChange={(e) => { setSlug(e.target.value) }}
                  />
                </div> */}
                <div className="col-md-12">
                  <label className="form-label mt-3 la-font-sz fw-bold mb-2">Title</label>
                  <input type="text" required className="form-control cate-input-box"
                    value={seoTitle}
                    onChange={(e) => { setSeoTitle(e.target.value) }}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <label className="la-font-sz fw-bold mb-2">Description</label>
                  <br />
                  <div className="">
                    <ReactQuill
                      theme="snow"
                      value={seoDes}
                      onChange={setSeoDes}
                      required
                    ></ReactQuill>
                  </div>
                </div>
                <div className="col-md-12">
                  <label className="form-label mt-3 la-font-sz fw-bold mb-2">Image</label>
                  <input type="file" className="form-control cate-input-box"
                    onChange={handleImageUpload}
                    required
                  />
                </div>
                <div className="col-md-12 text-center">
                  <button type='submit' className="sub-cate-btn">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        :
        <Loader />
      }
    </>
  );
};
export default SubCategory;