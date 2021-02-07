# Style Guide

## General Guidelines
For all documents within this repository
* Use 4 spaces for indentations
* Ensure proper indentation for all code
E.g.
```HTML
<div>
    <p>Some content here</p>
        </div>
```
```javascript
for (let i=0 ; i<5 ; i++) {
    if (true) {
    // Do something
}
}
```
No good!
```HTML
<div>
    <p>Some content here</p>
</div>
```
```javascript
for (let i=0 ; i<5 ; i++) {
    if (true) {
        // Do something
    }
}
```
Very good!
* Wrap content onto new lines if code is too long

## Javascript
* Functions should be named using PascalCase
* Variables should be named using camelCase.
* Usage of both normal and arrow functions are ok!
```javascript
function FunctionName() {
   // Some code here
}
```
or
```javascript
const FunctionName = () => {
    // Some code here
}
```

### Handler Function
These functions are event handlers and are triggered when the user performs an action. They shoud be named *handle*EventHere.

```javascript
const HandlePurchaseButtonClick = () => {
    // Some code here
}
```

### Renderer Function
These functions will edit and change the HTML document, by rendering new content or displaying components. They should be named *Render*Something.

```javascript
const RenderCards = () => {
    // Some code here
}
```

*... following parts are still under construction*
