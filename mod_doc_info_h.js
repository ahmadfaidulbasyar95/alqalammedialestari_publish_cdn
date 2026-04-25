const formatRupiah = (angka) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 2,
	}).format(angka);
}

var shoppingData = localStorage.getItem('AQMLShoppingData');
shoppingData = shoppingData ? JSON.parse(shoppingData) : [];
var shoppingView = document.getElementById('modal-cart').querySelector('.modal-body');

(function () {

	var postLabels = document.querySelector('.post-labels');
	if (!postLabels) return;

	var postBody = document.querySelector('.post-body');
	if (!postBody) return;

	var links = postLabels.getElementsByTagName('a');
	var i = links.length;
	var isBuku = false;

	while (i--) {
		if (links[i].innerText === 'Buku') {
			isBuku = true;
			break;
		}
	}

	if (!isBuku) return;

	var pageUrl =
		location.protocol + '//' + location.host + location.pathname;

	var url =
		window.__doc_info_url +
		'?url=' +
		encodeURIComponent(pageUrl);

	var wrapper = document.createElement('div');
	wrapper.className = 'text-center post-doc_info';
	wrapper.style.margin = '30px 0';

	wrapper.innerHTML =
		'<h3><i class="fa fa-download fa-fw"></i> Download</h3>' +
		'<a href="' + url + '" target="_blank" class="btn btn-success btn-md">' +
			'<i class="fa fa-id-card-o fa-fw"></i> Sertifikat' +
		'</a>' +
		'<a href="' + url + '" target="_blank" class="btn btn-info btn-md" style="margin-left:5px;">' +
			'<i class="fa fa-calendar-check-o fa-fw"></i> SK Terbit' +
		'</a>';

	var parent = postLabels.parentNode;
	parent.insertBefore(wrapper, postLabels.nextSibling);

	var postId = postBody.id.replace('post-body-', '');
	var postText = postBody.textContent;
	var copyData = postId + '|##|' + postText;

	var buttons = wrapper.getElementsByTagName('a');
	for (i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function () {
			copyTextToClipboard(copyData);
		};
	}

	postBody.querySelector('.separator').classList.add('img-book');

	var postBodyP = postBody.querySelectorAll('p');
	var shoppingBtn = null;
	var shoppingPrd = {
		title : document.querySelector('.post-title').textContent,
		price : 0,
		qty : 0,
		url : pageUrl,
		img : postBody.querySelector('img').getAttribute('src')
	};

	for (var i = 0; i < postBodyP.length; i++) {
		if (postBodyP[i].textContent.includes('QRCBN') || postBodyP[i].textContent.includes('ISBN')) {
			
			var current = postBodyP[i].nextElementSibling;

			while (current) {
				if (current.textContent.trim() === "") {
					shoppingBtn = current;
					break;
				}
				current = current.nextElementSibling;
			}
			
			break;
		}

		if (postBodyP[i].textContent.includes('Harga')) {
			shoppingPrd.price = postBodyP[i].textContent.match(/([0-9]{1,3})[\\.,]([0-9]{3})/);
			shoppingPrd.price = shoppingPrd.price ? parseInt(shoppingPrd.price[1]+shoppingPrd.price[2]) : 0;
			postBodyP[i].remove();
		}
	}

	if (shoppingBtn) {
		shoppingBtn.classList.add('shoppingBtn');
		var shoppingInfo = document.createElement('p');
		shoppingBtn.insertAdjacentElement('afterend', shoppingInfo);
		shoppingInfo.classList.add('shoppingInfo');
		shoppingInfo.innerHTML = 'Sinopsis';

		shoppingBtn.innerHTML = '<span class="shoppingPrice">'+formatRupiah(shoppingPrd.price)+'</span>'+
			'<div class="shoppingQty"> <button class="shoppingQtyMinus">−</button> <input type="number" class="shoppingQtyInput" value="1" min="1"> <button class="shoppingQtyPlus">+</button> <button class="shoppingPrdAdd"><i class="fa fa-cart-plus"></i> BELI SEKARANG</button> </div>';

		postBody.querySelector('.shoppingQtyPlus').addEventListener('click', function() {
			const input = this.parentElement.querySelector('.shoppingQtyInput');
			input.value = parseInt(input.value) + 1;
		});

		postBody.querySelector('.shoppingQtyMinus').addEventListener('click', function() {
			const input = this.parentElement.querySelector('.shoppingQtyInput');
			let nilai = parseInt(input.value);
			if (nilai > 1) {
				input.value = nilai - 1;
			}
		});

		postBody.querySelector('.shoppingPrdAdd').addEventListener('click', function() {
			const input = this.parentElement.querySelector('.shoppingQtyInput');
			shoppingPrd.qty = parseInt(input.value);
			for (var i = 0; i < shoppingData.length; i++) {
				if (shoppingData[i].url == shoppingPrd.url) {
					shoppingData.splice(i, 1);
				}
			}
			shoppingData.unshift(shoppingPrd);
			localStorage.setItem('AQMLShoppingData', JSON.stringify(shoppingData));
			fShoppingData();
			$('#modal-cart').modal('show');
		});
	}

})();

function fShoppingData() {
	var html = '';

	if (shoppingData.length) {
		for (var i = 0; i < shoppingData.length; i++) {
			var item = shoppingData[i];
			html += `
				<div class="shopping-item" data-index="${i}">
					<div class="shopping-item-img img-book">
						<img src="${item.img}" alt="${item.title}">
					</div>
					<div class="shopping-item-info">
						<h4 class="shopping-item-title">
							<a href="${item.url}">${item.title}</a>
						</h4>
						<div class="shopping-item-price">${formatRupiah(item.price)}</div>
					</div>
					<div class="shopping-qty-group">
						<button class="shopping-btn-qty" onclick="fShoppingDataQty(${i}, -1)">−</button>
						<input type="number" class="shopping-qty-input" value="${item.qty}" onchange="fShoppingDataQty(${i}, 0)" onkeyup="fShoppingDataQty(${i}, 0)">
						<button class="shopping-btn-qty" onclick="fShoppingDataQty(${i}, 1)">+</button>
						<button class="shopping-btn-remove" onclick="fShoppingDataRemove(${i})"><i class="fa fa-trash"></i></button>
					</div>
				</div>
			`;
		}
		html += `
			<div class="shopping-summary">
				<div class="shopping-summary-row">
					<span>Total Item</span>
					<span class="shopping-total-item">0</span>
				</div>
				<div class="shopping-summary-row">
					<span>Total Harga</span>
					<span id="shopping-total-price">Rp 0</span>
				</div>
				<button id="shopping-btn-checkout">Lanjut Pembayaran</button>
			</div>
		`;
		shoppingView.innerHTML = html;
		shoppingView.querySelector('#shopping-btn-checkout').addEventListener('click', function() {
			alert('Sistem Dalam Pengerjaan !');
		});
		fShoppingDataTotal();
	}else{
		html = '<span class="shoppingEmpty">Waduh, keranjangnya masih jomblo nih !<br>Kasihan dia sendirian, mending cari buku impianmu sekarang !<br>Sstt... buku-buku di daftar incaranmu lagi kangen pengen dipinang, lho.<br>Yuk, kasih mereka rumah baru di rak bukumu !</span>'
		shoppingView.innerHTML = html;
	}
}

function fShoppingDataQty(i, t) {
	var input = shoppingView.querySelector('.shopping-item[data-index="'+i+'"]').querySelector('.shopping-qty-input');
	switch (t) {
		case 0:
			shoppingData[i].qty = parseInt(input.value);
			break;
		case 1:
			shoppingData[i].qty += 1;
			input.value = shoppingData[i].qty;
			break;
		case -1:
			if (shoppingData[i].qty > 1) shoppingData[i].qty -= 1;
			input.value = shoppingData[i].qty;
			break;
	}
	localStorage.setItem('AQMLShoppingData', JSON.stringify(shoppingData));
	fShoppingDataTotal();
}

function fShoppingDataRemove(i) {
	if (confirm('Hapus '+shoppingData[i].title+' ?')) {
		shoppingData.splice(i, 1);
		localStorage.setItem('AQMLShoppingData', JSON.stringify(shoppingData));
		fShoppingData();
	}
}

function fShoppingDataTotal() {
	var x = 0;
	var y = 0;
	for (var i = 0; i < shoppingData.length; i++) {
		x += shoppingData[i].qty;
		y += shoppingData[i].qty * shoppingData[i].price;
	}
	document.querySelectorAll('.shopping-total-item').forEach(z => {
		z.innerHTML = x;
	});
	shoppingView.querySelector('#shopping-total-price').innerHTML = formatRupiah(y);
}

fShoppingData();