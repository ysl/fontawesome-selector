(function($) {
  
  $(document).ready(function(){

    $(document).on("click",".fa-icons-list li",function(){
      $(".fa-icons-list li").removeClass("active");
      $(this).addClass("active");
    });

    $(document).on("click",".icon-insert-button", function(){
      var $activeIcon = $(".fa-icons-list li.active span");
      var icon_class = $activeIcon.attr('class');
      var icon_size = $activeIcon.attr('data-size');

      if(icon_class) $("#icon-input").val(icon_class+" "+icon_size);
      $("#iconModal").modal('hide');
    });
  });

})(jQuery);