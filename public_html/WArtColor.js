/*
 * Worcester State University 
 * CS_401 Software Developement 
 * Coloring Team: Jason Hintlian, Beto ??????
 */

// coloring scroll book image locations
var statue1 = "assets/statue1.png";
var statue2 = "assets/statue2.png";
var statue3 = "assets/statue3.png";
var blank = "assets/blank.png";

// eraser color

var colorWhite = "#FFFFFF";

//size variable

var sizeSmall = 2;
var sizeMedium = 10;
var sizeLarge = 30;

// holds the coloring page
var outlineImage = new Image();

var currentSize = sizeSmall;

var currentColor = "#000000";

//var currentState = new Red(this);
var myCanvas, layer1, context, context1;

window.onload = window.onresize = function() {





    // Get the canvas element and its drawing context 
    myCanvas = document.getElementById('drawingCanvas');

    // make sure canvas loads  
    if (!myCanvas) {
        alert('Error: I cannot find the canvas element!');
        return;
    }
    // make sure we have context handle
    if (!myCanvas.getContext) {
        alert('Error: no canvas.getContext!');
        return;
    }

    // Get the 2D canvas context.
    context = myCanvas.getContext('2d');
    if (!context) {
        alert('Error: failed to getContext!');
        return;
    }
    
        // Get the canvas element and its drawing context 
    layer1 = document.getElementById('layer1');

    // make sure canvas loads  
    if (!layer1) {
        alert('Error: I cannot find the canvas element!');
        return;
    }
    // make sure we have context handle
    if (!layer1.getContext) {
        alert('Error: no canvas.getContext!');
        return;
    }

    // Get the 2D canvas context.
    context1 = layer1.getContext('2d');
    if (!context) {
        alert('Error: failed to getContext!');
        return;
    }
    
    
    
    
    // sets the aspect ratio, divisions just for readabilaty 2:1 4:3 16:9 etc...
    var widthToHeight = 1;

    // set canvas width to 60% of the window note: canvas 
    // id in css must be set to left: 20%; to accomadate
    var canvasWidthToWindow = .6;
    
    // set canvas heigth to 60% of the window note: canvas 
    // id in css must be set to top: 5%; to accomadate
    var canvasHeightToWindow = .9;

    // gets the browser window dimensions
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    // get our canvas dimensions 
    var canvasWidth = viewportWidth * canvasWidthToWindow;
    var canvasHeight = viewportHeight * canvasHeightToWindow;
    

    /*
     * var canvasHeight = canvasWidth / widthToHeight;
     var canvasWidth = viewportWidth * canvasToWindow;
     */


    // set the the canvas dimensions
    myCanvas.setAttribute('width', canvasWidth);
    myCanvas.setAttribute('height', canvasHeight);
    layer1.setAttribute('width', canvasWidth);
    layer1.setAttribute('height', canvasHeight);

    // get handle 'c' for jqeury function soon to remove maybe
    //myCanvas.setAttribute('id', 'c');

    // set canvas background color white its magic
    context.fillStyle = '#ffffff';
    context1.fillStyle = '#ffffff';
    // fill the canvas with background color
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    //myCanvas.style.backgroundImage = defaultBackground;
    outlineImage.src = "assets/statue1.png";

    // this makes sure the image is loaded before we move on
    // else the image will not be displayed

    outlineImage.onload = function() {
        // this is how you draw an image to canvas with own 
        // dimensions 0,0, x y are coordinates
        context1.drawImage(outlineImage, 0, 0, canvasWidth, canvasHeight);
    };


    // handles all canvas events
    function eventCanvas(event) {
        event._x = event.layerX;
        event._y = event.layerY;

        // Call the event handler of the tool. note: brushes 
        // on page represent sizes not tools
        // for future implementation of more tool
        var func = tool[event.type];
        if (func) {
            func(event);
        }
    }


    function init() {

        // plans to implement a state patern to handle tol selection in the future
        // var currentState = new Small(this);

        // The pencil tool instance.


        tool = new marker();

        // Attach the mousedown, mousemove and mouseup event listeners.
        myCanvas.addEventListener('mousedown', eventCanvas, false);
        myCanvas.addEventListener('mousemove', eventCanvas, false);
        myCanvas.addEventListener('mouseup', eventCanvas, false);
    }

// state has no funtion yet for state patern to come making many change still
    var marker = function(state) {
        var tool = this;
        this.started = false;

        // This is called when you start holding down the mouse button.
        // This starts the pencil drawing.
        this.mousedown = function(event) {
            context.beginPath();
            context.moveTo(event._x, event._y);
            tool.started = true;
        };

        // This function is called every time you move the mouse. it only 
        // draws if the tool.started state is set to true .
        this.mousemove = function(event) {
            //context.drawImage(outlineImage, 0, 0, canvasWidth, canvasHeight);
            if (tool.started) {
                // try removing the '_' see what happens weird
                context.lineTo(event._x, event._y);
                context.strokeStyle = currentColor;
                context.lineWidth = currentSize;
                context.stroke();
                
                
                // 
                // I can fix this with multiple layers of canvas !!!!!
                // 
               // context.drawImage(outlineImage, 0, 0, canvasWidth, canvasHeight);

            }
        };

        // This is called when you release the mouse button.
        this.mouseup = function(event) {
            if (tool.started) {
                tool.mousemove(event);
                tool.started = false;
            }
        };
    };



    // Implementation to come

    var fillBucket = function(state) {

        var tool = this;
        this.started = false;

        // implementaion will only require the mouse down event paint fill logic to come

        this.state = state;
        this.mousedown = function(event) {
            context.beginPath();
            context.moveTo(event._x, event._y);
            tool.started = true;
        };
    };


    // this function uses jquery because I am not sure how to change the preview 
    // background without it or fade out

    $(function() {

        // create canvas and context objects
        var canvas = document.getElementById('layer2');
        var ctx = canvas.getContext('2d');

        // drawing active image
        var image = new Image();
        image.onload = function() {
            // draws the image on the canvas note: dimensions must match canvas dimensions
            ctx.drawImage(image, 0, 0, 400, 400); 
        };

        // select desired colorwheel/chart
        var imageSrc = 'assets/colorWheel.png';

        image.src = imageSrc;

        $('#layer2').mousedown(function(e) { // mouse move handler
            // get coordinates of current position
            var canvasOffset = $(canvas).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);

            // get current pixel
            var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);

            // gets the color data for the pixel
            var pixel = imageData.data;

            // stores rgb color value in pixelColor
            var pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";

            // set the background color of preview
            $('.preview').css('backgroundColor', pixelColor);

            // sets the paint color to the current color
            currentColor = pixelColor;
            
            // closes the color palette window
            $('.colorselect').fadeToggle("slow", "linear");
        });

        // this is the actual clicking of the colorchart event listener
        $('.preview').click(function(e) { // preview click
            // closes the color palette window
            $('.colorselect').fadeToggle("fast", "linear");
        });
        
        $('#layer2').mousemove(function(e) {
            // get coordinates of current position
            var canvasOffset = $(canvas).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);

            // get current pixel
            var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);

            // gets the color data for the pixel
            var pixel = imageData.data;

            // stores rgb color value in pixelColor
            var pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";

            // set the background color of preview
            $('.preview').css('backgroundColor', pixelColor);
        });
        
    });
    init();
};
// function for setting a new color
var setColor = function(color) {
    currentColor = color;
};

// function for setting a new color
var setSize = function(size) {
    currentSize = size;
};

// this function sets the coloring page its called from the coresponding html button 
var setColoringPage = function(imagePath) {
   outlineImage.src = imagePath;
   context.clearRect(0, 0, myCanvas.width, myCanvas.height);
   context1.clearRect(0, 0, myCanvas.width, myCanvas.height);
   context1.drawImage(outlineImage, 0, 0, myCanvas.width, myCanvas.height);
};


