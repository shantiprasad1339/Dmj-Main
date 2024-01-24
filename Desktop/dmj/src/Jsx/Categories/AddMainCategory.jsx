import React from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from 'react-router-dom';
import SetMainCategory from './SetMainCategory';

function AddMainCategory() {
    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Add Main Category</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Add Main Category</li>
                        </ol>
                    </nav>
                </div>

                <SetMainCategory />

            </MainCategory>
        </>
    );
}

export default AddMainCategory;