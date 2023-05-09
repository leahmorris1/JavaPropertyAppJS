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