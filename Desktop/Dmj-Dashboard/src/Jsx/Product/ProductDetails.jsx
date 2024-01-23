import './productdetails.css'
import { useLocation } from 'react-router-dom';


function ProductDetails() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productData = queryParams.get('product');
    const product = productData ? JSON.parse(decodeURIComponent(productData)) : {};



    return (
        <div className="container py-4 my-4 mx-auto d-flex flex-column">
            <div className="header">
                <div className="row r1">
                    <div className="col-md-9 abc">
                        {/* <h1> <b>Antique Kundan Mala Set</b></h1> */}
                    
                        <h1> <b>{product.Item_name}</b></h1>
                    </div>
                    <div className="col-md-3 text-right pqr"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
                    <p className="text-right para">Based on 250 Review</p>
                </div>
            </div>
            <div className="container-body mt-4">
                <div className="row r3">
                    <div className="col-md-5 p-0 klo">
                        <ul>
                            <li>Product Name: {product.Item_name}</li>
                            <li>Category: {product.Category}</li>
                            <li>Status: {product.Status}</li>
                            <li>Sales: {product.Sales}</li>
                            <li>Stock: {product.Stock}</li>
                            <li>Price: {product.Price}</li>
                            <li>Product Code : DMJS0027</li>
                            <li>Product Type : Jewellery Chain</li>
                            <li>Beautiful Color : Green, Pink, Multicolor</li>
                            <li>Size : Free Size</li>
                            <li>Metal Information : Metal Purity</li>
                            <li>Easy Returns</li>
                            <li>6 Months Warranty</li>
                            <li>EMI Starting from (On Credit Cards)</li>
                            <li>Normal Delivery : 4-5 Days</li>
                            <li>Express Delivery : 2-3 Days</li>
                            <li>Online / COD Available (All Over India)</li>
                        </ul>
                    </div>
                    <div className="col-md-7 image"> <img src="src\Dashboard\MainContent\jeweller1.png" alt='image...'/> </div>
                </div>
            </div>

            {/* <div className="footer d-flex flex-column mt-5">
        <div className="row r4">
            <div className="col-md-2 myt des"><a href="#">Description</a></div>
            <div className="col-md-2 myt "><a href="#">Review</a></div>
            <div className="col-md-2 mio offset-md-4"><a href="#">ADD TO CART</a></div>
            <div className="col-md-2 myt "><button type="button" className="btn btn-outline-warning"><a href="#">BUY NOW</a></button></div>
        </div>
    </div> */}

        </div>
    );
}

export default ProductDetails;