---
sidebarDepth: 0
mathjax:
  showError: true
  packages: []
---

## MathJAX - $\LaTeX$

### Links
[Docs](https://vuepress.github.io/en/plugins/mathjax/)

[MathJax: LaTeX Basic Tutorial und Referenz (German)](https://www.mathelounge.de/509545/mathjax-latex-basic-tutorial-und-referenz-deutsch)

[Basics of typesetting in MathJax](https://quantumcomputing.meta.stackexchange.com/questions/49/tutorial-how-to-use-tex-mathjax/76#76)

### Inline Rendering
```
Surround your LaTeX with a single `$` on each side for inline rendering.
```

Input:
>Euler's identity `$e^{i\pi}+1=0$` is a beautiful formula in `$\R^2$`

Output:
>$Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\R^2$

### Block Rendering
```
Use two `$$` for block rendering. This mode uses bigger symbols and centers the result.
```

Input:
>`$$\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right) 
 = \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}$$`

Output:
>$$\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right) 
 = \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}$$

### Using Macros
This is part of `config.js` of this project:
```js
module.exports = {
  plugins: {
    mathjax: {
      macros: {
        '\\Z': '\\mathbb{Z}'
      }
    }
  }
}
```
now we can write `$\Z$` instead of `$\mathbb{Z}$` to print $\Z$

### Greek letters
`$\alpha$` - $\alpha$ 
`$\beta$` - $\beta$
`$\omega$` - $\omega$

`$\Gamma` - $\Gamma$ 
`$\Delta` - $Delta$
`$\Omega$` - $\Omega$

### Superscript and Subscript
use `^` for *superscript* and `_` for subscript
>`x_i^2` $x_i^2$  
>`\log_2 x` $\log_2 x$

### Groups
>Superscripts, subscripts, and other operations apply only to the next “group”. 
A “group” is either a single symbol, or any formula surrounded by curly braces {…}. 
If you do 10^10, you will get a surprise: $10^10$. But 10^{10} gives what you probably wanted: $10^{10}$. 
Use curly braces to delimit a formula to which a superscript or subscript applies: x^5^6 is an error; 
{x^y}^z is ${x^y}^z$, and x^{y^z} is $x^{y^z}$. Observe the difference between x_i^2 $x_i^2$ and x_{i^2} $x_{i^2}$.
### Parentheses
Ordinary symbols `()[]` make parentheses and brackets $(2+3)[4+4]$. Use `\{` and `\}` for curly braces $\{\}$
### Sums and integrals


### Fractions

### Fonts

### Radical signs

### special functions

### special symbols and notations

### Spaces 

### Accents and diacritical marks  
