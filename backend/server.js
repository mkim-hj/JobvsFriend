var pg = require('pg');
var express = require('express');
var request = require('request');
var conString = "postgres://@localhost:5432/game";
var APP_ID = "YOUR_APP_ID_HERE"
var APP_SECRET = "YOUR_APP_SECRET_HERE"
//"postgres://username:password@hostname:port/database"

app = express()

app.post("/:uid/", function(req,res){
  query = "INSERT INTO users VALUES (" + req.params.uid + ", " + true + ")";
  query_db(query);
  res.status(200);
});

app.get("/:uid/:access_token/", function(req,res){
  //get FB friends via API call
  //get previous duels if any
  //logic to generate duel
  //write new user to table

  var url = "https://graph.facebook.com/" + req.params.uid + "/friends?limit=10&access_token=" + req.params.access_token;
  request(url, function(req,resp,body){
    console.log(JSON.parse(body)["data"])
    return resp;
  });
});

app.post("/:uid/:friend/:company/:salary/:result/", function(req,res){
  //write to DB result
  query = "INSERT INTO duels (player_fb_id,friend_fb_id,company_id,salary) VALUES ('" + req.params.uid + "', '" + req.params.friend + "', '" + req.params.company + "', '" + req.params.salary + "', '" + req.params.result + "')";
  query_db(query);
  res.status(200);
});

app.get("/:uid/",function(req,res){
  //get stats from DB and return
});

function query_db(query_string){
    pg.connect(conString, function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    client.query(query_string, function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      client.end();
    });
  });
}

app.listen(5000);
