(function() {
	window.addEventListener('load', function() {
		var post_labels = $('.post-labels');
		if (post_labels.length) {
			post_labels.children('a').each(function(k,v) {
				if ($(v).text() == 'Buku') {
					var html = '<div class="text-center" style="margin: 30px 0;">'+
  '<h3><i class="fa fa-download fa-fw"></i> Download</h3>'+
  '<a data-toggle="modal" href="#__doc_info_" class="btn btn-success btn-md"><i class="fa fa-id-card-o fa-fw"></i> Sertifikat</a>'+
  '<a data-toggle="modal" href="#__doc_info_" class="btn btn-info btn-md" style="margin-left: 5px;"><i class="fa fa-calendar-check-o fa-fw"></i> SK Terbit</a>'+
  '<div class="modal fade" id="__doc_info_" tabindex="-1" role="dialog" aria-labelledby="__doc_info_Label" aria-hidden="true">'+
    '<div class="modal-dialog">'+
      '<div class="modal-content">'+
        '<div class="modal-header">'+
          '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
          '<h4 class="modal-title"><i class="fa fa-download fa-fw"></i> Download</h4>'+
        '</div>'+
        '<iframe src="" style="width:100%;" frameborder="0" name="iframe_form_modal" frameborder="0"  onload="var a = this.contentWindow.document.getElementById(\'modal_remove\'); if (a != null) a.remove(); this.style.height = (this.contentWindow.document.getElementsByTagName(\'body\')[0].clientHeight+1)+\'px\';"></iframe>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>';
					$(html).insertAfter(post_labels);
					$("#__doc_info_").on("shown.bs.modal", function () {
						$(this).find('iframe').attr('src', window.__doc_info_url+'?url='+encodeURIComponent(window.location.origin+window.location.pathname));
					});
				}
			});
		}
	}, false);
})();