"use strict";

var ReactComponent = require('./react_component');
var ComboItem = require('./combo_item');
var Prolog = require('../lib/proscript2/build/proscript.js');


function ComboBox()
{
    ReactComponent.call(this);
    this.setDOMNode(document.createElement("select"));
    this.domNode.onblur = blurHandler.bind(this);
    this.domNode.onchange = changeHandler.bind(this);
}

ComboBox.prototype = new ReactComponent;


ComboBox.prototype.setProperties = function(t)
{
    ReactComponent.prototype.setProperties.call(this, t);
    if (t.value !== undefined)
    {
        this.setValue(t.value);
    }
    if (t.onBlur !== undefined)
    {
        if (this.blurHandler != null)
            Prolog._free_local(this.blurHandler);
        if (ReactComponent.isNull(t.onBlur))
            this.blurHandler = null;
        else
            this.blurHandler = Prolog._make_local(t.onBlur);
    }
    if (t.disabled !== undefined)
    {
        this.domNode.disabled = ReactComponent.booleanValue(t.disabled);
    }
    if (t.onChange !== undefined)
    {
        if (this.changeHandler != null)
            Prolog._free_local(this.changeHandler);
        if (ReactComponent.isNull(t.onChange))
            this.changeHandler = null;
        else
            this.changeHandler = Prolog._make_local(t.onChange);
    }
}


function handlerCallback(success)
{
    if (success == true)
    {
    }
    else if (success == false)
    {
        console.log("Event failed");
    }
    else
    {
        console.log("Event raised: " + success.toString());
    }

}

function blurHandler(event)
{
    if (this.blurHandler != null)
    {
	console.log("Child: " + this.children[this.currentIndex].getValue());
	this.getOwnerDocument().triggerEvent(this.blurHandler, ReactComponent.serialize({value: this.children[this.currentIndex].getValue()}), handlerCallback);
    }
}

function changeHandler(event)
{
    var proposedIndex = this.domNode.selectedIndex;
    this.domNode.selectedIndex = this.currentIndex;
    if (this.changeHandler != null)
    {
	this.getOwnerDocument().triggerEvent(this.changeHandler, ReactComponent.serialize({value: this.children[proposedIndex].getValue()}), function() {});
    }
}



ComboBox.prototype.appendChild = function(t)
{
    ReactComponent.prototype.appendChild.call(this, t);
    if (t instanceof ComboItem && t.getValue() == this.value)
        this.selectCurrentIndex();
    else
        t.setSelected(false);
}

ComboBox.prototype.replaceChild = function(n, o)
{
    ReactComponent.prototype.replaceChild.call(this, n, o);
    if (n instanceof ComboItem && n.getValue() == this.value)
        this.selectCurrentIndex();
    else
        n.setSelected(false);
}

ComboBox.prototype.insertBefore = function(n, s)
{
    ReactComponent.prototype.insertBefore.call(this, n, s);
    if (n instanceof ComboItem && n.getValue() == this.value)
        this.selectCurrentIndex();
    else
        n.setSelected(false);
}

ComboBox.prototype.setValue = function(t)
{
    this.value = t;
    this.selectCurrentIndex();
}

ComboBox.prototype.selectCurrentIndex = function()
{
    for (var i = 0; i < this.children.length; i++)
    {
        if (this.children[i] instanceof ComboItem && this.children[i].getValue() == this.value)
        {
            this.currentIndex = i;
            this.children[i].setSelected(true);
            break;
        }
    }
}

module.exports = ComboBox;
