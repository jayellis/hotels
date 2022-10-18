import Images from './Image.type'
import Facilities from './Facilities.type'
import Occupancy from './Occupancy.type'

interface RoomData {
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
}

export default RoomData

