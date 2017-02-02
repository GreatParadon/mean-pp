//Initial Variables
var container = document.createElement('div');
container.id = 'container';

var padded = document.createElement('div');
padded.className = 'order';
container.appendChild(padded);

document.body.appendChild(container);
feed = function(){
	var req = new Post(window.location.origin+'/admin/order/report','',function(){
		if(req.readyState==4 && req.status==200){
			var data = JSON.parse(req.responseText);
			if(!data.err){
				for(var i in data){
					container.appendChild(new Order(data[i],true));
				}
			}
		}
	});
	
	req.ontimeout = function(){
		feed();
	}
}

function login(){
	var pass = {username:document.getElementById('user').value, password:document.getElementById('pass').value};
	var req = new Post(window.location.origin+'/admin/access',JSON.stringify(pass),function(){
		if(req.readyState==4 && req.status==200){
			var data = JSON.parse(req.responseText);
			if(!data.error){
				sessionStorage.setItem('user',pass.username);
				sessionStorage.setItem('pass',pass.password);
				document.body.removeChild(document.getElementById('login'));
				feed();
			}else{
				alert(data.error);
			}
		}
	});
}
window.onload = function(){
	var pass = {username:sessionStorage.getItem('user'), password:sessionStorage.getItem('pass')};
	if(pass.username&& pass.password){
		var req = new Post(window.location.origin+'/admin/access',JSON.stringify(pass),function(){
			if(req.readyState==4 && req.status==200){
				var data = JSON.parse(req.responseText);
				if(!data.error){
					document.body.removeChild(document.getElementById('login'));
					feed();
				}else{
					alert(data.error);
				}
			}
		});
	}
}

