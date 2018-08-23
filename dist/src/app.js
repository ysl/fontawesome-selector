(function ($, webChef) {
	var ACTIVE_INPUT;

	var iconList = [
		{
			title: 'Font Awesome',
			icons: tx_font_awesome_icons,
			classPrefix: 'fa fa-'
		}
	];

	var iconLiTemplate = 
		'<li class="<%active%>">'+
			'<span class="<%classPrefix%><%icon%>"></span>'+
			'<p><%icon%> </p>'+
		'</li>';

	var iconModalTemplate = 
		'<div class="modal fade" id="tx-icon-list-modal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="Icon List" aria-hidden="true">'+
			'<div class="modal-dialog">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<input type="text" id="tx-icon-search" class="form-control" placeholder="Search Icon">'+
					'</div>'+

					'<div class="modal-body clearfix icons-container"></div>'+

					'<div class="modal-footer">'+
						'<button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Close</button>'+
						'<button type="button" class="btn btn-success icon-insert-button pull-right">Insert Icon</button>'+
						
						'<select id ="tx-icon-size" class="form-control pull-right">'+
							'<option value="fa-5x">Icon Size..</option>'+
							'<option value="fa-lg">fa-lg</option>'+
							'<option value="fa-2x">fa-2x</option>'+
							'<option value="fa-3x">fa-3x</option>'+
							'<option value="fa-4x">fa-4x</option>'+
							'<option value="fa-5x">fa-5x</option>'+
						'</select>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';

	var getSuggestedIcons = function(query){
		return iconList.map(function(obj) {
			var newObj = $.extend({}, obj);
			newObj.icons = $.grep(newObj.icons, function(icon){
				return icon.indexOf(query) !== -1;
			});
			return newObj;
		});
	};

	var generateIconsList = function(icons, classPrefix){
		var iconvalue = ACTIVE_INPUT ? ACTIVE_INPUT.val() : "";
		var target = "";
		if (iconvalue) {
			var prefix = classPrefix.split(" ").find(function(str) {
				return str.indexOf("-") != -1;
			});
			var iconvalue_array = iconvalue.split(" ");
			if (iconvalue_array.length >= 2 && prefix && iconvalue_array[1].startsWith(prefix)) {
				target = iconvalue_array[1].replace(prefix, "");
			}
		}

		var list = $.map(icons, function(icon){
			var active = (icon === target);

			return webChef.cook(iconLiTemplate, {'icon':icon, size: "", active: active?'active':"", classPrefix: classPrefix});
		});

		return list.join("");
	};

	var generateIconsDOM = function(iconList){
		var html =
			'<ul class="nav nav-tabs nav-justified">' +
			iconList.map(function(obj, index) {
				var active = (index == 0) ? 'active' : '';
				return '<li class="' + active + '"><a data-toggle="tab" href="#icon-menu-' + index + '">' + obj.title + '</a></li>';
			}).join("\n") +
			'</ul>' +
			'<div class="tab-content">' +
			iconList.map(function(obj, index) {
				var active = (index == 0) ? 'active' : '';
				return '<div id="icon-menu-' + index + '" class="tab-pane ' + active + '">' +
					'<div class="form-group">'+
						'<ul class="tx-icons-list clearfix">' + generateIconsList(obj.icons, obj.classPrefix) + '</ul>' +
					'</div>' +
				'</div>';
			}).join("\n") +
			'</div>';

		$(".icons-container").html(html);
	};

	var getSelectedIcon = function(){
		var iconSize = $("#tx-icon-size").val();
		var iconClass = $(".tx-icons-list li.active span").attr('class');

		return iconClass ? iconClass+" "+iconSize : false;
	};

	$(document).on("click", ".icon-insert-button", function(){
		var icon = getSelectedIcon();
		if(!icon) {
			alert("please select an icon to select");
			return;
		}

		ACTIVE_INPUT.val(icon);
		ACTIVE_INPUT.trigger("icon:inserted");
		$("#tx-icon-list-modal").modal('hide');
	});

	$(document).on("keyup change", "#tx-icon-search", function(){
		var query = $(this).val();
		var suggestedIconList = getSuggestedIcons(query);
		generateIconsDOM(suggestedIconList);
	});

	$(document).on("click",".tx-icons-list li",function(){
		$(".tx-icons-list li").removeClass("active");
		$(this).addClass("active");
	});
	
	var iconSelector = function(options){
		$(this).on("click", function(){
			ACTIVE_INPUT = $(options.input);
			$("#tx-icon-list-modal").modal('show');
			generateIconsDOM(iconList);
		});
	};

	//onload
	$(function(){
		$("body").append(iconModalTemplate);
		generateIconsDOM(iconList);
	});

	$.fn.iconSelector = iconSelector;

}(jQuery, webChef));
