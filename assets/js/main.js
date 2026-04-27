// BigBoyzBaits — small client-side touches
// Keep this lightweight. No frameworks, no trackers.

// ---------------------------------------------------------------------------
// Visitor counter
// Cosmetic — backed by localStorage so it persists per-browser. A real
// site-wide counter would need a backend. The fun is in the animation.
// ---------------------------------------------------------------------------
(function visitorCounter() {
  var el = document.querySelector('[data-visitor-counter]');
  if (!el) return;

  // Always shows 000069 on load. Clicking rerolls to a random number.
  el.textContent = '000069';

  // ---- click easter egg ----
  var quips = [
    'Drag keeps or loses fish!',
    'Fake the Forage!',
    'Spincasters work great!',
    'Baitfish live in weeds!',
    'Transition areas?',
    'Seen any good structure?',
    'Working the weedline produces.',
    'Stained water = dark colors.',
    'Fishing the wind?',
    'Cold front killed the bite.',
    'Kill it on the fall.',
    'Twitch, Pause, Twitch, Twitch, Pause-',
    'Birds = bait = fish.',
    'Mud lines ambush bait.'
  ];
  var quipEl = document.querySelector('[data-quip]');
  var quipTimer;

  var spinTimer;

  el.addEventListener('click', function () {
    el.classList.remove('counter-pop');
    // force reflow so the animation can replay
    void el.offsetWidth;
    el.classList.add('counter-pop');

    // Reroll the LED to a random 6-digit number with a brief spin.
    clearInterval(spinTimer);
    var ticks = 0;
    var maxTicks = 8;
    spinTimer = setInterval(function () {
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(spinTimer);
        var finalN = Math.floor(Math.random() * 1000000);
        el.textContent = String(finalN).padStart(6, '0');
      } else {
        var r = Math.floor(Math.random() * 1000000);
        el.textContent = String(r).padStart(6, '0');
      }
    }, 55);

    if (quipEl) {
      var pick = quips[Math.floor(Math.random() * quips.length)];
      quipEl.textContent = pick;
      quipEl.classList.add('show');
      clearTimeout(quipTimer);
      quipTimer = setTimeout(function () {
        quipEl.classList.remove('show');
      }, 1800);
    }
  });
})();

// ---------------------------------------------------------------------------
// Mark current nav link
// ---------------------------------------------------------------------------
(function markCurrentNav() {
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();
