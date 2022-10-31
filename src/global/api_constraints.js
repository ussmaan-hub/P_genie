// let Url = 'https://matts.pk/pg/api/';

// let Url = 'http://192.168.0.110:83/api/';
let Url = 'http://173.239.11.20:8080/tst/api/';

const api_constraints = {
  getParcel_Data: Url + 'Tracking/TrackData',
  deleteParcel_Data: Url + 'Tracking/DeleteTrackingNumber',
  Update_Caption: Url + 'Tracking/UpdateCaption',
  Update_Package: Url + 'Tracking/TrackDataUpdates',
  TrackLocation: Url + 'Tracking/TrackLocator',
  verifyAddress: Url + 'Tracking/TrackAddressValidation',
  saveAddress: Url + 'Tracking/TrackAddressSave',
  TrackGetCities: Url + 'Tracking/TrackGetCities',
  TrackGetStates: Url + 'Tracking/TrackGetStates',
  TrackGetCountry: Url + 'Tracking/TrackGetCountry',
  TrackGetRate: Url + 'Tracking/TrackGetRate',
};

export default api_constraints;
