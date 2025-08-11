const allFaqs: NodeListOf<Element> = document.querySelectorAll('.faq');

allFaqs.forEach(faq => {
    faq.addEventListener('click', (event: Event) => {
        console.log(event.target)
        if ((event.target instanceof HTMLElement && event.target.classList.contains('question'))||
        (event.target instanceof HTMLElement && event.target.parentElement?.classList.contains('question'))
       ) {
            faq.classList.toggle('active');
        }
    });
});