"use strict";

require("dotenv/config");

var _axios = _interopRequireDefault(require("axios"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT;
app.get('/:channel', function (req, res) {
  var _req$params = req.params,
      params = _req$params === void 0 ? {} : _req$params;
  var channel = params.channel;
  if (!channel) return res.redirect(400);

  _axios["default"].get("https://pwn.sh/tools/streamapi.py?url=https://www.twitch.tv/".concat(channel)).then(function (payload) {
    var data = payload.data;
    var success = data.success,
        _data$urls = data.urls,
        urls = _data$urls === void 0 ? {} : _data$urls;

    if (success) {
      var query = req.query;
      var quality = query.quality;
      if (!quality || !urls[quality]) quality = Object.keys(urls)[0];
      var url = urls[quality];
      if (!url) return res.sendStatus(404);
      res.redirect(url);
    } else {
      res.sendStatus(404);
    }
  });
});
app.listen(port, function () {
  console.log("Web server listening on port ".concat(port));
});