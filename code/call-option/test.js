const { trader } = require('./callOption.js');

/**
 * Test suite for the call option trading algorithm
 */

const testCases = [
    {
        name: "Example 1: Simple increasing prices",
        input: [6, 7, 9],
        expected: ["BO", "BO", "EX"]
    },
    {
        name: "Example 2: Multiple exercise cycles",
        input: [6, 7, 9, 6, 9, 9],
        expected: ["BO", "BO", "EX", "BO", "EX", "H"]
    },
    {
        name: "Flat prices - no profit opportunity",
        input: [5, 5, 5],
        expected: ["H", "H", "H"]
    },
    {
        name: "Decreasing prices - no profit opportunity",
        input: [10, 8, 6, 4],
        expected: ["H", "H", "H", "H"]
    },
    {
        name: "Mixed pattern with local maxima",
        input: [1, 10, 2, 11, 3],
        expected: ["BO", "H", "BO", "EX", "H"]
    },
    {
        name: "Single element - must hold",
        input: [5],
        expected: ["H"]
    },
    {
        name: "Two elements - profitable",
        input: [5, 8],
        expected: ["BO", "EX"]
    },
    {
        name: "Two elements - not profitable (6-5=1, doesn't cover premium)",
        input: [5, 6],
        expected: ["H", "H"]
    },
    {
        name: "Continuous increase",
        input: [5, 10, 15],
        expected: ["BO", "BO", "EX"]
    },
    {
        name: "Large profit opportunity",
        input: [1, 2, 3, 20],
        expected: ["BO", "BO", "BO", "EX"]
    }
];

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function runTests() {
    console.log("Running Call Option Trading Algorithm Tests");
    console.log("=".repeat(60));
    
    let passed = 0;
    let failed = 0;
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: ${testCase.name}`);
        console.log(`Input:    [${testCase.input.join(", ")}]`);
        console.log(`Expected: [${testCase.expected.join(", ")}]`);
        
        const actual = trader(testCase.input);
        console.log(`Actual:   [${actual.join(", ")}]`);
        
        if (arraysEqual(actual, testCase.expected)) {
            console.log("✓ PASSED");
            passed++;
        } else {
            console.log("✗ FAILED");
            failed++;
        }
    });
    
    console.log("\n" + "=".repeat(60));
    console.log(`Test Results: ${passed} passed, ${failed} failed`);
    console.log("=".repeat(60));
    
    if (failed === 0) {
        console.log("All tests passed! ✓");
    }
    
    return failed === 0;
}

// Run tests if this is the main module
if (require.main === module) {
    const success = runTests();
    process.exit(success ? 0 : 1);
}

module.exports = { runTests };
