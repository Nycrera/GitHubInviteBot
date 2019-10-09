const express = require('express')
const app = express()
const port = 3001
app.use(express.urlencoded({
  extended: true
}));
const Octokit = require("@octokit/rest");
const Token = "yourAuthToken"; //Check https://github.com/settings/tokens
const Organization = "organizationName" // Example https://github.com/Cool-Organization -> Cool-Organization

app.post('/', function (req, res){
    var type = req.body.type;
    if(type === "mail"){
        addUserbyMail(req.body.mail);
        res.send("ok");
        return;
    }
    if(type === "id"){
        addUserbyID(req.body.id);
        res.send("ok");
    }
    res.status(500);
    res.end();
});

app.listen(port, () => console.log(`Github Organization Invite Bot listening on port ${port}!`))

function addUserbyID(id){
    const octokit = new Octokit({
        auth() {
          return Token;
        }
       });
       octokit.orgs.createInvitation({
        org: Organization,
        invitee_id: id,
        role: "direct_member"
      });

}

function addUserbyMail(mail){
    const octokit = new Octokit({
        auth() {
          return Token;
        }
       });
       octokit.orgs.createInvitation({
        org: Organization,
        email: mail,
        role: "direct_member"
      });

}