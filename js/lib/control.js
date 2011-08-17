define(['jquery'], function(){
    return {
        //generic method for mapping fields to be controlled
        //options.populate and options.twoWayBinding can be used to disable these features where neccessary
        mapFields: function(object, html, fields, options){
            options = options || {};
            //assume DOM is to be populated from the model, unless specified otherwise
            var populate = options.populate !== false;
            //assume databinding is wanted unless specified otherwise
            var twoWayBinding = options.twoWayBinding !== false;
            //default databinding event is change
            var updateModelEvent = options.updateModelEvent || 'change';
            
            //add this.element variable to the object
            object.element = $(html);

            //create a generic setter method that updates both the model and the DOM
            //knows how to handle different elements, allowing either text or html where appropriate
            //the set method can be overriden for any field, using the overrideSetter method
            //TODO add support for more types of DOM elements
            object.set = function(field, value, insertAsHTML){
                //if override specified call that instead
                if(object.customSetters && object.customSetters[field]){
//                    console.log('setting custom setter now');
                    object[object.customSetters[field]](value);
                    return;
                }
                var domElement = this[field];
                //update the DOM
                if(domElement.is('input')){
                    domElement.val(value);
                }
                else{
                    if(insertAsHTML){
                        domElement.html(value);
                    }
                    else{
                        domElement.text(value);
                    }
                }
                //update the model
                object.model[field] = value;

                //update the parent model if provided
                if(options.parentModel){
                    options.parentModel[options.fieldMap[field]] = value;
                }
            };

            //loop through all the fields passed in
            for (var i = 0, length = fields.length, field; i < length; i +=1) {
                field = fields[i];
                //create a variable pointing to the matching DOM element
                object[field] = object.element.find('[data-field='+field+']').removeAttr('data-field');

                //populate the fields with values from the model while we're at it
                if(populate){
                    object.set(field, object.model[field]);
                }

                if(twoWayBinding){
                    //setup binding so that if the DOM changes, the model changes also
                    if(object[field].is('input, textarea, select')){
//                        object[field].change({field: field}, $.proxy(function(event){
                        object[field].bind(updateModelEvent, {field: field}, $.proxy(function(event){
                            //update the model
                            var field = event.data.field;
                            object.model[field] = object[field].val();
                        }, object));
                    }
                }
            }
        },
        mapWidget : function(object, field, widget){
            //create new field
            object[field] = widget;
            //replace html placeholder with the widget's html
            var el = object.element.find('[data-field='+field+']').removeAttr('data-field');
            el.replaceWith(widget.element);

            // TODO when widget's model changes, update user's model (just primitives)
//            object.model[field] = "spammy";
        },

        overrideSetter: function(object, field, setterFunc){
            if(!object.customSetters){
                object.customSetters = {};
            }
            object.customSetters[field] = setterFunc;
        }
    };
});


