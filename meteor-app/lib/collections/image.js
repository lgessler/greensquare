Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

//If we're on the server publish the collection, otherwise we are on the client and we should subscribe to the publication.
if(Meteor.isServer){

    Meteor.publish('images', function () {
        /*Uncomment this and comment out returning the cursor to see publication issue*/

        // var self = this;

        // var handle = Images.find().observe({
        //     added: function (document) {
        //         self.added('images', document._id, document);
        //     },
        //     changed: function (document) {
        //         self.changed('images', document._id, document);
        //     },
        //     removed: function (document) {
        //         self.removed('images', document._id);
        //     }
        // });

        // self.onStop(function () {
        //     handle.stop();
        // });

        /*Comment this out and Uncomment manual publishing to see publication issue*/

        return Images.find();

    });

}else{
    Meteor.subscribe('images');
}

//Meteor.subscribe("Images");