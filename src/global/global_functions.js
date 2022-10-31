import CryptoJS from 'react-native-crypto-js';

var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

let global_functions = {
  get_Carrier(tracking_Num) {
    var p_Carrier;
    var x = tracking_Num;
    var Check_1Z = x.substring(0, 2);
    var check_Alpha = x.substring(0, 1);
    var Check_Length = x.length;

    if (Check_1Z == '1Z' || Check_1Z == '1z') {
      p_Carrier = 'UPS';
    } else if (isNaN(check_Alpha) == true && Check_Length == 11) {
      p_Carrier = 'UPS';
    } else if (Check_Length == 9 && isNaN(Check_Length) == false) {
      p_Carrier = 'UPS';
    } else if (Check_Length == 16 && isNaN(Check_Length) == false) {
      p_Carrier = 'UPS';
    } else if (
      Check_Length == 12 ||
      Check_Length == 15 ||
      (Check_Length == 20 && isNaN(Check_Length) == false)
    ) {
      p_Carrier = 'FedEx';
    } else {
      p_Carrier = 'Select Carrier';
    }

    return p_Carrier;
  },

  async PackageActivityInfoList_decryptArray(data1) {
    var temp = [];
    for (let i = 0; i < data1.length; i++) {
      temp[i] = {
        TrackingNumber: this.decrypt_data(data1[i].TrackingNumber),
        AddressLine1: this.decrypt_data(data1[i].AddressLine1),
        AddressLine2: this.decrypt_data(data1[i].AddressLine2),
        AddressLine3: this.decrypt_data(data1[i].AddressLine3),
        City: this.decrypt_data(data1[i].City),
        StateProvinceCode: this.decrypt_data(data1[i].StateProvinceCode),
        PostalCode: this.decrypt_data(data1[i].PostalCode),
        CountryCode: this.decrypt_data(data1[i].CountryCode),
        LocationCode: this.decrypt_data(data1[i].LocationCode),
        LocationDescription: this.decrypt_data(data1[i].LocationDescription),
        SignedForByName: this.decrypt_data(data1[i].SignedForByName),
        StatusType: this.decrypt_data(data1[i].StatusType),
        StatusCode: this.decrypt_data(data1[i].StatusCode),
        StatusDescription: this.decrypt_data(data1[i].StatusDescription),
        ActivityDate: this.decrypt_data(data1[i].ActivityDate),
        ActivitySeq: this.decrypt_data(data1[i].ActivitySeq),
        IsNotified: this.decrypt_data(data1[i].IsNotified),
        DeviceID: this.decrypt_data(data1[i].DeviceID),
        Latitude: this.decrypt_data(data1[i].Latitude),
        Longitude: this.decrypt_data(data1[i].Longitude),
      };
    }

    return temp;
  },

  async TimeinTransitInfoList__decryptArray(data1) {
    var temp = [];
    for (let i = 0; i < data1.length; i++) {
      temp[i] = {
        TrackingNumber: this.decrypt_data(data1[i].TrackingNumber),
        ServiceCode: this.decrypt_data(data1[i].ServiceCode),
        DeliveryDate: this.decrypt_data(data1[i].DeliveryDate),
        BusinessTransitDays: this.decrypt_data(data1[i].BusinessTransitDays),
        HolidaysCount: this.decrypt_data(data1[i].HolidaysCount),
        RestDays: this.decrypt_data(data1[i].RestDays),
        TotalTransitDays: this.decrypt_data(data1[i].TotalTransitDays),
        tntResponse: this.decrypt_data(data1[i].tntResponse),
      };
    }
    return temp;
  },

  async PackageInfoList__decryptArray(data1) {
    var temp = [];
    for (let i = 0; i < data1.length; i++) {
      temp[i] = {
        DeviceID: this.decrypt_data(data1[i].DeviceID),
        TrackingNumber: this.decrypt_data(data1[i].TrackingNumber),
        PackageUOM: this.decrypt_data(data1[i].PackageUOM),
        PackageWeight: this.decrypt_data(data1[i].PackageWeight),
        Piece: this.decrypt_data(data1[i].Piece),
        TrackedDate: this.decrypt_data(data1[i].TrackedDate),
        ShipmentUOM: this.decrypt_data(data1[i].ShipmentUOM),
        ShipmentWeight: this.decrypt_data(data1[i].ShipmentWeight),
        ShipperNumber: this.decrypt_data(data1[i].ShipperNumber),
        PickupDate: this.decrypt_data(data1[i].PickupDate),
        ShipperAddressLine1: this.decrypt_data(data1[i].ShipperAddressLine1),
        ShipperAddressLine2: this.decrypt_data(data1[i].ShipperAddressLine2),
        ShipperAddressLine3: this.decrypt_data(data1[i].ShipperAddressLine3),
        ShipperCity: this.decrypt_data(data1[i].ShipperCity),
        ShipperProvinceCode: this.decrypt_data(data1[i].ShipperProvinceCode),
        ShipperPostalCode: this.decrypt_data(data1[i].ShipperPostalCode),
        ShipperCountryCode: this.decrypt_data(data1[i].ShipperCountryCode),
        ShiptoAddressLine1: this.decrypt_data(data1[i].ShiptoAddressLine1),
        ShiptoAddressLine2: this.decrypt_data(data1[i].ShiptoAddressLine2),
        ShiptoAddressLine3: this.decrypt_data(data1[i].ShiptoAddressLine3),
        ShiptoCity: this.decrypt_data(data1[i].ShiptoCity),
        ShiptoProvinceCode: this.decrypt_data(data1[i].ShiptoProvinceCode),
        ShiptoPostalCode: this.decrypt_data(data1[i].ShiptoPostalCode),
        ShiptoCountryCode: this.decrypt_data(data1[i].ShiptoCountryCode),
        ServiceCode: this.decrypt_data(data1[i].ServiceCode),
        ServiceDescription: this.decrypt_data(data1[i].ServiceDescription),
        GuaranteedDate: this.decrypt_data(data1[i].GuaranteedDate),
        DeliveryDate: this.decrypt_data(data1[i].DeliveryDate),
        Carrier: this.decrypt_data(data1[i].Carrier),
        FedexServiceCode: this.decrypt_data(data1[i].FedexServiceCode),
      };
    }
    return temp;
  },

  decrypt_data(a) {
    let bytes = CryptoJS.AES.decrypt(a, 'secret key 123');
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  },

  async getStoreLocatorData(a) {
    var temp2 = [];

    for (let i = 0; i < a.SerachResult.itemsField.length; i++) {
      // Get Services
      var temp1 = [];

      for (
        let j = 0;
        j < a.SerachResult.itemsField[i].serviceOfferingListField.length;
        j++
      ) {
        var serviceOfferingList = {
          descriptionField:
            a.SerachResult.itemsField[i].serviceOfferingListField[j]
              .descriptionField,
        };
        temp1.push(serviceOfferingList);
      }

      // Get air and ground hour
      var temp_Ground = [];
      var temp_Air = [];
      var sunClosed = '';
      var satClosed = '';

      var ground_DataString =
        a.SerachResult.itemsField[i].latestGroundDropOffTimeField[0];

      var groundArray1 = ground_DataString.split('; ');

      var myString = a.SerachResult.itemsField[i].standardHoursOfOperationField;
      var splitArray1 = myString.split('; ');

      for (let j = 0; j < groundArray1.length; j++) {
        var splitArray2 = splitArray1[j].split(': ');
        var groundArray2 = groundArray1[j].split(': ');
        var ground_Data = {
          Day: splitArray2[0],
          ShopHouseTiming: splitArray2[1],
          LastHours: groundArray2[1],
        };
        if (splitArray2[0] == 'Sat' && splitArray2[1] == 'Closed') {
          satClosed = 'Closed';
        } else {
          satClosed = 'Open';
        }

        if (splitArray2[0] == 'Sun' && splitArray2[1] == 'Closed') {
          sunClosed = 'Closed';
        } else {
          sunClosed = 'Open';
        }

        temp_Ground.push(ground_Data);
      }

      var air_DataString =
        a.SerachResult.itemsField[i].latestAirDropOffTimeField[0];
      var airArray1 = air_DataString.split('; ');
      for (let j = 0; j < airArray1.length; j++) {
        var splitArray2 = splitArray1[j].split(': ');
        var airArray2 = airArray1[j].split(': ');
        var air_Data = {
          Day: airArray2[0],
          ShopHouseTiming: splitArray2[1],
          LastHours: airArray2[1],
        };
        temp_Air.push(air_Data);
      }

      // Open and close
      var storeWorkingFlag = '';
      for (
        let j = 0;
        j < a.SerachResult.itemsField[i].operatingHoursField.length;
        j++
      ) {
        for (
          let k = 0;
          k <
          a.SerachResult.itemsField[i].operatingHoursField[j].dayOfWeekField
            .length;
          k++
        ) {
          var storeDate =
            a.SerachResult.itemsField[i].operatingHoursField[j].dayOfWeekField[
              k
            ].dayField;
          var hoursField1 =
            a.SerachResult.itemsField[i].operatingHoursField[j].dayOfWeekField[
              k
            ].openHoursField;
          var hoursField2 =
            a.SerachResult.itemsField[i].operatingHoursField[j].dayOfWeekField[
              k
            ].closeHoursField;
          var currentDay = new Date().getDay() + 1;
          if (Number(currentDay) == Number(storeDate)) {
            if (hoursField1 == null && hoursField2 == null) {
              storeWorkingFlag = 'Closed';
            } else {
              var hours = new Date().getHours(); //To get the Current Hours
              var min = new Date().getMinutes();
              if (min < 10) {
                min = '0' + min;
              }
              var a1 = Number(hours + '' + min);
              if (a1 >= Number(hoursField1) && a1 <= Number(hoursField2)) {
                storeWorkingFlag = 'Open';
              } else {
                storeWorkingFlag = 'Closed';
              }
            }
          }
        }
      }

      // final Data

      var cData = {
        latitude: Number(
          a.SerachResult.itemsField[i].geocodeField.latitudeField,
        ),
        longitude: Number(
          a.SerachResult.itemsField[i].geocodeField.longitudeField,
        ),
        Car: 'UPS',
        title:
          a.SerachResult.itemsField[i].addressKeyFormatField.consigneeNameField,
        phoneNumber: a.SerachResult.itemsField[i].phoneNumberField[0],
        address:
          a.SerachResult.itemsField[i].addressKeyFormatField.addressLineField +
          ', ' +
          a.SerachResult.itemsField[i].addressKeyFormatField
            .politicalDivision2Field +
          ', ' +
          a.SerachResult.itemsField[i].addressKeyFormatField
            .postcodePrimaryLowField,
        miles: a.SerachResult.itemsField[i].distanceField.valueField,
        serviceList: temp1,
        air_PickupHours: temp_Air,
        ground_PickupHours: temp_Ground,
        storeWorkingFlag: storeWorkingFlag,
        sunClosedVar: sunClosed,
        satClosedVar: satClosed,
      };
      temp2.push(cData);
    }
    return temp2;
  },
};
export default global_functions;
