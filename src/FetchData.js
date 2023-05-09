import { useState, useEffect } from 'react';

function RenderingList() {
    const [records, setRecords] = useState([])

    function getData() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
    }

    useEffect(() => { getData() }, [])

    return (
        <table className="table1">
            <tr>
                <td>Name</td>
                <td>PhoneNo</td>
                <td>Email</td>
                <td>Address</td>
                <td>Operations</td>
            </tr>
            {records.map(rec => <tr>
                <td> {rec.firstname}  </td>
                <td> {rec.surname}  </td>
                <td> {rec.address}  </td>
                <td> {rec.postcode}  </td>
                <td> {rec.phone}  </td>
            </tr>
            )
            }
        </table>
    )
}

export default RenderingList;