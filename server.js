var pg = require('pg');
var app = require('app');
var conString = "postgres://@localhost:5432/game";
//"postgres://username:password@hostname:port/database"

app.post("/:uid/", function(req,res){
  query = "INSERT INTO users VALUES (" + req.params.uid + ", " + true + ")";
  query_db(query);
});

app.get("/:uid/:access_token/", function(req,res){
  //get FB friends via API call
  //get previous duels if any
  //logic to generate duel
  //write new user to table
  
});

app.post("/:uid/:friend/:company/:salary/:result/", function(req,res){
  //write to DB result
  query = "INSERT INTO duels VALUES (" + req.params.uid + ", " + req.params.friend + ", " + req.params.company + ", " + req.params.salary + ", " + req.params.result + ")";
  query_db(query);
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

