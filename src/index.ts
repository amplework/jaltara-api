import express from 'express';
import path from 'path';
import {ApplicationConfig, JaltaraApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new JaltaraApplication(options);
  await app.boot();
  await app.start();

  const expressApp = express();
  const url = app.restServer.url;

  // Serve static files from the "public" directory
  const staticDir = path.resolve(__dirname, '../public');
  expressApp.use(express.static(staticDir));

  // Mount the LoopBack REST API onto the Express app
  const restApiPath = '/api'; // Base path for REST API
  expressApp.use(restApiPath, app.requestHandler);

  // Fallback route to serve index.html for frontend SPA routes
  expressApp.use((req, res, next) => {
    if (!req.path.startsWith(restApiPath)) {
      res.sendFile(path.join(staticDir, 'index.html'));
    } else {
      next();
    }
  });

  // Start the Express server
  const expressPort = 4000; // Port for serving static files
  const port = options.rest?.port || 3000; // Port for REST API
  const host = options.rest?.host || 'localhost';

  // Start Express server
  expressApp.listen(expressPort, host, () => {
    console.log(`Admin interface served at http://${host}:${expressPort}`);
  });

  console.log(`REST API is running at ${url}${restApiPath}`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
