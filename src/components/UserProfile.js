import Cookies from 'universal-cookie'
var UserProfile = (function () {
  var userId = "";

  const cookies = new Cookies()
  var getId = function () {
    console.log(cookies.get('userId'))
    return cookies.get('userId')
  };

  var setId = function (newUserId) {
    userId = newUserId;
    cookies.set('userId', newUserId, { path: "/" })
  };

  return {
    getId: getId,
    setId: setId
  };
})();

export default UserProfile;
