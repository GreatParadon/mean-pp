Post = function (url, data, callback, timeout) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = callback;
    if (timeout) xhr.timeout = timeout;
    if (data) {
        xhr.send(data);
    } else {
        xhr.send();
    }
    return xhr;
};

Order = function (data, disable) {
    var div = document.createElement('table');
    div.id = 'o' + data.oid;
    div.className = 'order';
    div.cancel = false;

    var td1 = document.createElement('td');
    div.appendChild(td1);
    var td2 = document.createElement('td');
    td2.className = 'menu';
    div.appendChild(td2);

    var buyer = document.createElement('h3');
    buyer.innerHTML = data.buyer + '&emsp;-&emsp;' + data.timestamp.substring(0, 10) + '&nbsp;&nbsp;' + (Number(data.timestamp.substring(11, 13)) + 1) + data.timestamp.substring(13, 19);
    td1.appendChild(buyer);

    div.mains = [];
    for (var i in data.orders) {
        var m = new Main(div, data.orders[i], (disable ? true : false));
        div.mains.push(m);
        td1.appendChild(m);
    }

    div.done = document.createElement('button');
    div.done.className = 'clickable';
    div.done.innerHTML = '✔';
    if (!disable) {
        div.done.onclick = function () {
            var reqData = {oid: data.oid, type: (div.cancel ? 3 : 2), main: []};
            for (var i in div.mains) {
                reqData.main.push({did: data.orders[i].did, type: (div.mains[i].box.checked ? 2 : 1)});
            }
            console.log(JSON.stringify(reqData));

            var req = new Post(window.location.origin + '/admin/order/complete', JSON.stringify(reqData), function () {
                if (req.readyState == 4 && req.status == 200) {
                    console.log(req.responseText);
                    var data = JSON.parse(req.responseText);
                    if (data.success == true) {
                        div.parentNode.removeChild(div);
                    } else {
                        alert(data.error);
                    }
                }
            });
        }
    } else if (data.type == 2) {
        div.done.className = '';
    } else if (data.type == 3) {
        div.done.className = 'cancel';
        div.done.innerHTML = '✘';
    }
    td2.appendChild(div.done);

    return div;
}

Main = function (parent, data, disable) {
    var btn = document.createElement('label');
    btn.for = parent.id + 'd' + data.did;
    btn.className = 'main';

    if (!disable) {
        btn.onclick = function () {
            if (btn.box.checked) {
                btn.style.color = '#fff';
                btn.style.background = '#DF242B';
            } else {
                btn.style.color = '#000';
                btn.style.background = '#fff';
            }
            var size = parent.mains.length;
            var count = 0;

            for (var i in parent.mains) {
                if (parent.mains[i].box.checked)
                    count++;
            }
            parent.cancel = (count == size ? true : false);
            if (parent.cancel) {
                parent.done.className = 'clickable cancel';
                parent.done.innerHTML = '✘';
            } else {
                parent.done.className = 'clickable';
                parent.done.innerHTML = '✔';
            }
        }
    }

    var img = document.createElement('div');
    img.className = 'image';
    img.style.backgroundImage = 'url(' + window.location.origin + data.image + ')';
    btn.appendChild(img);

    btn.box = document.createElement('input');
    btn.box.id = parent.id + 'd' + data.did;
    btn.box.type = 'checkbox';
    btn.appendChild(btn.box);
    if (data.type == 2) {
        btn.style.color = '#fff';
        btn.style.background = '#DF242B';
    }

    var title = document.createElement('h4');
    title.innerHTML = data.title;
    btn.appendChild(title);

    var sideGroup = document.createElement('div');
    sideGroup.className = 'side-group';
    for (var i in data.side) {
        if (data.side[i].amount > 0) {
            var s = new Side(data.side[i]);
            sideGroup.appendChild(s);
        }
    }
    btn.appendChild(sideGroup);

    return btn;
}

Side = function (data) {
    var div = document.createElement('div');
    div.className = 'side';

    /*var img = document.createElement('div');
     img.className = 'image';
     img.style.backgroundImage = 'url('+window.location.origin+data.image+')';
     div.appendChild(img);*/

    var title = document.createElement('p');
    title.innerHTML = data.title;
    div.appendChild(title);

    var amount = document.createElement('p');
    amount.className = 'amount';
    amount.innerHTML = data.amount;
    div.appendChild(amount);

    return div;
}