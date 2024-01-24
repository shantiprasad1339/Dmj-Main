import React, { useState, useEffect } from "react";
import "./orderList.css";
import MainCategory from "../../Dashboard/MainCategory/MainCategory";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from "react-bootstrap/Form";
function OrderList() {
  const [orders, setOrders] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [tracking_id, setTracking_id] = useState("");
  const [logistic_partner, setLogistic_partner] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [orderStatusId, setOrderStatusId] = useState();
  const [orderId, setOrderId] = useState();
  const [trackingNo, setTrackingNo] = useState(null);
  const [logisticName, setLogisticName] = useState(null);
  const [orderIdNo, setOrderIdNo] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(orderStatusData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(url + endpoint);
        setOrders(ordersResponse.data.data);

        const orderStatusResponse = await axios.get(url + orderStatusEndpoint);
        setOrderStatusData(orderStatusResponse.data.data);

        const initialOrderStatus = {};
        ordersResponse.data.data.forEach((order) => {
          initialOrderStatus[order.orderId] = "Pending";
        });
        setOrderStatus(initialOrderStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    orderStatusApi();
    fetchData();
  }, []);

  const url = "https://api.diwamjewels.com/DMJ/";
  const endpoint = "api/v1/order/getOrders";
  const orderStatusEndpoint = "api/v1/status";

  function callApiOrders() {
    axios
      .get(url + endpoint)
      .then((res) => {
        console.log("orders",res.data);
        setOrders(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }

  function orderStatusApi() {
    axios
      .get(url + orderStatusEndpoint)
      .then((res) => {
        setOrderStatusData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching order status:", error);
      });
  }

  function handleShipped(e) {
    e.preventDefault();

    setSelectedOrderId(null);
    setShowInputs(false);
  }

  const groupedOrders = {};
  orders.forEach((order) => {
    if (!groupedOrders[order.orderId]) {
      groupedOrders[order.orderId] = { order, products: [] };
    }
    groupedOrders[order.orderId].products.push(order);
  });

  function handleUpdateStatus(id, orderId) {
    // console.log(id, orderId,);
    setOrderStatusId(id);
    setOrderId(orderId);
    axios
      .post("https://api.diwamjewels.com/DMJ/api/v1/order/update/status", {
        orderId: orderId,
        statusDetailsId: id,
        trackingId: null,
        logisticName: null,
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }


  function handleShippedStatus(Id) {
    // console.log(orderIdNo, Id, trackingNo, logisticName);
    setOrderStatusId(Id);
    setOrderId(orderId);
    axios
      .post("https://api.diwamjewels.com/DMJ/api/v1/order/update/status", {
        orderId: orderIdNo,
        statusDetailsId: Id,
        trackingId: trackingNo,
        logisticName: logisticName,
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <MainCategory>
        <div className="pagetitle">
          <h1>My Order List</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="breadcrumb-item active">My Order List</li>
            </ol>
          </nav>
        </div>

        <div className="col-12">
          <div className="card top-selling overflow-auto">
            <div className="card-body-order pb-0">
              <div className="left-item d-flex"></div>
              <table className="table table-hover mt-1">
                <thead>
                  <tr>
                    <th scope="col">OrderNumber</th>
                    <th scope="col">Date</th>
                    <th scope="col">Product Details</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Update Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody className="">
                  {orders &&
                    orders.map((item, index) => {
                      const url =
                        "https://images.diwamjewels.com/";

                      // console.log('orders', item.id);
                      const originalDate = new Date(item.created_at);

                      // Apply the UTC offset for IST (UTC+5:30)
                      originalDate.setUTCHours(originalDate.getUTCHours() + 5);
                      originalDate.setUTCMinutes(originalDate.getUTCMinutes() + 30);

                      const formattedDate = originalDate.toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour12: true,
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",


                      });

                      console.log(item,"000000000000.000");


                      return (
                        <tr key={index}>
                          <td className="align-top">{item.orderNumber}</td>
                          <td className="align-top">{formattedDate}</td>
                          <td>
                            {item.order_Details_Models &&
                              item.order_Details_Models.length > 0 &&
                              item.order_Details_Models.map((value, index) => (
                                <div
                                  key={index}
                                  className="d-flex justify-content-start"
                                >
                                  <img
                                    src={
                                      url + value.productImagesModel.thum_image
                                    }
                                    alt={`Product ${index}`}
                                  />
                                  <div className="ms-3">
                                    <td className="ms-3">
                                      {value.name
                                        .split(" ")
                                        .slice(0, 3)
                                        .join(" ")}
                                      {value.name.split(" ").length > 3
                                        ? " ..."
                                        : ""}
                                      <br />
                                      SKUID: {value.sku}
                                    </td>
                                  </div>
                                </div>
                              ))}
                          </td>

                          <td className="align-top">
                          {item.order_Details_Models &&
  item.order_Details_Models.length > 0 &&
  item.order_Details_Models.map((value, index) => {
    console.log("value",value);
    return (
      <div key={index}>{value.quantity}</div>
    );
  })}

                          </td>

                          <td className="order-price align-top">
                            {/* {item.order_Details_Models &&
                              item.order_Details_Models.length > 0 &&
                              item.order_Details_Models.map((value, index) => {
                                console.log("6549464598487897",value);
                                return (
                                  <div key={index}>{value.amount}</div>
                                )
                              })} */}

                              {item.amount}
                          </td>

                          <td className="order-status align-top">
                            {/* {orderStatus[item.orderId] === "Pending" ? (
                              <span>{orderStatus[item.orderId]}</span>
                            ) : (
                              <span>{orderStatus[item.orderId]}</span>
                            )} */}

                            {item.statusEntity.length > 0
                              ? item.statusEntity[item.statusEntity.length - 1]
                                .statusDetailsModel.status
                              : "pending"}
                          </td>

                          <td className="order-status align-top">
                            <div className="filter">
                              <NavLink
                                className="icon"
                                to="#"
                                data-bs-toggle="dropdown"
                              >
                                <i className="bi bi-pencil-square fs-5"></i>
                              </NavLink>
                              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                {/* {orderStatusData &&
                                  orderStatusData.map((itemsStatus, index) => {
                                    return (
                                      <li key={index}>
                                        <NavLink
                                          className="dropdown-item"
                                          to="#"
                                        >
                                          <span className="order-shipped">
                                            <p
                                              onClick={() => {
                                                handleUpdateStatus(
                                                  itemsStatus.id
                                                );
                                              }}
                                            >
                                              {itemsStatus.status}
                                              {itemsStatus.id}
                                            </p>
                                          </span>
                                        </NavLink>
                                      </li>
                                    );
                                  })} */}

                                <li key={index}>
                                  <NavLink className="dropdown-item" to="#">
                                    <span className="order-shipped">
                                      <p
                                        onClick={() => {
                                          handleUpdateStatus(2, item.id);
                                        }}
                                      >
                                        Order Confirmed
                                      </p>
                                    </span>
                                  </NavLink>
                                </li>
                                <li key={index}>
                                  <NavLink className="dropdown-item" to="#">
                                    <span className="order-shipped">
                                      <p>
                                        <p onClick={() => { handleShow(); setOrderIdNo(item.id); }}>
                                          Order Shipped
                                        </p>

                                        <Modal show={show} onHide={handleClose}>
                                          <Modal.Header closeButton>
                                            <Modal.Title>
                                              Tracking
                                            </Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                            <Form>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Tracking Number
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  required
                                                  onChange={(e) => {
                                                    setTrackingNo(
                                                      e.target.value
                                                    );
                                                  }}
                                                  autoFocus
                                                />
                                              </Form.Group>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                              >
                                                <Form.Label>
                                                  Logistic Partner
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  required
                                                  onChange={(e) => {
                                                    setLogisticName(
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                              </Form.Group>
                                            </Form>
                                          </Modal.Body>
                                          <Modal.Footer>
                                            <Button
                                              variant="secondary"
                                              onClick={handleClose}
                                            >
                                              Close
                                            </Button>

                                            <Button
                                              variant="primary"
                                              onClick={() => {
                                                handleShippedStatus(3);
                                              }}
                                            >
                                              Submit
                                            </Button>
                                          </Modal.Footer>
                                        </Modal>
                                      </p>
                                    </span>
                                  </NavLink>
                                </li>
                                <li key={index}>
                                  <NavLink className="dropdown-item" to="#">
                                    <span className="order-shipped">
                                      <p
                                        onClick={() => {
                                          handleUpdateStatus(4, item.id);
                                        }}
                                      >
                                        Order Delivered
                                      </p>
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                            </div>
                          </td>

                          <td className="text-center fs-5 align-top">
                            <div className="filter d-flex justify-content-around">
                              <NavLink
                                className="icon"
                                to="#"
                                data-bs-toggle="dropdown"
                              >
                                <i className="bi bi-three-dots-vertical fs-4"></i>
  
                              </NavLink>
                              
                              <NavLink to={`/create-order/${item.orderNumber}`}>
                              <span className="order-list-share">
                                <i className="bi bi-reply-fill"></i>
                              </span>
                              </NavLink>

                              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <li>
                                  <NavLink className="dropdown-item" to="#">
                                    <UserDetailModal name={item.addressModel} />
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink className="dropdown-item" to="#">
                                    <TrackingDetailsModal
                                      status={item.statusEntity}
                                    />
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink className="dropdown-item" to="#">
                                    <UserPaymentDetailModal orderId={item.id} />
                                  </NavLink>
                                </li>
                              </ul>
                            </div>
                            {/* <div>
                            <p className="order-list-share"><i className="bi bi-reply-fill"></i></p>
                            </div> */}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </MainCategory>
    </>
  );
}

function UserDetailModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span className="order-confirmed" onClick={handleShow}>
        User Detail
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="seo-form-bg">
            <div className="container">
              User: {props.name.name && props.name.name} <br />
              Address:{props.name.area && props.name.area},
              {props.name.city && props.name.city}
              <br />
              PinCode:{props.name.pincode && props.name.pincode}
              <br />
              Phone:No:{props.name.mobile && props.name.mobile}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Shipped Order
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

function UserPaymentDetailModal({ orderId }) {
  const [show, setShow] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (orderId) {
      setLoading(true); // Set loading to true before making the API call
      axios
        .get(
          `https://api.diwamjewels.com/DMJ/api/v1/userPayment/orderId/${orderId}`
        )
        .then((res) => {
          setPaymentDetails(res.data.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching payment details:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orderId]);

  return (
    <>
      <span className="order-confirmed" onClick={handleShow}>
        User Payment Detail
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Payment Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="seo-form-bg">
            <div className="container">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {/* Display your data here */}
                  Transaction Number :- {paymentDetails?.utrNumber}
                  <br />
                  Phone Number :- {paymentDetails?.mobile}
                  <br />
                </>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function TrackingDetailsModal({ status }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <span className="order-confirmed" onClick={handleShow}>
        Tracking Details
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Tracking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-lg-12">
                <div id="tracking-pre"></div>
                <div id="tracking">
                  <div class="tracking-list">
                    {status && status.length > 0 ? (
                      status.map((item) => {
                        const createdAt = new Date(item.date);
                        const monthNames = [
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ];

                        const formattedDate = `${createdAt.getDate()}. ${monthNames[createdAt.getMonth()]
                          } ${createdAt.getFullYear()}`;
                        return (
                          <>
                            <div class="tracking-item">
                              <div class="tracking-icon status-intransit">
                                <svg
                                  class="svg-inline--fa fa-circle fa-w-16"
                                  aria-hidden="true"
                                  data-prefix="fas"
                                  data-icon="circle"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  data-fa-i2svg=""
                                >
                                  <path
                                    fill="currentColor"
                                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                                  ></path>
                                </svg>
                              </div>
                              <div class="tracking-date">
                                <img
                                  src="https://raw.githubusercontent.com/shajo/portfolio/a02c5579c3ebe185bb1fc085909c582bf5fad802/delivery.svg"
                                  class="img-responsive"
                                  alt="order-placed"
                                />
                              </div>
                              <div class="tracking-content">
                                {item.statusDetailsModel.status}
                                <br />

                                {formattedDate}
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div class="tracking-item">
                        <div class="tracking-icon status-intransit">
                          <svg
                            class="svg-inline--fa fa-circle fa-w-16"
                            aria-hidden="true"
                            data-prefix="fas"
                            data-icon="circle"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            data-fa-i2svg=""
                          >
                            <path
                              fill="currentColor"
                              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                            ></path>
                          </svg>
                        </div>
                        <div class="tracking-date">
                          <img
                            src="https://raw.githubusercontent.com/shajo/portfolio/a02c5579c3ebe185bb1fc085909c582bf5fad802/delivery.svg"
                            class="img-responsive"
                            alt="order-placed"
                          />
                        </div>
                        <div class="tracking-content">
                          Your Order Has Been Booked
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Shipped Order
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderList;

function Shippedmodal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p onClick={handleShow}>Order Shipped</p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tracking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tracking Number</Form.Label>
              <Form.Control
                type="number"
                // placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Logistic Partner</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
