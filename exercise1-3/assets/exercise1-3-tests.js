import { BACKGROUND, RECT, TestResults, advanceToFrame, checkBackgroundIsCalledInDraw, coloursMatch, getShapes, globalVariableExists, runMouseClick, testClassIsDefined, testClassMethodIsDefined, testExpectedClassConstructorArgs, testExpectedClassMethodArgs, testSettingIsCalled } from "../../lib/test-utils.js";

/**
 * A hacky solution to wait for p5js to load the canvas. Include in all exercise test files.
 */
function waitForP5() {
    const canvases = document.getElementsByTagName("canvas");
    if (canvases.length > 0) {
        clearInterval(loadTimer);
        runTests(canvases[0]);
    }
}

function testInstanceOfButton() {
    try {
        if (testExpectedClassConstructorArgs(Button, 5)) {
            let shapes = getShapes();
            let btnBg = shapes.filter(s => s.type === RECT);
            if (globalVariableExists("counter")) {
                if (counter === 0) {
                    TestResults.addPass("The global variable <code>counter</code> is initially set to 0.");
                } else {
                    TestResults.addFail(`Expected the global variable <code>counter</code> to be initially set to 0. It is set to ${counter}.`);
                }
            } else {
                TestResults.addFail("The global variable <code>counter</code> has not been created.");
            }
            if (btnBg.length !== 1) {
                TestResults.addWarning(`Expected one rectangle (the button background) but found ${btnBg.length}. Unable to run tests on the button's hover state or the click counter.`);
            } else {
                mouseX = -5;
                mouseY = -5;
                advanceToFrame(frameCount + 1);
                if (coloursMatch(color(0), btnBg[0].fillColour)) {
                    TestResults.addPass("When the mouse is not over the button, its fill colour is black.");
                } else {
                    TestResults.addFail(`When the mouse is not over the button, its fill colour should be black. Found (${red(btnBg[0].fillColour)}, ${green(btnBg[0].fillColour)}, ${blue(btnBg[0].fillColour)}).`);
                }
                mouseX = random(btnBg[0].x, btnBg[0].x + btnBg[0].w);
                mouseY = random(btnBg[0].y, btnBg[0].y + btnBg[0].h);
                advanceToFrame(frameCount + 1);
                shapes = getShapes();
                btnBg = shapes.filter(s => s.type === RECT);
                if (coloursMatch(color(0, 0, 255), btnBg[btnBg.length - 1].fillColour)) {
                    TestResults.addPass("When the mouse is not over the button, its fill colour is blue.");
                } else {
                    TestResults.addFail(`When the mouse is not over the button, its fill colour should be blue (0, 0, 255). Found (${red(btnBg[btnBg.length - 1].fillColour)}, ${green(btnBg[btnBg.length - 1].fillColour)}, ${blue(btnBg[btnBg.length - 1].fillColour)}).`);
                }
                mouseIsPressed = true;
                runMouseClick();
                advanceToFrame(frameCount + 1);
                if (globalVariableExists("counter")) {
                    if (counter === 1) {
                        TestResults.addPass("When the button is first clicked, <code>counter</code> is incremented.");
                    } else {
                        TestResults.addFail(`When the button is first clicked, <code>counter</code> should be incremented. Expected its value to be 1, found ${counter}.`);
                    }
                    // Check it's not incremented when clicked outside
                    mouseX = btnBg[0].x - 10;
                    advanceToFrame(frameCount + 1);
                    mouseIsPressed = true;
                    let lastCounter = counter;
                    runMouseClick();
                    advanceToFrame(frameCount + 1);
                    if (counter === lastCounter) {
                        TestResults.addPass("When the mouse is clicked outside the button, <code>counter</code> is not incremented.");
                    } else {
                        TestResults.addFail(`When the mouse is clicked outside the button, <code>counter</code> should not be incremented. <code>counter</code>'s value change by ${counter - lastCounter}.`);
                    }
                }
                // Add button and check the click method
            }
            const testButton = new Button(0, 0, 200, 50, "Test");
            mouseX = 10;
            mouseY = 10;
            mouseIsPressed = false;
            if (testButton.clicked() === false) {
                TestResults.addPass("The Button <code>clicked()</code> method returns false when the mouse is over the button but not pressed.");
            } else {
                TestResults.addFail(`Expected the Button <code>clicked</code> method to return false when the mouse is over the button but not pressed. The method returned ${testButton.clicked()}`);
            }
            mouseIsPressed = true;
            if (testButton.clicked() === true) {
                TestResults.addPass("The Button <code>clicked()</code> method returns true when the mouse is pressed over the button.");
            } else {
                TestResults.addFail(`Expected the Button <code>clicked</code> method to return false when the mouse is pressed over the button. The method returned ${testButton.clicked()}`);
            }
        } else {
            TestResults.addFail(`The Button class should take 5 arguments as provided in the starter code.`);
        }
    } catch (e) {
        console.log(e);
        TestResults.addFail("Unable to run tests on the Button class. This may mean you have a syntax error or something unexpected has happened. Ask for help.")
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    checkBackgroundIsCalledInDraw();
    if (testClassIsDefined("Button")) {
        TestResults.addPass("The class Button has been defined.")
        testInstanceOfButton();
        if (window.hasOwnProperty("mouseClicked") && ! window.hasOwnProperty("mousePressed")) {
            TestResults.addWarning("You have implemented the <code>mouseClicked</code> event function. This may not be the best choice, assuming the <code>Button</code> <code>clicked()</code> method is implemented as expected. You will need a different mouse event method!");
        }
    } else {
        TestResults.addFail("The sketch does not contain a class called Button or, it may contain a class called Button but it does not have a constructor. If you do have a Button class with a constructor, check your console for errors.");
    }
    
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
