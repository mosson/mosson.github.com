(function() {

  jQuery(function() {
    $.fn.expander = function(options) {
      var opts;
      opts = $.extend({}, $.fn.expander.defaults, options);
      return this.each(function() {
        var $t, $this, clip, diminish, expand, getTransitionType, init, o, transitionType;
        $this = $(this);
        $t = $($this.attr("href"));
        if (!$t.size()) {
          $t = $($this.data("target"));
        }
        if (!$t.size()) {
          raise("target is not found");
        }
        getTransitionType = function(element) {
          var p, properties;
          properties = ['transition', 'WebkitTransition', 'msTransition', 'MozTransition', 'OTransition'];
          p = "";
          while ((p = properties.shift())) {
            if (typeof element.style[p] !== 'undefined') {
              return p;
            }
          }
          return false;
        };
        transitionType = getTransitionType($t.get(0));
        $t.get(0).style[transitionType] = "all 0.4s ease-in-out";
        $t.addClass("jquery-expander-container");
        if ($.meta) {
          o = $.extend({}, opts, $this.data());
        } else {
          o = opts;
        }
        diminish = function() {
          var h, ofs, st, w;
          ofs = $this.offset();
          st = $(window).scrollTop();
          w = $this.width();
          h = $this.height();
          return {
            top: (ofs.top - st) + "px",
            right: (ofs.left + w) + "px",
            bottom: (ofs.top - st + h) + "px",
            left: ofs.left + "px"
          };
        };
        expand = function() {
          return {
            top: 0 + "px",
            right: $(window).width() + "px",
            bottom: $(window).height() + "px",
            left: 0 + "px"
          };
        };
        clip = function(visibility) {
          var geom;
          if (visibility == null) {
            visibility = false;
          }
          geom = visibility ? expand() : diminish();
          return $t.css({
            clip: "rect(" + geom.top + " " + geom.right + " " + geom.bottom + " " + geom.left + ")",
            visibility: visibility ? "visible" : "hidden",
            zIndex: visibility ? "10000" : "-1"
          });
        };
        init = function() {
          var close, open;
          clip(false);
          open = function(e) {
            if (e != null) {
              e.preventDefault();
            }
            $t.get(0).style[transitionType] = "none";
            clip(false);
            return setTimeout(function() {
              $t.get(0).style[transitionType] = "all 0.4s ease-in-out";
              return clip(true);
            }, 1);
          };
          close = function(e) {
            if (e != null) {
              e.preventDefault();
            }
            return clip(false);
          };
          $this.on("click", open);
          return $t.on("click", "[data-dismiss*=close]", close);
        };
        return init();
      });
    };
    return $(".expander").expander();
  });

}).call(this);
