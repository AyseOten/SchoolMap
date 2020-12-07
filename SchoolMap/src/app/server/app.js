const express = require("express");
const app = express();  

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { Client } = require("pg");

var cors = require("cors");
app.use(cors());

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "101044016",
  database: 'postgres'
});

//veritabanı bağlantısı
client
.connect()
.then(() => console.log("connected"))
.catch((err) => console.error("connection error", err.stack));

app.get("/info", async (req, res, next) => {
  client.query("SELECT locationname,adress,telephone,ST_AsGeoJSON(ST_Transform(geom, 4326))::json as geometry FROM info", (err, res2) => {
    console.log(res2)
    if (err) {
      console.log(err.stack);
      res.status(200).json({
        success: false,
        message: err.stack,
      });
    } else {
      res.status(200).json({
        success: true,
        data: res2.rows,
      });
    }
  });

});

app.post("/", async (req, res, next) => {
  coordinates = req.body.coordinates;
  console.log("fgdfgd" +coordinates);
  locationname = req.body.locationname;
  adress = req.body.adress;
  telephone = req.body.telephone;

  client.query('INSERT INTO info(locationname,adress,telephone,geom) values ($1, $2, $3, ST_SetSRID(st_point($4,$5),4326)) RETURNING *', 
    [locationname, adress, telephone, coordinates[0], coordinates[1]], (err, res2) => {
    if (err) {
      console.log(err.stack);
      res.status(200).json({
        success: false,
        message: err.stack,
      });
    } else {
      res.status(200).json({
        success: true,
        data: res2.rows,
      });
    }
  });
});

module.exports = app;