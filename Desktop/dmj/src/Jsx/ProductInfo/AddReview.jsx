import React, { useState } from "react";
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';


function AddReview() {

    const [sku, setSku] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [multiSelectedFiles, setMultiSelectedFiles] = useState([]);
    const [productImage, setProductImage] = useState('');

    const [titleError, setTitleError] = useState('');
    const [descError, setDescError] = useState('');


    const handleImageChange = (e) => {
        const filesArray = Array.from(e.target.files);
        setProductImage(filesArray);
        setMultiSelectedFiles(filesArray.map(file => URL.createObjectURL(file)));
    }

    function handleReview(e) {
        e.preventDefault();
        console.log(sku, title, description, productImage)
    }


    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        if (newTitle.length >= 60) {
            setTitleError('Title cannot exceed 60 characters');
        } else {
            setTitleError('');
        }

    };

    const handleDescriptionChange = (e) => {
        const newDesc = e.target.value;
        setDescription(newDesc);

        if (newDesc.length >= 5000) {
            setDescError('Description cannot exceed 5000 characters');
        } else {
            setDescError('');
        }

    };



    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Add Review</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Add Review</li>
                        </ol>
                    </nav>
                </div>

                <div className="container">

                    <h3 className="text-center text-primary">
                        <b>Add Review</b>
                    </h3>
                    <div className="row">

                        <div className="col-md-2"></div>

                        <div className="col-md-8 mt-4">
                            <form onSubmit={(e) => { handleReview(e) }}>

                                <label className="pro-fnt-num fw-bold mb-2">SKU Number. :</label>
                                <br />
                                <div className="">
                                    <input
                                        className="form-control in-form-box"
                                        type="text"
                                        value={sku}
                                        onChange={(e) => setSku(e.target.value)}
                                        required
                                    />
                                </div>

                                <label className="pro-fnt-num mt-2 fw-bold mb-2">Title :</label>
                                <br />
                                <div className="">
                                    <input
                                        className="form-control in-form-box"
                                        type="text"
                                        value={title}
                                        onChange={handleTitleChange}
                                        required
                                        minLength={0}
                                        maxLength={60}
                                    />
                                    <small style={{ color: 'red' }}>{titleError}</small>
                                </div>

                                <label className="pro-fnt-num fw-bold mt-2 mb-2">Description :</label><br />
                                <div className="">
                                    <textarea
                                        className="form-control in-form-box"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        rows="10"
                                        required
                                        minLength={0}
                                        maxLength={5000}
                                    ></textarea>
                                    <small style={{ color: 'red' }}>{descError}</small>
                                </div>


                                <label className="pro-fnt-num fw-bold mt-2 fw-bold">Many Images : </label><br />

                                {multiSelectedFiles.map((file, index) => (
                                    <img
                                        key={index}
                                        src={file}
                                        alt={`Product Image ${index}`}
                                        className="multiImage"
                                    />
                                ))}

                                <div className="mt-3">
                                    <input
                                        type="file"
                                        className="form-control"
                                        multiple
                                        onChange={handleImageChange}
                                    />

                                </div>

                                <button className="px-5 py-2 bg-primary text-white rounded border-0 mt-4 mb-5 w-100" type="submit">
                                    Submit
                                </button>

                            </form>
                        </div>
                    </div>

                    <div className="col-md-2"></div>
                </div>

            </MainCategory>
        </>
    );
}

export default AddReview;