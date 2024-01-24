import React from 'react';
import './maincategory.css';
import Header1 from '../Header/Header1';
import LeftCategory from '../LeftCategory/LeftCategory';
// import Footer from '../../Jsx/Footer/Footer';

const userId = localStorage.getItem('userId1')


function MainCategory(props) {
    return (
        <>
            {userId.length>0 ? <>
                <Header1 />
                <LeftCategory />

                <div id='main' className='main'>
                    {props.children}
                </div>
            </> :
                <h3 className='text-center mt-5'>Please Login</h3>
            }
            {/* <Footer /> */}
        </>
    );
}
export default MainCategory;