# Scientific Calculator

A modern, feature-rich scientific calculator built with HTML, CSS, and JavaScript. This calculator provides both basic arithmetic operations and advanced scientific functions with a sleek, professional interface.

## Features

### Basic Operations
- **Addition (+)** - Add two numbers
- **Subtraction (-)** - Subtract two numbers  
- **Multiplication (×)** - Multiply two numbers
- **Division (÷)** - Divide two numbers
- **Decimal point (.)** - Support for decimal numbers
- **Clear (C)** - Clear current input
- **Clear Everything (CE)** - Reset calculator completely

### Scientific Functions
- **Trigonometric Functions**
  - `sin(x)` - Sine function (supports degrees/radians)
  - `cos(x)` - Cosine function (supports degrees/radians)
  - `tan(x)` - Tangent function (supports degrees/radians)

- **Logarithmic Functions**
  - `log(x)` - Base-10 logarithm

- **Power Functions**
  - `√(x)` - Square root
  - `x^y` - x raised to the power of y
  - `x^(1/y)` - y-th root of x

- **Constants**
  - `π` - Mathematical constant pi (3.14159...)

### Angle Modes
- **DEG** - Degrees mode (default)
- **RAD** - Radians mode
- Toggle between modes using the DEG/RAD buttons

## How to Use

### Basic Calculations
1. Enter the first number using the number pad
2. Press an operator button (+, -, ×, ÷)
3. Enter the second number
4. Press "=" to see the result

### Scientific Functions
1. **Single-argument functions** (sin, cos, tan, log, sqrt):
   - Press the function button first
   - Enter the number
   - Press "=" to get the result

2. **Two-argument functions** (x^y, x^(1/y)):
   - Press the function button first
   - Enter the first number (x)
   - Enter the second number (y)
   - Press "=" to get the result

3. **Constants**:
   - Press π to insert the value of pi

### Angle Mode
- Click "DEG" or "RAD" to switch between degree and radian modes
- Trigonometric functions will use the selected mode
- The current mode is displayed in the function tab

## Interface

### Dual Display System
- **Function Tab**: Shows the current operation or function being performed
- **Result Tab**: Shows only the final result of calculations

### Layout
- **Left Side**: Trigonometric functions (sin, cos, tan)
- **Top**: Constants and angle mode buttons (π, DEG, RAD)
- **Center**: Number pad and basic operators
- **Right Side**: Advanced functions (log, √, x^y, x^(1/y))

## Technical Details

### Technologies Used
- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, layout, and animations
  - CSS Grid for button layout
  - Flexbox for responsive design
  - Custom color scheme (blue and black theme)
- **JavaScript (ES6+)** - Calculator logic and interactivity
  - Event listeners for button interactions
  - Mathematical operations and error handling
  - State management for calculator operations

### Key Features
- **Function-first workflow**: Press function button before entering numbers
- **Real-time display updates**: Function tab shows current operation
- **Error handling**: Prevents invalid operations (division by zero, etc.)
- **Responsive design**: Works on different screen sizes
- **Modern UI**: Clean, professional appearance with hover effects

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## File Structure
```
calculator/
├── index.html      # Main HTML structure
├── style.css       # CSS styling and layout
├── script.js       # JavaScript calculator logic
└── README.md       # This documentation
```

## Getting Started

1. Download or clone the project files
2. Open `index.html` in your web browser
3. Start calculating!

## Future Enhancements

Potential features for future versions:
- Memory functions (M+, M-, MR, MC)
- Additional trigonometric functions (asin, acos, atan)
- Natural logarithm (ln)
- Factorial function
- Percentage calculations
- History of calculations
- Keyboard support
- Mobile-responsive design improvements

## Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the code
- Enhancing the documentation

## License

This project is open source and available under the MIT License.

---

**Note**: This calculator is designed for educational and practical use. For critical calculations, always verify results with other reliable sources. 
