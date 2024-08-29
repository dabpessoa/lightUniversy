function random(min, max) {
    return Math.random() * (max - min) + min;
}

function sleep(milliseconds) {
    return new Promise(r => setTimeout(r, milliseconds));
}