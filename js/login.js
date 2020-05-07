let userdata = {
    user: []
};

function callback(err) {
  if (err) throw err;
}

function getCredentials() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    userdata.user.push({name: username, password: password});

    let userdataJSON = JSON.stringify(userdata);

    let fs = require('fs');
    fs.writeFile('user-credentials.json', userdataJSON, { encoding: 'utf8', flag: 'w'}, callback);
}

