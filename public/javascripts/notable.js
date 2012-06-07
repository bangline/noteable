$(function() {

  var Note = Backbone.Model.extend({
    defaults: {
      content: 'Edit your text here',
      title: 'New Note',
      created_at: 'not saved yet',
      starred: false
    },

    toggleAsFavorite: function() {
      if( this.get('starred') ) {
        this.set('starred', false)
      } else {
        this.set('starred', true)
      }
      this.save();
    },

    clear: function() {
      this.destroy();
    }
  });

  var NoteView = Backbone.View.extend({
    model: Note,
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
          <a href='#' class='delete'>Delete</a> \
        </div> \
      </div>"),

    events: {
      'click .favorite': 'toggleAsFavorite',
      'click .delete': 'removeNote',
      'dblclick h2': 'editTitle',
      'dblclick p': 'editContent',
      'keypress input': 'updateTitle',
      'keypress textarea': 'updateContent'
    },

    render: function(){
      var attr = this.model.toJSON();
      this.$el.html(this.template(attr));
      this.model.get('starred') ? this.$el.addClass('favorited') : this.$el.removeClass('favorited');
      return this;
    },

    updateTitle: function(e) {
      if (e.keyCode == 13) {
        value = this.$el.find('input').val();
        this.model.save({'title':value});
      }
    },

    updateContent: function(e) {
      if (e.keyCode == 13) {
        value = this.$el.find('textarea').val();
        this.model.save({'content':value});
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
      return false;
    }, 

    removeNote: function() {
      this.$el.remove();
      this.model.clear();
    }
  });

  var NoteList = Backbone.Collection.extend({ 
    model: Note,
    url: '/notes',

    comparator: function(note) {
      return note.get('starred');
    }
  });

  var Notes = new NoteList();

  var AppView = Backbone.View.extend({
    el: '#app',
    collection: Notes,

    initialize: function() {
      this.collection.on('add', this.addOne, this);
      this.collection.on('reset', this.addAll, this);
      this.collection.on('remove', this.removeOne, this);
      this.collection.fetch();
    },

    events: {
      'click a#add-note': 'startNote',
      'click a.delete': 'removeOne'
    },

    startNote: function() {
      note = new Note();
      this.collection.add(note);
    },

    addOne: function(note) {
      var view = new NoteView({model: note});
      this.$el.prepend(view.render().el);
    },

    removeOne: function(note) {
      this.collection.remove(note);
    },

    addAll: function() {
      this.collection.each(this.addOne, this);
    }

  });

  window.app = new AppView();
});