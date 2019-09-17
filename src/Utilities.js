const Utilities = {};

Utilities.getTodaysDate = () => {
  // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript

  let today = new Date(),
      dd = String(today.getDate()).padStart(2, '0'),
      mm = String(today.getMonth() + 1).padStart(2, '0'), //January is 0!
      yyyy = today.getFullYear();

  today = mm + '-' + dd + '-' + yyyy;
  return today;
};

export default Utilities;