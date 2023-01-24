// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:5222',
  API_MAPS:'https://maps.googleapis.com/maps/api/js?key=AIzaSyDj9GZLwDPSr0HgR0hGXcX-EzlkJsNUOVY&callback=initMap&libraries=places,geometry&solution_channel=GMP_QB_locatorplus_v6_cA',
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
