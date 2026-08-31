/* ===========================================================================
   Ridgeline Lawn & Landscape - site.js
   Vanilla, no dependencies, loaded with `defer`.

   Everything here is progressive enhancement. With JS disabled you still get:
   full navigation (the drawer falls back to a normal list), the "after"
   photo in each before/after pair, the whole gallery unfiltered, the reviews
   as a horizontally scrollable list, native <details> FAQ accordions, and
   forms that submit straight to the server handler.
=========================================================================== */
(function () {
  'use strict';

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- header */
  (function stickyHeader() {
    var header = $('[data-header]');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ------------------------------------------------------------------- nav */
  (function mobileNav() {
    var burger = $('[data-burger]');
    var nav = $('#primary-nav');
    if (!burger || !nav) return;

    function setOpen(open) {
      burger.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      if (open) {
        var first = nav.querySelector('a, button');
        if (first) first.focus();
      }
    }

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        burger.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (burger.getAttribute('aria-expanded') !== 'true') return;
      if (nav.contains(e.target) || burger.contains(e.target)) return;
      setOpen(false);
    });

    /* Submenu disclosure buttons (mobile only; desktop uses hover/focus CSS) */
    $$('.nav__toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        btn.setAttribute('aria-expanded', String(!open));
        if (panel) panel.classList.toggle('is-open', !open);
      });
    });

    /* Close the drawer when the viewport grows past the breakpoint. */
    var mq = window.matchMedia('(min-width: 1024px)');
    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  })();

  /* -------------------------------------------------------- before / after */
  (function beforeAfter() {
    $$('[data-ba]').forEach(function (root) {
      var range  = $('[data-ba-range]', root);
      var frame  = $('.ba__frame', root);
      if (!range || !frame) return;

      function apply(v) {
        var pct = Math.max(0, Math.min(100, Number(v)));
        root.style.setProperty('--pos', pct + '%');
      }
      apply(range.value);
      range.addEventListener('input', function () { apply(range.value); });

      /* Pointer drag on the image itself, driving the same input so the
         accessible value and the visual state never diverge. */
      var dragging = false;
      function fromPointer(clientX) {
        var r = frame.getBoundingClientRect();
        var pct = ((clientX - r.left) / r.width) * 100;
        pct = Math.max(0, Math.min(100, pct));
        range.value = String(Math.round(pct));
        apply(pct);
      }
      frame.addEventListener('pointerdown', function (e) {
        dragging = true;
        frame.setPointerCapture(e.pointerId);
        fromPointer(e.clientX);
      });
      frame.addEventListener('pointermove', function (e) {
        if (dragging) fromPointer(e.clientX);
      });
      ['pointerup', 'pointercancel'].forEach(function (evt) {
        frame.addEventListener(evt, function (e) {
          dragging = false;
          if (frame.hasPointerCapture && frame.hasPointerCapture(e.pointerId)) {
            frame.releasePointerCapture(e.pointerId);
          }
        });
      });
    });

    /* Tabs between the three transformations. */
    var tablist = $('[data-ba-tabs]');
    if (!tablist) return;
    var tabs = $$('.ba__tab', tablist);

    function select(i) {
      tabs.forEach(function (tab, idx) {
        var on = idx === i;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) {
          panel.hidden = !on;
          panel.classList.toggle('is-active', on);
        }
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft')  next = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End')  next = tabs.length - 1;
        if (next === null) return;
        e.preventDefault();
        select(next);
        tabs[next].focus();
      });
    });
  })();

  /* ------------------------------------------------- gallery filter + box */
  (function galleryModule() {
    var grid = $('[data-gallery]');
    if (!grid) return;

    var items = $$('.gitem', grid);
    var buttons = $$('[data-filter]');
    var count = $('[data-filter-count]');
    var empty = $('[data-gallery-empty]');
    var visible = items.slice();

    function applyFilter(cat) {
      visible = [];
      items.forEach(function (li) {
        var match = cat === 'all' || li.getAttribute('data-category') === cat;
        li.hidden = !match;
        if (match) visible.push(li);
      });
      buttons.forEach(function (b) {
        var on = b.getAttribute('data-filter') === cat;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      if (empty) empty.hidden = visible.length > 0;
      if (count) {
        var label = buttons.filter(function (b) { return b.getAttribute('data-filter') === cat; })[0];
        count.textContent = visible.length + ' project' + (visible.length === 1 ? '' : 's') +
          (cat === 'all' ? '' : ' in ' + (label ? label.textContent : cat));
      }
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () { applyFilter(b.getAttribute('data-filter')); });
    });
    applyFilter('all');

    /* -- Lightbox -- */
    var box = $('[data-lightbox-root]');
    if (!box) return;
    var boxImg   = $('[data-lightbox-img]', box);
    var boxTitle = $('[data-lightbox-title]', box);
    var boxCity  = $('[data-lightbox-city]', box);
    var boxBlurb = $('[data-lightbox-blurb]', box);
    var prevBtn  = $('[data-lightbox-prev]', box);
    var nextBtn  = $('[data-lightbox-next]', box);
    var current = 0;
    var lastFocus = null;

    function triggerFor(li) { return li.querySelector('.gitem__btn'); }

    /* Read the rendered <img> rather than guessing a file extension, so this
       works whether the build emitted a real photo or an SVG placeholder. */
    function srcFor(btn) {
      var im = btn.querySelector('img');
      return im ? (im.currentSrc || im.src) : '';
    }

    function show(i) {
      if (!visible.length) return;
      current = (i + visible.length) % visible.length;
      var btn = triggerFor(visible[current]);
      if (!btn) return;
      boxImg.src = srcFor(btn);
      boxImg.alt = btn.getAttribute('data-alt') || '';
      boxTitle.textContent = btn.getAttribute('data-title') || '';
      boxCity.textContent  = btn.getAttribute('data-city') || '';
      boxBlurb.textContent = btn.getAttribute('data-blurb') || '';
      var multi = visible.length > 1;
      prevBtn.hidden = !multi;
      nextBtn.hidden = !multi;
    }

    function open(li) {
      lastFocus = document.activeElement;
      show(visible.indexOf(li));
      box.hidden = false;
      document.body.classList.add('lightbox-open');
      $('.lightbox__close', box).focus();
    }

    function close() {
      box.hidden = true;
      document.body.classList.remove('lightbox-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    items.forEach(function (li) {
      var btn = triggerFor(li);
      if (btn) btn.addEventListener('click', function () { open(li); });
    });

    $$('[data-lightbox-close]', box).forEach(function (el) {
      el.addEventListener('click', close);
    });
    prevBtn.addEventListener('click', function () { show(current - 1); });
    nextBtn.addEventListener('click', function () { show(current + 1); });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape')     { e.preventDefault(); close(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); show(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
      if (e.key === 'Tab') {
        /* Keep focus inside the dialog while it is open. */
        var focusables = $$('button, [href], input, select, textarea', box)
          .filter(function (el) { return !el.hidden && el.offsetParent !== null; });
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  })();

  /* ------------------------------------------------------ reviews carousel */
  (function carousel() {
    $$('[data-carousel]').forEach(function (root) {
      var track = $('[data-carousel-track]', root);
      var prev  = $('[data-carousel-prev]', root);
      var next  = $('[data-carousel-next]', root);
      if (!track || !prev || !next) return;

      function step() {
        var card = track.firstElementChild;
        if (!card) return track.clientWidth;
        var gap = parseFloat(getComputedStyle(track).columnGap || '16') || 16;
        return card.getBoundingClientRect().width + gap;
      }
      function scrollBy(dir) {
        track.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      function sync() {
        var max = track.scrollWidth - track.clientWidth - 2;
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= max;
      }
      prev.addEventListener('click', function () { scrollBy(-1); });
      next.addEventListener('click', function () { scrollBy(1); });
      track.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      sync();
    });
  })();

  /* ------------------------------------------------- package CTA prefill */
  (function packagePrefill() {
    var select = $('[data-package-select]');
    $$('[data-package]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!select) return;
        var slug = btn.getAttribute('data-package');
        var opts = Array.prototype.slice.call(select.options);
        /* Match on the option text, which carries the package name. */
        var wanted = btn.closest('.pkg') ? $('.pkg__name', btn.closest('.pkg')) : null;
        var name = wanted ? wanted.textContent.trim() : '';
        var hit = opts.filter(function (o) { return o.value === name; })[0];
        if (hit) select.value = hit.value;
        else if (slug) {
          var loose = opts.filter(function (o) {
            return o.value.toLowerCase().indexOf(slug.split('-')[0]) === 0;
          })[0];
          if (loose) select.value = loose.value;
        }
      });
    });
  })();

  /* ------------------------------------------------- record the page URL */
  $$('[data-page-field]').forEach(function (input) {
    input.value = window.location.pathname + window.location.search;
  });

  /* ----------------------------------------------------- photo upload UI */
  (function uploads() {
    $$('[data-upload]').forEach(function (root) {
      var input = root.querySelector('input[type="file"]');
      var zone  = $('[data-upload-zone]', root);
      var list  = $('[data-upload-list]', root);
      var err   = $('[data-upload-err]', root);
      if (!input || !zone || !list) return;

      var maxMb    = Number(input.getAttribute('data-max-mb')) || 10;
      var maxFiles = Number(input.getAttribute('data-max-files')) || 8;

      function human(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
      }

      function render() {
        var files = Array.prototype.slice.call(input.files || []);
        list.innerHTML = '';
        var problems = [];

        if (files.length > maxFiles) {
          problems.push('That is ' + files.length + ' files. The limit is ' + maxFiles + '. Send your best few and we can always ask for more.');
        }

        files.forEach(function (f) {
          var over = f.size > maxMb * 1024 * 1024;
          if (over) problems.push('"' + f.name + '" is ' + human(f.size) + ', over the ' + maxMb + ' MB limit.');
          var li = document.createElement('li');
          var nameEl = document.createElement('span');
          nameEl.textContent = f.name;
          if (over) nameEl.className = 'bad';
          var sizeEl = document.createElement('span');
          sizeEl.className = 'size' + (over ? ' bad' : '');
          sizeEl.textContent = human(f.size);
          li.appendChild(nameEl);
          li.appendChild(sizeEl);
          list.appendChild(li);
        });

        if (err) {
          err.hidden = problems.length === 0;
          err.textContent = problems.join(' ');
        }
        if (files.length) {
          var cta = $('.upload__cta', zone);
          if (cta) {
            cta.innerHTML = '<strong>' + files.length + ' photo' + (files.length === 1 ? '' : 's') +
              ' attached.</strong> Tap to change.';
          }
        }
        return problems.length === 0;
      }

      input.addEventListener('change', render);

      ['dragenter', 'dragover'].forEach(function (evt) {
        zone.addEventListener(evt, function (e) { e.preventDefault(); zone.classList.add('is-drag'); });
      });
      ['dragleave', 'drop'].forEach(function (evt) {
        zone.addEventListener(evt, function (e) { e.preventDefault(); zone.classList.remove('is-drag'); });
      });
      zone.addEventListener('drop', function (e) {
        if (!e.dataTransfer || !e.dataTransfer.files || !e.dataTransfer.files.length) return;
        try {
          input.files = e.dataTransfer.files;
          render();
        } catch (_) { /* Safari < 14.1 blocks assignment; the picker still works. */ }
      });

      root._validate = render;
    });
  })();

  /* -------------------------------------------------- form validation ---
     Client-side validation is a courtesy, not a control. The PHP handler
     validates everything again on the server, because anything sent from a
     browser can be forged.
  ----------------------------------------------------------------------- */
  (function forms() {
    /* -- Photo compression -------------------------------------------------
       A Vercel function rejects a request body over 4.5 MB, and a single
       modern phone photo is 3 to 5 MB. Eight of them is nowhere close to
       fitting, so the browser resizes to 1600px on the long edge and
       re-encodes as JPEG before anything is sent.

       That is still far more detail than anyone needs to price a yard, and
       it turns roughly 40 MB of originals into roughly 2 to 3 MB.

       HEIC is the known gap: Chrome and Firefox cannot decode it into a
       canvas, so those files resolve to null and the visitor is told which
       ones were skipped rather than being left to guess. iOS normally hands
       over JPEG through a file input, so this is uncommon in practice.
    --------------------------------------------------------------------- */
    var MAX_EDGE = 1600;
    var JPEG_QUALITY = 0.82;
    var MAX_TOTAL_BYTES = 3.6 * 1024 * 1024;   // headroom under the 4.5 MB cap

    function isImage(file) {
      return !!file && String(file.type || "").indexOf("image/") === 0;
    }

    function compressImage(file) {
      return new Promise(function (resolve) {
        if (!isImage(file)) return resolve(null);
        var url = URL.createObjectURL(file);
        var im = new Image();
        im.onload = function () {
          var w = im.naturalWidth || 0, h = im.naturalHeight || 0;
          if (!w || !h) { URL.revokeObjectURL(url); return resolve(null); }
          var scale = Math.min(1, MAX_EDGE / Math.max(w, h));
          var canvas = document.createElement("canvas");
          canvas.width = Math.round(w * scale);
          canvas.height = Math.round(h * scale);
          canvas.getContext("2d").drawImage(im, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(url);
          canvas.toBlob(function (blob) {
            if (!blob) return resolve(null);
            var reader = new FileReader();
            reader.onload = function () {
              var parts = String(reader.result).split(",");
              resolve(parts.length > 1
                ? { name: file.name, type: "image/jpeg", dataBase64: parts[1] }
                : null);
            };
            reader.onerror = function () { resolve(null); };
            reader.readAsDataURL(blob);
          }, "image/jpeg", JPEG_QUALITY);
        };
        im.onerror = function () { URL.revokeObjectURL(url); resolve(null); };
        im.src = url;
      });
    }

    function collect(form) {
      var payload = {};
      new FormData(form).forEach(function (value, key) {
        if (key === "photos[]") return;            // handled separately
        if (key.slice(-2) === "[]") {
          if (!payload[key]) payload[key] = [];
          payload[key].push(value);
        } else {
          payload[key] = value;
        }
      });
      return payload;
    }

    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function digits(s) { return (s || '').replace(/\D/g, ''); }

    function setError(field, message) {
      var input = field.querySelector('input, select, textarea');
      var slot = field.querySelector('[data-err]');
      if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (slot) {
        slot.textContent = message || '';
        slot.hidden = !message;
      }
      return !message;
    }

    function validateField(input) {
      var field = input.closest('.field');
      if (!field) return true;
      var v = (input.value || '').trim();

      if (input.required && !v) return setError(field, 'This one is required.');
      if (input.type === 'email' && v && !EMAIL.test(v)) return setError(field, 'That email does not look right.');
      if (input.type === 'tel' && v && digits(v).length < 10) return setError(field, 'Please include the area code.');
      return setError(field, '');
    }

    $$('form[data-estimate-form], form[data-reserve-form]').forEach(function (form) {
      var status = $('[data-form-status]', form);
      var inputs = $$('input, select, textarea', form).filter(function (el) {
        return el.type !== 'hidden' && el.type !== 'file' && el.name !== 'website';
      });

      inputs.forEach(function (input) {
        input.addEventListener('blur', function () { validateField(input); });
        input.addEventListener('input', function () {
          if (input.getAttribute('aria-invalid') === 'true') validateField(input);
        });
      });

      form.addEventListener('submit', function (e) {
        var ok = true;
        var firstBad = null;

        inputs.forEach(function (input) {
          if (!validateField(input) && !firstBad) { firstBad = input; ok = false; }
          else if (!validateField(input)) ok = false;
        });

        var consent = form.querySelector('input[name="consent"]');
        if (consent && consent.required && !consent.checked) {
          ok = false;
          if (!firstBad) firstBad = consent;
        }

        var uploadRoot = $('[data-upload]', form);
        if (uploadRoot && typeof uploadRoot._validate === 'function') {
          if (!uploadRoot._validate()) {
            ok = false;
            if (!firstBad) firstBad = uploadRoot.querySelector('input[type="file"]');
          }
        }

        if (!ok) {
          e.preventDefault();
          if (status) {
            status.className = 'form__status is-error';
            status.textContent = 'Almost there. Check the highlighted fields above.';
          }
          if (firstBad) {
            firstBad.focus();
            firstBad.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
          }
          return;
        }

        /* Valid. Take over the submit so the photos can be compressed and
           the whole thing posted as JSON, which the Vercel function parses
           natively. A native multipart post would not be parsed there. */
        e.preventDefault();

        var btn = form.querySelector("button[type=submit]") || form.querySelector("button");
        var originalLabel = btn ? btn.textContent : "";
        if (btn) { btn.disabled = true; btn.textContent = "Sending..."; }
        if (status) {
          status.className = "form__status";
          status.textContent = "Sending...";
        }

        (async function () {
          var payload = collect(form);
          var skipped = 0, dropped = 0;

          var fileInput = form.querySelector("input[type=file]");
          if (fileInput && fileInput.files && fileInput.files.length) {
            if (status) status.textContent = "Preparing photos...";
            var files = Array.prototype.slice.call(fileInput.files, 0, 8);
            var photos = [], total = 0;
            for (var i = 0; i < files.length; i++) {
              var shot = await compressImage(files[i]);
              if (!shot) { skipped++; continue; }
              var bytes = Math.floor(shot.dataBase64.length * 0.75);
              if (total + bytes > MAX_TOTAL_BYTES) { dropped++; continue; }
              total += bytes;
              photos.push(shot);
            }
            payload.photos = photos;
          }

          if (status) status.textContent = "Sending...";

          var result = null;
          try {
            var res = await fetch(form.getAttribute("action"), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });
            try { result = await res.json(); } catch (_) { result = null; }
            if (!res.ok) {
              throw new Error(
                (result && (result.error || (result.errors && result.errors.join(" ")))) ||
                "That did not send. Please call us instead."
              );
            }
          } catch (err) {
            if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
            if (status) {
              status.className = "form__status is-error";
              status.textContent = (err && err.message) || "That did not send. Please call us instead.";
            }
            return;
          }

          var notes = [];
          if (skipped) notes.push(skipped + " photo" + (skipped === 1 ? " was" : "s were") + " skipped because this browser could not read the format.");
          if (dropped) notes.push(dropped + " photo" + (dropped === 1 ? " was" : "s were") + " left off to stay under the size limit.");
          if (notes.length && status) {
            status.className = "form__status";
            status.textContent = "Sent. " + notes.join(" ");
          }

          window.location.href = (result && result.redirect) || "/thank-you/";
        })();
      });
    });
  })();

  /* ----------------------------------------- smooth in-page anchor focus */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    /* Move focus so keyboard and screen reader users land where the click went. */
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.replaceState(null, '', '#' + id);
  });

})();
