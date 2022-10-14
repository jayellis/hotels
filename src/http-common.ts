import axios from 'axios'
export default axios.create( {
  baseURL: "https://obmng.dbm.guestline.net/api/",
  headers: {
    "Content-type": "application/json"
  }
} )
