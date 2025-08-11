var allFaqs = document.querySelectorAll('.faq');
allFaqs.forEach(function (faq) {
    faq.addEventListener('click', function (event) {
        var _a;
        console.log(event.target);
        if ((event.target instanceof HTMLElement && event.target.classList.contains('question')) ||
            (event.target instanceof HTMLElement && ((_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains('question')))) {
            faq.classList.toggle('active');
        }
    });
});
