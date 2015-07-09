(function ($, icons, webChef) {
	var ACTIVE_INPUT;

	var iconLiTemplate = 
		'<li class="<%active%>">'+
			'<span class="fa fa-<%icon%>"></span>'+
			'<p><%icon%> </p>'+
		'</li>';

	var iconModalTemplate = 
		'<div class="modal fade" id="tx-icon-list-modal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="Icon List" aria-hidden="true">'+
			'<div class="modal-dialog">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<input type="text" id="tx-icon-search" class="form-control" placeholder="Search Icon">'+
					'</div>'+

					'<div class="modal-body clearfix">'+
						'<div class="form-group">'+
							'<ul class="tx-icons-list clearfix"></ul>'+
						'</div>'+
					'</div>'+

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
		return $.grep(icons, function(icon){
			return icon.indexOf(query) !== -1;
		});
	};

	var generateIconsList = function(icons){
		var iconvalue = ACTIVE_INPUT ? ACTIVE_INPUT.val() : "";

		var list = $.map(icons, function(icon){
			var active = iconvalue ? (icon === iconvalue.split(" ")[1].replace("fa-", "")) : false;

			return webChef.cook(iconLiTemplate, {'icon':icon, size: "", active: active?'active':""});
		});

		return list.join("");
	};

	var generateIconsDOM = function(icons){
		var list = generateIconsList(icons);
		$(".tx-icons-list").html(list);
	};

	var getSelectedIcon = function(){
		var iconSize = $("#tx-icon-size").val();
		var iconClass = $(".tx-icons-list li.active span").attr('class');
		console.log("size: %s, class: %s", iconSize, iconClass);

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
		var suggestedIcons = getSuggestedIcons(query);
		generateIconsDOM(suggestedIcons);
	});

  $(document).on("click",".tx-icons-list li",function(){
    $(".tx-icons-list li").removeClass("active");
    $(this).addClass("active");
  });


	
	var iconSelector = function(options){
		$(this).on("click", function(){
			ACTIVE_INPUT = $(options.input);
			$("#tx-icon-list-modal").modal('show');
			generateIconsDOM(icons);
		});
	};

	//onload
	$(function(){
		$("body").append(iconModalTemplate);
		generateIconsDOM(icons);
	});

	$.fn.iconSelector = iconSelector;

}(jQuery, tx_font_awesome_icons, webChef));