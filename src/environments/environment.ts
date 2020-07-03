// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripe_pub: 'pk_live_8JygpDfTwhqgMCEyCcVRgnq100tYT1ISiJ',
  stripe_secret: 'sk_live_U8xCZ1NP33QZA5Adtmg9XcXz00sCGQKksr',
  stripe_client: 'ca_F69o30vDwxdfNrpBjWg2KDnZ8DW70knC',
  etherscan_key: 'HY77FRPJ3UPQZJW6EB991P3ZCKQVG7WY95',
  chainz_key: '99a009df6387',
  // jwt_secret: 'blocks-rocks',
  firebaseConfig: {
    apiKey: "AIzaSyDjRbwLZszkqzsJvLBsn5k45M6cgfiyTXE",
    authDomain: "humbl-lite.firebaseapp.com",
    databaseURL: "https://humbl-lite.firebaseio.com",
    projectId: "humbl-lite",
    storageBucket: "humbl-lite.appspot.com",
    messagingSenderId: "630870458757",
    appId: "1:630870458757:web:d230b766a65312078904ec"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
