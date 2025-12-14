# Quick Start Guide

## 🚀 Getting Started in 30 Seconds

### Option 1: Browser Demo (Easiest)

1. Open `index.html` in your web browser
2. Enter comma-separated prices: `6, 7, 9, 6, 9, 9`
3. Click "Run Algorithm"
4. See results with profit calculations!

### Option 2: Command Line (Node.js)

```bash
# Run examples
node callOption.js

# Run tests
node test.js

# Or use npm
npm start    # Run examples
npm test     # Run tests
```

### Option 3: Use in Your Code

```javascript
// Import the function
const { trader } = require('./callOption.js');

// Your price predictions
const prices = [6, 7, 9, 6, 9, 9];

// Get optimal actions
const actions = trader(prices);
console.log(actions);
// Output: ["BO", "BO", "EX", "BO", "EX", "H"]
```

## 📖 Understanding the Output

- **BO** = Buy Option (invest $1 premium + current price as strike)
- **EX** = Exercise options (sell at current price, profit per option = current - strike - 1)
- **H** = Hold (do nothing this minute)

## 💡 Example

**Input:** `[6, 7, 9]`

**Output:**
```
BO   // Minute 1: Buy at $6 (strike = $6, paid $1 premium)
BO   // Minute 2: Buy at $7 (strike = $7, paid $1 premium)
EX   // Minute 3: Exercise both at $9
     // Profit = (9-6-1) + (9-7-1) = 2 + 1 = $3
```

## 🎯 Try These Examples

```javascript
trader([6, 7, 9])              // Simple profit: $3
trader([6, 7, 9, 6, 9, 9])     // Multiple cycles: $5
trader([1, 10, 2, 11, 3])      // Local maxima: $16
trader([5, 5, 5])              // No profit: all Hold
trader([10, 8, 6, 4])          // Declining: all Hold
```

## 🔧 Requirements

- **Browser**: Any modern browser (Chrome, Firefox, Safari, Edge)
- **Node.js**: Version 12+ (for command-line usage)
- **No dependencies**: Pure JavaScript, no npm packages needed!

## 📊 Visual Demo Features

The `index.html` demo includes:
- ✨ Beautiful gradient UI
- 📈 Profit calculation
- 📋 Step-by-step breakdown table
- 🎨 Color-coded action badges
- 💾 Quick example buttons
- ⚡ Real-time updates

## ❓ Quick Tips

1. **Valid Input**: Only positive numbers allowed
2. **Format**: Comma-separated values (spaces optional)
3. **Best Profit**: Algorithm finds the optimal strategy automatically
4. **Edge Cases**: Works with 1 to 200,000 prices

## 🐛 Troubleshooting

**Problem:** "All prices must be positive numbers"
- **Solution:** Make sure all prices are > 0

**Problem:** Node.js not found
- **Solution:** Install from [nodejs.org](https://nodejs.org)

**Problem:** HTML not rendering correctly
- **Solution:** Ensure you're opening `index.html` directly (not viewing source)

---

**Ready to maximize your profits?** Start with the browser demo! 🚀
