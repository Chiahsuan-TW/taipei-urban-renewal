import googleApiService from '@/utils/services/googleApi.js'
import apiService from '@/utils/services/api.js'

export function getCoordinates(params) {
  return googleApiService.get('/geocode/json', { params })
}

export function getUrbanRenewalLocation(params) {
  return apiService.get('/api/v1/server/xinbei/calc-distance', { params })
}
