import React, { useEffect, useState } from "react";
import "./variant.css";
import MainCategory from "../../Dashboard/MainCategory/MainCategory";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Pagination } from "@mui/material";
import Table from "rc-table";

const url = "https://api.diwamjewels.com/DMJ";
const imgUrl = "https://squid-app-2-7wbvi.ondigitalocean.app/";
const getProEnd = "/api/v1/products/sku/";

function Variant(props) {
  const [pageSize, setPageSize] = useState("0");
  const [search, setSearch] = useState("DMJ-0230");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [proDetails, setProDetails] = useState([]);

  async function fetchProDetails(value) {
    try {
      const proRes = await axios.get(url + getProEnd + value);
      // console.log(proRes)
      setProDetails(proRes.data.data);
    } catch (err) {
      console.log(err);
      setProDetails([]);
    }
  }

  async function handleSearchPro(e) {
    setSearch(e.target.value);
    await fetchProDetails(e.target.value);
    // setSearch(e.target.value)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProDetails(search);
  }, []);

  return (
    <>
      <MainCategory>
        <div className="pagetitle">
          <h1>Edit Variant</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="breadcrumb-item active">Edit Variant</li>
            </ol>
          </nav>
        </div>

        <div className="col-12">
          <div className="trending-search-bar">
            <div className="search-form d-flex align-items-center">
              <input
                type="text"
                name="query"
                placeholder="Search"
                title="Enter search keyword"
                value={search}
                onChange={(e) => handleSearchPro(e)}
              />
              <button type="button" title="Search">
                <i className="bi bi-search"></i>
              </button>
            </div>
            {!proDetails.id && <span>Sku Id is not found</span>}
          </div>

          <div className="card top-selling overflow-auto">
            <div className="card-body pb-0">
              <div className="left-item d-flex"></div>
              <table className="table table-hover mt-1">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">SKU ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">More Details</th>
                  </tr>
                </thead>
                <tbody>
                  {proDetails.id && (
                    <tr key={proDetails.id}>
                      <td>{proDetails.id}</td>
                      <td className="skuno">{proDetails.sku}</td>
                      <th scope="row">
                        <img
                          src={
                            proDetails.images.length > 0 &&
                            imgUrl + proDetails.images[0].thumbImage
                          }
                          alt=""
                        />
                      </th>
                      <td className="fw-bold">
                        {proDetails.name.slice(0, 20)}
                      </td>
                      <td className="price">
                        {proDetails.images.length > 0 &&
                        proDetails.images[0].productVariantEntities[0]
                          ? proDetails.images[0].productVariantEntities[0].price
                          : 0}
                      </td>
                      <td className="price">
                        {proDetails.images.length > 0 &&
                        proDetails.images[0].productVariantEntities[0]
                          ? proDetails.images[0].productVariantEntities[0]
                              .manualPrice
                          : 0}
                      </td>
                      <td className="price">{proDetails.stock}</td>
                      <td className="fs-5">
                        <i
                          className="bi bi-arrow-right-circle-fill"
                          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {isDrawerOpen && (
              <VariantDrawer
                variants={proDetails.images}
                sku={proDetails.sku}
              />
            )}
          </div>
        </div>
        {/* {isDrawerOpen && <VariantDrawer />} */}
        {/* <div className="container d-flex align-center" style={{ justifyContent: 'center' }}>
                    <Pagination count={10} color="primary" onChange={handlePagination} />
                </div> */}
      </MainCategory>
    </>
  );
}

function VariantDrawer({ isDrawerOpen, variants, sku }) {
  return (
    <div
      className={`card top-selling1 overflow-auto ${
        isDrawerOpen ? "open" : ""
      }`}
    >
      <div className="card-body pb-0">
        <div className="left-item d-flex"></div>
        <table className="table table-hover mb-5">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th scope="col">Image</th>
              <th scope="col">Color</th>
              <th scope="col">Price</th>
              <th scope="col">Discount Price</th>
              <th scope="col">Discount</th>
              <th scope="col">Size</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant, index) => {
              return (
                <>
                  {variant.productVariantEntities.length > 0 &&
                    variant.productVariantEntities.map((item) => {
                      console.log(item);
                      return (
                        <>
                          <tr key={index}>
                            <td></td>
                            <td>
                              <i
                                className="bi bi-arrow-return-right"
                                style={{ fontSize: "25px" }}
                              ></i>
                            </td>
                            <td scope="row" rowSpan={4}>
                              <img src={imgUrl + variant.thumbImage} alt="" />
                            </td>
                            <td className="price" rowSpan={4}>
                              {variant.color}
                            </td>

                            <td className="price">{item.price}</td>
                            <td className="price">{item.manualPrice}</td>
                            <td className="price">{item.discount}</td>
                            <td className="price">{item.size}</td>

                            <td className="text-start fs-5">
                              <div className="filter">
                                <NavLink
                                  className="icon"
                                  to="#"
                                  data-bs-toggle="dropdown"
                                >
                                  <i className="bi bi-three-dots-vertical fs-4"></i>
                                </NavLink>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                  <li>
                                   <NavLink
  className="dropdown-item"
  to={`/editvariant/${item.id}`}
>
  <i className="bi bi-pencil-square"></i>
  Edit Variant
</NavLink>

                                  </li>
                                  <li>
                                    <NavLink
                                      className="dropdown-item"
                                      to={"/editVariantImages/" + variant.id}
                                    >
                                      <i className="bi bi-images"></i>Edit
                                      Images
                                    </NavLink>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// const VariantChildElement = ({ }) => {
//     return (
//         <>
//             <table className="table table-hover mb-5">
//                 <thead>
//                     <tr>
//                         <th></th>
//                         <th></th>
//                         <th scope="col">Image</th>
//                         <th scope="col">Price</th>
//                         <th scope="col">Discount Price</th>
//                         <th scope="col">Discount</th>
//                         <th scope="col">Size</th>
//                         <th scope="col">Color</th>
//                         <th scope="col">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {variants.map((variant) => {

//                         return (
//                             <>
//                                 <tr key={index}>
//                                     <td></td>
//                                     <td><i className="bi bi-arrow-return-right" style={{ fontSize: "25px" }}></i></td>
//                                     <td scope="row"><img src={url + '/images/' + variant.thumbImage} alt="" /></td>
//                                     <td className="price">{item.price}</td>
//                                     <td className="price">{item.manualPrice}</td>
//                                     <td className="price">{item.discount}</td>
//                                     <td className="price">{variant.size}</td>
//                                     <td className="price">{variant.color}</td>

//                                     <td className="text-start fs-5">
//                                         <div className="filter">
//                                             <NavLink className="icon" to="#" data-bs-toggle="dropdown">
//                                                 <i className="bi bi-three-dots-vertical fs-4"></i>
//                                             </NavLink>
//                                             <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
//                                                 <li><NavLink className="dropdown-item" to="/editvariant"><i className="bi bi-pencil-square"></i>Edit Variant</NavLink></li>
//                                                 <li><NavLink className="dropdown-item" to="/editVariantImages"><i className="bi bi-images"></i>Edit Images</NavLink></li>
//                                             </ul>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             </>
//                         )
//                     })
//                     }

//                 </tbody>
//             </table>
//         </>
//     )
// }

export default Variant;
