// JS code here
(function() {
  const clearValue = $event =>
    ($event.target.previousElementSibling.value = '');

  // Selecting all clear-value button then attaching clear input field event listner.
  document
    .querySelectorAll('.clear-value')
    .forEach(btn => btn.addEventListener('click', clearValue));
})();
