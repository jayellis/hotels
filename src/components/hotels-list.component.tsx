import { Component, ChangeEvent } from 'react'
import HotelDataService from '../services/Hotels.service'
import RoomDataService from '../services/Rooms.service'
import HotelData from '../types/Hotel.type'
import RoomsComponent from '../components/Rooms.component'

type Props = {}
type State = {
  hotels: Array<HotelData>
  searchTerms: {}
}

export default class HotelsList extends Component<Props, State>{
  constructor( props: Props ) {
    super(props)
    this.refreshList = this.refreshList.bind(this)
    this.state = {
      hotels:[],
      searchTerms:{}
    }
  }
  componentDidMount() {
    this.retrieveHotels()
  }
  refreshList() {
    this.retrieveHotels()
  }
  retrieveHotels() {
    HotelDataService.getAll()
    .then( ( hotels: any ) => {
      hotels.data.map( ( hotel: any, index: number ) => {
        RoomDataService.get( hotel.id )
        .then( ( rooms: any ) => {
          hotels.data[index].rooms = rooms.data.rooms
        } )
      } )
      this.setState( {
        hotels: hotels.data
      } )
    } )
    .catch( ( e: Error ) => {
      console.error( e.message )
    } )
  }
  render() { 
    const { hotels, searchTerms } = this.state
    return (
      <>
        <h4>Hotels</h4>
        <ul>
          { hotels && hotels.map( ( hotel: HotelData, index: number ) => (
            <li key={ hotel.id }>
              { hotel && hotel.images.map( ( image: any, index: number ) => (
                <img src={ image.url } alt={ image.alt } key={ index } />
              ) ) }
              <h4> { hotel.name }</h4>
              <p>{ hotel.description }</p>
            </li>
          ) ) }
        </ul>
      </>
    )
  }
}
