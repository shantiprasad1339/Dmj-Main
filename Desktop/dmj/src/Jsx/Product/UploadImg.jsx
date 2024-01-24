import { useEffect, useState } from "react";
import "./productform.css";
import 'react-quill/dist/quill.snow.css';
import { addThumbImg, addProImg } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";




const UploadImg = ({ setThumbImg, setProdImg }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [multiSelectedFiles, setMultiSelectedFiles] = useState([]);
    const [isShow, setIsShow] = useState(false);

    const [imgData, setImgData] = useState('')


    // const [thumbImg, setThumbImg] = useState('')
    const [productImage, setProductImage] = useState('')

    const seo = useSelector(state => state.product.seoInfo);
    const simpleProduct = useSelector(state => state.product.productInfo);


    const dispatch = useDispatch()


    useEffect(() => {
        if (seo.length == 0 || simpleProduct.length == 0) {
            setIsShow(false)
        }
        else {
            setIsShow(true)
        }
    }, [seo, simpleProduct])



    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        console.log('singleImg')
        console.log(file)
        setThumbImg(file)

        setSelectedFile(URL.createObjectURL(file));

        // setThumbImg(file)
    }

    const handleChangeMayImage = (e) => {
        const filesArray = Array.from(e.target.files);
        setProductImage(filesArray)
        // console.log(e.target.files)
        // console.log(filesArray)
        console.log('multiple image')
        setProdImg(filesArray)
        // console.log()
        // dispatch(addProImg({ productImages: filesArray }));
        setMultiSelectedFiles(filesArray.map(file => URL.createObjectURL(file)));

    }

    function handleImage() {
        // localStorage.setItem("thumbImg", thumbImg)
        // localStorage.setItem('proImg', productImage)
    }


    return (

        <>
            {
                // isShow ? 
                <div className="container mt-4">
                    <div className="mb-4 row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <label className="pro-fnt-num fw-bold text-end">Single Image</label><br />
                            <div className="">
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleChangeImage}
                                    multiple

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
                            <label className="pro-fnt-num fw-bold text-end mt-4">MANY IMAGES</label><br />
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
                        <div className="col-md-12">
                            <button className="btn btn-primary seo-btn mb-4" onClick={() => handleImage()}>Upload Image</button>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
                // : <center>Please Fill Previous Form</center>
            }
        </>
    )
}


export default UploadImg;