(function ($, icons, webChef) {
	var iconLiTemplate = 
		'<li>'+
			'<span data-size="<%size%>" class="fa fa-<%icon%>"></span>'+
			'<p><%icon%> </p>'+
		'</li>';

	var iconModalTemplate = 
		'<div class="tx-icon-list-modal" id="tx-icon-list-modal" style="display:none">'+
			'<input type="text" name="tx-icon-search" id="tx-icon-search">'+
			'<ul class="icons-list"></ul>'+
			'<a class="icon-modal-cancel" href="#">Close</a>'+
			'<a class="icon-modal-confirm" href="#">Insert</a>'+
		'</div>';

	var getSuggestedIcons = function(query){
		return $.grep(icons, function(icon){
			return icon.indexOf(query) !== -1;
		});
	};

	var generateIconsList = function(icons){
		var list = $.map(icons, function(icon){
			return webChef.cook(iconLiTemplate, {'icon':icon, size: ""});
		});

		return list.join("");
	};

	var generateIconsDOM = function(icons){
		var list = generateIconsList(icons);
		$(".icons-list").html(list);
	};

	var iconSelector = function(options){
		$(this).on("click", function(){
			$("#tx-icon-list-modal").modal({
				escapeClose: false,
				clickClose: false,
				showClose: false
			});

			generateIconsDOM(icons);
		});
	};

	$(document).on("keyup change", "#tx-icon-search", function(){
		var query = $(this).val();
		var suggestedIcons = getSuggestedIcons(query);
		generateIconsDOM(suggestedIcons);
	});


	//onload
	$(function(){
		$("body").append(iconModalTemplate);
		generateIconsDOM(icons);
	});

	$.fn.iconSelector = iconSelector;

}(jQuery, tx_font_awesome_icons, webChef));