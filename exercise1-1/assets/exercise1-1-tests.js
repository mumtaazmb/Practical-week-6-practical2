import { TestResults, canvasStatus, checkBackgroundIsCalledInDraw, checkCanvasSize, getFunctionContents, getShapes, testClassIsDefined, testClassMethodIsDefined, testExpectedClassConstructorArgs, testExpectedClassMethodArgs } from "../../lib/test-utils.js";

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

function testInstanceOfStar() {
    let testStar;
    try {
        if (testExpectedClassConstructorArgs(Star, 2)) {
            TestResults.addPass("The Star class constructor takes two arguments.");
            testStar = new Star(100, 300);
            let xProp, yProp;
            for (const prop of Object.getOwnPropertyNames(testStar)) {
                if (testStar[prop] === 100) {
                    xProp = prop;
                } else if (testStar[prop] === 300) {
                    yProp = prop;
                }
            }
            if (xProp) {
                TestResults.addPass("The Star class has a property that stores the value of the x coordinate passed to the constructor.");
            } else {
                TestResults.addFail("The Star class does not have a property that stores the value of the x coordinate passed to the constructor.");
            }
            if (yProp) {
                TestResults.addPass("The Star class has a property that stores the value of the y coordinate passed to the constructor.");
            } else {
                TestResults.addFail("The Star class does not have a property that stores the value of the y coordinate passed to the constructor.");
            }
            if (xProp && yProp) {
                let currX = testStar[xProp];
                let currY = testStar[yProp];
                if (testClassMethodIsDefined(Star, "fall")) {
                    TestResults.addPass("The Star class has a method called <code>fall</code>.");
                    if (testExpectedClassMethodArgs(Star, "fall", 1)) {
                        TestResults.addPass("The <code>fall</code> method has one parameter.");
                        testStar.fall(4);
                        if (testStar[yProp] === currY + 4 && testStar[xProp] === currX) {
                            TestResults.addPass("The <code>fall</code> method works as expected.");
                        } else {
                            TestResults.addFail(`The <code>fall<code> method did not work as expected. When the method is called, the star's y coordinate should increase by the amount specified in the argument and the x coordinate should stay the same. The y coordinate changed by ${testStar[yProp] - currY} and the x coordinate changed by ${testStar[xProp] - currX}.`);
                        }
                        currX = testStar[xProp];
                        currY = testStar[yProp];
                    } else {
                        TestResults.addFail(`The <code>fall</code> method should have one parameter. Found ${Star.prototype.fall.length}.`)
                    }
                } else {
                    TestResults.addFail("The Star class does not have a method called <code>fall</code>.");
                }
                if (testClassMethodIsDefined(Star, "shoot")) {
                    TestResults.addPass("The Star class has a method called <code>shoot</code>.");
                    if (testExpectedClassMethodArgs(Star, "shoot", 1)) {
                        TestResults.addPass("The <code>shoot</code> method has one parameter.");
                        testStar.shoot(3);
                        if (testStar[yProp] === currY && testStar[xProp] === currX + 3) {
                            TestResults.addPass("The <code>shoot</code> method works as expected.");
                        } else {
                            TestResults.addFail(`The <code>shoot<code> method did not work as expected. When the method is called, the star's x coordinate should increase by the amount specified in the argument and the y coordinate should stay the same. The x coordinate changed by ${testStar[xProp] - currY} and the x coordinate changed by ${testStar[yProp] - currY}.`);
                        }
                        currX = testStar[xProp];
                        currY = testStar[yProp];
                    } else {
                        TestResults.addFail(`The <code>shoot</code> method should have one parameter. Found ${Star.prototype.shoot.length}.`)
                    }
                } else {
                    TestResults.addFail("The Star class does not have a method called <code>shoot</code>.");
                }
            }
        } else {
            TestResults.addFail(`The Star class should take 2 arguments (one for the x coordinate and one for the y coordinate). ${Star.length} arguments were found.`);
        }
    } catch (e) {
        console.log(e);
        TestResults.addFail("Unable to run tests on the Star class. This may mean you have a syntax error or something unexpected has happened. Ask for help.")
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    if (testClassIsDefined("Star")) {
        TestResults.addPass("The class Star has been defined.")
        testInstanceOfStar();
    } else {
        TestResults.addFail("The sketch either does not contain a class called Star or, it may contain a class called Star but it does not have a constructor. Another potential cause of this problem is errors that make your sketch crash. Check the console.");
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
