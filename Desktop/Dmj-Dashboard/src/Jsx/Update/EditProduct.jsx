import React from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import EditProductForm from './EditProductForm';

function EditProduct() {
    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Edit Product</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/productlist">My Product List</Link></li>
                            <li className="breadcrumb-item active">Edit sdfProduct</li>
                        </ol>
                    </nav>
                </div>

                <EditProductForm />

            </MainCategory>
        </>
    );
}

export default EditProduct;