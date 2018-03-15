(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;
  }
  RemoteDataStore.prototype.add = function (key, val, cb) {
    // Code will go here
    $.post(this.serverUrl, val, function (serverResponse) {
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    $.get(this.serverUrl + '/' + key, function (serverResponse) {
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.removeByEmail = function (email, cb) {
    $.get(this.serverUrl, function (serverResponse) {
      serverResponse.forEach(function(order) {
        if(order.emailAddress == email) {
          this.remove(order.id);
        }
      }.bind(this));
      // Do call back after removing by email
      cb(serverResponse);
    }.bind(this));
  };

  RemoteDataStore.prototype.getAll = function (cb) {
    $.get(this.serverUrl, function (serverResponse) {
      serverResponse.forEach(cb);
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    $.ajax(this.serverUrl + '/' + key, {
      type: 'DELETE'
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
