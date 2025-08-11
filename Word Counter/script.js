var textarea = document.getElementById('word-counter');
var wordCount = document.getElementById('word-count');
var charCount = document.getElementById('char-count');
textarea.addEventListener('input', function () {
    var words = textarea.value.trim().split(/\s+/);
    var characters = textarea.value.trim().length;
    wordCount.textContent = words.length.toString();
    charCount.textContent = characters.toString();
});
