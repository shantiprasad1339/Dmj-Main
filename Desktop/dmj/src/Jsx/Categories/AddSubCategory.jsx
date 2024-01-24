import React from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import SubCategory from './SubCategory';
function AddSubCategory() {
    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Add Sub Category</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Add Sub Category</li>
                        </ol>
                    </nav>
                </div>

                <SubCategory />

            </MainCategory>
        </>
    );
}

export default AddSubCategory;