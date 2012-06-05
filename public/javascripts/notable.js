(function($) {

  var Note = Backbone.Model.extend({});

  var NoteView = Backbone.View.extend({
    className: 'note-view',

    template: _.template("<h2><%= title %></h2>"),

    render: function(){
      var attr = this.model.toJSON();
      this.$el.html(this.template(attr));
    }
  });

  window.note = new Note({ title: 'Learning Backbone', created_at: new Date() });
  window.noteView = new NoteView({ model: note });

})(jQuery);