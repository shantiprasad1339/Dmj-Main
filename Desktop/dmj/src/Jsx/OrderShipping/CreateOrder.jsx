import React, { useEffect, useState } from "react";
import MainCategory from "../../Dashboard/MainCategory/MainCategory";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function CreateOrder() {
  const [shipping_customer_name, setShipping_customer_name] = useState("");
  const [shipping_last_name, setShipping_last_name] = useState("");
  const [shipping_address, setShipping_address] = useState("");
  const [shipping_address_2, setShipping_address_2] = useState("");
  const [shipping_city, setShipping_city] = useState("");
  const [shipping_state, setShipping_state] = useState("");
  const [shipping_country, setShipping_country] = useState("");
  const [shipping_pincode, setShipping_pincode] = useState("");
  const [shipping_email, setShipping_email] = useState("");
  const [shipping_phone, setShipping_phone] = useState("");

  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(false);

  const [billing_customer_name, setBilling_customer_name] = useState("");
  const [billing_last_name, setBilling_last_name] = useState("");
  const [billing_address, setBilling_address] = useState("");
  const [billing_address_2, setBilling_address_2] = useState("");
  const [billing_city, setBilling_city] = useState("");
  const [billing_state, setBilling_state] = useState("");
  const [billing_country, setBilling_country] = useState("");
  const [billing_pincode, setBilling_pincode] = useState("");
  const [billing_email, setBilling_email] = useState("");
  const [billing_phone, setBilling_phone] = useState("");
  const [billing_alternate_phone, setBilling_alternate_phone] = useState("");

  const [order_id, setOrder_id] = useState("");
  const [invoice_number, setInvoice_number] = useState("");
  const [order_date, setOrder_date] = useState("");
  const [pickup_location, setPickup_location] = useState("");

  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [selling_price, setSelling_price] = useState("");
  const [sku, setSku] = useState("");
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("0");
  const [hsn, setHsn] = useState("0");

  const [total_discount, setTotal_discount] = useState("");
  const [sub_total, setSub_total] = useState("");

  const [payment_method, setPayment_method] = useState("");

  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [addedProducts, setAddedProducts] = useState([]);

  const [billingAddressCondition, setBillingAddressCondition] = useState(false);
  const [orderProducts, setOrderProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const[productPrice,setProductPrice]= useState(0)
  const params = useParams();
  const { oId } = params;
  const navigate = useNavigate()
  useEffect(() => {
    if (isBillingSameAsShipping) {
      setBilling_phone(shipping_phone);
      setBilling_customer_name(shipping_customer_name);
      setBilling_last_name(shipping_last_name);
      setBilling_email(shipping_email);
      setBilling_address(shipping_address);
      setBilling_address_2(shipping_address_2);
      setBilling_pincode(shipping_pincode);
      setBilling_city(shipping_city);
      setBilling_state(shipping_state);
      setBilling_country(shipping_country);
    }
  }, [
    isBillingSameAsShipping,
    shipping_phone,
    shipping_customer_name,
    shipping_last_name,
    shipping_email,
    shipping_address,
    shipping_address_2,
    shipping_pincode,
    shipping_city,
    shipping_state,
    shipping_country,
  ]);

  function calculateTotal() {
    let calculatedTotalDiscount = 0;
    let calculatedTotalPrice = 0;
    addedProducts.forEach((product) => {
        const productQuantity = parseInt(product.units, 10) || 0;
        const productPrice = parseFloat(product.selling_price) || 0;
        const productDiscount = parseFloat(product.discount) || 0;
        calculatedTotalPrice += productPrice;
        // If discount is mentioned in the product details, consider it
        if (productDiscount > 0) {
            // calculatedTotalDiscount += (productQuantity * productPrice * productDiscount) / 100;
            calculatedTotalDiscount += (productDiscount)
        }
    });
    // Display total discount and total price only if there is a discount applied
    if (calculatedTotalDiscount > 0) {
        setTotal_discount(calculatedTotalDiscount.toFixed(2));
        setSub_total(calculatedTotalPrice);
    } else {
        setTotal_discount("");
        setSub_total("");
    }
}
useEffect(() => {
    // Calculate total discount and total price whenever addedProducts changes
    calculateTotal();
}, [addedProducts]);
  useEffect(() => {
    getDefaultOrderData();
  }, []);

  function handleProductAdd(e) {
    e.preventDefault();
  
    const newProduct = {
      name,
      sku,
      units,
      selling_price,
      discount,
      tax,
      hsn,
    };
  
    if (name || sku || units || selling_price || discount || tax || hsn) {
      setAddedProducts([...addedProducts, newProduct]);
  
      setName("");
      setSku("");
      setUnits("");
      setSelling_price("");
      setDiscount("");
      setTax("");
      setHsn("");
  
      calculateTotal();
    }
  }
  
  function handleProductAdd2(e) {
    e.preventDefault();
    setCurrentIndex(currentIndex + 1);
    

    
  }

  const handleProductDelete = (index) => {
    const updatedProducts = [...addedProducts];
    updatedProducts.splice(index, 1);
    setAddedProducts(updatedProducts);
  };

  function handleCreateOrder(e) {
    e.preventDefault();
    console.log(addedProducts);
    let url = "https://api.diwamjewels.com/DMJ/api/v1/shiprocket/orderCreate";
    axios
      .post("https://api.diwamjewels.com/DMJ/api/v1/shiprocket/orderCreate", {
        "order_id": oId,
                    "order_date": order_date,
                    "pickup_location": "DMJ Showroom",
                    "channel_id": "",
                    "comment": "Reseller: M/s Goku",
                    "billing_customer_name": billing_customer_name,
                    "billing_last_name":'',
                    "billing_address": billing_address,
                    "billing_address_2": '',
                    "billing_city": billing_city,
                    "billing_pincode": billing_pincode,
                    "billing_state": billing_state,
                    "billing_country": billing_country,
                    "billing_email": billing_email,
                    "billing_phone": billing_phone,
                    "shipping_is_billing": billingAddressCondition,
                    "shipping_customer_name": shipping_customer_name,
                    "shipping_last_name":'' ,
                    "shipping_address": shipping_address,
                    "shipping_address_2": '',
                    "shipping_city": billing_city,
                    "shipping_pincode": shipping_pincode,
                    "shipping_country": shipping_country,
                    "shipping_state": shipping_state,
                    "shipping_email": shipping_email,
                    "shipping_phone": shipping_phone,
                    "order_items": addedProducts,
                    "payment_method": payment_method,
                    "shipping_charges": 0,
                    "giftwrap_charges": 0,
                    "transaction_charges": 0,
                    "total_discount": total_discount,
                    "sub_total": sub_total,
                    "length": length,
                    "breadth": breadth,
                    "height": height,
                    "weight": weight
  })
      .then((res) => {
        console.log(res);
        alert('order created succesfully')
        navigate('/orderlist')
      })
      .catch((err) => {
        console.log(err);
        alert("fill all data")
      });
  }
  function checkboxFunction() {
    setIsBillingSameAsShipping(!isBillingSameAsShipping);
    setBillingAddressCondition(!billingAddressCondition);
  }
  function getDefaultOrderData() {
    const url = "https://api.diwamjewels.com/DMJ/api/v1/order/orderNumber/";
    const url2 = oId;
    axios
      .get(url + url2)
      .then((res) => {
        
        setShipping_phone(res.data.data.addressModel.mobile);
        setShipping_customer_name(res.data.data.addressModel.name);
        // setShipping_last_name(res.data.data)
        setShipping_address(res.data.data.addressModel.area);
        setShipping_email(res.data.data.email);
        setShipping_pincode(res.data.data.addressModel.pincode);
        setShipping_city(res.data.data.addressModel.city);
        setBilling_state(res.data.data.addressModel.state);
        setShipping_country(res.data.data.addressModel.country);
        setShipping_state(res.data.data.addressModel.state);
       
        setBilling_phone(res.data.data.addressModel.mobile);
        setBilling_alternate_phone(res.data.data.addressModel.alternateNumber);
        setBilling_customer_name(res.data.data.addressModel.name);
        setBilling_email(res.data.data.email);
        setBilling_address(res.data.data.addressModel.area);
        setBilling_pincode(res.data.data.addressModel.pincode);
        setBilling_city(res.data.data.addressModel.city);
        setBilling_state(res.data.data.addressModel.state);
        setBilling_country(res.data.data.addressModel.country);

       
        setOrder_id(res.data.data.orderNumber);
        setInvoice_number(res.data.data.invoiceNumber);

       
        setOrderProducts(res.data.data.order_Details_Models);
      })
      .then((res) => {
      
        console.log(res);
      });
  }
 
  useEffect(() => {
    displayDetails(currentIndex);
  }, [currentIndex]);

  function displayDetails(index) {
    const product = orderProducts[index] || {};
   console.log(product);
    setName(product.name || null);
    setSku(product.sku || null);
    setUnits(product.quantity || null);
    setSelling_price(product.amount || null);
    setDiscount(product.amount-product.price|| null);
    setProductPrice(product.amount || null);
    
  }
  return (
    <>
      <MainCategory>
        <div className="pagetitle">
          <h1>Create Order</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Create Order</li>
            </ol>
          </nav>
        </div>

        <div className="container">
          <form onSubmit={handleCreateOrder}>
            {/* Shipping Address */}
            <div className="seo-form-bg mt-2">
              <div className="row">
                <h4 className="fw-bold text-primary">Shipping Address</h4>

                <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">
                    Mobile Number :
                  </label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="number"
                      value={shipping_phone}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">First Name :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={shipping_customer_name}
                      required
                    />
                  </div>
                </div>

                {/* <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">Last Name :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={shipping_last_name}
                    />
                  </div>
                </div> */}

                <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">Email:</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="email"
                      value={shipping_email}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">Address 1 :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={shipping_address}
                      required
                    />
                  </div>
                </div>

                {/* <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">Address 2 :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={shipping_address_2}
                    />
                  </div>
                </div> */}

                <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">PinCode:</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={shipping_pincode}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">City :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={shipping_city}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">State :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={shipping_state}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">Country :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={shipping_country}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-12 mt-4">
                  <div className="form-check">
                    <input
                      className="form-check-input fs-5"
                      type="checkbox"
                      checked={isBillingSameAsShipping}
                      onChange={checkboxFunction}
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label pro-fnt-num fw-bold"
                      htmlFor="flexCheckChecked"
                    >
                      Billing address is same as the shipping address
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="seo-form-bg">
              {isBillingSameAsShipping ? null : (
                <div className="row">
                  <h4 className="fw-bold text-primary">Billing Address</h4>

                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold ">
                      Mobile Number :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={billing_phone}
                        onChange={(e) => {
                          setBilling_phone(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold ">
                      Alternate Mobile Number :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={billing_alternate_phone}
                        onChange={(e) => {
                          setBilling_alternate_phone(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">First Name :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={billing_customer_name}
                        onChange={(e) => {
                          setBilling_customer_name(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">Last Name :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={billing_last_name}
                        onChange={(e) => {
                          setBilling_last_name(e.target.value);
                        }}
                      />
                    </div>
                  </div> */}

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">Email:</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="email"
                        value={billing_email}
                        onChange={(e) => {
                          setBilling_email(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">Address 1 :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={billing_address}
                        onChange={(e) => {
                          setBilling_address(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">Address 2 :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={billing_address_2}
                        onChange={(e) => {
                          setBilling_address_2(e.target.value);
                        }}
                      />
                    </div>
                  </div> */}

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">PinCode:</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={billing_pincode}
                        onChange={(e) => {
                          setBilling_pincode(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">City :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={billing_city}
                        onChange={(e) => {
                          setBilling_city(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">State :</label>
                    <br />
                    <div className="">
                      {/* <select
                        className="form-select in-form-box"
                        value={billing_state}
                        onChange={(e) => {
                          setBilling_state(e.target.value);
                        }}
                        required
                      >
                        <option value="">Select State</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="DL">Delhi</option>
                        <option value="MI">Mumbai</option>
                        <option value="WB">West Bangal</option>
                      </select> */}
                        <input
                        className="form-control in-form-box"
                        type="text"
                        value={billing_state}
                      
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">Country :</label>
                    <br />
                    <div className="">
                    <input
                        className="form-control in-form-box"
                        type="text"
                        value={billing_country}
                      
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pickup Address */}
            <div className="seo-form-bg">
              <div className="row">
                <h4 className="fw-bold text-primary">Pickup Address</h4>

                <div className="col-md-12 mt-4">
                  <label className="pro-fnt-num fw-bold"> Pickup Type :</label>
                  <br />
                  <div className="">
                    <select
                      className="form-select in-form-box"
                      value={pickup_location}
                      onChange={(e) => {
                        setPickup_location(e.target.value);
                      }}
                      required
                    >
                     
                      <option value="DMJ Showroom">DMJ Showroom, Jaipur</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="seo-form-bg">
              <div className="row">
                <h4 className="fw-bold text-primary mt-5">Order Details</h4>

                <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">Order No. :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={order_id}
                     
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">
                    Invoice Number :
                  </label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      value={invoice_number}
                      onChange={(e) => {
                        setInvoice_number(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-4">
                  <label className="pro-fnt-num fw-bold ">Pickup Date :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="datetime-local"
                      value={order_date}
                      onChange={(e) => {
                        setOrder_date(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            {orderProducts ? (
              <div className="seo-form-bg">
                <div className="row">
                  <h4 className="fw-bold text-primary mt-5">Product Details</h4>
                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">
                      Product Name :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">SKU :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="text"
                        value={sku}
                        onChange={(e) => {
                          setSku(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">Quantity :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={units}
                        onChange={(e) => {
                          setUnits(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">
                      Product Price :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={selling_price}
                        onChange={(e) => {
                          setSelling_price(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">
                      Discount (optional) :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={discount}
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">
                      Tax Rate (optional) :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={tax}
                        onChange={(e) => {
                          setTax(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 mt-4">
                    <label className="pro-fnt-num fw-bold ">HSN Code :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={hsn}
                        onChange={(e) => {
                          setHsn(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 mt-4 d-flex justify-content-end">
                    <button
                      onClick={handleProductAdd}
                      className="btn btn-primary"
                    >
                      Add Product
                    </button>
                  </div>
                  <div className="col-md-12 mt-4 d-flex justify-content-end">
                    <button
                      onClick={handleProductAdd2}
                      className="btn btn-primary"
                    >
                      load Product
                    </button>
                  </div>

                  <div className="col-md-12 mt-4">
                    {addedProducts.length > 0 ? (
                      <table className="table">
                        <thead className="text-center">
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Tax Rate</th>
                            <th>HSN Code</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {addedProducts.map((product, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{product.name}</td>
                              <td>{product.sku}</td>
                              <td>{product.units}</td>
                              <td>{product.selling_price}</td>
                              <td>{product.discount}</td>
                              <td>{product.tax}</td>
                              <td>{product.hsn}</td>
                              <td>
                                {/* <button
                                                                className="btn btn-danger"
                                                                onClick={() => handleProductDelete(index)}
                                                            >
                                                                <i className="bi bi-trash-fill bg-danger" onClick={() => handleProductDelete(index)}></i>
                                                            </button> */}
                                <i
                                  className="bi bi-trash-fill text-danger"
                                  onClick={() => handleProductDelete(index)}
                                  style={{ cursor: "pointer" }}
                                ></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="fw-bold fs-5 text-center">
                        No products added yet.
                      </p>
                    )}
                  </div>

                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold ">
                      Total Discount :
                    </label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={total_discount}
                        onChange={(e) => {
                          setTotal_discount(e.target.value);
                        }}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-4">
                    <label className="pro-fnt-num fw-bold ">Sub Total :</label>
                    <br />
                    <div className="">
                      <input
                        className="form-control in-form-box"
                        type="number"
                        value={sub_total}
                        onChange={(e) => {
                          setSub_total(e.target.value);
                        }}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "loading .. "
            )}

            {/* Payment Details */}
            <div className="seo-form-bg">
              <div className="row">
                <h4 className="fw-bold text-primary mt-5">Payment Details</h4>

                <div className="col-md-6 mt-4">
                  <div className="form-check">
                    <input
                      className="form-check-input fs-5"
                      type="radio"
                      name="paymentMethod"
                      id="prepaid"
                      value="prepaid"
                      required
                      checked={payment_method === "prepaid"}
                      onChange={(e) => {
                        setPayment_method(e.target.value);
                      }}
                    />
                    <label
                      className="form-check-label pro-fnt-num fw-bold"
                      htmlFor="prepaid"
                    >
                      Prepaid
                    </label>
                  </div>
                </div>
                <div className="col-md-6 mt-4">
                  <div className="form-check">
                    <input
                      className="form-check-input fs-5"
                      type="radio"
                      name="paymentMethod"
                      id="cod"
                      value="cod"
                      required
                      checked={payment_method === "cod"}
                      onChange={(e) => {
                        setPayment_method(e.target.value);
                      }}
                    />
                    <label
                      className="form-check-label pro-fnt-num fw-bold"
                      htmlFor="cod"
                    >
                      Cash On Delivery
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="seo-form-bg">
              <div className="row">
                <h4 className="fw-bold text-primary mt-5">Package Details</h4>

                <div className="col-md-6 mt-4">
                  <label className="pro-fnt-num fw-bold ">Length :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      placeholder="Example: 10 cm"
                      value={length}
                      onChange={(e) => {
                        setLength(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mt-4">
                  <label className="pro-fnt-num fw-bold ">Breadth :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      placeholder="Example: 10 cm"
                      value={breadth}
                      onChange={(e) => {
                        setBreadth(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mt-4">
                  <label className="pro-fnt-num fw-bold ">Height :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      placeholder="Example: 10 cm"
                      value={height}
                      onChange={(e) => {
                        setHeight(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mt-4">
                  <label className="pro-fnt-num fw-bold ">Weight :</label>
                  <br />
                  <div className="">
                    <input
                      className="form-control in-form-box"
                      type="text"
                      placeholder="Example: 1 kg/grams"
                      value={weight}
                      onChange={(e) => {
                        setWeight(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Submit */}
            <div className="seo-form-bg">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <button
                    className="px-5 py-2 bg-primary text-white rounded border-0 mt-4 w-100"
                   
                    onClick={handleCreateOrder}
                  >
                    Submit
                  </button>
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
          </form>
        </div>
      </MainCategory>
    </>
  );
}

export default CreateOrder;
