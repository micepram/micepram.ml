# Call Option Trading Algorithm - JavaScript Implementation

## 📝 Problem Description

This solution implements an optimal trading strategy for call options that maximizes profit given perfect price predictions.

### Trading Rules
- **Buy Option (BO)**: Purchase a call option at current price for $1 premium
- **Exercise (EX)**: Exercise all active options for profit = sum(current - strike) - count(options)
- **Hold (H)**: Do nothing this minute

### Constraints
- Start with no options
- All options expire at the last predicted price
- Must exercise by the final minute
- Can only buy or hold if you have no options
- pred[i] > 0
- pred.length ≤ 200,000

## 🚀 Quick Start

### Running in Node.js

```bash
# Run the main example
node callOption.js

# Run comprehensive tests
node test.js
```

### Running in Browser

Open `index.html` in your web browser for an interactive demo with visualization.

## 💡 Algorithm Explanation

### Key Insight
The optimal strategy can be determined with preprocessing:

1. **Preprocess**: Calculate the maximum future price from each position onwards
2. **Decision Logic** at each step:
   - **Exercise** if: You have options AND (current price is the max OR it's the last minute)
   - **Buy** if: No options AND max future price > current price + $1 (covers premium)
   - **Hold** otherwise

### Complexity
- **Time Complexity**: O(n) - Single pass for preprocessing + single pass for decisions
- **Space Complexity**: O(n) - For the maxFromHere array

## 📊 Example Walkthrough

### Input: `[6, 7, 9, 6, 9, 9]`

**Step-by-step execution:**

1. **Minute 1** (Price: $6)
   - Max future: $9
   - Decision: BUY (9 > 6 + 1)
   - Active options: 1 (strike: $6)

2. **Minute 2** (Price: $7)
   - Max future: $9
   - Have options, but price will go higher
   - Decision: BUY (9 > 7 + 1)
   - Active options: 2 (strikes: $6, $7)

3. **Minute 3** (Price: $9)
   - Max future: $9
   - Current price = max future
   - Decision: EXERCISE
   - Profit: (9-6-1) + (9-7-1) = 2 + 1 = $3
   - Active options: 0

4. **Minute 4** (Price: $6)
   - Max future: $9
   - Decision: BUY (9 > 6 + 1)
   - Active options: 1 (strike: $6)

5. **Minute 5** (Price: $9)
   - Max future: $9
   - Current price = max future
   - Decision: EXERCISE
   - Profit: 9-6-1 = $2
   - Active options: 0

6. **Minute 6** (Price: $9)
   - Last minute, no options
   - Decision: HOLD

**Total Profit: $5**

## 🧪 Test Cases

The solution passes all test cases including:

- ✅ Simple increasing prices
- ✅ Multiple exercise cycles
- ✅ Flat prices (no profit opportunity)
- ✅ Decreasing prices (no profit opportunity)
- ✅ Mixed patterns with local maxima
- ✅ Edge cases (single element, two elements)
- ✅ Large datasets (up to 200,000 elements)

## 📁 Files

- **`callOption.js`** - Main implementation with the `trader()` function
- **`test.js`** - Comprehensive test suite with 10+ test cases
- **`index.html`** - Interactive browser demo with visualization
- **`README.md`** - This documentation file

## 🔧 API Reference

### `trader(pred)`

Main function that calculates optimal trading actions.

**Parameters:**
- `pred` (Array<number>): Array of predicted stock prices

**Returns:**
- Array<string>: Array of trading actions ("BO", "EX", or "H")

**Example:**
```javascript
const { trader } = require('./callOption.js');

const prices = [6, 7, 9];
const actions = trader(prices);
console.log(actions); // ["BO", "BO", "EX"]
```

### `printTrader(pred)`

Prints trading actions to console (one per line).

**Parameters:**
- `pred` (Array<number>): Array of predicted stock prices

**Example:**
```javascript
const { printTrader } = require('./callOption.js');

printTrader([6, 7, 9]);
// Output:
// BO
// BO
// EX
```

## 🌐 Interactive Demo

The included `index.html` file provides:
- Visual interface for entering price predictions
- Real-time calculation of optimal actions
- Profit calculation and statistics
- Step-by-step breakdown table
- Quick example buttons
- Beautiful, responsive design

**Features:**
- Input validation
- Profit tracking
- Action counts (buy/exercise/hold)
- Minute-by-minute breakdown
- Color-coded action badges

## 📈 Performance

The algorithm efficiently handles large datasets:
- Processes 200,000 elements in milliseconds
- O(n) time complexity ensures scalability
- No redundant computations
- Optimal space usage

## 🎯 Use Cases

This algorithm demonstrates:
- Dynamic programming principles
- Preprocessing optimization techniques
- Greedy algorithm with lookahead
- Financial trading strategy optimization
- Real-time decision making with perfect information

## 📄 License

This implementation is part of the portfolio project at [micepram.github.io](https://micepram.github.io)

---

**Built with ❤️ for algorithmic trading education**
