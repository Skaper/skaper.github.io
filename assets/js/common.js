$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    // Show TOC only after initialization to prevent flickering
    $myNav.addClass("initialized");
    $("body").scrollspy({
      target: navSelector,
      offset: 70
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });

  // email icon: a bare mailto: silently does nothing when no mail client is
  // registered, so also copy the address to the clipboard and say so.
  // The href stays percent-encoded (jekyll-email-protect) and is decoded here,
  // so the address is still not sitting in the markup as plain text.
  $("a.email-link").on("click", function () {
    const address = decodeURIComponent($(this).attr("href").replace(/^mailto:/, ""));

    const notify = function (message) {
      $(".email-toast").remove();
      const $toast = $('<div class="email-toast" role="status"></div>').text(message);
      $("body").append($toast);
      // let the element land in the DOM before transitioning it in
      window.requestAnimationFrame(function () {
        $toast.addClass("visible");
      });
      window.setTimeout(function () {
        $toast.removeClass("visible");
        window.setTimeout(function () {
          $toast.remove();
        }, 300);
      }, 2600);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(address).then(
        function () {
          notify(address + " copied to clipboard");
        },
        function () {
          notify(address);
        }
      );
    } else {
      notify(address);
    }
    // no preventDefault: mail clients that are registered still open normally
  });
});
