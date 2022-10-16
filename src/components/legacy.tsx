import { Component, ChangeEvent } from 'react'
import HotelDataService from '../services/Hotels.service'
import { Link } from 'react-router-dom'
import HotelData from '../types/Hotel.type'
import RoomsComponent from './Rooms.component'

type Props = {}
type State = {
  hotels: Array<HotelData>
  currentHotel: HotelData | null
  currentIndex: number
  searchHotel: string
}

export default class HotelsLisdsd extends Component<Props, State>{
  constructor( props: Props ) {
    super(props)
    this.retrieveHotels = this.retrieveHotels.bind(this)
    this.refreshList = this.refreshList.bind(this)
    this.setActiveHotel = this.setActiveHotel.bind(this)
    this.state = {
      hotels: [],
      currentHotel: null,
      currentIndex: -1,
      searchHotel: ''
    }
  }

  componentDidMount() {
    this.retrieveHotels()
  }

  retrieveHotels() {
    HotelDataService.getAll()
      .then( ( response: any ) => {
        this.setState(
          { 
            hotels: response.data 
          }
        )
        console.log( 'Hotel response: ', response.data )
      } )
      .catch( ( e: Error ) => {
        console.error( e.message )
      } )
  }

  refreshList() {
    this.retrieveHotels()
    this.setState( {
      currentHotel: null,
      currentIndex: -1
    } )
  }

  setActiveHotel( hotel: HotelData, index: number ) {
    this.setState( {
      currentHotel: hotel,
      currentIndex: index
    } )
  }
  
  render() {
    const { hotels, currentHotel, currentIndex, searchHotel } = this.state
    return ( 
      <>
        <h4>Hotels</h4>
        <ul>
          { hotels && hotels.map( ( hotel: HotelData, index: number ) => (
              <li key={ hotel.id }>
                { hotel && hotel.images.map( ( image: any, index: number ) => (
                  <img src={ image.url } alt={ image.alt } />
                ) ) }
                <h4> { hotel.name }</h4>
                <p>{ hotel.description }</p>
                <RoomsComponent hotelId={ hotel.id }/>
              </li>
          ) ) }
        </ul>
      </>
    )
  }
}
