var pg = require('pg');
var express = require('express');
var request = require('request');
var conString = "postgres://@localhost:5432/game";
var APP_ID = "YOUR_APP_ID_HERE"
var APP_SECRET = "YOUR_APP_SECRET_HERE"
//"postgres://username:password@hostname:port/database"

app = express()

app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

app.use('/boostrap', express.static(__dirname+'/frontend/bootstrap'))


app.get('/', function(req, res) {
  res.sendfile(__dirname+'/frontend/index.html')
});

app.post("/:uid/", function(req,res){
  query = "INSERT INTO users VALUES (" + req.params.uid + ", " + true + ")";
  query_db(query, function(err, res) {
  	if (err) {
  		res.send(500);
  	}
  	else {
  		res.send(200);
  	}
  });
});

app.get("/:uid/:access_token/", function(req,res){
  //get FB friends via API call
  //get previous duels if any
  //logic to generate duel
  //write new user to table
  var url = "https://graph.facebook.com/" + req.params.uid + "/friends?limit=10&access_token=" + req.params.access_token;
  request(url, function(err,resp,body){
    if(err || resp.status < 200 || resp.status >= 400){
        res.send(500);
        return;
    }
    //list of friends based on uid and access token
    friends = JSON.parse(body)["data"];
    if(!friends){
      res.send(500);
      return;
    }

    //get previous duels
    query = "SELECT * from duels where player_fb_id = " + req.params.uid;
    query_db(query,function(err, result){
    	if (err) {
    		return;
    	}
    	else {
			console.log(result);
    	}
    });

    // get a random friend
    random_friend = friends[5]["name"]
    random_salary = 150000

    var all_companies = ["google", "microsoft", "apple", "facebook", "linkedin"]
    random_company = all_companies[Math.floor((Math.random()*5))];
    //(logic) generate duel and send back to front-end
    var duel = {
        "company": random_company,
        "salary": random_salary,
        "friend" : random_friend,
        "friendship_duration" : 5,
        "count": 1
    }
    res.send(200, duel);
  });
});

app.post("/:uid/:friend/:company/:salary/:result/", function(req,res){
  //write to DB result
  query = "INSERT INTO duels (player_fb_id,friend_fb_id,company_id,salary) VALUES ('" + req.params.uid + "', '" + req.params.friend + "', '" + req.params.company + "', '" + req.params.salary + "', '" + req.params.result + "')";
  query_db(query, function(err, res) {
  	if (err) {
  		res.send(500);
  	}
  	else {
  		res.send(200);
  	}
  });
});

app.get("/:uid/",function(req,res){
  //get stats from DB and return
  res.send(200);
});

app.get("/test", function(req,res) {
	res.send("Hello!");
});

function query_db(query_string, callback){
    pg.connect(conString, function(err, client, done) {
      if(err) {
          console.error('error fetching client from pool', err);
          callback(err, null);
          return;
      }
      client.query(query_string, function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
          console.error('error running query', err);
          callback(err, null);
          return;
        }
        callback(null, result);
      });
  });
}

console.log("Listening on 5000");
app.listen(process.env.PORT || 5000);
