import $ from 'jquery';
window.$ = $;

(function() {
  const hoge = 'fugo';
  $(function() {
    $('body').append(hoge);
  });
})();
