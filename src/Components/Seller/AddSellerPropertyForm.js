import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import '../../style.css';

//sellerID = "" -- get rid of the ""

export const SellerpropertyInputForm = () => {
    const { sellerId, firstName, surname } = useParams()

    useEffect(() => {
        console.log(sellerId)
    }, []);

    const addressRef = useRef();
    const postcodeRef = useRef();
    const typeRef = useRef();
    const priceRef = useRef();
    const bedroomsRef = useRef();
    const bathroomsRef = useRef();
    const gardenRef = useRef();

    let [errorMessage_address, setErrorMessage_address] = useState('');
    let [errorMessage_postcode, setErrorMessage_postcode] = useState('');
    let [errorMessage_type, setErrorMessage_type] = useState('');
    let [errorMessage_price, setErrorMessage_price] = useState('');
    let [errorMessage_bedrooms, setErrorMessage_bedrooms] = useState('');
    let [errorMessage_bathrooms, setErrorMessage_bathrooms] = useState('');
    let [errorMessage_garden, setErrorMessage_garden] = useState('');

    const navigate = useNavigate()

    function validateAndSave() {
        const newProperty = {
            "address": addressRef.current.value,
            "postcode": postcodeRef.current.value,
            "type": typeRef.current.value,
            "price": priceRef.current.value,
            "bedrooms": bedroomsRef.current.value,
            "bathrooms": bathroomsRef.current.value,
            "garden": gardenRef.current.value,
            "seller": { sellerId },
            "status": "FOR SALE"
        }

        if (!newProperty.address) { setErrorMessage_address('Please fill in address.'); }
        else { setErrorMessage_address('') }
        if (!newProperty.postcode) { setErrorMessage_postcode('Please fill in postcode.'); }
        else { setErrorMessage_postcode('') }
        if (newProperty.type === "select") { setErrorMessage_type('Please select type.'); }
        else { setErrorMessage_type('') }
        if (!newProperty.price) { setErrorMessage_price('Please fill in price.'); }
        else { setErrorMessage_price('') }
        /* validate as numeric and nor string */
        if (newProperty.bedrooms === "select") { setErrorMessage_bedrooms('Please select number of bedrooms.'); }
        else { setErrorMessage_bedrooms('') }
        if (newProperty.bathrooms === "select") { setErrorMessage_bathrooms('Please select number of bathrooms.'); }
        else { setErrorMessage_bathrooms('') }
        if (newProperty.garden === "select") { setErrorMessage_garden('Please select wheather you have a garden.'); }
        else { setErrorMessage_garden('') }

        if (
            newProperty.address &&
            newProperty.postcode &&
            newProperty.type !== 'select' &&
            newProperty.price &&
            newProperty.bedrooms !== 'select' &&
            newProperty.bathrooms !== 'select' &&
            newProperty.garden !== 'select'
        ) {
            console.log(newProperty);
            newProperty.seller = { seller_id: sellerId }
            fetch('http://localhost:8080/properties/add', {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(newProperty)
            })
                .then((response) => {
                    navigate(`/Seller/ManageSellerProperty/${sellerId}/${firstName}/${surname}`)
                })
                .catch(error => {
                    console.error('Error saving seller:', error);
                });
        }
    }

    return (
        <>
            <h1> Add Seller Property Form </h1><br />

            <form className='sellerForm container'>
                <label className="col-sm-3 col-form-label"> Type: </label>
                <select ref={typeRef} type='text' placeholder='Type'>
                    <option value="select">Select</option>
                    <option value="DETACHED"> Detached </option>
                    <option value="SEMI"> SEMI </option>
                    <option value="APARTMENT"> Apartment </option>
                </select>
                <small id="passwordHelp" className="text-danger">
                    {errorMessage_type && <div className="form-group has-warning">{errorMessage_type}</div>}
                </small><br />

                <label className="col-sm-3 col-form-label"> Price: </label>
                <input ref={priceRef} type='number' placeholder='Price' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_price && <div className="form-group has-warning">{errorMessage_price}</div>}
                </small><br />

                <label className="col-sm-3 col-form-label"> Number of bedrooms: </label>
                <select ref={bedroomsRef} type='text' placeholder='Bedroom'>
                    <option value="select">Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <small id="passwordHelp" className="text-danger">
                    {errorMessage_bedrooms && <div className="form-group has-warning">{errorMessage_bedrooms}</div>}
                </small><br />

                <label className="col-sm-3 col-form-label"> Number of bathrooms: </label>
                <select ref={bathroomsRef} type='text' placeholder='bathrooms'>
                    <option value="select">Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <small id="passwordHelp" className="text-danger">
                    {errorMessage_bathrooms && <div className="form-group has-warning">{errorMessage_bathrooms}</div>}
                </small><br />

                <label className="col-sm-3 col-form-label"> Is there a garden: </label>
                <select ref={gardenRef} typeName='text' placeholder='garden'>
                    <option value="select">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <small id="passwordHelp" className="text-danger">
                    {errorMessage_garden && <div className="form-group has-warning">{errorMessage_garden}</div>}
                </small><br />

                <label className="col-sm-3 col-form-label"> Address: </label>
                <input ref={addressRef} type='text' placeholder='City/Country' />
                <small id="passwordHelp" className="text-danger">
                    {errorMessage_address && <div className="form-group has-warning">{errorMessage_address}</div>}
                </small><br />

                <label className="col-sm-3 col-form-label"> Postcode: </label>
                <input ref={postcodeRef} type='text' placeholder='Postcode' />
                <small id="passwordHelp" className="text-danger">
                    {errorMessage_postcode && <div className="form-group has-warning">{errorMessage_postcode}</div>}
                </small><br />
                <br />

                {/* Sold of for sale */}

                <Link className="btn btn-dark link1" onClick={() => validateAndSave()}> Save </Link>
                <Link to="/Seller/SellerProperty" className="btn btn-light link1"> Cancel </Link>

            </form>
        </>
    )
}

export default SellerpropertyInputForm;