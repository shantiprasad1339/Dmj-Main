import React, { useState, useEffect } from "react";
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import './size.css';
import axios from "axios";


const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/size';

const getMainEndPoint = 'api/v1/category/maincategory'

function AddSize() {

  const [size, setSize] = useState('')
  const [type, setType] = useState('')
  // const [weight, setWeight] = useState('')
  // const [materialType, setMaterialType] = useState('')
  // const [price, setPrice] = useState('')
  const [mainCategory, setMainCategory] = useState([])
  const [subCategory, setSubCategory] = useState('')

  async function handleSize(e) {
    e.preventDefault()
    // console.log(size, type, subCategory)

    try {
      const res = await axios.post(url + endPoint, {
        "name": size,
        "type": type
      });
      alert(res.data.message)
      console.log(res.data)
    }
    catch (err) {
      console.log(err)
    }



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


  useEffect(() => {
    getMainCate()
  }, [])



  return (
    <>
      <MainCategory>

        <div className="pagetitle">
          <h1>Add Size</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Add Size</li>
            </ol>
          </nav>
        </div>

        <div className="seo-form-bg">
          <h4 className="text-center text-primary"><b>Size</b></h4>
          <div className="container">
            <form onSubmit={handleSize}>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="col-md-12">
                    <label className="form-label mt-3 la-font-sz fw-bold mb-2">Type</label>
                    <select className="form-select cate-input-box w-100"
                      value={subCategory}
                      onChange={(e) => {
                        // setParentId(e.target.value)
                        setSubCategory(e.target.value)
                        setType(e.target.value)
                        // console.log(parent)
                      }}
                      required
                    >
                      <option value="">Select Option</option>
                      {
                        mainCategory.map((category) => {
                          return (
                            <option value={category.type} key={category.id}>{category.type}</option>
                          )

                        })
                      }
                    </select>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label mt-3 la-font-sz fw-bold mb-2">Size</label>
                    <input type="text" className="form-control cate-input-box"
                      value={size}
                      onChange={(e) => { setSize(e.target.value) }}
                      required
                    />
                  </div>

                  {/* <div className="col-md-12">
                  <label className="form-label mt-3 la-font-sz">Weight</label>
                  <input type="text" className="form-control cate-input-box"
                    value={weight}
                    onChange={(e) => { setWeight(e.target.value) }}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label mt-3 la-font-sz">Material Type</label>
                  <input type="text" className="form-control cate-input-box"
                    value={materialType}
                    onChange={(e) => { setMaterialType(e.target.value) }}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label mt-3 la-font-sz">Price</label>
                  <input type="number" className="form-control cate-input-box"
                    value={price}
                    onChange={(e) => { setPrice(e.target.value) }}
                  />
                </div> */}



                  <div className="col-md-12">
                    <button className="px-5 py-2 bg-primary text-white rounded border-0 mt-4 w-100" type="submit">Submit</button>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>

      </MainCategory>
    </>
  );
}

export default AddSize;