import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import AddProduct from '../Product/AddProduct';
import AddMainCategory from '../Categories/AddMainCategory';
import AddSubCategory from '../Categories/AddSubCategory';
import AddColor from '../ProductInfo/AddColor';
import AddSize from '../ProductInfo/AddSize';
import AddBanner from '../ProductInfo/AddBanner';
import AddPrice from '../ProductInfo/AddPrice';
import AddReview from '../ProductInfo/AddReview';
import AddRating from '../ProductInfo/AddRating';
import EditMainCategory from '../Update/EditMainCategory';
import EditSubCategory from '../Update/EditSubCategory';
import EditColor from '../Update/EditColor';
import EditSize from '../Update/EditSize';
import EditBanner from '../Update/EditBanner';
import EditPrice from '../Update/EditPrice';
import EditReview from '../Update/EditReview';
import EditRating from '../Update/EditRating';
// import Contact from '../Contact/Contact';
import Login from '../Login/Login';
// import SignUp from '../Signup/SignUp';
// import Variation from '../Variation/Variation';
import Profile from '../Profile/Profile';
// import FAQ from '../FAQ/FAQ';
import ProductList from '../ProductList/ProductList';
import AddImagesVariation from '../Variation/AddImages';
import VariationPrice from '../Variation/VariationPrice';
import AddMaterial from '../ProductInfo/AddMaterial';
import EditProduct from '../Update/EditProduct';
import Variant from '../Update/Variant';
import EditVariant from '../Update/EditVariant';
import EditVariantImages from '../Update/EditVariantImages';
import AddBlog from '../ProductInfo/AddBlog';
import OrderList from '../OrderList/OrderList';
import CreateOrder from '../OrderShipping/CreateOrder';

function Router() {
    return (

        <Routes>

            <Route path='/' element={<Home />}></Route>

            <Route path='/addproduct' element={<AddProduct />}></Route>
            <Route path='/addmaincategory' element={<AddMainCategory />}></Route>
            <Route path='/addsubcategory' element={<AddSubCategory />}></Route>
            <Route path='/addcolor' element={<AddColor />}></Route>
            <Route path='/addsize' element={<AddSize />}></Route>
            <Route path='/addbanner' element={<AddBanner />}></Route>
            <Route path='/addprice' element={<AddPrice />}></Route>
            <Route path='/addreview' element={<AddReview />}></Route>
            <Route path='/addrating' element={<AddRating />}></Route>
            <Route path='/addblog' element={<AddBlog />}></Route>

            <Route path='/editmaincategory' element={<EditMainCategory />}></Route>
            <Route path='/editsubcategory' element={<EditSubCategory />}></Route>
            <Route path='/editcolor' element={<EditColor />}></Route>
            <Route path='/editsize' element={<EditSize />}></Route>
            <Route path='/editbanner' element={<EditBanner />}></Route>
            <Route path='/editprice' element={<EditPrice />}></Route>
            <Route path='/editreview' element={<EditReview />}></Route>
            <Route path='/editrating' element={<EditRating />}></Route>
            <Route path='/editproduct/:proId' element={<EditProduct />}></Route>
            <Route path='/editvariant/:pId' element={<EditVariant />}></Route>
            <Route path='/variant' element={<Variant />}></Route>
            <Route path='/editVariantImages/:id' element={<EditVariantImages />}></Route>

            <Route path='/productlist' element={<ProductList />}></Route>
            {/* <Route path='/variation' element={<Variation />}></Route> */}
            <Route path='/addvariantimages' element={<AddImagesVariation />} />
            <Route path='/addvariantprice' element={<VariationPrice />} />

            <Route path='/userprofile' element={<Profile />}></Route>
            {/* <Route path='/faq' element={<FAQ/>}></Route> */}
            <Route path='/addmaterial' element={<AddMaterial />}></Route>
            <Route path='/orderlist' element={<OrderList/>}></Route>
            <Route path='/create-order/:oId' element={<CreateOrder/>}></Route>

        </Routes>

    );
}

export default Router;