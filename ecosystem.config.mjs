import { resolve } from 'path';

const appModule = await import('./app.js'); // Replace 'app.mjs' with your entry file.
const app = appModule.default;

export default {
  apps: [
    {
      name: 'swiftlane-backend',
      script: (async () => {
        const port = app.get('port'); // Adjust this based on how your app sets the port.

        console.log(`Your app is running on port ${port}`);

        // You can also start the app here.
        app.listen(port);
      })(),
      // Other configurations...
    },
  ],
};
