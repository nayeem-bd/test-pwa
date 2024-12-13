import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { getAreas, getCities, getZones } from '@/app/locations/locationApi.js';

export const useLocationStore = defineStore('locationStore', {
  state: () => ({
    cities: [],
    isCitiesFetching: false,
    zones: [],
    isZonesFetching: false,
    areas: [],
    isAreasFetching: false
  }),
  actions: {
    async fetchCities() {
      try {
        this.isCitiesFetching = true;
        const result = await getCities();
        this.cities = result.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isCitiesFetching = false;
      }
    },
    async fetchZones(city_id) {
      try {
        this.isZonesFetching = true;
        const result = await getZones(city_id);
        this.zones = result.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isZonesFetching = false;
      }
    },
    async fetchAreas(zone_id) {
      try {
        this.isAreasFetching = true;
        const result = await getAreas(zone_id);
        this.areas = result.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isAreasFetching = false;
      }
    }
  }
});
