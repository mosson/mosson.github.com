(function() {

  jQuery(function() {
    $.fn.layerModal = function(options) {
      var opts;
      opts = $.extend({}, $.fn.layerModal.defaults, options);
      return this.each(function() {
        var $b, $t, $this, o;
        $this = $(this);
        if ($.meta) {
          o = $.extend({}, opts, $this.data());
        } else {
          o = opts;
        }
        $b = $($this.data("blur-target"));
        $t = $($this.data("modal-target"));
        if (!($t.size() && $b.size())) {
          raise("necessities not found");
        }
        $b.addClass("layer-modal-blur");
        $t.addClass("layer-modal-modal");
        $this.on("click", function(e) {
          e.preventDefault();
          return $("body").addClass("layer-modal-state");
        });
        $t.on("click", "[data-dismiss=close]", function(e) {
          e.preventDefault();
          return $("body").removeClass("layer-modal-state");
        });
        return $t.on("click", function(e) {
          if ($(e.currentTarget).get(0) === $(e.target).get(0)) {
            e.preventDefault();
            return $("body").removeClass("layer-modal-state");
          }
        });
      });
    };
    return $.fn.layerModal.defaults = {};
  });

}).call(this);
