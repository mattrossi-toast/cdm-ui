var UserProfile = (function() {
  var userId = "";

  var getId = function() {
    return "c4e0077c-3f5f-48ed-a423-bb58d6de47db";
  };

  var setId = function(newUserId) {
    userId = newUserId;
  };

  return {
    getId: getId,
    setId: setId
  };
})();

export default UserProfile;
