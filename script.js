const curry = (fn) => (...a) => (...b) => fn(...a, ...b);
const compose = (f, g) => (a) => (f(g(a)));
const $ = (id) => document.getElementById(id);

const addClass = curry((className, elem) => {
    elem.classList.add(className);
    return elem;
});

const addEvent = curry((listener, elem) => {
    elem.addEventListener('mouseover', listener);
    return elem;
});

const appendChildren = (container, factory, num) => {
    if (num > 0) {
        container.appendChild(factory());
        appendChildren(container, factory, num - 1);
    }
    return container;
};

const init = function() {
    const newDiv = () => document.createElement('div');
    const colorChange = (e) => e.target.classList.add('hit');
    const newBox = compose(addEvent(colorChange), compose(addClass('Box'), newDiv));

    const makeRow = (size) => appendChildren(newDiv(), newBox, size);
    const makeGrid = (size) => appendChildren($('container'), () => makeRow(size), size);

    const getNewSize = () => prompt("Enter the size of the grid");
    const resizeGrid = compose(makeGrid, getNewSize);

    const colorReset = (div) => div.classList.remove('hit');
    const resetGrid = () => [...document.querySelectorAll(".Box")].map(colorReset);
    const cleargrid = () => $('container').innerHTML = '';

    makeGrid(8);
    $('resetButton').addEventListener('click', resetGrid);
    $('resizeButton').addEventListener('click', compose(resizeGrid, cleargrid));
}

window.onload = init;