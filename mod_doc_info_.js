(function() {
	window.addEventListener('load', function() {
		var post_labels = $('.post-labels');
		if (post_labels.length) {
			post_labels.children('a').each(function(k,v) {
				if ($(v).text() == 'Buku') {
					var url = window.__doc_info_url+'?url='+encodeURIComponent(window.location.origin+window.location.pathname);
					var html = '<div class="text-center post-doc_info" style="margin: 30px 0;">'+
							'<h3><i class="fa fa-download fa-fw"></i> Download</h3>'+
							'<a href="'+url+'" target="_BLANK" class="btn btn-success btn-md"><i class="fa fa-id-card-o fa-fw"></i> Sertifikat</a>'+
							'<a href="'+url+'" target="_BLANK" class="btn btn-info btn-md" style="margin-left: 5px;"><i class="fa fa-calendar-check-o fa-fw"></i> SK Terbit</a>'+
						'</div>';
					$(html).insertAfter(post_labels);
				}
			});
		}
	}, false);
})();