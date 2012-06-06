$(function() {

  var Note = Backbone.Model.extend({

    defaults: {
      content: 'Edit your text here',
      title: 'New Note',
      created_at: new Date().toString('dd/MM/yy HH:mm:ss'),
      starred: false
    },

    toggleAsFavorite: function() {
      if( this.get('starred') ) {
        this.set('starred', false)
      } else {
        this.set('starred', true)
      }
    }
  });

  var NoteView = Backbone.View.extend({
    tagName: 'article',
    className: 'note-view span4',

    initialize: function(){
      this.model.on('change', this.render, this);
    },

    template: _.template("\
      <div> \
        <h2><%= title %></h2> \
        <input value='<%= title %>' /> \
        <span><%= created_at %></span> \
        <p><%= content %></p> \
        <textarea><%= content %></textarea> \
        <div class='actions'> \
          <a href='#' class='favorite'><% starred ? print('Un-favorite') : print('Favorite') %></a> \
          <a href='#' class='save'>Save</a> \
          <a href='#' class='delete'>Delete</a> \
        </div> \
      </div>"),

    events: {
      'click .favorite': 'toggleAsFavorite',
      'dblclick h2': 'editTitle',
      'dblclick p': 'editContent',
      'keypress input': 'updateTitle',
      'keypress textarea': 'updateContent'
    },

    render: function(){
      var attr = this.model.toJSON();
      this.$el.html(this.template(attr));
      return this;
    },

    updateTitle: function(e) {
      if (e.keyCode == 13) {
        value = this.$el.find('input').val();
        this.model.set('title', value);
      }
    },

    updateContent: function(e) {
      if (e.keyCode == 13) {
        value = this.$el.find('textarea').val();
        this.model.set('content', value);
      }
    },

    editTitle: function() {
      this.$el.find('h2').hide();
      this.$el.find('input').show();
    },

    editContent: function() {
      this.$el.find('p').hide();
      this.$el.find('textarea').show();
    },

    toggleAsFavorite: function() {
      this.model.toggleAsFavorite();
      this.model.get('starred') ? this.$el.addClass('favorited') : this.$el.removeClass('favorited');
      return false;
    }
  });

  window.note = new Note({ title: 'Learning Backbone' });
  
  window.noteView = new NoteView({ model: note });

  $('#app').html(window.noteView.render().el);

});