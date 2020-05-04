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

const mouseEvent = (e) => e.target.classList.add('hit');

const addEvent = curry((listener, elem) => {
    elem.addEventListener('mouseover', listener);
    console.log('tet');
    return elem;
});

const newBox = compose(addEvent(mouseEvent), compose(addClass, newDiv));

const appendy = (container, fn, num) => {
    if (num > 0) {
        container.appendChild(fn());
        appendy(container, fn, num - 1);
    }
    return container;
};

const makeBoard = (num) => appendy($('container'), () => appendy(newDiv(), newBox, num), num);

const init = function() {
    makeBoard(8);
}

window.onload = init;