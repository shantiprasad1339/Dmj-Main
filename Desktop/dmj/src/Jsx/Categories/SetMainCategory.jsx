import React from "react";
// import MainCategory from "../../Dashboard/Leftcategory/MainCategory"
import './category.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useState } from "react";
import { singleImage } from "../../Js/uploadImg";
import Loader from "../loader/Loader";



const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/category';

const SetMainCategory = () => {

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [slug, setSlug] = useState('')
    const [seoTitle, setSeoTitle] = useState('')
    const [seoDes, setSeoDes] = useState('')
    const [img, setImg] = useState('')

    const [isLoading, setLoading] = useState(false)



    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()

        // let formdata = new FormData()
        const tknImg = await singleImage(img)

        // formdata.append("image", img)
        // console.log(tknImg.thum_image)

        let model = {
            "name": name,
            "type": type,
            "slug": seoTitle,
            "seo_title": seoTitle,
            "seo_description": seoDes,
            "parent": 0,
            "image": tknImg,
        }

        // console.log(model)

        // formdata.append('model', model)

        try {
            const res = await axios.post(url + endPoint, model);
            // console.log(res)
            if (res.data.message === 'successfully added') {
                alert("Main Category Added Successfully")
            }
        }
        catch (err) {
            // console.log(err)
            alert(err.response.data.message)
            // alert(err.response.data.detail)
        }


        // setImg('')
        // setName('')
        // setSeoDes('')
        // setSeoTitle('')
        // setSlug('')
        // setType('')
        setLoading(false)
    }



    return (
        <>
            {/* <MainCategory > */}

            {!isLoading ? <div className="seo-form-bg">
                <h4 className="text-center text-primary"><b>Add Main Category</b></h4>
                <div className="container">
                    <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label mt-3 la-font-sz fw-bold mb-2">Name</label>
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control cate-input-box" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mt-3 la-font-sz fw-bold mb-2">Type</label>
                                <input type="text" required value={type} onChange={(e) => setType(e.target.value)} className="form-control cate-input-box" />
                            </div>
                            {/* <div className="col-md-6">
                                <label className="form-label mt-3 la-font-sz fw-bold mb-2">Slug</label>
                                <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className="form-control cate-input-box" />
                            </div> */}

                            <div className="col-md-12">
                                <label className="form-label mt-3 la-font-sz fw-bold mb-2">Title</label>
                                <input type="text" required value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="form-control cate-input-box" />
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
                                <input type="file" onChange={(e) => setImg(e.target.files[0])} className="form-control cate-input-box" required/>
                            </div>
                            <div className="col-md-12 text-center">
                                <button className="sub-cate-btn" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                : <Loader />
            }

            {/* </MainCategory> */}

        </>
    )
}


export default SetMainCategory