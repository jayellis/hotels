import { Component, ChangeEvent, MouseEvent, UIEvent } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
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
  filtered: Array<HotelData>,
  hotels: Array<HotelData>,
  showFilter:boolean,
  error:string,
}

export default class HotelsList extends Component<Props, State>{
  constructor( props: Props ) {
    super(props)
    this.retrieveHotels = this.retrieveHotels.bind(this)
    this.filterAdults = this.filterAdults.bind(this)
    this.filterChildren = this.filterChildren.bind(this)
    this.filterStars = this.filterStars.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.state = {
      noAdult:0,
      noChildren:0,
      noStars:0,
      filtered:[],
      hotels:[],
      showFilter:false,
      error:''
    }
  }
  componentDidMount() {
    this.retrieveHotels()
  }
  toggleFilter( e: MouseEvent<HTMLButtonElement> ) {
    const target = e.currentTarget
        , parent = target.parentElement
    !this.state.showFilter
    ?  target.className = 'filter-button show-filter'
    :  target.className = 'filter-button hide-filter'
    this.setState({ 'showFilter':!this.state.showFilter }) 
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
        filtered: response.data,
        hotels: response.data,
      } )
      return response.data
    } )
    .then( () => { 
      this.filterResults( 'noStars', 0 ) 
    } )
    .catch( ( e: Error ) => {
      console.error( e.message )
    } )
  }
  filterAdults( e: MouseEvent<HTMLButtonElement> ) {
    const value = e.currentTarget.value
    const noAdults = this.state.noAdult
    const filter = value === '+' ? noAdults +1 : noAdults > 1 ? noAdults -1 : 0
    this.setState( { noAdult:filter } )
    this.filterResults( 'noAdults', filter )
  }
  filterChildren( e: MouseEvent<HTMLButtonElement> ) {
    const value = e.currentTarget.value
    const noChildren = this.state.noChildren
    const filter = value === '+' ? noChildren +1 : noChildren > 1 ? noChildren -1 : 0
    this.setState( { noChildren:filter, } )
    this.filterResults( 'noChildren', filter )
  }
  filterStars( e: any ) {
    const value = e
    this.setState( { noStars:value } )
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
  renderAddress( hotel: HotelData ) {
    let address = ''
    if( hotel.address1 != '' ) address += hotel.address1 + ', '
    if( hotel.address2 != '') address += hotel.address2 + ', '
    if( hotel.town != '' ) address += hotel.town + ', '
    if( hotel.postcode != '' ) address += hotel.postcode
    return address
  }
  render() { 
    const { hotels, filtered, noStars, noAdult, noChildren, error } = this.state
    return (
      <>
        { error != '' ? (
          <p> { error } </p>
        ) : (
          <></>
        ) }
        <div className='header'>
        </div>
        <div className='filter-wrapper ' >
          <button
            type='button'
            className='filter-button filter-hide material-symbols-outlined'
            onClick={ this.toggleFilter }
            >
          </button>
          <div className='filter-controls'>
            <div className='controls-star'>
              <StarRatings 
                rating={ this.state.noStars } 
                numberOfStars={5}
                starRatedColor='red'
                starDimension='2rem'
                starSpacing=".2rem"
                name='test'
                changeRating={ this.filterStars }
              />
            </div>
            <div className='controls-adults'>
              <label>
                Adults
              </label>
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
            <div className='controls-children'>
              <label>
                Children
              </label>
              <button
                type='button'
                className='previous'
                disabled={ this.state.noChildren < 1 ? true : false }
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

          </div>
        </div>

        <ul className='hotels'>
          { filtered.length > 0 ? ( filtered.map( ( hotel: HotelData, index: number ) => (
            <li key={ hotel.id } className='hotel'>

              <Slide>
                { hotel && hotel.images.map( ( image: ImageData, index: number ) => (
                  <div className="each-slide-effect">
                    <div style={ { backgroundImage: `url(${ image.url })` } } key={ index } className='image' ></div>
                  </div>
                ) ) }
              </Slide>

              <div>
                <StarRatings 
                  rating={ parseInt( hotel.starRating ) } 
                  numberOfStars={5}
                  starRatedColor='black' starDimension="2rem"
                  starSpacing=".2rem"
                  name={ hotel.id + '-stars' }
                />
              </div>

              <div className='hotel-details'>
                <h4 className='hotel-name'> { hotel.name }</h4>
                <p className='hotel-address'> { this.renderAddress( hotel ) } </p>
                <p className='hotel-country'> { hotel.country } </p>
              </div>

              <ul className='rooms'>
                { hotel.rooms && hotel.rooms.map( ( room: any, index: number ) => (
                    <li key={ hotel.id +'-'+ room.id } className={ ( this.state.noAdult > room.occupancy.maxAdults || this.state.noChildren > room.occupancy.maxChildren ) ? 'hide room' : 'room' } >
                      <aside>
                        <h4 className='room-name'>{ room.name }</h4>
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
          ) ) ) : (
            <h2 className='hotels-empty'>Please use the filter to refine your search</h2>
          ) } 
        </ul>
      </>
    )
  }
}
