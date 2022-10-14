import http from '../http-common'
import RoomsData from '../types/Room.type'

class RoomsDataService {
  getAll() {
    return http.get<Array<RoomsData>>("rooms?collection-id=OBMNG")
  }
  get(id: string) {
    return http.get<RoomsData>(`/roomRates/OBMNG/${id}`)
  }
}

export default new RoomsDataService()

