// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
  'facebookAuth' : {
       'clientID'      : '528921067256011', // your App ID
       'clientSecret'  : '8d74f9af2c1a9aaca356fd66f05a7d34', // your App Secret
       'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
   }

};
