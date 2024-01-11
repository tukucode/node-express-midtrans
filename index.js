import express from "express";
import cors from "cors";
import midtransClient from "midtrans-client";

const client_key = "SB-Mid-client-bee5ytyyXoZzSoUf";
const server_key = "SB-Mid-server-zDBGCfmXOAXPCUJkXjedFuQA";

const app = express();

// handle cors
app.use(cors());

// body parser
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

// TRANSACTION USE SNAP
app.post("/api/v1/simple-checkout", (req, res) => {
  const body = req.body;

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: server_key,
    clientKey: client_key,
  });

  snap
    .createTransaction(body)
    .then((response) => {
      res.status(200).send({
        code: 200,
        message: "Simple Checkout success",
        data: response,
      });
    })
    .catch((error) => {
      res.status(500).send({
        code: 500,
        message: error.message,
      });
    });
});

// TRANSACTION USE COREAPI
app.post("/api/v1/checkout", (req, res) => {
  const body = req.body;

  const core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: server_key,
    clientKey: client_key,
  });

  core
    .charge(body)
    .then((response) => {
      res.status(200).send({
        code: 200,
        message: "Checkout success",
        data: response,
      });
    })
    .catch((error) => {
      res.status(500).send({
        code: 500,
        message: error.message,
      });
    });
});

app.listen(3001, () => console.log("Running on http://localhost:3001"));
