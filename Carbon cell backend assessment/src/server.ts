import app from "./app";
import swaggerDocs from "./swagger/swagger.setup";

// Handling Uncaught Exception
process.on("uncaughtException", (err : Error) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const PORT = process.env.PORT || 3000; // Default port is 3000 if process.env.PORT is undefined

swaggerDocs(app, Number(PORT));
const server = app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err : Error) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
