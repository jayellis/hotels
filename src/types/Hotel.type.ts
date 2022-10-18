import Facilities from './Facilities.type'
import Images from './Image.type'
import Rooms from './Room.type'
import Occupancy from './Occupancy.type'

interface HotelData {
  id?: any | null
  name: string
  description: string
  address1: string
  address2: string
  postcode: string
  town: string
  country: string
  countryCode: string
  starRating: string
  facilities: [ {
    key: Facilities
  } ]
  telephone: string
  email: string
  images: [ {
    key: Images
  } ]
  rooms: [ {
    key: Rooms
  } ]
}

export default HotelData
