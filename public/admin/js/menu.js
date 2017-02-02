//Initial Variables
var former,globalData;
var container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

var padded = document.createElement('div');
padded.className = 'order';
container.appendChild(padded);

var mainer = document.createElement('div');
mainer.className = 'order padded';
container.appendChild(mainer);
var buyer = document.createElement('h3');
	buyer.innerHTML = 'Main Dish :';
	mainer.appendChild(buyer);

var sider = document.createElement('div');
sider.className = 'order padded';
container.appendChild(sider);
var buyer = document.createElement('h3');
	buyer.innerHTML = 'Side Dish :';
	sider.appendChild(buyer);


//Classes
Menu = function(data){
	var btn = document.createElement('div');
	btn.id = (data.mid? data.mid:data.sid);
	btn.className = 'main';
	
	var img = document.createElement('div');
	img.className = 'image';
	img.style.backgroundImage = 'url('+window.location.origin+data.image+')';
	btn.appendChild(img);
	
	btn.box = document.createElement('input');
	btn.box.type = 'checkbox';
	btn.appendChild(btn.box);
	
	var title = document.createElement('h4');
	title.style.color = '#000';
	title.innerHTML = data.title+'&nbsp;';
	btn.appendChild(title);
	
	btn.onclick = function(){
		former.setData(0,data);
	}

	return btn;
}

//Editor
Form = function(){
	var div = document.createElement('form');
	div.className = 'form';

	div.setData = function(mode,data){
		var sidedish = '',onchange = 'checkSmall';
		if(data){
			if(data.mid){
				onchange = 'checkBig';
				var dishes = data.sidedish.split(',');
				
				for(var i in globalData.side){

					var found = false;
					for(var j in dishes){
						if(dishes[j]==globalData.side[i].sid) found = true;
					}
					if(found){
						sidedish += '<input type="checkbox" checked="true" value="'+globalData.side[i].sid+'"/>'+globalData.side[i].title+'&emsp;';
					}else{
						sidedish += '<input type="checkbox" value="'+globalData.side[i].sid+'"/>'+globalData.side[i].title+'&emsp;';
					}
				}
			}
			if(data.mid) onchange = 'checkBig';

		}else if(mode==1){
			div.mode = 1;
			onchange = 'checkBig';
			for(var i in globalData.side){
				sidedish += '<input type="checkbox" value="'+globalData.side[i].sid+'"/>'+globalData.side[i].title+'&emsp;';
			}
		}else if(mode==2){
			div.mode = 2;
		}

		former.style.display = 'block';

		div.menuId = 0;
		if(data){
			if(data.mid){
				div.menuId = 'mid,'+data.mid;
			}else if(data.sid){
				div.menuId = 'sid,'+data.sid;
			}
		}
		div.innerHTML = '<h3>'+(data? (data.mid? 'Edit Main Dish':'Edit Side Dish'):(mode==1? 'Add Main Dish':'Add Side Dish'))+'</h3>'+
						'<div><label for="title">Menu Title : </label><input id="title" type="text"/></div><br>'+
						'<div><label for="price">Price (€) : </label><input id="price" type="text"/></div><br>'+
						'<div><img id="pre-image"/></div>'+
						'<div><label for="image">Detail Image : </label><input id="image" type="file" onchange="checkDetail(this)"/></div><br>'+
						'<div><img id="pre-dish-image"/></div>'+
						'<div><label for="dish_image">Dish Image (for tablet): </label><input id="dish_image" type="file" onchange="'+onchange+'(this)"/></div><br>'+
						(data? (data.mid? '<div><fieldset id="field"><legend>Side Dish</legend>'+sidedish+'</fieldset></div><br>':''):'')+
						(mode==1? '<div><fieldset id="field"><legend>Side Dish</legend>'+sidedish+'</fieldset></div><br>':'')+
						'<div class="text"><label for="detail"> Ingredients : </label><br><br><textarea id="detail"></textarea></div><br>'+
						'<div class="text"><label for="producer"> Declaration : </label><br><br><textarea id="producer"></textarea></div><br>'+
						//'<div class="text"><label for="processing">Menu Processing : </label><br><br><textarea id="processing"></textarea></div><br>'+
						'<div class="text"><label for="information"> Product Information : </label><br><br><textarea id="information"></textarea></div><br>'+
						'<div class="text"><label for="utility"> Nutritional information : </label><br><br><textarea id="utility"></textarea></div><br><div></div>'+
						'<div class="text"><label for="disable" class="disable">✘ Delete Menu :</label><input id="disable" type="checkbox"/></div><br>'+
						'<div class="right"><a class="button cancel" onclick="hide()">&nbsp;Cancel&nbsp;</a><a class="button save" onclick="save()">&nbsp;Save&nbsp;</a></div><br><br><br><br><br>'+
						'';
		setTimeout(function(){
			if(data){
				document.getElementById('title').value = data.title;
				document.getElementById('price').value = data.price;
				document.getElementById('pre-image').src = window.location.origin+data.image;
				document.getElementById('pre-dish-image').src = window.location.origin+data.dish_image;

				document.getElementById('detail').value = data.detail;
				document.getElementById('producer').value = data.producer;
				//document.getElementById('processing').value = data.processing;
				document.getElementById('information').value = data.information;
				document.getElementById('utility').value = data.utility;
			}

			/*tinymce.EditorManager.execCommand('mceAddEditor', true, 'detail');
			tinymce.EditorManager.execCommand('mceAddEditor', true, 'producer');
			tinymce.EditorManager.execCommand('mceAddEditor', true, 'processing');
			tinymce.EditorManager.execCommand('mceAddEditor', true, 'information');
			tinymce.EditorManager.execCommand('mceAddEditor', true, 'utility');*/
		},100);
	}

	return div;
}

//Utility Functions
function save(){
	var htmlHead = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'+window.location.origin+'/admin/css/style.css"></head><body>';
	var htmlTail = '</body></html>';

	var req = new FormData();
	if(former.menuId){
		var arr = former.menuId.split(',');
		req.append(arr[0],arr[1]);
	}else{
		req.append('mode',former.mode);
	}
	req.append('title',document.getElementById('title').value);
	req.append('price',document.getElementById('price').value);
	if(document.getElementById('image').files[0]) req.append('image',document.getElementById('image').files[0]);
	if(document.getElementById('dish_image').files[0]) req.append('dish_image',document.getElementById('dish_image').files[0]);

	var fields = document.getElementById('field');
	if(fields){
		var sidedish = [];
		for(var i in fields.childNodes){
			if(fields.childNodes[i].type==='checkbox'){
				if(fields.childNodes[i].checked) sidedish.push(fields.childNodes[i].value);
			}
		}
		req.append('sidedish',' '+sidedish.toString());
	}
	
	/*req.append('detail',htmlHead+tinyMCE.get('detail').getContent()+htmlTail);
	req.append('producer',htmlHead+tinyMCE.get('producer').getContent()+htmlTail);
	req.append('processing',htmlHead+tinyMCE.get('processing').getContent()+htmlTail);
	req.append('information',htmlHead+tinyMCE.get('information').getContent()+htmlTail);
	req.append('utility',htmlHead+tinyMCE.get('utility').getContent()+htmlTail);*/
	req.append('detail',document.getElementById('detail').value);
	req.append('producer',document.getElementById('producer').value);
	req.append('information',document.getElementById('information').value);
	req.append('utility',document.getElementById('utility').value);

	req.append('disable',(document.getElementById('disable').checked? 1:0));

	/*for(var value of req.values()) {
	   console.log(value); 
	}*/

	if(document.getElementById('title').value!=''&& document.getElementById('price').value!=''){
		var xhr = new XMLHttpRequest();
		xhr.open('POST',window.location.origin+'/admin/menu/update',true);
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4 && xhr.status==200){
				var res = JSON.parse(xhr.responseText);
				if(!res.err){
					location.reload();
				}else{
					alert(res.err);
				}
			}
		}
		xhr.send(req);
	}else{
		alert('Please fill Title and Price!');
	}
}

function hide(){
	tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'detail');
	tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'producer');
	tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'processing');
	tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'information');
	tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'utility');

	former.style.display = 'none';
	former.innerHTML = '';
}

var _URL = window.URL|| window.webkitURL;
function checkSize(input,size){
	if(file = input.files[0]){
        img = new Image();
        img.onload = function(){
        	if(this.width<size ||this.height<size){
        		input.value = '';
	            alert('The minimum required image size is '+size+'x'+size+'px');
	        }
        };
        img.onerror = function(){
        	input.value = '';
            alert( "Not a valid image file: " + file.type);
        };
        img.src = _URL.createObjectURL(file);
    }
}
function checkBig(input){
	 checkSize(input,700);
}
function checkSmall(input){
	 checkSize(input,270);
}
function checkDetail(input){
	 checkSize(input,280);
}

feed = function(){
	var req = new Post(window.location.origin+'/api/getall','',function(){
		if(req.readyState==4 && req.status==200){
			var data = JSON.parse(req.responseText);
			if(!data.err){
				globalData = data;
				if(data.main){
					for(var i in data.main){
						mainer.appendChild(new Menu(data.main[i]));
					}
				}
				if(data.side){
					for(var i in data.side){
						sider.appendChild(new Menu(data.side[i]));
					}
				}
				former = new Form();
				//former.setData({mid:1});
				document.body.appendChild(former);
			}
		}
	});
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
