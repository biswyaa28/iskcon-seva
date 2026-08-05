/* Science of Krishna — first-party behaviour.
 *
 * Progressive enhancement only: every feature here is additive, and the site
 * remains fully readable with JavaScript disabled. Loaded with `defer`, so the
 * DOM is parsed before this runs.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Library topic filter.
   * Hides cards whose data-topic does not match the active button.
   * ------------------------------------------------------------------ */
  function initTopicFilter() {
    var bar = document.querySelector('.sok-filter');
    if (!bar) return;

    var cards = Array.prototype.slice.call(document.querySelectorAll('.sok-card'));
    if (!cards.length) return;

    bar.addEventListener('click', function (event) {
      var button = event.target.closest('.sok-filter__btn');
      if (!button) return;

      var topic = button.dataset.topic;

      bar.querySelectorAll('.sok-filter__btn').forEach(function (other) {
        var active = other === button;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });

      cards.forEach(function (card) {
        card.hidden = topic !== 'All' && card.dataset.topic !== topic;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTopicFilter);
  } else {
    initTopicFilter();
  }
})();
