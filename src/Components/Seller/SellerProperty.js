import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import '../../style.css';

function Seller() {
    const navigate = useNavigate()

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://localhost:8080/seller/read')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
    }

    useEffect(() => { getData() }, [])

    function removeRecord(recno) {
        fetch(`http://localhost:8080/seller/delete/${recno}`, { method: 'DELETE' })
            .then((response) => {
                if (response.ok) {
                    let temprecords = records.filter(recs => recs.seller_id !== recno)
                    setRecords(temprecords);
                }
                else {
                    console.error('Error deleting record:', response.status);
                }
            })
            .catch(error => { console.error('Error deleting record', error) });
    }

    function sellerProperty(seller) {
        const url = `/Seller/ManageSellerProperty/${seller.seller_id}/${seller.firstName}/${seller.surname}`
        navigate(url)
    }

    return (
        <>
            <h1> Seller Data Page </h1>
            <div className='container'>
                <Link className="btn btn-light" to="/Seller/AddSellerForm"> Add Seller</Link>
                <Link className="addsellerbtn" type="button" value="Add Seller" />
            </div>
            <br />
            <table className='container'>
                <thead>
                    <tr>
                        <th> First Name </th>
                        <th> Surname </th>
                        <th> Address </th>
                        <th> Poscode </th>
                        <th> PhoneNo </th>
                        <th>  </th>
                        <th>  </th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(rec => <tr key={rec.seller_id} className="tr1">
                        <td> {rec.firstName}  </td>
                        <td> {rec.surname}  </td>
                        <td> {rec.address}  </td>
                        <td> {rec.postcode}  </td>
                        <td> {rec.phone}  </td>
                        <td><button className='btn btn-light' onClick={() => sellerProperty(rec)}>Manage</button></td>
                        <td><input className="btn_delete" type="button" value="Remove" onClick={() => removeRecord(rec.seller_id)} /></td>
                    </tr>
                    )
                    }
                </tbody>
            </table>

        </>
    )
}

export default Seller;
