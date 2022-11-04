import webpack from "webpack";
import config from "../webpack.config";
let express = require("express");
let path = require("path");
let open = require("open");

let port = 3000;
let app = express();

const compiler = webpack(config);

app.use(
  require("webpack-dev-middleware")(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open("http://localhost:" + port);
  }
});
