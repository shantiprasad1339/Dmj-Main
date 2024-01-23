import React, { useState, useEffect } from "react";
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import '../productInfo/size.css';
import axios from "axios";
import { Color } from '../product/ProductForm'
import './color.css'


const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/size';
const colorEnd = 'api/v1/colour/type/';
const getMainEndPoint = 'api/v1/category/maincategory'

function EditColor() {

    const [subColor, setSubColor] = useState([])
    const [type, setType] = useState('')
    const [mainCategory, setMainCategory] = useState([])
    const [subCategory, setSubCategory] = useState('')

    async function handleSize(e) {
        e.preventDefault()

        // try {
        //     const res = await axios.post(url + endPoint, {
        //         "name": subSize,
        //         "type": type
        //     });
        //     console.log(res)
        // }
        // catch (err) {
        //     console.log(err)
        // }

    }
    async function setProColor(val) {
        // console.log(val)
        try {
            let res = await axios.get(url + colorEnd + val)
            // console.log(res.data.data)
            const updateArray = res.data.data.map(item => ({ ...item, label: item.name, value: item.name }))
            setSubColor(updateArray)
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
                    <h1>Edit Color</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Edit Color</li>
                        </ol>
                    </nav>
                </div>

                <div className="seo-form-bg">
                    <h4 className="text-center text-primary"><b>Edit Color</b></h4>
                    <div className="container">
                        <form onSubmit={handleSize}>
                            <div className="row justify-content-center">
                                <div className="col-md-6">

                                    <div className="col-md-12">
                                        <label className="form-label mt-3 fw-bold">Type</label>
                                        <select className="form-select cate-input-box w-100"
                                            value={subCategory}
                                            onChange={(e) => {
                                                // setParentId(e.target.value)
                                                setSubCategory(e.target.value)
                                                setProColor(e.target.value)

                                            }}
                                        >
                                            <option>Select Any Category</option>
                                            {
                                                mainCategory.map((category) => {
                                                    return (
                                                        <option value={category.type} key={category.id}>{category.type}</option>
                                                    )

                                                })
                                            }
                                        </select>
                                    </div>


                                    <div className="col-md-12 mt-3">
                                        <Color
                                            colorInfo={subColor}
                                        />
                                    </div>


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

export default EditColor;