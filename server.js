var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var getkey = require('./data/apikeys');
var api = require('leagueapi');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended" : false }));

app.get('/stats2/:server/:id', function (req, res) {
  var server = req.params.server;
  var id = req.params.id;

  var result = {
    error: false,
    token: "dd",
    type: 0,
    stats: {
      name: null,
      id: id,
      server: server,
      tier: null,
      division: null,
      points: null,
      wins: null,
      losses: null,
      champs: null
    }
  };

  api.init(getkey(), server);
  Promise.all([
    api.getLeagueEntryData(id),
    api.ChampionMastery.getTopChampions(id, 3)
  ]).then(function (_data) {
    result.stats.name = _data[0][id][0].entries[0].playerOrTeamName;
    result.stats.tier = _data[0][id][0].tier;
    result.stats.division = _data[0][id][0].entries[0].division;
    result.stats.points = _data[0][id][0].entries[0].leaguePoints;
    result.stats.wins = _data[0][id][0].entries[0].wins;
    result.stats.losses = _data[0][id][0].entries[0].losses;
    result.stats.champs = _data[1];
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(result);
  });

});

app.listen(3000);
console.log("Listening to PORT 3000");
