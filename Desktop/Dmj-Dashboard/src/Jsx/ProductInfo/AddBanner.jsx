import React, { useEffect, useState } from "react";
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./banner.css";
import { singleImage } from "../../Js/uploadImg";
import Loader from "../loader/Loader";


const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint2 = 'api/v1/banner';
const getMainEndPoint = 'api/v1/category/maincategory';
const endPoint = 'api/v1/category/maincategory';
const sizeEnd = 'api/v1/size/type/';
const colorEnd = 'api/v1/colour/type/';
const postEndPoint = 'api/v1/products';
const subSubEndPoint = 'api/v1/category/subcategory/'

const headers = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}

function AddBanner() {

    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [type, setType] = useState('');
    const [mainCategory, setMainCategory] = useState([])


    const [parentValue, setParentValue] = useState('')

    const [subSubCate, setSubSubCateOption] = useState([])
    const [subSubValue, setSubSubValue] = useState('')

    const [category, setCategory] = useState([]);
    const [cateOption, setCategoryOption] = useState('')

    const [subCat, setSubCat] = useState([]);
    const [subCatOption, setSubCatOtion] = useState('');




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
            // console.log(res)
            setCategory(res.data.data)
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

    async function getSubSubCate(value) {
        try {
            const res = await axios.get(url + subSubEndPoint + value)
            // console.log(res.data.data)
            if (!res.data.data) {
                setSubSubCateOption([])
            }
            else {
                setSubSubCateOption(res.data.data)
            }

        }
        catch (err) {
            console.log(err)
            setSubSubCateOption([])
        }
    }



    const handleImage = async (e) => {
        setLoading(true)
        e.preventDefault();
        const res = await singleImage(image)
        console.log(res)
        try {
            const res = await singleImage(image)
            const upRes = await axios.post(url + endPoint2, {
                "image": res,
                "typeName": parentValue,
            })
            alert(upRes.data.message)
        }
        catch (err) {
            console.log(err)
        }
        setImage('')
        setLoading(false)
    };

    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Add Banner</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Add Banner</li>
                        </ol>
                    </nav>
                </div>
                {
                    isLoading ? <Loader /> :
                        <div className="seo-form-bg">
                            <h4 className="text-center text-primary">
                                <b>Banner</b>
                            </h4>
                            <div className="container">
                                <form onSubmit={handleImage}>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            {image && (
                                                <div className="row justify-content-center mt-4">
                                                    <div className="col-md-6">
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            alt="Preview"
                                                            className="img-fluid w-100"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="col-md-12 mt-3">
                                                <label className="form-label pro-fnt-num fw-bold mb-2">
                                                    Main Category
                                                </label>
                                                <select className="form-select in-form-box w-100"
                                                    value={cateOption}
                                                    onChange={(e) => {
                                                        if (e.target.value == '') {
                                                            setSubSubValue('')
                                                            setSubCatOtion('')
                                                        }
                                                        setParentValue(e.target.value)
                                                        getSubcategory(e.target.value)
                                                        setCategoryOption(e.target.value)
                                                        setSubSubValue('')
                                                    }}
                                                    required
                                                >
                                                    <option value=''>Select Option</option>
                                                    {
                                                        category.length > 0 && category.map((cate) => {
                                                            return (
                                                                <option value={cate.type} key={cate.id} >{cate.type}</option>
                                                            )

                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-md-12 mt-3">
                                                <label className="form-label pro-fnt-num fw-bold">
                                                    Parent Sub Category
                                                </label>
                                                <select className="form-select in-form-box w-100"
                                                    value={subCatOption}
                                                    onChange={(e) => {
                                                        if (e.target.value == '') {
                                                            setSubSubCateOption('')
                                                        }
                                                        const selectedIndex = e.target.selectedIndex;
                                                        const selectedOption = e.target.options[selectedIndex];
                                                        const selectedKey = selectedOption.getAttribute('name');
                                                        setParentValue(selectedKey)

                                                        setSubCatOtion(e.target.value)
                                                        getSubSubCate(e.target.value)
                                                        // console.log(e)
                                                        // console.log(parent)
                                                    }}

                                                >
                                                    <option value=''>Select Any Category</option>
                                                    {

                                                        subCat.length > 0 && subCat.map((cate) => {
                                                            // console.log(cate)
                                                            return (
                                                                <option value={cate.id} key={cate.id} name={cate.type}>{cate.type}</option>
                                                            )

                                                        })

                                                    }
                                                </select>
                                            </div>

                                            <div className="col-md-12 mt-3">
                                                <label className="form-label pro-fnt-num fw-bold">
                                                    Sub Category
                                                </label>
                                                <select className="form-select in-form-box w-100"
                                                    value={subSubValue}
                                                    onChange={(e) => {
                                                        if (e.target.value == '') {
                                                            setSubCatOtion('')
                                                        }
                                                        const selectedIndex = e.target.selectedIndex;
                                                        const selectedOption = e.target.options[selectedIndex];
                                                        const selectedKey = selectedOption.getAttribute('name');
                                                        setParentValue(selectedKey)
                                                        // setSubCatOtion(e.target.value)
                                                        setSubSubValue(e.target.value)
                                                        setParentId(e.target.value)
                                                        // console.log(e)
                                                        // console.log(parent)
                                                    }}

                                                >
                                                    <option value=''>Select Any Category</option>
                                                    {

                                                        subSubCate.length > 0 && subSubCate.map((cate) => {
                                                            // console.log(cate)
                                                            return (
                                                                <option value={cate.id} key={cate.id} name={cate.type}>{cate.type}</option>
                                                            )

                                                        })

                                                    }
                                                </select>
                                            </div>

                                            <div className="col-md-12">
                                                <label className="form-label mt-3 la-font-sz fw-bold mb-2">Image</label>
                                                <input
                                                    type="file"
                                                    accept="images/*"
                                                    className="form-control cate-input-box"
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <button className="px-5 py-2 bg-primary text-white rounded border-0 mt-4 w-100" type="submit">
                                                    Submit
                                                </button>
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

export default AddBanner;