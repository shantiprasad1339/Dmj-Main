import React, { useState, useEffect } from "react";
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import './size.css';
import axios from "axios";
import Loader from "../loader/Loader";

const url = 'https://api.diwamjewels.com/DMJ/'

const getMainEndPoint = 'api/v1/category/maincategory';

const materialEnd = 'api/v1/metal/add';


function AddMaterial() {

  const [mainCategory, setMainCategory] = useState([])
  const [materialName, setMaterialName] = useState('')
  const [category, setCategory] = useState("");
  const[isLoading,setLoading] = useState(false)


  async function handleMaterial(e) {
    setLoading(true)
    e.preventDefault()
    // console.log(mainCategory ,materialName)
    try {
      const matRes = await axios.post(url + materialEnd, {
        "name": materialName,
        "type": category,
      })
      // console.log(matRes)
      alert(matRes.data.message)
    }
    catch (err) {
      alert(err.response.data.message)
    }

    setLoading(false)

  }


  async function fetchMainCategory() {
    try {
      const res = await axios.get(`${url}${getMainEndPoint}`)
      setMainCategory(res.data.data)
    }
    catch (err) {
      // console.log(err)
      console.log(err)
      setMainCategory([])
    }
  }




  useEffect(() => {
    fetchMainCategory()
  }, [])

  return (
    <>
      <MainCategory>

        <div className="pagetitle">
          <h1>Add Material</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Add Material</li>
            </ol>
          </nav>
        </div>
{ isLoading?<Loader/>:
        <div className="seo-form-bg">
          <h4 className="text-center text-primary"><b>Add Material</b></h4>
          <div className="container">
            <form onSubmit={handleMaterial}>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="col-md-12 mt-4">
                    <label className="pro-fnt-num fw-bold mb-2">Category :</label>
                    <select className="form-select in-form-box"
                      aria-label="Default select Category"
                      value={category}
                      required
                      onChange={(e) => {
                        setCategory(e.target.value)
                      }}
                      
                    >
                      <option value=''>Select</option>
                      {
                        mainCategory.length > 0 && mainCategory.map((cate) => {
                          return (
                            <option value={cate.type} key={cate.id}>{cate.type}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label mt-3 la-font-sz fw-bold mb-2">Material Name</label>
                    <input type="text" className="form-control cate-input-box"
                      value={materialName}
                      required
                      onChange={(e) => { setMaterialName(e.target.value) }}
                    />
                  </div>


                  <div className="col-md-12">
                    <button className="px-5 py-2 bg-primary text-white rounded border-0 mt-4 w-100" type="submit">Submit</button>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>}

      </MainCategory>
    </>
  );
}

export default AddMaterial;