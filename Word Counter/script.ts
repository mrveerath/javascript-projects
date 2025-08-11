const textarea = document.getElementById('word-counter') as HTMLTextAreaElement;
const wordCount = document.getElementById('word-count') as HTMLParagraphElement;
const charCount = document.getElementById('char-count') as HTMLParagraphElement;

textarea.addEventListener('input', () => {
    const words = textarea.value.trim().split(/\s+/);
    const characters = textarea.value.trim().length;
    wordCount.textContent = words.length.toString();
    charCount.textContent = characters.toString();
})