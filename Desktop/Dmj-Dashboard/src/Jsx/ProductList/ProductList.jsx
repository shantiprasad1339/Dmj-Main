import React, { useEffect, useState } from "react";
import "./productList.css";
import MainCategory from "../../Dashboard/MainCategory/MainCategory";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Barcode from "react-barcode";
import axios from "axios";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
// import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

const imgUrl = "https://images.diwamjewels.com/";

const url2 = "https://diwamjewels.com";
const url = "https://api.diwamjewels.com/DMJ";
const getProEnd = "/api/v1/products?pageSize=";
const deleteEndPoint = "/api/v1/products/";

var i = 1;

function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState("0");
  const [element, setElement] = useState([]);
  // const [page,setPage]=useState('0')

  const navigate = useNavigate();

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  async function fetchProductDetails() {
    try {
      const proRes = await axios.get(url + getProEnd + pageSize);
      setElement(proRes.data.data);
      setProducts(proRes.data.data.order);
      console.log(proRes.data.data);
    } catch (err) {
      console.log(err.response);
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [pageSize]);

  const generateBarcodeData = (product) => {
    return `${product.barCodeNumber}`;
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.open();
    printWindow.document.write(`
            <html>
                <head>
                    <title> DMJ Products List</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h1>DMJ Product List</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>SKU ID</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Discount Price</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${products
                              .map(
                                (product) => `
                                <tr>
                                    <td>${product.id}</td>
                                    <td>${product.sku}</td>
                                    <td><img src="${product.imageSrc}" alt="" /></td>
                                    <td>${product.productName}</td>
                                    <td>${product.price}</td>
                                    <td>${product.discountPrice}</td>
                                    <td>${product.stock}</td>
                                </tr>
                            `
                              )
                              .join("")}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const handlePagination = (e, page) => {
    // console.log(page - 1)

    setPageSize(page - 1);
  };

  async function handleRemoveProduct(id) {
    // console.log(id)
    try {
      const res = await axios.delete(url + deleteEndPoint + id);
      if (res.data.message === " Deleted Successfully") {
        toast.info("Deleted Successfully", {
          position: toast.POSITION.TOP_CENTER, // Set toast position to top center
        });
      }
      alert("Deleted Successfully");
      window.location.reload();
      // console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <MainCategory>
        <div className="pagetitle">
          <h1>My Product List</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="breadcrumb-item active">My Product List</li>
            </ol>
          </nav>
        </div>

        <div className="col-12">
          {/* <div className="trending-search-bar">
                        <form className="search-form d-flex align-items-center" method="POST" action="#">
                            <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                            <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                        </form>
                    </div> */}

          <div className="card top-selling overflow-auto">
            <div className="printerIcon">
              <i className="bi bi-printer-fill" onClick={handlePrint}></i>
            </div>
            <div className="card-body pb-0">
              <div className="left-item d-flex">
                <>
                  <p className="py-4 pb-1">
                    Total Products : <b>{element && element.totalElements}</b>{" "}
                  </p>
                  <p className="p-4 pb-1">
                    Total Page : <b>{element && element.totalPage}</b>{" "}
                  </p>
                </>
              </div>
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
                    <th scope="col">Bar Code</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 &&
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.indexNumber}</td>

                        <td className="skuno">{product.sku}</td>
                        <th scope="row">
                          {product.images.length > 0 && (
                            <img
                              src={imgUrl + product.images[0].thumbImage}
                              alt=""
                            />
                          )}
                        </th>
                        <td className="fw-bold">
                          {product.seo_title.length > 18
                            ? product.seo_title.substring(0, 18) + " ...."
                            : product.seo_title}
                        </td>
                        <td className="price">
                          {product.images.length > 0 &&
                          product.images[0].productVariantEntities[0]
                            ? product.images[0].productVariantEntities[0].price
                            : 0}
                        </td>
                        <td className="price">
                          {product.images.length > 0 &&
                          product.images[0].productVariantEntities[0]
                            ? product.images[0].productVariantEntities[0]
                                .manualPrice
                            : 0}
                        </td>
                        <td className="price">
                          {product.stock > 0 ? product.stock : 0}
                        </td>
                        <td className="text-start fs-5">
                          <div className="filter">
                            <i
                              className="bi bi-upc me-3 fs-2"
                              onClick={() => openModal(product)}
                            ></i>
                            <NavLink
                              className="icon"
                              to="#"
                              data-bs-toggle="dropdown"
                            >
                              <i className="bi bi-three-dots-vertical fs-4"></i>
                            </NavLink>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                              <li>
                                <div
                                  className="dropdown-item"
                                  onClick={() => {
                                    localStorage.setItem(
                                      "editproductId",
                                      product.id
                                    );
                                    navigate(`/editproduct/${product.id}`);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="bi bi-pencil-square"></i>Edit
                                  Product
                                </div>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="#">
                                  <i className="bi bi-arrows-fullscreen"></i>
                                  Show Product
                                </NavLink>
                              </li>
                              <li>
                                <NavLink className="dropdown-item" to="#">
                                  <i className="bi bi-file-earmark-pdf-fill"></i>
                                  Download PDF
                                </NavLink>
                              </li>
                              <li
                                onClick={() => handleRemoveProduct(product.id)}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="bi bi-trash"></i> Remove Product
                              </li>
                              {/* <li><NavLink className="dropdown-item" to="#">This Year</NavLink></li> */}
                            </ul>
                          </div>
                        </td>
                        <td className="share">
                          <NavLink
                            to={url2 + "/p/" + product.slug + "/" + product.sku}
                          >
                            <i className="bi bi-reply-fill"></i>
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="container d-flex align-center"
          style={{ justifyContent: "center" }}
        >
          <Pagination
            count={element && element.totalPage}
            color="primary"
            onChange={handlePagination}
          />
        </div>
      </MainCategory>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box className="modal_box">
          {selectedProduct && (
            <>
              {/* <h2>{selectedProduct.productName}</h2>
                            <p>SKU ID: {selectedProduct.sku}</p> */}
              <Barcode value={generateBarcodeData(selectedProduct)} />
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ProductList;
