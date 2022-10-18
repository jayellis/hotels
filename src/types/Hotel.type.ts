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
      url: string
      alt: string
    } ]
    rooms: [ {
    id?: any | null
    name: string
    shortDescription: string
    longDescription: string
    occupancy: [ {
      key: Occupancy
    } ]
    disabledAccess: boolean
    bedConfiguration: string
    images: [ {
      key: Images
    } ]
    facilities: [ {
      key: Facilities
    } ]
  } ]
}

export default HotelData
