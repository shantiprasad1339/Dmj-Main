/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./productform.css";

import 'react-quill/dist/quill.snow.css';
import { addSeo } from "../../redux/productSlice";

import { useDispatch, useSelector } from "react-redux";


const SeoForm = (props) => {

    const { setIsActiveTab } = props;

    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [activeSeo, setActiveSeo] = useState(false)

    const productInfo = useSelector(state => state.product.productInfo);
    // console.log(productInfo.length)
    // console.log(productInfo)

    useEffect(() => {
        if (productInfo.length == 0) {
            setActiveSeo(false)
            // console.log(productInfo.payload[0])
            // seoTitle(productInfo.payload[0].seoTitle)
        }

        else {
            setActiveSeo(true)
        }

    }, [productInfo])

    const dispatch = useDispatch();

    async function handleSeoSubmit(e) {
        // e.preventDefault()
        dispatch(addSeo([{

            "seoTitle": seoTitle,
            "seoDes": seoDescription

        }]))

        await setIsActiveTab('imageform')
    }


    return (
        <>
            {


                <div className="container">
                    <div className="mb-4 row mt-4">
                        <div className="col-md-6">
                            <label className="pro-fnt-num fw-bold mb-2">SEO Title :</label><br />
                            <div className="">
                                <input
                                    className="form-control in-form-box"
                                    type="text"
                                    value={seoTitle}
                                    onChange={(e) => setSeoTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-6">
                            <label className="pro-fnt-num mt-4 fw-bold mb-2">SEO Description :</label><br />
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

                        {/* <div className="col-md-12 seo-submit-btn">
                            <button className="seo-btn btn btn-primary" onClick={() => handleSeoSubmit()}>Submit SEO</button>
                        </div> */}
                    </div>


                </div>

                // :
                // <center>Please Fill Previous Form </center>
            }

        </>
    )
}


export default SeoForm