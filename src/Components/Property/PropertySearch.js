import { Link } from "react-router-dom";
import React from 'react';
import { useRef, useState, useEffect } from 'react';

import '../../index.css';
import '../../style.css';

function PropertySearch() {

    const [records, setRecords] = useState([]);
    const [buyerRecords, setBuyerRecords] = useState([]);

    const [type, settype] = useState('');
    const [minprice, setminprice] = useState('');
    const [maxprice, setmaxprice] = useState('');
    const [bedroom, setbedroom] = useState('');
    const [bathroom, setbathroom] = useState('');
    const [garden, setgarden] = useState('');

    const buyerName = useRef();

    function getData() {
        fetch('http://localhost:8000/property')
            .then((response) => response.json())
            .then((data) => {
                setRecords(data.filter(data => data.status == 'FOR SALE'));
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
                setRecords(data.filter(data => data.status == 'FOR SALE'));
                const filterFORSALE = records.filter((data) =>
                    (type === "" || data.type == type) &&
                    (minprice === "" || data.price >= parseInt(minprice)) &&
                    (maxprice === "" || data.price <= parseInt(maxprice)) &&
                    (bedroom === "" || data.bedroom == bedroom) &&
                    (bathroom === "" || data.bathroom == bathroom)
                );
                setRecords(filterFORSALE)
            });

        /* // eslint-disable-next-line eqeqeq
        const filteredRecords = filterFORSALE.filter((rec) => rec.bedroom == bedroom);
        // eslint-disable-next-line eqeqeq
        const filteredRecords = filterFORSALE.filter((rec) => rec.bedroom == bathroom);
        // eslint-disable-next-line eqeqeq
        const filteredRecords = filterFORSALE.filter((rec) => rec.bedroom == garden); */

    }

    return (
        <main>
            <h1>Property Search</h1>
            <form class="container">
                <label class="col-sm-3 col-form-label"> Select yourname and ID: </label>
                <select ref={buyerName}>
                    {buyerRecords.map(buyerData =>
                        <option> {buyerData.firstName} {buyerData.surname} {buyerData.id} </option>
                    )}
                </select >
                <br />
            </form>

            <form class="container">
                <label class="col-sm-3 col-form-label" type="text">Type:</label>
                <select value={type} onChange={(e) => settype(e.target.value)}>
                    <option value="">Select</option>
                    <option value="DETACHED"> Detached </option>
                    <option value="SEMI"> SEMI </option>
                    <option value="APARTMENT"> Apartment </option>
                </select>
                <br />
                <label class="col-sm-3 col-form-label">Price (£):</label>
                <select type="text" value={minprice} onChange={(e) => setminprice(e.target.value)} placeholder="Min Price">
                    <option value="">Select</option>
                    <option>0</option>
                    <option>50000</option>
                    <option>100000</option>
                    <option>150000</option>
                    <option>200000</option>
                    <option>250000</option>
                    <option>300000</option>
                    <option>350000</option>
                    <option>400000</option>
                    <option>450000</option>
                    <option>500000</option>
                </select>
                <select type="text" value={maxprice} onChange={(e) => setmaxprice(e.target.value)} placeholder="Max Price">
                    <option value="">Select</option>
                    <option>0</option>
                    <option>50000</option>
                    <option>100000</option>
                    <option>150000</option>
                    <option>200000</option>
                    <option>250000</option>
                    <option>300000</option>
                    <option>350000</option>
                    <option>400000</option>
                    <option>450000</option>
                    <option>500000</option>
                </select>
                <br />
                <label class="col-sm-3 col-form-label">Bedroom:</label>
                <select type="text" value={bedroom} onChange={(e) => setbedroom(e.target.value)}>
                    <option value="">Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <br />
                <label class="col-sm-3 col-form-label">Bathroom:</label>
                <select type="text" value={bathroom} onChange={(e) => setbathroom(e.target.value)} >
                    <option value="">Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <br />
                <label class="col-sm-3 col-form-label">Garden:</label>
                <select type="text" value={garden} onChange={(e) => setgarden(e.target.value)}>
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <br />
                <br />
            </form >
            <div class="container">
                <button onClick={() => handleSearch()}>Search</button>
                <br />
                <br />
            </div>
            <table class="container">
                <tr>
                    <th> Address </th>
                    <th> Postcode </th>
                    <th> Type </th>
                    <th> Price </th>
                    <th> Bedroom </th>
                    <th> Bathroom </th>
                    <th> Garden </th>
                    <th>  </th>
                </tr>

                {records.map(rec => (
                    <tr key={rec.id}>
                        <td>{rec.address}</td>
                        <td>{rec.postcode}</td>
                        <td>{rec.type}</td>
                        <td>{rec.price}</td>
                        <td>{rec.bedroom}</td>
                        <td>{rec.bathroom}</td>
                        {rec.garden == "true" ? (<td>Yes</td>) : (<td>No</td>)}
                        <td>
                            {rec.status === "FOR SALE" && (<Link to="/Property/Booking" className="btn btn-light">Book Viewing
                            </Link>
                            )}
                        </td>
                    </tr>
                ))
                }
            </table >
        </main>
    );
}

/* {// eslint-disable-next-line eqeqeq
    data.status != 'SOLD' ?
        // eslint-disable-next-line eqeqeq
        (data.status == "FOR SALE" ?
            (<td><input className="btn_withdraw" type="button" value="Withdraw" onClick={() => withdrawRecord(data.id, "Withdraw")} /></td>)
            :
            (<td><input className="btn_withdraw" type="button" value="Resubmit" onClick={() => withdrawRecord(data.id, "FOR SALE")} /></td>)
        )
        : (<td></td>)
} */




export default PropertySearch;