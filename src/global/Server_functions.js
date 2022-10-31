import Api_url from '../global/api_constraints';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import publicIP from 'react-native-public-ip';
var ip_Address;
publicIP()
  .then(ip => {
    // '47.122.71.234'
    ip_Address = ip;
  })
  .catch(error => {
    console.log(error);
    // 'Unable to get IP address.'
  });

let Server_functions = {
  async edit_Caption(updateEnteredCaption, SelectedTNumber) {
    UAP = await AsyncStorage.getItem('UserAppToken');

    try {
      const response = await fetch(Api_url.Update_Caption, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TrackingNumber: SelectedTNumber,
          DeviceToken: UAP,
          TrackingNameCaption: updateEnteredCaption,
        }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async delete_Package(SelectedTNumber) {
    UAP = await AsyncStorage.getItem('UserAppToken');

    try {
      const response = await fetch(Api_url.deleteParcel_Data, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TrackingNumber: SelectedTNumber,
          DeviceToken: UAP,
          DeleteFlag: 'Yes',
        }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async get_Package(enteredTNumber, Carrier_Value, enteredCaption) {
    UAP = await AsyncStorage.getItem('UserAppToken');

    try {
      const response = await fetch(Api_url.getParcel_Data, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TrackingNumber: enteredTNumber,
          DeviceID: '',
          Carrier: Carrier_Value,
          DeviceToken: UAP,
          DeviceMake: Platform.OS,
          OSVersion: Platform.Version,
          IPAddress: ip_Address,
          TrackingNameCaption: enteredCaption,
        }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async get_Update_Package() {
    UAP = await AsyncStorage.getItem('UserAppToken');
    MTN_List = await AsyncStorage.getItem('TrackingNumberList');

    try {
      const response = await fetch(Api_url.Update_Package, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TrackingNumber: MTN_List,
          DeviceToken: UAP,
        }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async get_Track_Data(lat,long) {
    try {
      const response = await fetch(Api_url.TrackLocation, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Latitude: lat,
          Longitude:long,
          Carrier: 'UPS',
        }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async verify_Address() {
    try {
      const response = await fetch(Api_url.verifyAddress, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          AddressLine1: '6700 DISCOVERY BLVD',
          AddressLine2: '',
          StateCode: 'GA',
          State: 'GURABO',
          PostalCode: '301264676',
          City: 'MABLETON',
          CountryCode: 'US',
        }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async save_Address(
    AddressType_Value,
    address_ID,
    address_Company,
    contact_Name,
    address_1,
    address_2,
    address_Zip,
    address_City,
    address_State,
    address_No,
    isVerified,
    selectedCountry_Value,
    selectedCountryCode,
  ) {
    try {
      const response = await fetch(Api_url.saveAddress, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          AddressCompany: address_Company,
          ContactName: contact_Name,
          AddressID: address_ID,
          AddressLine1: address_1,
          AddressLine2: address_2,
          StateCode: 'GA',
          State: address_State,
          PostalCode: address_Zip,
          City: address_City,
          CountryCode: selectedCountryCode,
          PhoneNo: address_No,
          AddressType: AddressType_Value,
          AddressVerified: isVerified,
        }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async get_TrackGetStates(name, code) {
    try {
      const response = await fetch(Api_url.TrackGetStates, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Country: name,
          CountryCode: code,
        }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async get_TrackGetCities(cCode, cName, sCode) {
    try {
      const response = await fetch(Api_url.TrackGetCities, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Country: cName,
          CountryCode: cCode,
          States: sCode,
        }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async get_TrackGetCountry() {
    try {
      const response = await fetch(Api_url.TrackGetCountry);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  },

  async TrackGetRate(
    time,
    fromCCode,
    fromSCode,
    fromCity,
    toCCode,
    toSCode,
    toCity,
    toPostalCode,
    fromPostalCode,
    varWeight,
    varWidth,
    varHeight,
    varLength,
  ) {
    try {
      const response = await fetch(Api_url.TrackGetRate, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PackageDimLength: varLength,
          PackageDimWidth: varWidth,
          PackageWeight: varWeight,
          PackageDimHeight: varHeight,
          ShipDateTime: time,
          OriginCity: fromCity,
          OriginProvinceCode: fromSCode,
          OriginPostalCode: fromPostalCode,
          OriginCountryCode: fromCCode,
          DestinationCity: toCity,
          DestinationProvinceCode: toSCode,
          DestinationPostalCode: toPostalCode,
          DestinationCountryCode: toCCode,
        }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
export default Server_functions;
