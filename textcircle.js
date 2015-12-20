this.Documents = new Mongo.Collection("documents");

if (Meteor.isClient) {

  Template.editor.helpers({
    docid: function() {
      var doc = Documents.findOne();
      if (doc) {
        return doc._id;
      } else {
        return undefined;
      }
    },
    config: function(editor) {
      return function (editor) {
        editor.on('change', function(cm_editor, info) {
          $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
          console.log(cm_editor.getValue());
        });
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Documents.findOne()) { // no documents yet
      Documents.insert({title: "my new document"});
    }
  });
}
