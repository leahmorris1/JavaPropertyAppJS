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

            <table class="table">
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
                        <td>{rec.bathroom}</td>
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