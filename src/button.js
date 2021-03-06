"use strict";

var Constants = require('./constants.js');
var ReactComponent = require('./react_component');
var Prolog = require('proscript');

function Button()
{
    ReactComponent.call(this);
    this.setDOMNode(document.createElement("button"));
}

function clickHandler(event)
{
    this.getOwnerDocument().triggerEvent(this.clickHandler, Constants.emptyListAtom, function() {});
}


Button.prototype = new ReactComponent;

Button.prototype.setProperties = function(t)
{
   ReactComponent.prototype.setProperties.call(this, t);
    if (t.label !== undefined)
        this.domNode.textContent = Prolog._portray(t.label);
    if (t.onClick !== undefined)
        this.setClickHandler(t.onClick);
}

Button.prototype.setClickHandler = function(value)
{
    if (this.clickHandler != null)
        Prolog._free_local(this.clickHandler);
    if (ReactComponent.isNull(value))
    {
        if (this.domNode.onClick !== undefined)
            this.domNode.onClick = undefined;
        return;
    }
    this.clickHandler = Prolog._make_local(value);
    this.domNode.onclick = clickHandler.bind(this);
}

module.exports = Button;
