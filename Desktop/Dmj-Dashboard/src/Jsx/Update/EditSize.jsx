import React, { useEffect, useState } from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import '../productInfo/size.css';
import axios from "axios";
import { Size } from '../product/ProductForm'


const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/size';
const sizeEnd = 'api/v1/size/type/';
const getMainEndPoint = 'api/v1/category/maincategory'


function EditSize() {

    const [subSize, setSubSize] = useState([])
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

    async function setProSize(val) {
        try {
            let res = await axios.get(url + sizeEnd + val)
            // console.log(res.data.data)
            const updateArray = res.data.data.map(item => ({ ...item, label: item.name, value: item.name }))

            setSubSize(updateArray)
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
                    <h1>Edit Size</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Edit Size</li>
                        </ol>
                    </nav>
                </div>

                <div className="seo-form-bg">
                <h4 className="text-center text-primary"><b>Edit Size</b></h4>
                <div className="container">
                    <form onSubmit={handleSize}>
                        <div className="row justify-content-center">
                            <div className="col-md-6">

                                <div className="col-md-12">
                                    <label className="form-label mt-3 fw-bold mb-2">Type</label>
                                    <select className="form-select cate-input-box w-100"
                                        value={subCategory}
                                        onChange={(e) => {
                                            // setParentId(e.target.value)
                                            setSubCategory(e.target.value)
                                            setProSize(e.target.value)
                                            // console.log(parent)
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
                                    <Size
                                        sizeInfo={subSize}
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

export default EditSize;