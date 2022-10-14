import http from '../http-common'
import HotelData from '../types/Hotel.type'

class HotelDataService {
  getAll() {
    return http.get<Array<HotelData>>("hotels?collection-id=OBMNG")
  }
  get(id: string) {
    return http.get<HotelData>(`/tutorials/${id}`)
  }
  create( data: HotelData ) {
    return http.post<HotelData>("/tutorials", data)
  }
  update( data: HotelData, id: any ) {
    return http.put<any>(`/tutorials/${id}`, data)
  }
  delete( id: any ) {
    return http.delete<any>(`/tutorials/${id}`)
  }
  deleteAll() {
    return http.delete<any>(`/tutorials`)
  }
  findByTitle( title: string ) {
    return http.get<Array<HotelData>>(`/tutorials?title=${title}`)
  }
}

export default new HotelDataService()

