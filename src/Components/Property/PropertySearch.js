import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from 'react';

import '../../index.css';
import '../../style.css';

function PropertySearch() {

    const [records, setRecords] = useState([]);
    const [displayRecords, setDisplayRecords] = useState([]);
    const [buyerRecords, setBuyerRecords] = useState([]);

    const [type, settype] = useState('');
    const [minprice, setminprice] = useState('');
    const [maxprice, setmaxprice] = useState('');
    const [bedrooms, setbedrooms] = useState('');
    const [bathrooms, setbathrooms] = useState('');
    const [garden, setgarden] = useState('');

    const buyerName = useRef();

    function getData() {
        fetch('http://localhost:8080/properties/read')
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.filter((record) => record.status === 'FOR SALE');
                setRecords(filteredData);
                setDisplayRecords(filteredData);
            });

        fetch('http://localhost:8080/buyer/read')
            .then((response) => response.json())
            .then((buyerData) => setBuyerRecords(buyerData));
    }

    useEffect(() => {
        getData();
    }, []);

    function handleSearch() {
        // fetch('http://localhost:8080/properties/read')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data)
        //         console.log(minprice)
        //         const filteredData = data.filter((record) =>
        //             (record.status === 'FOR SALE') &&
        //             (record.type === "" || record.type === type) &&
        //             (record.price === "" || parseInt(record.price) >= parseInt(minprice)) &&
        //             (record.price === "" || parseInt(record.price) <= parseInt(maxprice)) //&&
        //             //(record.bedrooms === "" || record.bedrooms === bedrooms) &&
        //             // (record.bathrooms === "" || record.bathrooms === bathrooms)
        //         );
        //         setRecords(filteredData);
        //         console.log(data)
        //     });
        let data = records;
        if (type !== "") data = data.filter(record => record.type === type);
        if (bedrooms !== "") data = data.filter(record => record.bedrooms === parseInt(bedrooms));
        if (bathrooms !== "") data = data.filter(record => record.bathrooms === parseInt(bathrooms));
        if (minprice !== "") data = data.filter(record => record.price >= parseInt(minprice));
        if (maxprice !== "") data = data.filter(record => record.price <= parseInt(maxprice));
        if (garden !== "") data = data.filter(record => record.garden === (garden));
        setDisplayRecords(data);
    }

    useEffect(() => {
        handleSearch();
    }, [type, minprice, maxprice, bedrooms, bathrooms]);

    return (
        <main>
            <h1>Property Search</h1>
            <form class="container">
                <label class="col-sm-3 col-form-label"> Select your name and ID: </label>
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
                    <option value="Detached"> Detached </option>
                    <option value="Semi"> Semi </option>
                    <option value="Apartment"> Apartment </option>
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
                <select type="text" value={bedrooms} onChange={(e) => setbedrooms(e.target.value)}>
                    <option value="">Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <br />
                <label class="col-sm-3 col-form-label">Bathroom:</label>
                <select type="text" value={bathrooms} onChange={(e) => setbathrooms(e.target.value)} >
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

                {displayRecords.map(rec => (
                    <tr key={rec.id}>
                        <td>{rec.address}</td>
                        <td>{rec.postcode}</td>
                        <td>{rec.type}</td>
                        <td>{rec.price}</td>
                        <td>{rec.bedrooms}</td>
                        <td>{rec.bathrooms}</td>
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