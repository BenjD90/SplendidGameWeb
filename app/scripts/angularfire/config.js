angular.module('firebase.config', [])
  .constant('FBURL', 'https://flickering-fire-1832.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['facebook','google'])

  .constant('loginRedirectPath', '/login');
