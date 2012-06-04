(function($) {

  var Note = Backbone.Model.extend({});
  var NoteView = Backbone.View.extend({
    render: function(){
      var html = '<h2>' + this.model.get('title') + '</h2>';
      $(this.el).html(html);
    }
  });

  window.note = new Note({ title: 'Learning Backbone', created_at: new Date() });
  window.noteView = new NoteView({ model: note });

})(jQuery);