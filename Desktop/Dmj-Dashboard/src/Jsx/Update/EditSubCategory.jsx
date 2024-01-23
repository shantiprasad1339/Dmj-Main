import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import MainCategory from "../../Dashboard/Leftcategory/MainCategory";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { singleImage } from "../../Js/uploadImg";
import Loader from "../loader/Loader";
import JoditEditor, { Jodit } from "jodit-react";
import MainCategory from "../../Dashboard/MainCategory/MainCategory";
import { Link } from "react-router-dom";




const getMainEndPoint = 'api/v1/category/maincategory';
const getSubCateEnd = 'api/v1/category/subcategory/'
const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/category/maincategory';
const subPost = 'api/v1/category'


const EditSubCategory = () => {

  return (
    <>
      <MainCategory>

        <div className="pagetitle">
          <h1>Edit Sub Category</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Edit Sub Category</li>
            </ol>
          </nav>
        </div>


        <SubCate />
      </MainCategory>
    </>
  )
}

export default EditSubCategory;

const SubCate = () => {

  const editor = useRef(null);
  const editor2 = useRef(null);


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

  const [cateDes, setCateDes] = useState('');

  const [imgAlt, setAlt] = useState('')

  const [isLoading, setLoading] = useState(false)

  const [mainCategory, setMainCategory] = useState([])

  const [subCateValue, setSubCateValue] = useState('')


  const [subSubcate, setSubSubCate] = useState([])


  const [oldData, setOldData] = useState('')

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setImg(file)
  };



  async function handleSubCategory(e) {

    e.preventDefault();
    setLoading(true)
    const tknImg = await singleImage(img)


    let model = {
      "name": oldData.name,
      "slug": oldData.slug,
      "parent": oldData.parent,
      "image": img,
      "seo_title": oldData.seo_title,
      "seo_description": oldData.seo_description,
      "imageUlt": imgAlt,
      "categoryDescription": cateDes,
    }

    try {
      const modelRes = await axios.put(url + subPost + '/' + oldData.id, model);
      alert(modelRes.data.message)
      // console.log(modelRes.data.message)
    }
    catch (err) {
      console.log(err)
    }

    setLoading(false)
  }


  async function getsubCate(id) {
    try {
      const getRes = await axios.get(url + getSubCateEnd + id)
      if (getRes.data.data) {
        setSubSubCate(getRes.data.data)
      }
      else {
        setSubSubCate([])
      }
    }
    catch (err) {
      console.log(err)
      setSubSubCate([])
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


  async function getCateData(val) {
    try {
      const res = await axios.get(url + subPost + '/' + val)
      console.log(res.data)
      setOldData(res.data.data)
      setImg(res.data.data.image)
    }
    catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    fetchMainCate()
  }, [])


  async function getSubcategory(val) {
    try {
      const subCatRes = await axios.get(url + endPoint + "Name/" + val)
      // console.log(subCatRes.data)
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
                    Main Category
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
                    Parent Sub Category
                  </label>
                  <select className="form-select in-form-box w-100"
                    value={subCatOption}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setCategoryOption('')
                      }
                      setSubCatOtion(e.target.value)
                      setParentId(e.target.value)

                      getsubCate(e.target.value)


                      getCateData(e.target.value)
                      // console.log(e)
                      // console.log(parent)
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
                {/* <div className="col-md-3"></div> */}

                <div className="col-md-6 mt-3">
                  <label className="form-label pro-fnt-num fw-bold">
                    Sub Category
                  </label>
                  <select className="form-select in-form-box w-100"
                    value={subCateValue}
                    onChange={(e) => {
                      setSubCateValue(e.target.value)
                      // setSubCatOtion(e.target.value)
                      setParentId(e.target.value)
                      // console.log(e)
                      getCateData(e.target.value)
                      // console.log(parent)
                    }}

                  >
                    <option value=''>Select Any Category</option>
                    {

                      subSubcate.length > 0 && subSubcate.map((cate) => {
                        // console.log(cate)
                        return (
                          <option value={cate.id} key={cate.id}>{cate.type}</option>
                        )

                      })

                    }
                  </select>
                </div>



                <div className="col-md-6">
                  <label className="form-label mt-3 la-font-sz fw-bold mb-2">Name</label>
                  <input type="text" required className="form-control cate-input-box"
                    value={oldData.name}
                    onChange={(e) => { setOldData({ ...oldData, name: e.target.value }) }}
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
                    value={oldData.seo_title}
                    onChange={(e) => {  setOldData({ ...oldData, seo_title: e.target.value }) }}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <label className="la-font-sz fw-bold mb-2">Description</label>
                  <br />
                  <div className="">
                    <JoditEditor
                      ref={editor2}
                      value={oldData.seo_description}
                      onChange={(val) =>{  setOldData({ ...oldData, seo_description: val }) }}
                      required
                    ></JoditEditor>
                  </div>
                </div>
                <br />
                <div className="col-md-12 mt-3">
                  <label className="la-font-sz fw-bold mb-2">Category Description </label>
                  <br />
                  <div className="">
                    <JoditEditor
                      ref={editor}
                      value={cateDes}
                      onChange={(val) => setCateDes(val)}
                      required
                    ></JoditEditor>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label mt-3 la-font-sz fw-bold mb-2">Image</label>
                  <input type="file" onChange={async (e) => {
                    const imgVal = e.target.files[0]
                    try {
                      const imgRes = await singleImage(imgVal)
                      setImg(imgRes)
                    }
                    catch (err) {
                      console.log(err)
                    }
                  }} className="form-control cate-input-box" />
                </div>
                <div className="col-md-6">
                  <label className="form-label mt-3 la-font-sz fw-bold mb-2">Image Alt Text</label>
                  <input type="text" required className="form-control cate-input-box"
                    value={imgAlt}
                    onChange={(e) => { setAlt(e.target.value) }}

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

}