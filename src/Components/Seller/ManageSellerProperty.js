import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import '../../style.css';

function ManagePropertyData(Person) {

    const navigate = useNavigate()

    const { sellerId, firstName, surname } = useParams()

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://localhost:8000/property')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
    }

    useEffect(() => { getData() }, [])

    function removeRecord(recno) {
        fetch(`http://localhost:8000/property/${recno}`, { method: 'DELETE' })
            .then((response) => {
                if (response.ok) {
                    let temprecords = records.filter(recs => recs.id !== recno)
                    setRecords(temprecords);
                }
                else {
                    console.error('Error dleting record:', response.status);
                }
            })
            .catch(error => { console.error('Error deleting record', error) });
    }

    function sellerPropertyForm() {
        const url = `/Seller/AddSellerPropertyForm/${sellerId}/${firstName}/${surname}`
        navigate(url)
    }

    function withdrawRecord(recno, newstatus) {
        fetch(`http://localhost:8000/property/${recno}`, {
            method: 'PATCH',
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
                "status": newstatus
            })
        })
            .then((response) => {
                navigate(`/Seller/ManageSellerProperty/${sellerId}/${firstName}/${surname}`);
                getData();
            })
            .catch(error => {
                console.error('Error saving seller:', error);
            });
    }

    // eslint-disable-next-line eqeqeq
    let filteredRecord = records.filter(rec => rec.sellerId == sellerId)

    return (
        <>
            <h1> Manage Seller Property <b>{firstName} {surname}</b> </h1><br />

            <br />
            <div className='container'>
                <button className="btn btn-light addpropertybtn" onClick={() => sellerPropertyForm()}> Add Poperty</button>
            </div>
            <br />

            <table className='container'>
                <tr>
                    <th> SellerId </th>
                    <th> Address </th>
                    <th> Postcode </th>
                    <th> Type </th>
                    <th> Price </th>
                    <th> Bedroom </th>
                    <th> Bathroom </th>
                    <th> Garden </th>
                    <th> Status </th>
                    <th> PropertyID </th>
                    <th>  </th>
                    <th>  </th>
                </tr>


                {filteredRecord.map(data => <tr class="tr1">
                    <td> {data.sellerId} </td>
                    <td> {data.address} </td>
                    <td> {data.postcode} </td>
                    <td> {data.type} </td>
                    <td> {data.price} </td>
                    <td> {data.bedroom} </td>
                    <td> {data.bathroom} </td>
                    {data.garden == "true" ? (<td>Yes</td>) : (<td>No</td>)}
                    <td> {data.status} </td>
                    <td> {data.id} </td>
                    {data.status != 'SOLD' ?
                        (data.status == "FOR SALE" ?
                            (<td><button className="btn btn-light" onClick={() => withdrawRecord(data.id, "Withdraw")}>Withdraw</button></td>)
                            : (<td><button className="btn btn-light" onClick={() => withdrawRecord(data.id, "FOR SALE")}>Resubmit</button></td>))
                        : (<td></td>)}
                    < td > <input className="btn_delete" type="button" value="Remove" onClick={() => removeRecord(data.id)} /></td>
                </tr>

                )}
            </table >
        </>
    )

}

export default ManagePropertyData;