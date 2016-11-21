/*global logger*/
/*
    MoonlightUI
    ========================

    @file      : MoonlightUI.js
    @version   : 1.0
    @author    : Gerhard Richard Edens
    @date      : Mon, 21 Nov 2016 16:21:02 GMT
    @copyright : MoonlightUI.com
    @license   : MIT

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "MoonlightUI/lib/moonlightui.core.min",
    "dojo/dom-class"
], function (declare, _WidgetBase, _ml, domClass) {
    "use strict";
    
    // Creating controller, module and view for this widget
    moonlightui().debug(true);
    moonlightui().config({

    });

    moonlightui().module('core').model('coreModel', function() {

        return {
            numberToUse: 0
        };

    });

    moonlightui().module('core').view('coreView', function() {

        return {
            container: '.mx-moonlightui-container',
            template: '<div data-ml-module="core">This is a moonlightui view, introducing two-way databinding with Mendix: <span data-ml-model="coreModel.numberToUse"></span></div>'
        };

    });

    moonlightui().module('core').controller('coreController', function() {

        return {
            init: function(id) {
                var view = moonlightui().getView('core', 'coreView');
                view.setContainer(id);
                view.render(function(){
                    
                    var model = moonlightui().getModel('core', 'coreModel');
                    model.init();
                    
                });
            
            }
        }

    });
    
    // Declare widget's prototype.
    return declare("MoonlightUI.widget.MoonlightUI", [ _WidgetBase ], {

        // Parameters configured in the Modeler.
        module: "",
        controller: "",
        method: "",
        
        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            logger.debug(this.id + ".constructor");
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            logger.debug(this.id + ".postCreate");

            if (this.readOnly || this.get("disabled") || this.readonly) {
              this._readOnly = true;
            }
            
            var controller = moonlightui().getController('core', 'coreController');
            controller.init("#" + this.id);
           
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            logger.debug(this.id + ".update");
            mendix.lang.nullExec(callback);
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {
            logger.debug(this.id + ".enable");
        },

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {
            logger.debug(this.id + ".disable");
        },

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {
            logger.debug(this.id + ".resize");
        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            logger.debug(this.id + ".uninitialize");
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        }

        
    });
});

require(["MoonlightUI/widget/MoonlightUI"]);
