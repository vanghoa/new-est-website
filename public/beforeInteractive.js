let touchCheck = false;

document.documentElement.classList[
    'ontouchstart' in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
        ? `add${(() => {
              touchCheck = true;
              return '';
          })()}`
        : 'remove'
]('touch');
