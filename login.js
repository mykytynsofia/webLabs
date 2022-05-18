const login_url = 'http://127.0.0.1:5000/login'

async function login(id) {
    var inputs = document.getElementById(id).elements;
    var username = inputs['username'].value;
    var password = inputs['password'].value;
    var hash = btoa(username + ":" + password);
    var url = login_url;
    let h = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });
    h.append('Accept', 'application/json');
    let auth = 'Basic ' + hash;
    h.append('Authorization', auth);
    const request = new Request(url,
        {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: h
        });
    await fetch(request).then(async (response) => {
        var res = await response.json();
        if (response.status == 200) {
            var token = res.access_token
            localStorage.setItem('token', token);
            window.location.replace("./rating.html");
        }
        else {
            alert("Wrong credentials")
        }
    });
    return 0;
}
