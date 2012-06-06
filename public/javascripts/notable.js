$(function() {

  window.Note = Backbone.Model.extend({
    defaults: {
      content: 'notes to be rendered',
      created_at: new Date()
    }
  });

  window.NoteView = Backbone.View.extend({
    tagName: 'article',
    className: 'note-view',

    template: _.template("<h2><%= title %></h2><span><%= created_at.toString('dd/MM/yy HH:mm:ss') %></span><p><%= content %></p>"),

    render: function(){
      var attr = this.model.toJSON();
      this.$el.html(this.template(attr));
      return this;
    }
  });

  window.note = new Note({ title: 'Learning Backbone' });
  
  window.noteView = new NoteView({ model: note });

  $('#app').html(window.noteView.render().el);

});