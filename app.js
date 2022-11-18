const express = require("express");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey:"f6d21039af8926feeb5b85eecdf38ce8-us21",
  server: "us21"
})

app.post("/", function(req,res){
  var firstName = req.body.FirstName;
  var lastName = req.body.LastName;
  var email = req.body.email;


const listId = "252aab59c8";
const subList = {
  fname : firstName,
  lname : lastName,
  email : email
}

async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subList.email,
status: "subscribed",
merge_fields: {
  FNAME: subList.fname,
  LNAME: subList.lname,
}
});
console.log(
`Successfully added contact as an audience member. The contact's id is ${
response.id
}.`
);

}

console.log(res.statusCode);
if(res.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
}
else{
  res.sendFile(__dirname + "/failure.html");
}

run();
});


app.post("/failure", function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT  || 3000, function(){
  console.log("Node is connected");
})
