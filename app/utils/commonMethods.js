import Moment from 'moment';
function setDateFormat(value) {
  let newDate = value;
  if (value && value.length == 19) {
    newDate = value.slice(0, 10).replace(/-/g, '/');
    newDate =
      newDate.substr(3, 2) +
      '/' +
      newDate.substr(0, 2) +
      '/' +
      newDate.substr(6, 4);
  }
  return newDate;
}
function setDateTimeFormate(value) {
  let newDate = value;
  if (typeof value === 'string' && value.indexOf('-') !== -1) {
    newDate = value.replace(/-/g, '/');
    newDate =
      newDate.substr(3, 2) +
      '/' +
      newDate.substr(0, 2) +
      '/' +
      newDate.substr(6, 4);
    return newDate;
  } else {
    var dd = value.getDate();
    var mm = value.getMonth() + 1;
    var yyyy = value.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return mm + '/' + dd + '/' + yyyy;
  }
}
function setDateFormatApi(value) {
  let newDate = '';
  if (value && value.length == 19) {
    newDate = value;
  } else if (value && value.length == 10) {
    newDate = value + ' 00:00:00';
  } else {
    newDate = null;
  }
  return newDate;
}
export { setDateFormat, setDateFormatApi, setDateTimeFormate };
