Template.spacePhoto.helpers({
    getImg: function() {
        var strBase = "/open-space-";
        var randInt = Math.floor((Math.random() * 5) + 1);
        console.log(randInt);
        var strAdd = toString(randInt);
        var strReturn = strBase.concat();
        //console.log(strBase);
        console.log(strAdd);
        //console.log(strReturn);
        return strReturn;
    }
});

