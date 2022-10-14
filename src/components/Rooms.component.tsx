import { Component, ChangeEvent } from 'react'
import RoomDataService from '../services/Rooms.service'
import RoomData from '../types/Room.type'

type Props = {
  hotelId: string
}
type State = {
  roomRates: Array<RoomData>,
  rooms: Array<RoomData>,
}

export default class RoomList extends Component<Props, State>{
  constructor( props: Props ) {
    super( props )
    this.retrieveRooms = this.retrieveRooms.bind( this )
    this.state = {
      roomRates: [],
      rooms: []
    }
  }

  componentDidMount() {
    this.retrieveRooms( this.props.hotelId )
  }

  retrieveRooms( id: string ) {
    RoomDataService.get( id )
      .then( ( response: any ) => {
        this.setState( {
          roomRates: response.data.ratePlans,
          rooms: response.data.rooms
        } )
        console.log( 'Rooms response: ', response.data )
      } )
    .catch( ( e: Error ) => console.error( e.message ) )
  }

  render() {
    const { roomRates, rooms } = this.state
    return (
      <>
        <ul>
          { rooms && rooms.map( ( room: RoomData, index: number ) => (
              <li key={ room.id } >
                <h4>{ room.name }</h4>
              </li>
          ) ) }
        </ul>
      </>
    )
  }
}
