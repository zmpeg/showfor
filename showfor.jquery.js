$.fn.showfor = function(parent, hideChild, useDisabled) {
    
    // set defaults
    if(typeof(hideChild)=="undefined") hideChild = false;
    if(typeof(useDisabled)=="undefined") useDisabled = true;
    
    // Clone the child to keep a list of all the elements.
    childClone = $(this).clone();
    
    // If the hide child config is set remove the child options until a parent is chosen.
    if(hideChild) $(this).find("option[value!='']").remove();
    
    // Disable the child select if the config is specified.
    if(useDisabled) $(this).attr('disabled', true);
    
    /* Add a handler for parent.
     *   child is the dependent select.
     *   useDisabled is the option.
     *   originalClone is a clone of the child element with all the options enabled.
     */
    $(parent).change((function(child, useDisabled, originalClone) {
        return function() {
            
            // enable child if using disabled
            if(useDisabled) $(child).removeAttr('disabled');
            
            // hide all child options
            $(child).find("option[value!='']").remove();
            
            // show available child options
            $(originalClone).find("option[value!=''].show-for-"+this.value).appendTo(child);
            
            // set child to blank option.
            $(child).val("");
            
            // trigger change on child.
            $(child).trigger("change");
            
            // disable element if parent is blank and using disabled.
            if(useDisabled && this.value == "") $(child).attr("disabled", true);
        }
    })(this, useDisabled, childClone));
    
}
