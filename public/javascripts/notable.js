$(function() {

  var Note = Backbone.Model.extend({});

  var NoteView = Backbone.View.extend({
    tagName: 'article',
    className: 'note-view',

    template: _.template("<h2><%= title %></h2>"),

    render: function(){
      var attr = this.model.toJSON();
      this.$el.html(this.template(attr));
      return this;
    }
  });

  window.note = new Note({ title: 'Learning Backbone', created_at: new Date() });
  
  window.noteView = new NoteView({ model: note });
  $('#app').html(window.noteView.render().el);

});