import React, { useEffect, useState } from "react";
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link, useParams } from 'react-router-dom';
import "./banner.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { multipleImages, singleImage } from "../../Js/uploadImg";
import Loader from "../loader/Loader";

const url = 'https://api.diwamjewels.com/DMJ/api/';
const imgUrl = 'https://images.diwamjewels.com/'
const endPoint = 'v1/banner';
const imageUrl = 'https://images.diwamjewels.com/';
const proImgEnd = 'v1/productImages/images/'
const postImgEnd = 'v1/productImages/'

const headers = {
  "Content-Type": "application/json"
};





function EditVariantImages() {

  const { id } = useParams()

  const [color, setColor] = useState('')
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [singleImg, setSingleImg] = useState('')
  const [multImg, setMultImg] = useState('')

  const [updateThumbImg, setUpThumbImg] = useState('')
  const [updateMultiImg, setMultiImg] = useState([])

  const [singleSelectedFile, setSingleSelectedFile] = useState(null);
  const [multiSelectedFiles, setMultiSelectedFiles] = useState([]);
  const [imgData, setImgData] = useState('')
  const navigate = useNavigate();

  const [isUpdateImg, updateImg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const handleImageUpdate = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
  };


  const proImages = async () => {
    await axios.get(url + proImgEnd + id)
      .then(response => {
        // console.log(response.data.data)
        const fetchedImages = response.data.data;



        const imageString = fetchedImages.pictures;

        // Split the imageString into an array based on the delimiter (e.g., comma).
        const imageArray = imageString.split(',');
        setSingleSelectedFile(fetchedImages.thumbImage)
        setMultiSelectedFiles(imageArray)
        setColor(fetchedImages.color)
        // setUpThumbImg(fetchedImages.thum_image)
        // setMultiImg(fetchedImages.pictures)
      })
      .catch(error => {
        console.error(error);
      });
  }



  useEffect(() => {
    proImages();
    // console.log(id)
  }, []);


  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setUpThumbImg(file)

  }

  const handleChangeManyImage = async (e) => {
    const filesArray = Array.from(e.target.files);
    setMultiImg(filesArray)

  }




  async function updateImageVariant(e) {
    setIsLoading(true)
    e.preventDefault()
    // console.log('fired')

    const multiImg = await multipleImages(updateMultiImg)
    const singleImg = await singleImage(updateThumbImg)

    try {
      const res = await axios.put(url + postImgEnd + id, {
        "thum_image": singleImg,
        "picturesMulti": multiImg
      });
      if (res.data.message === "Update SuccessFully Add") {
        alert("Images Updated Successfully")
      }
    }
    catch (err) {
      console.log(err)
      alert("Upload All images again")
    }
    setIsLoading(false)
  }



  return (
    <>
      <MainCategory>

        <div className="pagetitle">
          <h1>Edit Variant Images</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Edit Variant Images</li>
            </ol>
          </nav>
        </div>

        {!isLoading ? <div className="seo-form-bg ">
          <h4 className="text-center text-primary mb-3"><b>Add Variation Image</b></h4>

          <div className="container">

            <form onSubmit={updateImageVariant}>
              <div className="row ">
                <div className="col-md-6 mt-4">
                  <label className="pro-fnt-num fw-bold ">Color :</label>

                  <input type="text" disabled value={color} className="form-control" />



                </div>
            
                <div className="col-md-5"></div>
                <div className="col-md-6 mt-4">
                  {singleSelectedFile && (
                    <img
                      src={imgUrl + singleSelectedFile}
                      alt="Product Image"
                      className="multiImage"

                    />
                  )}
                  <br />
             

                  <label className="pro-fnt-num fw-bold text-end mb-2">Thumbnail Image</label><br />
                  <div className="">
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleChangeImage}
                      required
                    />

                    {
                      updateThumbImg && (
                        <img src={URL.createObjectURL(updateThumbImg)} alt={updateThumbImg} className="multiImage" />
                      )
                    }
                  </div>
                </div>

                <div className="col-md-6 mt-4">
                  {multiSelectedFiles.length > 0 && multiSelectedFiles.map((file, index) => (
                    <img
                      key={index}
                      src={imgUrl + file}
                      alt={`Product Image ${index}`}
                      className="multiImage"
                    />
                  ))}
                  <label className="pro-fnt-num fw-bold text-end mb-2">Multiple Images</label><br />
                  <div className="">
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      onChange={handleChangeManyImage}
                      required
                    />

                  </div>
                  {updateMultiImg.length > 0 && updateMultiImg.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Product Image ${index}`}
                      className="multiImage"
                    />
                  ))}
                </div>

                {/* <div className="col-md-6 mt-4"></div> */}

                <div className="col-md-3 sumbit-btn mt-5">
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
  );
}

export default EditVariantImages;