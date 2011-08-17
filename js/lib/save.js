define(['jquery'], function() {
    //functional mixin. Assumes that this will be applied to an object with a model property.
    //TODO: needs tests
    function makeSaveable(options) {

        this.save = function(successCallback, errorCallback) {
            //serialize object and send to the specified URL
            $.ajax({
                type: 'POST',
                data: JSON.stringify(this.model),
                url: options.url,
//                contentType: "application/json; charset=utf-8",
                success: function(response) {
                    if(typeof successCallback === 'function'){
                        successCallback(response);
                    }
                },
                error: function(response) {
                    if(typeof errorCallback === 'function'){
                        errorCallback(response);
                    }
                }
            });
        };
    }

    return makeSaveable;
});