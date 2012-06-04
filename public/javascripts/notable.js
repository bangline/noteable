(function($) {

  var Note = Backbone.Model.extend({});

  window.note = new Note({ title: 'Learning Backbone', created_at: new Date() });

})(jQuery);