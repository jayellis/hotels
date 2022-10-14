import facilities from './Facilities.type'
import images from './Image.type'

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
    key: facilities
  } ]
  telephone: string
  email: string
  images: [ {
    key: images
  } ]
}

export default HotelData
