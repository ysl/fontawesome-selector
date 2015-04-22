(function($) {
  
  $(document).ready(function(){

    $(document).on("click",".fa-icons-list li",function(){
      $(".fa-icons-list li").removeClass("selected");
      $(this).addClass("selected");
    });

    $(document).on("click",".icon-insert-button", function(){
      var $selectedIcon = $(".fa-icons-list li.selected span");
      var icon_class = $selectedIcon.attr('class');
      var icon_size = $selectedIcon.attr('data-size');

      if(icon_class) $("#icon-input").val(icon_class+" "+icon_size);
      $("#iconModal").modal('hide');
    });
  });

})(jQuery);