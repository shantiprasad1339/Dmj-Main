import React, { useState } from "react";
import "./productform.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

function EditProductForm() {

    const [productInfo, setProductInfo] = useState([{}]);

    const [skuNo, setSkuNo] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [status, setStatus] = useState("Active");
    const [size, setSize] = useState("sm");
    const [color, setColor] = useState("Red");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [subCat, setSubCat] = useState("");

    const [isAcitveTab, setIsActiveTab] = useState('mainform')

    const [disPrice, setDisPrice] = useState("");
    function handleProduct(e) {
        e.preventDefault();
        console.log(
            skuNo,
            productName,
            price,
            discount,
            status,
            size,
            color,
            category,
            description,
        );
    }

    function onSelectOpt(val, fn) {
        fn(val);
    }

    async function handleDiscount(e) {
        if (price === "") {
            alert("Enter Price First");
            setDisPrice("");
        } else {
            setDiscount(e.target.value);
            const discount = await e.target.value;
            const disPrice = price - (discount * price) / 100;
            setDisPrice(disPrice);
        }
    }
    return (
        <>
            <h2 className="fw-bold text-center mb-4 mt-4">Edit PRODUCTS :</h2>

            <div className="pro-tab-item">
                <h6 className="tab-item" onClick={() => {
                    setIsActiveTab('mainform')
                }}>Product Form</h6>
                <h6 className="tab-item tab-space" onClick={() => {
                    setIsActiveTab('seo')
                }}>SEO</h6>
                <h6 className="tab-item tab-space" onClick={() => {
                    setIsActiveTab('imageform')
                }}>Upload Image</h6>
            </div>

            {
                isAcitveTab === 'seo' ? <SeoForm /> :
                    isAcitveTab === 'imageform' ? <UploadImg /> :
                        isAcitveTab === 'mainform' ?
                            <form className="container mt-4" onSubmit={handleProduct}>
                                <fieldset>


                                    <div className="mb-4 row mt-4">
                                        <div className="col-md-12 pro-btn-add mb-3">
                                            <button className="up-img-btn" type="submit" >Update Product</button>
                                        </div>
                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">SKU Number :</label>
                                            <br />
                                            <div className="">
                                                <input
                                                    className="form-control in-form-box"
                                                    type="text"
                                                    value={skuNo}
                                                    onChange={(e) => setSkuNo(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">Category :</label>
                                            <br />
                                            <div className="">
                                                <input
                                                    className="form-control in-form-box"
                                                    type="text"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">Sub Category :</label>
                                            <br />
                                            <div className="">
                                                <input
                                                    className="form-control in-form-box"
                                                    type="text"
                                                    value={subCat}
                                                    onChange={(e) => setSubCat(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold mb-2">Product Name :</label>
                                            <br />
                                            <div className="">
                                                <input
                                                    className="form-control in-form-box"
                                                    type="text"
                                                    value={productName}
                                                    onChange={(e) => setProductName(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">Description :</label>
                                            <br />
                                            <div className="">
                                                <ReactQuill
                                                    theme="snow"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}

                                                ></ReactQuill>
                                            </div>
                                        </div>

                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">Price :</label>
                                            <br />
                                            <div className="">
                                                <input
                                                    className="form-control in-form-box"
                                                    type="number"
                                                    value={price}
                                                    onChange={(e) => {
                                                        if (e.target.value === "") setDisPrice("");
                                                        setPrice(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">Discount % :</label>
                                            <br />
                                            <div className="">
                                                <input
                                                    className="form-control in-form-box"
                                                    type="text"
                                                    value={discount}
                                                    onChange={handleDiscount}
                                                />
                                                <span>Price After Discount : {disPrice}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">Status :</label>
                                            <div className="">
                                                <input
                                                    className="form-control in-form-box"
                                                    type="text"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">Select Status :</label>
                                            <select
                                                className="form-control in-form-box"
                                                type="text"
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Disable">Disable</option>
                                                {/* <option value="Yellow">Yellow</option> */}
                                            </select>
                                        </div>

                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">Size :</label>
                                            <br />
                                            <div className="">
                                                <input
                                                    className="form-control in-form-box"
                                                    type="text"
                                                    value={size}
                                                    onChange={(e) => setSize(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">Size Option :</label>
                                            <br />
                                            <select
                                                className="form-control in-form-box"
                                                type="text"
                                                onChange={(e) => onSelectOpt(e.target.value, setSize)}
                                            >
                                                <option value="s">sm</option>
                                                <option value="m">m</option>
                                                <option value="l">l</option>
                                            </select>
                                        </div>

                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">Color :</label>
                                            <br />
                                            <div className="">
                                                <input
                                                    className="form-control in-form-box"
                                                    type="text"
                                                    value={color}
                                                    onChange={(e) => setColor(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-3">
                                            <label className="pro-fnt-num fw-bold">Color Option :</label>
                                            <br />
                                            <select
                                                className="form-control in-form-box"
                                                type="text"
                                                onChange={(e) => onSelectOpt(e.target.value, setColor)}
                                            >
                                                <option value="red">Red</option>
                                                <option value="green">green</option>
                                                <option value="Yellow">Yellow</option>
                                            </select>
                                        </div>


                                    </div>
                                </fieldset>

                            </form>
                            : null
            }

        </>
    );
}

export { EditProductForm };


const UploadImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [multiSelectedFiles, setMultiSelectedFiles] = useState([]);
    const handleChangeImage = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
    }
    const handleChangeMayImage = (event) => {
        const filesArray = Array.from(event.target.files);
        setMultiSelectedFiles(filesArray.map(file => URL.createObjectURL(file)));
    }
    return (
        <>
            <div className="container mt-4">
                <div className="mb-4 row">
                    <div className="col-md-12 pro-btn-add mb-3">
                        <button className="up-img-btn">Update Image</button>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <label className="col-form-label fw-bold text-end">TUMBLING IMAGE</label><br />
                        <div className="">
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleChangeImage}
                            />
                            {selectedFile && (
                                <img
                                    src={selectedFile}
                                    alt="Product Image"
                                    className="singleImage"
                                />
                            )}
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <label className="col-form-label fw-bold text-end">MANY IMAGES</label><br />
                        <div className="">
                            <input
                                type="file"
                                className="form-control"
                                multiple
                                onChange={handleChangeMayImage}
                            />

                            {multiSelectedFiles.map((file, index) => (
                                <img
                                    key={index}
                                    src={file}
                                    alt={`Product Image ${index}`}
                                    className="multiImage"
                                />
                            ))}


                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}


const SeoForm = () => {
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    function handleSeoSubmit(e) {
        e.preventDefault()
        console.log('fired')
    }
    return (
        <>
            <form onSubmit={handleSeoSubmit}>

                <div className="container">
                    <div className="mb-4 row mt-4">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <label className="pro-fnt-num fw-bold">SEO Title :</label><br />
                            <div className="">
                                <input
                                    className="form-control in-form-box"
                                    type="text"
                                    value={seoTitle}
                                    onChange={(e) => setSeoTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                        <div className="col-md-3"></div>
                        <div className="col-md-6 mt-3">
                            <label className="pro-fnt-num fw-bold">SEO Description :</label><br />
                            <div className="">
                                <textarea
                                    className="form-control in-form-box"
                                    value={seoDescription}
                                    onChange={(e) => setSeoDescription(e.target.value)}
                                    rows="4"
                                ></textarea>
                            </div>
                        </div>
                        <div className="col-md-3"></div>

                        <div className="col-md-12 up-img-btn-box">
                            <button type="submit" className="up-img-btn">Update SEO</button>
                        </div>
                    </div>


                </div>
            </form>
        </>
    )
}