//Initial Variables
var container = document.createElement('div');
container.id = 'container';

var padded = document.createElement('div');
padded.className = 'order';
container.appendChild(padded);

//History Tab
var grid = document.createElement('table');
grid.id = 'grid';
var logs = document.createElement('td');
logs.id = 'logs';

document.body.appendChild(container);
//document.body.appendChild(grid);
//grid.appendChild(logs);
//grid.appendChild(container);

// var database = firebase.database();

feed = function () {
    // var req = new Post(window.location.origin + '/admin/order/get', '', function () {
    //     if (req.readyState == 4 && req.status == 200) {
    //         var data = JSON.parse(req.responseText);
    //         if (!data.error) {
    //             for (var i in data) {
    //             }
    //             feed();
    //         } else {
    //             feed();
    //         }
    //     }
    // }, 10000);
    //
    // req.ontimeout = function () {
    //     feed();
    // }
    var orderCountRef = database.ref('order');
    orderCountRef.on('value', function (snapshot) {
        $("#container").empty();
        var result = JSON.stringify(snapshot.val(), null, 3);
        var data = JSON.parse(result);
        // console.log(result);
        for (var i in data) {
            // console.log(data[i].type);
            if(data[i].type != 2 && data[i].type != 3){
                container.prepend(new Order(data[i]));
            }
        }
    });


};

function getFirst() {
    // var req = new Post(window.location.origin + '/admin/order/getfirst', '', function () {
    //     if (req.readyState == 4 && req.status == 200) {
    //         var data = JSON.parse(req.responseText);
    //         if (!data.error) {
    //             for (var i in data) {
    //                 container.appendChild(new Order(data[i]));
    //             }
    //         }
    feed();
    //     }
    // });
}

function login() {
    $('#login').show();
    var pass = {username: document.getElementById('user').value, password: document.getElementById('pass').value};
    var req = new Post(window.location.origin + '/admin/access', JSON.stringify(pass), function () {
        if (req.readyState == 4 && req.status == 200) {
            var data = JSON.parse(req.responseText);
            if (!data.error) {
                sessionStorage.setItem('user', pass.username);
                sessionStorage.setItem('pass', pass.password);
                // document.body.removeChild(document.getElementById('login'));
                $('#login').hide();
                getFirst();
            } else {
                alert(data.error);
            }
        }
    });
}
window.onload = function () {
    $('#login').hide();
    var pass = {username: sessionStorage.getItem('user'), password: sessionStorage.getItem('pass')};
    if (pass.username && pass.password) {
        var req = new Post(window.location.origin + '/admin/access', JSON.stringify(pass), function () {
            if (req.readyState == 4 && req.status == 200) {
                var data = JSON.parse(req.responseText);
                if (!data.error) {
                    // document.body.removeChild(document.getElementById('login'));
                    $('#login').hide();
                    getFirst();
                } else {
                    alert(data.error);
                }
            }
        });
    }else{
        $('#login').show();
    }
};


//var test = '{"oid":44,"buyer":"Guest","timestamp":"2016-03-02 11:58:32",orders":[{"did":64,"mid":1,"title":"Pizza","image":"/images/test.jpg","price":69,"sidedish":"1,2,3","total":108,"side":[{"did":64,"sid":1,"title":"Hamburger","image":"/images/test.jpg","price":19,"amount":1},{"did":64,"sid":2,"title":"French Fried","image":"/images/test.jpg","price":10,"amount":2}]},{"did":65,"mid":3,"title":"Spagetti","image":"/images/test.jpg","price":49,"sidedish":"","total":49,"side":[]}]}';
//container.appendChild(new Order(JSON.parse(test)));

