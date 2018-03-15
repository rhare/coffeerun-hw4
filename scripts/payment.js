(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-payment="form"]';
  var $ = window.jQuery;
  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var paymentHandler = function (payment) {
    var $dialog = $('<div></div>');
    var modalText = 'Thank you for your payment, ' + payment.title + ' ' + payment.username + '';
    var $msg = $('<p></p>').text(modalText);
    $dialog.append($msg);
    $dialog.modal();
  };
  formHandler.addSubmitHandler(paymentHandler);
})(window);

