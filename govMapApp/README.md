# GovMapApp

This is implementation that is using gov.map api and maps to provide ability to show the different data layers on the map.
Since the gov api has strict domain policy, I created a mock of the API (the data is real, but stored in the MOCK.js file)
Because of this, I also didn't implemented the "additional layers" option.

I also wrote mini server that has to run to provide 'cors - brige' service.
It's URL can be changes in the enviroment.ts settings 


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:1111/`. The app will automatically reload if you change any of the source files.

