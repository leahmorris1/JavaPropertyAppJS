import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';

import '../../style.css';

export const SellerInputForm = () => {
    const firstNameRef = useRef();
    const surnameRef = useRef();
    const addressRef = useRef();
    const postcodeRef = useRef();
    const phoneRef = useRef();

    let [errorMessage_firstName, setErrorMessage_firstName] = useState('');
    let [errorMessage_surname, setErrorMessage_surname] = useState('');
    let [errorMessage_address, setErrorMessage_address] = useState('');
    let [errorMessage_postcode, setErrorMessage_postcode] = useState('');
    let [errorMessage_phone, setErrorMessage_phone] = useState('');

    const navigate = useNavigate()

    function validateAndSave() {
        const newSeller = {
            "firstName": firstNameRef.current.value,
            "surname": surnameRef.current.value,
            "address": addressRef.current.value,
            "postcode": postcodeRef.current.value,
            "phone": phoneRef.current.value,
        }

        if (!newSeller.firstName) { setErrorMessage_firstName('Please fill in First Name.'); }
        else { setErrorMessage_firstName('') }
        if (!newSeller.surname) { setErrorMessage_surname('Please fill in Surname.'); }
        else { setErrorMessage_surname('') }
        if (!newSeller.address) { setErrorMessage_address('Please fill in Address.'); }
        else { setErrorMessage_address('') }
        if (!newSeller.postcode) { setErrorMessage_postcode('Please fill in Postcode.'); }
        else { setErrorMessage_postcode('') }
        if (!newSeller.phone) { setErrorMessage_phone('Please fill in Phone Number.'); }
        else { setErrorMessage_phone('') }

        if (
            newSeller.firstName &&
            newSeller.surname &&
            newSeller.address &&
            newSeller.postcode &&
            newSeller.phone
        ) {
            fetch('http://localhost:8000/seller', {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(newSeller)
            })
                .then((response) => {
                    navigate("/Seller/SellerProperty")
                })
                .catch(error => {
                    console.error('Error saving seller:', error);
                });
        }
    }
    return (
        <>
            <h1> Add Seller Form </h1>
            <br />

            <form class="sellerForm container">
                <label class="col-sm-3 col-form-label"> First Name: </label>
                <input ref={firstNameRef} type='text' placeholder='First Name' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_firstName && <div className="form-group has-warning">{errorMessage_firstName}</div>}
                </small><br />

                <label class="col-sm-3 col-form-label"> Surname: </label>
                <input ref={surnameRef} type='text' placeholder='Surname' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_surname && <div className="form-group has-warning">{errorMessage_surname}</div>}
                </small><br />

                <label class="col-sm-3 col-form-label"> Address: </label>
                <input ref={addressRef} type='text' placeholder='City/Country' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_address && <div className="form-group has-warning">{errorMessage_address}</div>}
                </small><br />

                <label class="col-sm-3 col-form-label"> Postcode: </label>
                <input ref={postcodeRef} type='text' placeholder='Postcode' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_postcode && <div className="form-group has-warning">{errorMessage_postcode}</div>}
                </small><br />

                <label class="col-sm-3 col-form-label"> Phone: </label>
                <input ref={phoneRef} type='text' placeholder='Phone' />
                <small id="passwordHelp" class="text-danger">
                    {errorMessage_phone && <div className="form-group has-warning">{errorMessage_phone}</div>}
                </small><br />
                <br />

                <Link className="btn btn-dark link1" onClick={() => validateAndSave()}> Save </Link>
                <Link to="/Seller/SellerProperty" className="btn btn-light link1"> Cancel </Link>
            </form >
        </>
    )
}

export default SellerInputForm;