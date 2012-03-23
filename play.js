// Generates full page screenshots

var page = new WebPage();

// check params
if (phantom.args.length != 4) {
    console.log('Check your params.');
    phantom.exit();   
}

// get params
var address = phantom.args[0];
var outputFolder = phantom.args[1];
var from = parseInt(phantom.args[2]);
var to = parseInt(phantom.args[3]);

// control size
var width = from;
var i = 1;

// open page
page.viewportSize = { width: width, height: 1 };
page.clipRect = { top: 0, left: 0, width: to, height: to * 75 / 100 };

page.open(address, function (status) {
    if (status !== 'success') {
        console.log('Unable to load the address!');
    } else {
        console.log('Page opened: ' + address);

        page.evaluate(function() {
            document.body.bgColor = 'white';
        });

        window.setTimeout(function () {

            // render current size
            console.log('Rendering at ' + width +  ' width.');
            page.render(outputFolder + '/img' + ("" + (i + 10000)).substring(1) + '.png');
            
            // resize to next size
            width += 1;
            i += 1;
            page.viewportSize = { width: width, height: 1 };

            if (width <= to) {
                setTimeout(arguments.callee, 1);
            } else {
                phantom.exit();
            }
        }, 2000);
    }
});
