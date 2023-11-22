const app = require("./app");
const http = require("http");

const PORT = 3000;
console.log("PORT", process.env.PORT);

const os = require("os");
const cluster = require("cluster");

const clusterWorkerSize = os.cpus().length;

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      // restart this worker
      mongoose.connection.close();
      cluster.fork();
    });
  } else {
    const server = http.createServer(app);
    server.listen(PORT, async () => {
      console.log(
        `Express server listening on port ${PORT} and Worker ${process.pid}`
      );
    });
  }
} else {
  console.log(`Single cpu instance`);
  // if the worker dies, restart it
  process.on("uncaughtException", (err) => {
    console.log("Caught exception: " + err);
    mongoose.connection.close();
    process.exit(1);
  });
  process.on("unhandledRejection", (err) => {
    console.log("Caught rejection: " + err);
    mongoose.connection.close();
    process.exit(1); // exit the process
  });
  process.on("exit", () => {
    mongoose.connection.close();
    console.log("Process exit");
  });

  const server = http.createServer(app);
  server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
  });
}
