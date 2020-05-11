const curry = (fn) => (...a) => (...b) => fn(...a, ...b);
const compose = (f, g) => (a) => (f(g(a)));
const $ = (id) => document.getElementById(id);

const newDiv = () => {
    const div = document.createElement('div');
    return div;
};

const addClass = (elem) => {
    elem.classList.add('Box');
    return elem;
};

const addEvent = curry((listener, elem) => {
    elem.addEventListener('mouseover', listener);
    console.log('tet');
    return elem;
});

const colorChange = (e) => e.target.classList.add('hit');

const newBox = compose(addEvent(colorChange), compose(addClass, newDiv));

const appendChildren = (container, factory, num) => {
    if (num > 0) {
        container.appendChild(factory());
        appendChildren(container, factory, num - 1);
    }
    return container;
};

const makeRow = (length) => appendChildren(newDiv(), newBox, length);
const makeBoard = (size) => appendChildren($('container'), () => makeRow(size), size);

const init = function() {
    makeBoard(64);
}

window.onload = init;