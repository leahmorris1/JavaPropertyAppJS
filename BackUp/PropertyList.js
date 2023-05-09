import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Property() {

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://localhost:8000/property')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
    }

    useEffect(() => { getData() }, [])
    function BuyButton(data) {
        if (data == "FOR SALE") {
            return (<td><Link to="/Property/Purchase" className="btn btn-dark"> BUY </Link></td>
            )
        }
    }

    return (
        <>
            <header> Property List </header><br />

            <table>
                <tr>
                    <th> Address </th>
                    <th> Poscode </th>
                    <th> Type </th>
                    <th> Price </th>
                    <th> Bedroom </th>
                    <th> Bathroom </th>
                    <th> Status </th>
                    <th> </th>
                </tr>
                {records.map(rec => <tr>
                    <td> {rec.address}  </td>
                    <td> {rec.postcode}  </td>
                    <td> {rec.type}  </td>
                    <td> {rec.price}  </td>
                    <td> {rec.bedroom}  </td>
                    <td> {rec.bathroom}  </td>
                    <td> {rec.status}  </td>
                    {BuyButton(rec.status)}
                </tr>
                )}
            </table>

            <select>
                {records.map(rec => <option>{rec.address}</option>)}
            </select>
        </>
    )
}

export default Property;
