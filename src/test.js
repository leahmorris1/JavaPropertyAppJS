const { sellerId, sellerFirstName, sellerSurname } = userParams()
const urlAddProperty = '/AddSellerPropertyForm/'
const [records, setRecords] = useState([])

function getData() {
    fetch('http://localhost:8000/seller')
        .then((response) => {
            if (!response.ok) {
                alert("An error has occured. unable to read the Sellers");
                throw response.status;
            }
            else return response.json();
        })
        .then(pList => { setPropertyList(pList.filter(property => property.sellerId == sellerId)) })
}

import { Link } from "react-router-dom";
import React from 'react';
import { useRef, useState, useEffect } from 'react';

import '../../style.css';

function PropertySearch() {

    const [records, setRecords] = useState([]);
    const [buyerRecords, setBuyerRecords] = useState([]);

    const [postcode, setpostcode] = useState('');
    const [type, settype] = useState('');
    const [price, setprice] = useState('');
    const [bedroom, setbedroom] = useState('');
    const [bathroom, setbathroom] = useState('');
    const [garden, setgarden] = useState('');

    const buyerName = useRef();

    function getData() {
        fetch('http://localhost:8000/property')
            .then((response) => response.json())
            .then((data) => {
                setRecords(data);
            });
        fetch('http://localhost:8000/buyer')
            .then((response) => response.json()
                .then((buyerData) => setBuyerRecords(buyerData)))
    }

    useEffect(() => { getData() }, [])

    function handleSearch() {
        fetch('http://localhost:8000/property')
            .then((response) => response.json())
            .then((data) => {
                // eslint-disable-next-line eqeqeq
                const filteredRecords1 = data.filter((rec) => rec.bedroom == type);
                // eslint-disable-next-line eqeqeq
                const filteredRecords2 = data.filter((rec) => rec.bedroom == bedroom);
                // eslint-disable-next-line eqeqeq
                const filteredRecords3 = data.filter((rec) => rec.bedroom == bathroom);
                // eslint-disable-next-line eqeqeq
                const filteredRecords4 = data.filter((rec) => rec.bedroom == garden);
                setRecords(filteredRecords1)
                    .then.setRecords(filteredRecords2)
                    .then.setRecords(filteredRecords3)
                    .then.setRecords(filteredRecords4)

            });
    }

    let filteredRecord = records.filter(rec => rec.status == 'FOR SALE')

    return (
        <>
            <h1>Property Search</h1>
            <form class="container">
                <label class="col-sm-2 col-form-label"> Select yourname and ID: </label>
                <select ref={buyerName}>
                    {buyerRecords.map(buyerData =>
                        <option> {buyerData.firstName} {buyerData.surname} {buyerData.id} </option>
                    )}
                </select >
                <br />
            </form>

            <form class="container">
                <label class="col-sm-2 col-form-label">Postcode:</label>
                <input type="text" value={postcode} onChange={(e) => setpostcode(e.target.value)} />
                <br />
                <label class="col-sm-2 col-form-label" type="text">Type:</label>
                <select value={type} onChange={(e) => settype(e.target.value)}>
                    <option value="">Select</option>
                    <option value="DETACHED"> Detached </option>
                    <option value="SEMI"> SEMI </option>
                    <option value="APARTMENT"> Apartment </option>
                </select>
                <br />
                <label class="col-sm-2 col-form-label">Price:</label>
                <input type="text" value={price} onChange={(e) => setprice(e.target.value)} />
                <br />
                <label class="col-sm-2 col-form-label">Bedroom:</label>
                <select type="text" value={bedroom} onChange={(e) => setbedroom(e.target.value)}>
                    <option value="">Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <br />
                <label class="col-sm-2 col-form-label">Bathroom:</label>
                <select type="text" value={bathroom} onChange={(e) => setbathroom(e.target.value)} >
                    <option value="">Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <br />
                <label class="col-sm-2 col-form-label">Garden:</label>
                <select type="text" value={garden} onChange={(e) => setgarden(e.target.value)}>
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <br />

                <button type="submit" onClick={() => handleSearch()}>Search</button>
                <br />
                <br />
            </form >

            <table class="table container">
                <tr>
                    <th> Address </th>
                    <th> Postcode </th>
                    <th> Type </th>
                    <th> Price </th>
                    <th> Bedroom </th>
                    <th> Bathroom </th>
                    <th> Garden </th>
                    <td>  </td>
                </tr>

                {filteredRecord.map(rec => (
                    <tr key={rec.id}>
                        <td>{rec.address}</td>
                        <td>{rec.postcode}</td>
                        <td>{rec.type}</td>
                        <td>{rec.price}</td>
                        <td>{rec.bedroom}</td>
                        <td>{rec.bathroom}</td>
                        <td>{rec.garden}</td>
                        <td>
                            {rec.status === "FOR SALE" && (
                                <Link to="/Property/Purchase" className="btn btn-light">
                                    Book Viewing
                                </Link>
                            )}
                        </td>
                    </tr>
                ))
                }
            </table >
        </>
    );
}





export default PropertySearch;





import { Link } from "react-router-dom";
import React from 'react';
import { useState, useEffect } from 'react';


function PropertySearch() {

    const [records, setRecords] = useState([]);

    const [postcode, setpostcode] = useState('');
    const [type, settype] = useState('');
    const [price, setprice] = useState('');
    const [bedroom, setbedroom] = useState('');
    const [bathroom, setbathroom] = useState('');
    const [garden, setgarden] = useState('');


    function getData() {
        fetch('http://localhost:8000/property')
            .then((response) => response.json())
            .then((data) => {
                setRecords(data);
            });
    }

    useEffect(() => { getData() }, [])

    function handleSearch() {
        fetch('http://localhost:8000/property')
            .then((response) => response.json())
            .then((data) => {
                const filteredRecords = data.filter((rec) => rec.bedroom == bedroom);
                setRecords(filteredRecords);
            });
    }


    return (
        <>
            <h2>Property Search</h2>
            <label>
                Postcode:
                <input type="text" value={postcode} onChange={(e) => setpostcode(e.target.value)} />
            </label>
            <br />
            <label>
                Type:
                <input type="text" value={type} onChange={(e) => settype(e.target.value)} />
            </label>
            <br />
            <label>
                Price:
                <input type="text" value={price} onChange={(e) => setprice(e.target.value)} />
            </label>
            <br />
            <label>
                Bedroom:
                <input type="text" value={bedroom} onChange={(e) => setbedroom(e.target.value)} />
            </label>
            <br />
            <label>
                Bathroom:
                <input type="text" value={bathroom} onChange={(e) => setbathroom(e.target.value)} />
            </label>
            <br />
            <label>
                Garden:
                <input type="text" value={garden} onChange={(e) => setgarden(e.target.value)} />
            </label>
            <br />

            <button type="submit" onClick={() => handleSearch()}>Search</button>

            {records.map(rec => (
                <tr key={rec.id}>
                    <td>{rec.address}</td>
                    <td>{rec.postcode}</td>
                    <td>{rec.type}</td>
                    <td>{rec.price}</td>
                    <td>{rec.bedroom}</td>
                    <td>{rec.bathroom}</td>
                    <td>{rec.status}</td>
                    <td>
                        {rec.status === "FOR SALE" && (
                            <Link to="/Property/Purchase" className="btn btn-dark">
                                BUY
                            </Link>
                        )}
                    </td>
                </tr>
            ))
            }
        </>
    );
}





export default PropertySearch;