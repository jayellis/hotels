import { Component, ChangeEvent } from 'react'
import RoomData from '../types/Room.type'

type Props = {
  props: Array<any>

}
type State = {
}

export default class RoomList extends Component<Props, State>{
  constructor( props: Props ) {
    super( props )
  }

  render() {
    return (
      <ul className='rooms'>
        { this.props.props && this.props.props.map( ( room: any, index: number ) => (
            <li key={ room.id } className='room' >
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
    )
  }
}
