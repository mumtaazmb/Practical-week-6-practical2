import { BACKGROUND, TestResults, advanceToFrame, getShapes, runMouseClick, testClassIsDefined, testClassMethodIsDefined, testExpectedClassConstructorArgs, testExpectedClassMethodArgs, testSettingIsCalled } from "../../lib/test-utils.js";

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

function testInstanceOfCoordinate() {
    let testCoord;
    try {
        if (testExpectedClassConstructorArgs(Coordinate, 2)) {
            TestResults.addPass("The Coordinate class constructor takes two arguments.");
            testCoord = new Coordinate(100, 300);
            let xProp, yProp;
            for (const prop of Object.getOwnPropertyNames(testCoord)) {
                if (testCoord[prop] === 100) {
                    xProp = prop;
                } else if (testCoord[prop] === 300) {
                    yProp = prop;
                }
            }
            if (xProp) {
                TestResults.addPass("The Coordinate class has a property that stores the value of the x coordinate passed to the constructor.");
            } else {
                TestResults.addFail("The Coordinate class does not have a property that stores the value of the x coordinate passed to the constructor.");
            }
            if (yProp) {
                TestResults.addPass("The Coordinate class has a property that stores the value of the y coordinate passed to the constructor.");
            } else {
                TestResults.addFail("The Star class does not have a property that stores the value of the y coordinate passed to the constructor.");
            }
            if (xProp && yProp) {
                let currX = testCoord[xProp];
                let currY = testCoord[yProp];
                if (testClassMethodIsDefined(Coordinate, "isInBounds")) {
                    TestResults.addPass("The Coordinate class has a method called <code>isInBounds</code>.");
                    if (testExpectedClassMethodArgs(Coordinate, "isInBounds", 4)) {
                        TestResults.addPass("The <code>isInBounds</code> method has four parameters.");
                        let onCanvas = testCoord.isInBounds(0, 0, 400, 400);
                        if (onCanvas) {
                            TestResults.addPass(`When the Coordinate is at ${currX}, ${currY}, <code>.isInBounds(0, 0, 400, 400)</code> returns true.`);
                        } else {
                            TestResults.addFail(`When the Coordinate is at ${currX}, ${currY}, <code>.isInBounds(0, 0, 400, 400)</code> should return true. The method returned ${onCanvas}.`);
                        }
                        let out = testCoord.isInBounds(200, 100, 100, 100);
                        if (out) {
                            TestResults.addFail(`When the Coordinate is at ${currX}, ${currY}, <code>.isInBounds(200, 100, 100, 100)</code> should return false. The method returned ${out}.`)
                        } else {
                            TestResults.addPass(`When the Coordinate is at ${currX}, ${currY}, <code>.isInBounds(200, 100, 100, 100)</code> returns false.`);
                        }
                    } else {
                        TestResults.addFail(`The <code>isInBounds()</code> method should have four parameters. Found ${Coordinate.prototype.isInBounds.length}.`)
                    }
                } else {
                    TestResults.addFail("The Coordinate class does not have a method called <code>isInBounds</code>.");
                }
            }
        } else {
            TestResults.addFail(`The Coordinate class should take 2 arguments (one for the x coordinate and one for the y coordinate). ${Coorindate.length} arguments were found.`);
        }
    } catch (e) {
        console.log(e);
        TestResults.addFail("Unable to run tests on the Coordinate class. This may mean you have a syntax error or something unexpected has happened. Ask for help.")
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    if (testClassIsDefined("Coordinate")) {
        TestResults.addPass("The class Coordinate has been defined.")
        testInstanceOfCoordinate();
    } else {
        TestResults.addFail("The sketch does not contain a class called Coordinate or, it may contain a class called Coordinate but it does not have a constructor.");
    }
    if (testSettingIsCalled(BACKGROUND, false, true, false)) {
        TestResults.addWarning("<code>background()</code> should not be called in <code>draw()</code> for this exercise unless the ellipses are saved to a global array.");
    }
    const shapes1 = [...getShapes()];
    mouseX = 100;
    mouseY = 100;
    runMouseClick();
    advanceToFrame(frameCount + 1);
    const shapes2 = [...getShapes()];
    if (shapes2.length === shapes1.length + 1) {
        TestResults.addPass("When the mouse is clicked at 100, 100, a new shape is added to the canvas.");
    } else {
        TestResults.addFail(`When the mouse is clicked at 100, 100, a new ellipse should be drawn on the canvas. Before the click, there were ${shapes1.length} shapes on the canvas, after the click there are ${shapes2.length} shapes.`);
    }
    mouseX = -5;
    mouseY = 100;
    runMouseClick();
    advanceToFrame(frameCount + 1);
    const shapes3 = [...getShapes()];
    if (shapes3.length === shapes2.length) {
        TestResults.addPass("When the mouse is clicked outside the canvas at -5, 100, the number of shapes on the canvas is unchanged.");
    } else {
        TestResults.addFail(`When the mouse is clicked outside the canvas at -5, 100, the number of shapes should not change. The number of shapes before the click was ${shapes2.length}. The number of shapes after the click was ${shapes3.length}.`);
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
