$.fn.showfor = function(parent, hideChild, useDisabled) {
    
    // set defaults
    if(typeof(hideChild)=="undefined") hideChild = false;
    if(typeof(useDisabled)=="undefined") useDisabled = true;
    
    if(hideChild) $(this).find("option[value!='']").hide();
    
    // disable child select if option is set.
    if(useDisabled) $(this).attr('disabled', true);
    
    // add handler for parent.
    $(parent).change((function(child, useDisabled) {
        return function() {
            
            // enable child if using disabled
            if(useDisabled) $(child).removeAttr('disabled');
            
            // hide all child options
            $(child).find("option[value!='']").hide();
            
            // show available child options
            $(child).find("option[value!=''].show-for-"+this.value).show();
            
            // set child to blank option.
            $(child).val("");
            
            // trigger change on child.
            $(child).trigger("change");
            
            // disable element if parent is blank and using disabled.
            if(useDisabled && this.value == "") $(child).attr("disabled", true);
        }
    })(this, useDisabled));
    
}