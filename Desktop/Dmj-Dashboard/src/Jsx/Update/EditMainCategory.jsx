import React, { useEffect, useMemo, useRef, useState } from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import './category.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import JoditEditor from 'jodit-react';
import { singleImage } from '../../Js/uploadImg';


const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/category/';
const endPoint2 = 'api/v1/category/maincategory';

function EditMainCategory() {


    const editor = useRef(null);
    const editor2 = useRef(null);

    const [seoDes, setSeoDes] = useState('')
    const [alt, setAlt] = useState('')
    const [cateDes, setCateDes] = useState('')
    const [img, setImg] = useState('')
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState('')
    const [parentId, setParentId] = useState('')

    const [cateDetails, setCateDetails] = useState('')


    async function handleSubmit(e) {

        e.preventDefault()

        // const tknImg = await singleImage(img)
        // console.log(cateDetails)

        let model = {
            "name": cateDetails.name,
            "slug": cateDetails.slug,
            "parent": 0,
            "image": img,
            "seo_title": cateDetails.seo_title,
            "seo_description": cateDetails.seo_description,
            "imageUlt": cateDetails.imageUlt,
            "categoryDescription": cateDetails.categoryDescription,
        }

        try {
            const modelRes = await axios.put(url + endPoint + parentId, model);
            alert(modelRes.data.message)
            // console.log(modelRes.data.message)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function fetchMainCate() {
        try {
            const res = await axios.get(url + endPoint2)
            // console.log(res.data)
            setCategory(res.data.data)

        }
        catch (err) {
            console.log(err)
        }
    }



    async function fetchCateDetails(val) {
        try {
            const cateDesRes = await axios.get(url + endPoint + val)
            console.log(cateDesRes.data.data)
            setCateDetails(cateDesRes.data.data)
            setImg(cateDesRes.data.data.image)
        }
        catch (err) {
            console.log(err)
            setCateDetails([])
        }
    }


    useEffect(() => {

        fetchMainCate()
    }, [])



    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Edit Main Category</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Edit Main Category</li>
                        </ol>
                    </nav>
                </div>

                <div className="seo-form-bg">
                    <h4 className="text-center text-primary"><b>Edit Main Category</b></h4>
                    <div className="container">
                        <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label mt-3 la-font-sz fw-bold mb-2">Name</label>
                                    <input type="text" value={cateDetails.name} onChange={(e) => setCateDetails({ ...cateDetails, name: e.target.value })} className="form-control cate-input-box" required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label mt-3 la-font-sz fw-bold mb-2">
                                        Main Category
                                    </label>
                                    <select className="form-select cate-input-box w-100"
                                        value={subCategory}
                                        onChange={(e) => {
                                            setParentId(e.target.value)
                                            setSubCategory(e.target.value); // Set the selected value
                                            fetchCateDetails(e.target.value)
                                            // const selectedOption = e.target.options[e.target.selectedIndex];
                                            // const selectedOptionName = selectedOption.text;
                                            // console.log(selectedOptionName); // Log the selected option's name

                                        }}
                                        required
                                    >
                                        <option value="">Select Option</option>
                                        {
                                            category.length > 0 && category.map((category) => {
                                                return (
                                                    <option value={category.id} key={category.id} name={category.name}>{category.name}</option>
                                                )

                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label mt-3 la-font-sz fw-bold mb-2">Slug</label>
                                    <input type="text" value={cateDetails.slug} onChange={(e) => setCateDetails({ ...cateDetails, slug: e.target.value })} className="form-control cate-input-box" required />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label mt-3 la-font-sz fw-bold mb-2">Title</label>
                                    <input type="text" value={cateDetails.seo_title} onChange={(e) => setCateDetails({ ...cateDetails, seo_title: e.target.value })} className="form-control cate-input-box" required />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="la-font-sz fw-bold">Seo-description</label>
                                    <br />
                                    <div className="">
                                        <JoditEditor
                                            ref={editor2}
                                            value={cateDetails.seo_description}
                                            // config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            //  onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                            onChange={newContent => { setCateDetails({ ...cateDetails, seo_description: newContent }) }}
                                        >

                                        </JoditEditor>
                                        {/* <ReactQuill
                                            theme="snow"
                                            value={seoDes}
                                            onChange={setSeoDes}
                                        ></ReactQuill> */}
                                    </div>
                                </div>
                                <br />
                                <div className="col-md-12 mt-5">
                                    <label className="la-font-sz fw-bold">Category Description</label>
                                    <br />
                                    <div className="">
                                        <JoditEditor
                                            ref={editor}
                                            value={cateDetails.categoryDescription}
                                            // config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            //  onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                            onChange={newContent => { setCateDetails({ ...cateDetails, categoryDescription: newContent }) }}
                                        >

                                        </JoditEditor>

                                    </div>
                                </div>


                                <div className="col-md-12">
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
                                    <label className="form-label mt-3 la-font-sz fw-bold mb-2">Alt Text</label>
                                    <input type="text" value={cateDetails.imageUlt} onChange={(e) => {
                                        setCateDetails({ ...cateDetails, imageUlt: e.target.value })
                                    }} className="form-control cate-input-box" required />
                                </div>
                                <div className="col-md-12 text-center">
                                    <button className="sub-cate-btn" type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </MainCategory>
        </>
    );
}

export default EditMainCategory;