const WebSoket = require("ws");
// const {setCountUserOnline} = require("./public/app");
// console.log(setCountUserOnline(1))

const server = new WebSoket.Server({ port: 3000 });

COUNT_USER = 0;


server.on("connection", ws => {
  ws.on("message", message => {
    if (message === "exit") {
      ws.close();
    } else {
      server.clients.forEach(client => {
        if (client.readyState === WebSoket.OPEN) {
            COUNT_USER = client._socket._server._connections;
          client.send("> " + message);
        }
      });
    }
    console.log(server._server._connections);
  });

  ws.send("Welcome!");
});


