import apiService from '@/utils/services/api.js'

export function getCoordinates(params) {
  return apiService({
    baseURL: 'https://maps.googleapis.com/maps/api',
    url: '/geocode/json',
    method: 'GET',
    params
  })
}

export function getUrbanRenewalLocation(params) {
  return apiService.get('/api/v1/server/xinbei/calc-distance', { params })
}

export function getUrbanRenewalArea(params) {
  return apiService.get('/api/v1/server/xinbei/geolocation-json', { params })
}
