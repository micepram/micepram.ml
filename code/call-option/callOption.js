/**
 * Call Option Trading Algorithm
 * 
 * Determines the optimal trading strategy for call options to maximize profit
 * given perfect price predictions.
 * 
 * @param {number[]} pred - Array of predicted stock prices
 * @returns {string[]} - Array of trading actions ("BO", "EX", or "H")
 */
function trader(pred) {
    const n = pred.length;
    if (n === 0) return [];
    
    // Preprocess: Calculate max price from each position to the end
    const maxFromHere = new Array(n);
    maxFromHere[n - 1] = pred[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        maxFromHere[i] = Math.max(pred[i], maxFromHere[i + 1]);
    }
    
    const result = [];
    let activeOptions = 0;
    let totalStrike = 0;  // Sum of strike prices of active options
    
    for (let i = 0; i < n; i++) {
        const currentPrice = pred[i];
        const maxFuturePrice = maxFromHere[i];
        
        // Check if we should exercise
        if (activeOptions > 0) {
            // Calculate profit if we exercise now
            const profitNow = activeOptions * currentPrice - totalStrike - activeOptions;
            
            // Exercise if:
            // 1. This is the last minute (must exercise), OR
            // 2. Current price is at the maximum (won't go higher)
            if (i === n - 1 || currentPrice === maxFuturePrice) {
                result.push("EX");
                activeOptions = 0;
                totalStrike = 0;
                continue;
            }
        }
        
        // Check if we should buy
        // Buy if the max future price exceeds current price by more than premium ($1)
        if (i < n - 1 && maxFuturePrice > currentPrice + 1) {
            result.push("BO");
            activeOptions++;
            totalStrike += currentPrice;
        } else {
            result.push("H");
        }
    }
    
    return result;
}

/**
 * Prints the trading actions to console
 * @param {number[]} pred - Array of predicted stock prices
 */
function printTrader(pred) {
    const actions = trader(pred);
    actions.forEach(action => console.log(action));
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { trader, printTrader };
}

// Test examples
if (typeof require !== 'undefined' && require.main === module) {
    console.log("Example 1: [6, 7, 9]");
    printTrader([6, 7, 9]);
    
    console.log("\nExample 2: [6, 7, 9, 6, 9, 9]");
    printTrader([6, 7, 9, 6, 9, 9]);
    
    console.log("\nExample 3: [5, 5, 5]");
    printTrader([5, 5, 5]);
    
    console.log("\nExample 4: [10, 8, 6, 4]");
    printTrader([10, 8, 6, 4]);
    
    console.log("\nExample 5: [1, 10, 2, 11, 3]");
    printTrader([1, 10, 2, 11, 3]);
}
