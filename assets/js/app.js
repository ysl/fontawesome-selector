(function($) {


  $(document).ready(function(){

    $(document).on("click",".icon_section",function(){
      $(".icon_section").removeClass("selected");
      $(this).addClass("selected");
    });

    $(document).on("click",".icon-insert-button", function(){
      var icon_class = $(".icon_section.selected i").attr('class');
      var select_val = $('#icon_size').val();

      $("#icon-input").val(icon_class + " " + select_val);

      // console.log($("#icon-input"))
      $("#myModal").modal('hide');
    });


  });



})(jQuery);