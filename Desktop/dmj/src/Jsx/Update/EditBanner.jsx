import React, { useEffect, useState } from "react";
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import "./banner.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { singleImage } from "../../Js/uploadImg";
import Loader from "../loader/Loader";

const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/banner';
const imageUrl = 'https://api.diwamjewels.com/DMJ/images/';
const imgUrl = 'https://images.diwamjewels.com/';


const headers = {
  "Content-Type": "application/json"
};


function EditBanner() {

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)


  const handleImageUpdate = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
  };


  const BennerFetch = async () => {
    await axios.get(url + endPoint)
      .then(response => {
        console.log(response);
        const fetchedImages = response.data.data;
        setImages(fetchedImages);
      })
      .catch(error => {
        console.error(error);
      });
  }



  useEffect(() => {
    BennerFetch();
  }, []);

  const handleDeleteBanner = async (imageId) => {
    try {
      await axios.delete(`${url}${endPoint}/${imageId}`, { headers });
      setImages(prevImages => prevImages.filter(image => image.id !== imageId));
      window.location.reload()
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };




  const handleUpdateImage = async (e, imageId) => {
    setIsLoading(true)
    e.preventDefault();
    if (!selectedImage) {
      alert("No image selected for update.");
      return;
    }

    const img = await singleImage(selectedImage)

    // console.log(img)
    try {
      const response = await axios.put(`${imageUrl}${endPoint}/${imageId}`, {
        'image': img,
        'typeName': imageId,
      });
      // console.log("Image updated successfully:", response.data);
      alert('Banner Updated Successfully')


      axios.get(url + endPoint)
        .then(response => {
          const fetchedImages = response.data.data;
          setImages(fetchedImages);
        })
        .catch(error => {
          console.error(error);
        });


    } catch (error) {
      console.error("Error updating image:", error);
    }
    setIsLoading(false)
  };





  return (
    <>
      <MainCategory>

        <div className="pagetitle">
          <h1>Edit Banner</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Edit Banner</li>
            </ol>
          </nav>
        </div>

        {
          !isLoading ?
            <div className="seo-form-bg">
              <h4 className="text-center text-primary">
                <b>Edit Banner</b>
              </h4>
              <div className="container mt-5">
                <div className="row">
                  {images.map((image, index) => (
                    <div key={index} className="gallery_product col-md-3">
                      <div className="gallery-item">

                        <img src={imgUrl + image.image} alt={`img-${index}`} />


                        <div className="button-container">
                          {/* <form> */}
                          <button
                            type="button"
                            className="update-button"
                            data-bs-toggle="modal"
                            data-bs-target={`#updateModal-${index}`}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>

                          <div className="modal fade" id={`updateModal-${index}`} tabIndex="-1" aria-labelledby={`updateModalLabel-${index}`} aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title text-success fw-bold" id={`exampleModalLabel-${index}`}>
                                    ARE YOU UPDATING THIS BANNER?
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body deletebanner">
                                  <img src={imgUrl + image.image} alt={`img-${index}`} />
                                </div>

                                <div className="modal-body deletebanner">
                                  {selectedImage && (
                                    <img src={URL.createObjectURL(selectedImage)} alt={`img-${index}`} />
                                  )}
                                  <div className="col-md-12">
                                    <label className="form-label mt-3 la-font-sz">Image</label>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="form-control cate-input-box"
                                      onChange={handleImageUpdate}
                                      name="image"
                                    />
                                    {/* <input type="text" value={category} /> */}
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button type="submit" className="btn btn-success" data-bs-dismiss="modal" onClick={(e) => handleUpdateImage(e, image.id)}>
                                    Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* </form> */}

                          <form>
                            <button
                              type="button"
                              className="delete-button"
                              data-bs-toggle="modal"
                              data-bs-target={`#deleteModal-${index}`}
                            >
                              <i className="bi bi-trash3"></i>
                            </button>

                            <div className="modal fade" id={`deleteModal-${index}`} tabIndex="-1" aria-labelledby={`deleteModalLabel-${index}`} aria-hidden="true">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title text-danger fw-bold" id={`exampleModalLabel-${index}`}>
                                      ARE YOU DELETING THIS BANNER?
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body deletebanner">
                                    <img src={imgUrl + image.image} alt={`img-${index}`} />
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      data-bs-dismiss="modal"
                                      onClick={() => handleDeleteBanner(image.id)
                                      }>
                                      Delete
                                    </button>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            : <Loader />
        }

      </MainCategory>
    </>
  );
}

export default EditBanner;