(function () {
  "use strict";
  var BREAKPOINT = 900;

  function initDrawer() {
    var t = document.getElementById("mob-toggle");
    var d = document.getElementById("mob-drawer");
    var o = document.getElementById("mob-overlay");
    var c = document.getElementById("drawer-close");
    if (!t || !d || !o) { return; }
    function openMenu() {
      d.removeAttribute("hidden");
      o.classList.add("visible");
      t.setAttribute("aria-expanded", "true");
      t.setAttribute("aria-label", "Close navigation menu");
      document.documentElement.style.overflow = "hidden";
      var first = d.querySelector("a");
      if (first) { first.focus(); }
    }
    function closeMenu() {
      d.setAttribute("hidden", "");
      o.classList.remove("visible");
      t.setAttribute("aria-expanded", "false");
      t.setAttribute("aria-label", "Open navigation menu");
      document.documentElement.style.overflow = "";
    }
    t.addEventListener("click", function () {
      if (t.getAttribute("aria-expanded") === "true") { closeMenu(); } else { openMenu(); }
    });
    if (c) { c.addEventListener("click", closeMenu); }
    o.addEventListener("click", closeMenu);
    d.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && t.getAttribute("aria-expanded") === "true") { closeMenu(); t.focus(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= BREAKPOINT && t.getAttribute("aria-expanded") === "true") { closeMenu(); }
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-answer");
      if (!q || !a) { return; }
      q.addEventListener("click", function () {
        var open = item.classList.toggle("open");
        q.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function initDropdowns() {
    document.querySelectorAll(".has-dropdown > a").forEach(function (a) {
      a.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { a.blur(); }
      });
    });
  }

  initDrawer();
  initFaq();
  initDropdowns();
})();
