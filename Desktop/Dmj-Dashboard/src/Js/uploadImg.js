import axios from "axios";

// import sharp from 'sharp';

// const webp = require('webp-converter');
const url = 'https://squid-app-2-7wbvi.ondigitalocean.app/DMJ';
const endPoint = 'images/pictures';
const singleEndPoint = 'images';
const uploadUrl = 'https://squid-app-2-7wbvi.ondigitalocean.app/uploads/'
// const multiEnd = 'api/v1/upload/multi';

const headers = {
    'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
};



async function multipleImages(imgArray) {

    const formData = new FormData()
    imgArray.forEach((img) => {
        formData.append(`images`, img); // You can change the field name as needed
    });



    try {
        const res = await axios.post(uploadUrl, formData, { headers })
        console.log(res.data)

        // Convert the imgRes array to a comma-separated string
        const imgRes = res.data.map(item => item.path);
        const imgResString = imgRes.join(',');

        return imgResString
    }
    catch (err) {
        console.log(err)
    }

}


async function singleImage(img) {
    // console.log(img)

    const formData = new FormData()
    formData.append('images', img)


    try {
        const res = await axios.post(uploadUrl, formData, { headers })
        console.log(res.data)

        return res.data[0].path
    }
    catch (err) {
        console.log(err)
    }
}


export { multipleImages, singleImage }