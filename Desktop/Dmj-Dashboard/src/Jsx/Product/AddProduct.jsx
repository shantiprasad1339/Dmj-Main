import React from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import ProductForm from './ProductForm';

function AddProduct() {
    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Add Product</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Add Product</li>
                        </ol>
                    </nav>
                </div>

                <ProductForm />

            </MainCategory>
        </>
    );
}

export default AddProduct;