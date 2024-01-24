import React, { useState } from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';




function AddBlog() {

    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Add Blog</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Add Blog</li>
                        </ol>
                    </nav>
                </div>

                <BlogForm />

            </MainCategory>
        </>
    );
}



function BlogForm() {  

    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [blogDetails, setBlogDetails] = useState('');
    const [writer, setWriter] = useState('');

    const handleThumbnailImageChange = (e) => {
        setThumbnailImage(e.target.files[0]);
    };

    const handleBannerImageChange = (e) => {
        setBannerImage(e.target.files[0]);
    };

    const handleBlogSubmit = (e) => {
        e.preventDefault();

        const formData = {
            thumbnailImage,
            bannerImage,
            seoTitle,
            seoDescription,
            date,
            title,
            description,
            keywords,
            blogDetails,
            writer,
        };

        console.log(formData);
    };

    return (

        <form className="container mt-2" onSubmit={handleBlogSubmit}>


            <div className="mb-4 row mt-4">

                <div className="col-md-6">
                    <label className="pro-fnt-num fw-bold mb-2">Thumbnail Image ( 450 X 250 ) :</label>
                    <br />
                    <div className="">
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control in-form-box"
                            onChange={handleThumbnailImageChange}
                            required
                        />

                    </div>
                    {thumbnailImage && (
                        <div className="row justify-content-center mt-4">
                            <div className="col-md-6">
                                <img
                                    src={URL.createObjectURL(thumbnailImage)}
                                    alt="Thumbnail Preview"
                                    className="img-fluid w-100"
                                    style={{ maxWidth: '450px', maxHeight: '250px'}}
                                />
                                <label className="mt-2 mb-2">Uploaded Image in 450 X 250 </label>
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-md-6">
                    <label className="pro-fnt-num fw-bold mb-2">Banner Image ( 750 X 350 ) :</label>
                    <br />
                    <div className="">
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control in-form-box"
                            onChange={handleBannerImageChange}
                            required
                        />
                    </div>
                    {bannerImage && (
                        <div className="row justify-content-center mt-4">
                            <div className="col-md-6">
                                <img
                                    src={URL.createObjectURL(bannerImage)}
                                    alt="Banner Preview"
                                    className="img-fluid w-100"
                                    style={{ maxWidth: '750px', maxHeight: '350px' }}
                                />
                                <label className="mt-2 mb-2">Uploaded Image in 750 X 350 </label>
                            </div>
                        </div>
                    )}
                </div>


                <div className="col-md-6 mt-3">
                    <label className="pro-fnt-num fw-bold mb-2">SEO Title :</label><br />
                    <div className="">
                        <input
                            className="form-control in-form-box"
                            type="text"
                            value={seoTitle}
                            onChange={(e) => setSeoTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6 mt-3">
                    <label className="pro-fnt-num fw-bold mb-2">SEO Description :</label><br />
                    <div className="">
                        <textarea
                            className="form-control in-form-box"
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            rows="3"
                            required
                        ></textarea>
                    </div>
                </div>




                <div className="col-md-6 mt-3">
                    <label className="pro-fnt-num fw-bold mb-2">Date :</label>
                    <br />
                    <div className="">
                        <input
                            className="form-control in-form-box"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6 mt-3">
                    <label className="pro-fnt-num fw-bold mb-2">Title :</label>
                    <br />
                    <div className="">
                        <input
                            className="form-control in-form-box"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6 mt-3">
                    <label className="pro-fnt-num fw-bold mb-2">Description :</label>
                    <br />
                    <div className="">
                        <textarea
                            className="form-control in-form-box"
                            rows="3"
                            value={description}
                            onChange={(value) => setDescription(value)}
                            required>

                        </textarea>
                    </div>
                </div>


                <div className="col-md-6 mt-3">
                    <label className="pro-fnt-num fw-bold mb-2">Keywords :</label><br />
                    <div className="">
                        <textarea
                            className="form-control in-form-box"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            rows="3"
                            required
                        ></textarea>
                    </div>
                </div>

                <div className="col-md-12 mt-3">
                    <label className="pro-fnt-num fw-bold mb-2">Blog Details :</label>
                    <br />
                    <div className="">

                        <ReactQuill
                            //   theme="snow"
                            value={blogDetails}
                            onChange={(value) => setBlogDetails(value)}

                            required
                        ></ReactQuill>
                    </div>
                </div>

                <div className="col-md-12 mt-3">
                    <label className="pro-fnt-num fw-bold mb-2">Writer :</label>
                    <br />
                    <div className="">
                        <input
                            className="form-control in-form-box"
                            type="text"
                            value={writer}
                            onChange={(e) => setWriter(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="col-md-12 mt-3 d-flex justify-content-center">
                <button className="btn" type="submit">
                    Add Blog Details
                </button>
            </div>

        </form>

    );
}

export default AddBlog;