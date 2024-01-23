import React, { useEffect, useState } from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import "./variation.css";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import axios from "axios";
import Loader from '../loader/Loader';
import { multipleImages, singleImage } from '../../Js/uploadImg';


const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/category/maincategory';
const getColor = 'api/v1/colour/type/';
// const getSize = 'api/v1/size/type/';
const getProductEnd = 'api/v1/products/sku/';
// const variantProEnd = 'api/v1/variantproduct';
const uploadImgEnd = 'api/v1/productImages';


const AddImagesVariation = () => {

    const [skuNo, setSkuNo] = useState("");
    const [category, setCategory] = useState("");

    const [subColor, setSubColor] = useState([])

    const [isLoading, setLoading] = useState(false)

    // const [country, setCountry] = useState('');

    const [productId, setProductId] = useState('')

    // const [size, setSize] = useState(null)
    const [color, setColor] = useState(null)
    const [mainCategory, setMainCategory] = useState([])

    const [singleImg, setSingleImg] = useState('')
    const [multImg, setMultImg] = useState('')

    const [singleSelectedFile, setSingleSelectedFile] = useState(null);
    const [multiSelectedFiles, setMultiSelectedFiles] = useState([]);
    const [isSku, setIsSku] = useState('')

    // const [stock, setStock] = useState("")


    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        setSingleSelectedFile(URL.createObjectURL(file));
        setSingleImg(file)
    }

    const handleChangeManyImage = async (e) => {
        const filesArray = Array.from(e.target.files);
        setMultiSelectedFiles(filesArray.map(file => URL.createObjectURL(file)));
        setMultImg(filesArray)

    }

    async function fetchMainCategory() {
        try {
            const res = await axios.get(`${url}${endPoint}`)
            setMainCategory(res.data.data)
        }
        catch (err) {
            // console.log(err)
            console.log(err)
        }
    }




    // const [price, setPrice] = useState("");
    // const [discount, setDiscount] = useState("");
    // const [disPrice, setDisPrice] = useState("");

    // const [subSize, setSubSize] = useState([])
    // async function handleDiscount(e) {
    //   if (price === "") {
    //     alert("Enter Price First");
    //     setDisPrice("");
    //   } else {
    //     setDiscount(e.target.value);
    //     const discount = await e.target.value;
    //     const disPrice = price - (discount * price) / 100;
    //     setDisPrice(disPrice);
    //   }
    // }

    useEffect(() => {
        fetchMainCategory()
    }, [])


    // function emptyState() {
    //     setColor('')
    //     setSize('')
    // }


    async function getProductId(val) {
        try {
            const proRes = await axios.get(url + getProductEnd + val)
            // console.log(proRes.data.data.id)
            setIsSku(false)
            setProductId(proRes.data.data.id)
            return (proRes.data.data.id)
        }
        catch (err) {
            // console.log(err)
            setIsSku(true)
        }
    }


    // async function productImgUpload(id, th_img, m_img) {
    //     try {
    //         const res = await axios.post(url + uploadImgEnd, {
    //             "thum_image": th_img.thum_image,
    //             "picturesMulti": m_img.pictures,
    //             "color": color,
    //             "productId": id
    //         })

    //         console.log(res.data)
    //         return (res.data.data)
    //     }
    //     catch (err) {
    //         console.log(err)
    //         alert(err.response.data.message)
    //     }
    // }

    async function handleImagesVariant(e) {
        setLoading(true)
        e.preventDefault();



        // console.log(thum_img,multi_img)

        if (!isSku) {
            const thum_img = await singleImage(singleImg)
            const multi_img = await multipleImages(multImg)


            try {
                const res = await axios.post(url + uploadImgEnd, {
                    "thum_image": thum_img,
                    "picturesMulti": multi_img,
                    "color": color,
                    "productId": productId
                })

                console.log(res.data)
                alert(res.data.message)

            }
            catch (err) {
                console.log(err)
                alert(err.response.data.message)
            }
        }
        else {
            // alert('Please Enter a Correct SKU Id No.')
            setLoading(false)
        }

        setLoading(false)
    }








    // async function handleDiscount(e) {
    //     if (price === "") {
    //         alert("Enter Price First");
    //         setDisPrice("");
    //     } else {
    //         setDiscount(e.target.value);
    //         const discount = await e.target.value;
    //         const disPrice = price - (discount * price) / 100;
    //         setDisPrice(disPrice);
    //     }
    // }




    async function handleCategory(e) {
        setCategory(e.target.value)
        handleColor(e.target.value)

        // handleSize(e.target.value)
    }

    async function handleColor(val) {
        // console.log(val)
        try {
            const colorRes = await axios.get(`${url}${getColor}${val}`)
            // console.log(colorRes)
            setSubColor(colorRes.data.data)
        }
        catch (err) {
            // console.log(err)
            alert(err.response.data.message)
            setSubColor([])
        }

    }

    // async function handleSize(value) {
    //     try {

    //         const sizeRes = await axios.get(`${url}${getSize}${value}`)
    //         setSubSize(sizeRes.data.data)
    //         // console.log(subColor)
    //     }
    //     catch (err) {
    //         // console.log(err)/
    //         alert(err.response.data.message)
    //     }
    // }






    return (
        <>
            <MainCategory >

                <div className="pagetitle">
                    <h1>Add Variation</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Add Images & Color</li>
                        </ol>
                    </nav>
                </div>

                {!isLoading ? <div className="seo-form-bg ">
                    <h4 className="text-center text-primary mb-3"><b>Add Variation Image</b></h4>

                    <div className="container">

                        <form onSubmit={handleImagesVariant}>
                            <div className="row ">
                                <div className="col-md-6 mt-4">
                                    <label className="pro-fnt-num fw-bold mb-2">SKU Number :</label>
                                    <br />
                                    <div className="">
                                        <input
                                            className="form-control in-form-box"
                                            type="text"
                                            value={skuNo}
                                            onChange={(e) => {
                                                setSkuNo(e.target.value)
                                                let proId = getProductId(e.target.value)
                                                setProductId(proId)
                                            }}
                                            required
                                        />
                                        {isSku && <span style={{ color: 'red', marginLeft: '8px' }} >Please Enter a Correct SKU Number</span>}
                                    </div>
                                </div>


                                <div className="col-md-6 mt-4">
                                    <label className="pro-fnt-num fw-bold mb-2">Category :</label>
                                    <select className="form-select in-form-box"
                                        aria-label="Default select Category"
                                        value={category}
                                        onChange={(e) => {
                                            handleCategory(e)
                                        }}
                                        required
                                    >
                                        <option value=''>select</option>
                                        {
                                            mainCategory.map((cate) => {
                                                return (
                                                    <option value={cate.type} key={cate.id}>{cate.type}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-6 mt-4">
                                    <label className="pro-fnt-num fw-bold text-end mb-2">Thumbnail Image</label><br />
                                    <div className="">
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={handleChangeImage}
                                            required
                                        />
                                        {singleSelectedFile && (
                                            <img
                                                src={singleSelectedFile}
                                                alt="Product Image"
                                                className="singleImage"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-6 mt-4">
                                    <label className="pro-fnt-num fw-bold text-end mb-2">Multiple Images</label><br />
                                    <div className="">
                                        <input
                                            type="file"
                                            className="form-control"
                                            multiple
                                            onChange={handleChangeManyImage}
                                            required
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



                                <div className="col-md-6 mt-4">
                                    <label className="pro-fnt-num fw-bold mb-2">Color :</label>
                                    <select className="form-select in-form-box"
                                        aria-label="Default select Category"
                                        value={color}
                                        onChange={(e) => { setColor(e.target.value) }}
                                        required
                                    >
                                        <option value=''>select</option>
                                        {
                                            subColor.length > 0 && subColor.map(item => {
                                                // console.log(item)
                                                return (

                                                    <option value={item.name} key={item.id}>{item.name} </option>


                                                )
                                            })
                                        }
                                    </select>
                                </div>


                                <div className="col-md-6 mt-4"></div>

                                <div className="col-md-3 sumbit-btn">
                                    <button className="px-5 py-2 bg-primary text-white rounded border-0 mt-4 w-100" type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                    :
                    <Loader />
                }
            </MainCategory>
        </>

    )
}


export default AddImagesVariation