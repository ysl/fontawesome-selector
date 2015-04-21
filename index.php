<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/vendor/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/style.css">

    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="assets/vendor/underscorejs/underscore-min.js"></script>
    <script src="assets/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/app.js"></script>
</head>
        <body>

            <div class=" searchbox col-md-6">
              <div class="input-group">
                <input type="text" id="icon-input" class="form-control" placeholder="Icon Name ...">
                <span class="input-group-btn">
                  <button type="button"  class="btn btn-success" data-toggle="modal" data-target="#myModal"> Icon </button>
                 </span>
              </div><!-- /input-group -->
            </div><!-- /.col-lg-6 -->

              <div class="modal fade" id="myModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> -->
                        <h4 class="modal-title" id="myModalLabel">Select Your Icon</h4>
                        <input type="text" id = "txtSearchPage" class="form-control" placeholder="Search for Icon...">
                      </div>
                    <div class="modal-body clearfix">
                      
                      <div class="form-group">
                         <?php $icons = include __DIR__ . '/assets/icons/icons.php'; ?>

                         <!-- Underscoor Templating -->
                         <script type="text/javascript">
                         jQuery(function($){
                            
                          var icons = <?php echo json_encode($icons['fontawesome']);?>;
                            var template = _.template($("#icon-template").html());
                            var renderIconList = function(icons, template, query){
                                var icons = _.filter(icons, function(icon){return icon[0].indexOf(query) !== -1;});
                                var html = template({"icons": icons});
                                $(".fa-icons-list").html(html);
                            };
                            renderIconList(icons, template, "");
                            $("#txtSearchPage").on("keyup change", function(){
                                var query = $(this).val();
                                renderIconList(icons, template, query);
                            });

                         });
                         </script>

                         <script id="icon-template" type="text/template">
                            <% _.each(icons, function(icon){%>
                            <div class="icon_section">
                                <i class="fa fa-<%=icon[0]%>"></i><br>
                                <p class= "name"><%=icon[0]%> </p><br>
                            </div>
                            <% }) %>
                         </script>

                     <div class="fa-icons-list"></div>
                       
              <!-- Insert into model -->
                </div>
                  </div>
                     <div class="modal-footer">
                        <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success icon-insert-button">Insert Icon</button>
                      </div>
                    </div>
                  </div>
                </div>

</body>
</html>