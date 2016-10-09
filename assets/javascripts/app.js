import $ from 'jquery';
window.$ = $;

(function() {
  const hoge = 'fugo2';
  $(function() {
    $('body').append(hoge);
  });
})();
