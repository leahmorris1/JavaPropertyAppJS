import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Buyer() {

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://localhost:8000/buyer')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
    }

    useEffect(() => { getData() }, [])

    function removeRecord(recno) {
        //let choice = window.confirm('Are you sure you wish to delete this item?')
        //if (choice === true) {
        let temprecords = records.filter(recs => recs.address !== recno)
        setRecords(temprecords)
        //}
    }

    return (
        <>
            <header> Buyer Data Page </header>
            <br />
            <Link className="btn btn-light" to="/Buyer/AddBuyerForm"> Add Buyer</Link>
            <Link className="addsellerbtn" type="button" value="Add Seller" />
            <br />

            <table>
                <tr>
                    <th>First Name</th>
                    <th>Surname</th>
                    <th>Address</th>
                    <th>Poscode</th>
                    <th>PhoneNo</th>
                    <th>  </th>
                    <th>  </th>
                </tr>
                {records.map(rec => <tr>
                    <td> {rec.firstname}  </td>
                    <td> {rec.surname}  </td>
                    <td> {rec.address}  </td>
                    <td> {rec.postcode}  </td>
                    <td> {rec.phone}  </td>
                    <td><input className="btn_delete" type="button" value="Remove" onClick={() => removeRecord(rec.address)} /></td>
                </tr>
                )
                }
            </table>
        </>
    )
}

export default Buyer;
