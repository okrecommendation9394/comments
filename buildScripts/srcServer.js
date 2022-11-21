import webpack from "webpack";
import config from "../webpack.config";
let express = require("express");
let path = require("path");
let open = require("open");

let port = 3000;
let app = express();
//app.use(express.static(path.join(__dirname, "public")));
//app.use("/images", express.static(path.join(dirname, "..", "images")));
app.use("/images", express.static(path.join(__dirname, "..", "images")));

const compiler = webpack(config);
app.use(
  require("webpack-dev-middleware")(compiler, {
    publicPath: config.output.publicPath,
  })
);
app.get("/", function (req, res) {
  res.sendFile(path.join(dirname, "../src/index.html"));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open("http://localhost:" + port);
  }
});
