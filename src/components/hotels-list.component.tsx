import { Component, ChangeEvent, MouseEvent } from 'react'
import StarRatings from 'react-star-ratings'
import HotelDataService from '../services/Hotels.service'
import RoomDataService from '../services/Rooms.service'
import HotelData from '../types/Hotel.type'
import RoomData from '../types/Room.type'
import ImageData from '../types/Image.type'

type Props = {}
type State = {
  noAdult:number,
  noChildren:number,
  noStars:number,
  filtered: Array<HotelData>
  hotels: Array<HotelData>
}

export default class HotelsList extends Component<Props, State>{
  constructor( props: Props ) {
    super(props)
    this.retrieveHotels = this.retrieveHotels.bind(this)
    this.filterAdults = this.filterAdults.bind(this)
    this.filterChildren = this.filterChildren.bind(this)
    this.filterStars = this.filterStars.bind(this)
    this.state = {
      noAdult:1,
      noChildren:0,
      noStars:3,
      filtered:[],
      hotels:[],
    }
  }
  componentDidMount() {
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
      return hotels
    } )
    .then( ( response: any ) => {
      this.setState( {
        hotels: response.data,
        filtered: response.data
      } )
    } )
    .catch( ( e: Error ) => {
      console.error( e.message )
    } )
  }
  filterAdults( e: MouseEvent<HTMLButtonElement> ) {
    const value = e.currentTarget.value
    const noAdults = this.state.noAdult
    const filter = value === '+' ? noAdults +1 : noAdults > 1 ? noAdults -1 : 0
    this.setState( {
      noAdult:filter
    } )
    this.filterResults( 'noAdults', filter )
  }
  filterChildren( e: MouseEvent<HTMLButtonElement> ) {
    const value = e.currentTarget.value
    const noChildren = this.state.noChildren
    const filter = value === '+' ? noChildren +1 : noChildren > 1 ? noChildren -1 : 0
    this.setState( {
      noChildren:filter,
    } )
    this.filterResults( 'noChildren', filter )
  }
  filterStars( e: any ) {
    const value = e
    this.setState( {
      noStars:value
    } )
    this.filterResults( 'noStars', value )
  }
  filterResults( filterOn: string, value: number ) {
    const noAdultsValue = filterOn === 'noAdults' ? value : this.state.noAdult 
    const noChildrenValue = filterOn === 'noChildren' ? value : this.state.noChildren

    const filtered = this.state.hotels.filter( ( hotel: HotelData, index: number ) => {
      const hotelStarRating = parseInt( hotel.starRating )
      const starRating = filterOn === 'noStars' ? hotelStarRating : this.state.noStars

      const noChildren = hotel.rooms.map( ( room: any ) => {
        return room.occupancy.maxChildren >= noChildrenValue
      } ).includes(true)

      const noAdult = hotel.rooms.map( ( room: any ) => {
        return room.occupancy.maxAdults >= noAdultsValue
      } ).includes(true)

      if( filterOn === 'noStars' ) {
        return ( starRating == value && noAdult && noChildren )
      } else if( filterOn === 'noChildren'  ) {
        return ( noChildren && starRating === hotelStarRating && noAdult )
      } else if( filterOn === 'noAdults' ) {
        return ( noAdult && starRating === hotelStarRating && noChildren ) 
      }
    } )

    this.setState( {
      filtered:filtered
    } )
  }
  render() { 
    const { hotels, filtered, noStars, noAdult, noChildren } = this.state
    return (
      <>
        <div>
          <StarRatings 
            rating={ this.state.noStars } 
            numberOfStars={5}
            starRatedColor='red'
            name='test'
            changeRating={ this.filterStars }
          />
        </div>
        <div className='no-adults'>
          <button
            type='button'
            className='previous'
            disabled={ this.state.noAdult < 1 ? true : false }
            value='-'
            onClick={ this.filterAdults }
            >-</button>
          <span>
            { this.state.noAdult }
          </span>
          <button
            type='button'
            className='next'
            value='+'
            onClick={ this.filterAdults }
            >+</button>
        </div>
        <div className='no-children'>
          <button
            type='button'
            className='previous'
            disabled={ this.state.noChildren < 1 ? true : false }
            value='-'
            onClick={ this.filterChildren }
            >-</button>
          <span>
            { this.state.noChildren }
          </span>
          <button
            type='button'
            className='next'
            value='+'
            onClick={ this.filterChildren }
            >+</button>
        </div>
        <ul>
          { filtered && filtered.map( ( hotel: HotelData, index: number ) => (
            <li key={ hotel.id }>
              { hotel && hotel.images.map( ( image: ImageData, index: number ) => (
                <img src={ image.url } alt={ image.alt } key={ index } />
              ) ) }
              <div>
                <StarRatings 
                  rating={ parseInt( hotel.starRating ) } 
                  numberOfStars={5}
                  starRatedColor='red'
                  name={ hotel.id + '-stars' }
                />
                <p>{ hotel.starRating }</p>
              </div>

              <h4> { hotel.name }</h4>
              <p>{ hotel.description }</p>
              <ul>
                { hotel.rooms && hotel.rooms.map( ( room: any, index: number ) => (
                    <li key={ hotel.id +'-'+ room.id } className={ ( this.state.noAdult > room.occupancy.maxAdults || this.state.noChildren > room.occupancy.maxChildren ) ? 'hide room' : 'room' } >
                      <aside>
                        <h4 className='room-title'>{ room.name }</h4>
                        <ul className='room-occupancy'>
                          <li>Adults: { room.occupancy.maxAdults }</li>
                          <li>Children: { room.occupancy.maxChildren }</li>
                        </ul>
                      </aside>
                      <main>
                        <p>{ room.longDescription }</p>
                      </main>
                    </li>
                  ) )  
                }
              </ul>
            </li>
          ) ) }
        </ul>
      </>
    )
  }
}
