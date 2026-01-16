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

	// 4. Buat wrapper SEKALI
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
	var postText = postBody.innerText;
	var copyData = postId + '|##|' + postText;

	var buttons = wrapper.getElementsByTagName('a');
	for (i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function () {
			copyTextToClipboard(copyData);
		};
	}

})();