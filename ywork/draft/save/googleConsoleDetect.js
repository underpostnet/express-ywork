var element = new Image;
var devtoolsOpen = false;
element.__defineGetter__("id", function() {
    devtoolsOpen = true; // This only executes when devtools is open.
});
setInterval(function() {
    devtoolsOpen = false;
    console.log(element);
    document.getElementById('output').innerHTML += (devtoolsOpen ? "dev tools is open\n" : "dev tools is closed\n");
}, 1000);
//ADD DIV ID='output'
