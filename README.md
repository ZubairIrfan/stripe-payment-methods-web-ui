# Stripe Payment Method UI (For Backend Payment Method Testing)

This is a simple web ui for generating stripe payment method id for backend testing. Mostly backend developer need these payment method details to complete their backend tasks for payment methods feature. This web ui will help them to acheive their deadlines without any hurdles.

## How to run

First replace your stripe publishable key in App.js file. It will link your stripe account with this project.
The, To run this project, you first need to run these commands:

### `npm install`
### `npm start`

if you get any webpack error like this:
digital envelope routines::unsupported

you can follow this solution:
https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

For windows, run these command in CMD:
- set NODE_OPTIONS=--openssl-legacy-provider
- npm start

For linux, macOs, run these command in terminal:
- export NODE_OPTIONS=--openssl-legacy-provider
- npm start
