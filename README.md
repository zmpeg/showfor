showfor
-------

+ [Download][dl]
+ [Website][web]

[dl]: https://github.com/zmpeg/showfor/tarball/master
[web]: http://mjz.me/showfor/

### Introduction ###

Showfor is a tool for making on select box depend on another select box.
You can narrow the number of options in the child select based on the
parents value. Simply give the child options a class with the id of the
parent like this: .show-for-#### where #### is the value of the parent
for which that option should display. Showfor will always show options
with no value.

### Usage ###

To start showfor simply call it using jquery: $("#child").showfor("#parent");
Showfor accepts a few options as a second argument like this:

    $("#child").showfor("#parent, {
        hideChild: true/false,    // hides child options until the parent has a value
        disableChild: true/false, // disables child until parent has a value.
    });