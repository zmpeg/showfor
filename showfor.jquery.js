$.fn.showfor = function(parent, config) {
    
    // set defaults
    if(typeof(config)=="undefined") config = {};
    if(typeof(config.hideChild)=="undefined") config.hideChild = false;
    if(typeof(config.disableChild)=="undefined") config.disableChild = true;
    
    // Clone the child to keep a original list of all the elements.
    childClone = $(this).clone();
    
    // If the hideChild config is set, then remove the child options until a parent is chosen.
    if(config.hideChild) $(this).find("option[value!='']").remove();
    
    // If the disableChild config is set, then disable the child select.
    if(config.disableChild) $(this).attr('disabled', true);
    
    /* Add a handler for parent.
     *   child is the dependent select.
     *   config is the supplied options for this showfor instance.
     *   originalClone is a clone of the child element with all the options enabled.
     */
    $(parent).change((function(child, config, originalClone) {
        return function() {
            
            // enable child if using disabled
            if(config.disableChild) $(child).removeAttr('disabled');
            
            // hide all child options
            $(child).find("option[value!='']").remove();
            
            // Show available child options
            // only include the .show-for-### filter if the parent has a selected value.
            if(this.value == "")
                $(originalClone).find("option[value!='']").clone().appendTo(child);
            else
                $(originalClone).find("option[value!=''].show-for-"+this.value).clone().appendTo(child);
            
            // set child to blank option.
            $(child).val("");
            
            // trigger change on child.
            $(child).trigger("change");
            
            // disable element if parent is blank and using disabled.
            if(config.disableChild && this.value == "") $(child).attr("disabled", true);
        }
    })(this, config, childClone));
    
}
