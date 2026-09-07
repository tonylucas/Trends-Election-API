// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:3000/',
  // Fill in with your own Firebase project — the original one is deactivated.
  firebase: {
    apiKey: '<firebase-api-key>',
    authDomain: '<project>.firebaseapp.com',
    databaseURL: 'https://<project>.firebaseio.com',
    storageBucket: '<project>.appspot.com',
    messagingSenderId: '<sender-id>'
  }
};
