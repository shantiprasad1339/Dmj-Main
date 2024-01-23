import React, { useEffect, useState } from "react";
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import './color.css';
import axios from "axios";
import Loader from "../loader/Loader";
// import Loader from "../loader/Loader";
import { SketchPicker } from 'react-color';


const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/colour';
const getMainEndPoint = 'api/v1/category/maincategory';

function AddColor() {

  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [isLoading, setLoading] = useState(false)

  const [mainCategory, setMainCategory] = useState([])


  const [selectedColor, setSelectedColor] = useState('');

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



  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };




  async function handleColor(e) {
    e.preventDefault()
    setLoading(true)


      try {
        const res = await axios.post(url + endPoint, {
          "name": selectedColor,
          "type": type
        });
        // console.log(res)
        alert(res.data.message)
      }
      catch (err) {
        console.log(err)
      }


    // setColor('')
    // setType('')
    setLoading(false)
  }
  return (
    <>
      <MainCategory>

        <div className="pagetitle">
          <h1>Add Color</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Add Color</li>
            </ol>
          </nav>
        </div>

        {/* <Loader/> */}
        {!isLoading ? <div className="seo-form-bg">
          <h4 className="text-center text-primary"><b>Color</b></h4>
          <div className="container">
            <form onSubmit={handleColor}>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="col-md-12">
                    <label className="form-label mt-3 la-font-sz fw-bold">
                      Main Category
                    </label>
                    <select className="form-select cate-input-box w-100"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value)
                        console.log(e.target.value)
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
                  {/* 
                  <div className="col-md-12">
                    <label className="form-label mt-3 la-font-sz fw-bold">
                      Select Color
                    </label>
                    <SketchPicker
                      color={selectedColor}
                      onChangeComplete={handleColorChange}
                    />
                  </div> */}
                  <div className="col-md-12">
                    <label className="form-label mt-3 la-font-sz fw-bold mb-2">Color</label>
                    <input type="text" className="form-control cate-input-box"
                      value={selectedColor}
                      onChange={(e) => { setSelectedColor(e.target.value) }}
                      required
                    />
                  </div>

                  {/* <div className="col-md-4">
                    <label className="form-label mt-3 la-font-sz fw-bold mb-2">Selected Color</label>
                    <div
                      className="selected-color-box"
                      style={{ backgroundColor: selectedColor }}
                    >
                      {selectedColor}
                    </div>
                  </div> */}

                  {/* <div className="col-md-12">
                    <label className="form-label mt-3 la-font-sz fw-bold mb-2">Type</label>
                    <input type="text" className="form-control cate-input-box"
                      value={type}
                      onChange={(e) => { setType(e.target.value) }}
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
          : <Loader />
        }

      </MainCategory>
    </>
  );
}

export default AddColor;