import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useRef, useState } from 'react';

//sellerID = "" -- get rid of the ""

export const SellerpropertyInputForm = () => {
    const { sellerId, firstName, surname } = useParams()

    const addressRef = useRef();
    const postcodeRef = useRef();
    const typeRef = useRef();
    const priceRef = useRef();
    const bedroomRef = useRef();
    const bathroomRef = useRef();
    const gardenRef = useRef();

    let [errorMessage_address, setErrorMessage_address] = useState('');
    let [errorMessage_postcode, setErrorMessage_postcode] = useState('');
    let [errorMessage_type, setErrorMessage_type] = useState('');
    let [errorMessage_price, setErrorMessage_price] = useState('');
    let [errorMessage_bedroom, setErrorMessage_bedroom] = useState('');
    let [errorMessage_bathroom, setErrorMessage_bathroom] = useState('');
    let [errorMessage_garden, setErrorMessage_garden] = useState('');

    const navigate = useNavigate()

    function validateAndSave() {
        const newSeller = {
            "address": addressRef.current.value,
            "postcode": postcodeRef.current.value,
            "type": typeRef.current.value,
            "price": priceRef.current.value,
            "bedroom": bedroomRef.current.value,
            "bathroom": bathroomRef.current.value,
            "garden": gardenRef.current.value,
            "sellerId": parseInt(sellerId),
            "status": "FOR SALE"
        }

        if (!newSeller.address) { setErrorMessage_address('Please fill in address.'); }
        else { setErrorMessage_address('') }

        if (!newSeller.postcode) { setErrorMessage_postcode('Please fill in postcode.'); }
        else { setErrorMessage_postcode('') }

        if (newSeller.type === "select") { setErrorMessage_type('Please select type.'); }
        else { setErrorMessage_type('') }

        if (!newSeller.price) { setErrorMessage_price('Please fill in price.'); }
        else { setErrorMessage_price('') }
        /* validate as numeric and nor string */

        if (newSeller.bedroom === "select") { setErrorMessage_bedroom('Please select number of bedrooms.'); }
        else { setErrorMessage_bedroom('') }

        if (newSeller.bathroom === "select") { setErrorMessage_bathroom('Please select number of bathrooms.'); }
        else { setErrorMessage_bathroom('') }

        if (newSeller.garden === "select") { setErrorMessage_garden('Please select wheather you have a garden.'); }
        else { setErrorMessage_garden('') }

        if (
            newSeller.address &&
            newSeller.postcode &&
            newSeller.type !== 'select' &&
            newSeller.price &&
            newSeller.bedroom !== 'select' &&
            newSeller.bathroom !== 'select' &&
            newSeller.garden !== 'select'
        ) {
            fetch('http://localhost:8000/property', {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(newSeller)
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
            <header> Add Seller Property Form </header><br />

            <form class='form'>
                <label class="col-sm-2 col-form-label text-success"> Type: </label>
                <select ref={typeRef} type='text' placeholder='Type'>
                    <option value="select">Select</option>
                    <option value="DETACHED"> Detached </option>
                    <option value="SEMI"> SEMI </option>
                    <option value="APARTMENT"> Apartment </option>
                </select>
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_type && <div className="form-group has-warning">{errorMessage_type}</div>}
                </small><br />


                <label class="col-sm-2 col-form-label text-success"> Price: </label>
                <input ref={priceRef} type='number' placeholder='Price' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_price && <div className="form-group has-warning">{errorMessage_price}</div>}
                </small><br />

                <label class="col-sm-2 col-form-label text-success"> Number of bedrooms: </label>
                <select ref={bedroomRef} type='text' placeholder='Bedroom'>
                    <option value="select">Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_bedroom && <div className="form-group has-warning">{errorMessage_bedroom}</div>}
                </small><br />

                <label class="col-sm-2 col-form-label text-success"> Number of bathrooms: </label>
                <select ref={bathroomRef} type='text' placeholder='Bathroom'>
                    <option value="select">Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_bathroom && <div className="form-group has-warning">{errorMessage_bathroom}</div>}
                </small><br />

                <label class="col-sm-2 col-form-label text-success"> Is there a garden: </label>
                <select ref={gardenRef} type='text' placeholder='garden'>
                    <option value="select">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_garden && <div className="form-group has-warning">{errorMessage_garden}</div>}
                </small><br />

                <label class="col-sm-2 col-form-label text-success"> Address: </label>
                <input ref={addressRef} type='text' placeholder='City/Country' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_address && <div className="form-group has-warning">{errorMessage_address}</div>}
                </small><br />

                <label class="col-sm-2 col-form-label text-success"> Postcode: </label>
                <input ref={postcodeRef} type='text' placeholder='Postcode' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_postcode && <div className="form-group has-warning">{errorMessage_postcode}</div>}
                </small><br />

                {/* Sold of for sale */}

                <Link className="btn btn-dark" onClick={() => validateAndSave()}> Save </Link>
                <Link to="/Seller/SellerProperty" className="btn btn-light"> Cancel </Link>

            </form>
        </>
    )
}

export default SellerpropertyInputForm;