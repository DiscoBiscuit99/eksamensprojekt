let userdata = {
    user: []
};

function getCredentials() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    userdata.user.push({name: username, password: password});

    let userdataJSON = JSON.stringify(userdata);

    let fs = require('fs');
    fs.writeFile('user-credentials.json', userdataJSON, 'utf8', (err) => {
        if (err) throw err;
    });
}

