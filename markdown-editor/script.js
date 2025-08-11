// script.js

// Select elements
const markdownInput = document.getElementById('markdown-input');
const preview = document.getElementById('preview');

// Function to convert Markdown to HTML
function markdownToHtml(markdownText) {
    let htmlText = markdownText;

    // Convert headers
    htmlText = htmlText.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    htmlText = htmlText.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    htmlText = htmlText.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    htmlText = htmlText.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    htmlText = htmlText.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    htmlText = htmlText.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Convert bold text
    htmlText = htmlText.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Convert italic text
    htmlText = htmlText.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Convert links
    htmlText = htmlText.replace(/\[([^\[]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>');

    // Convert images
    htmlText = htmlText.replace(/\!\[([^\[]+)\]\(([^\)]+)\)/gim, '<img src="$2" alt="$1">');

    // Convert unordered lists
    htmlText = htmlText.replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>');
    htmlText = htmlText.replace(/<ul><li>.*<\/li><\/ul>/gim, function(match) {
        return match.replace(/<\/li><li>/g, '</li><li>').replace('<ul><li>', '').replace('</li></ul>', '');
    });

    // Convert ordered lists
    htmlText = htmlText.replace(/^\d+\. (.*$)/gim, '<ol><li>$1</li></ol>');
    htmlText = htmlText.replace(/<ol><li>.*<\/li><\/ol>/gim, function(match) {
        return match.replace(/<\/li><li>/g, '</li><li>').replace('<ol><li>', '').replace('</li></ol>', '');
    });

    // Convert blockquotes
    htmlText = htmlText.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Convert code blocks (triple backticks for multi-line code)
    htmlText = htmlText.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

    // Convert inline code
    htmlText = htmlText.replace(/\`(.*?)\`/gim, '<code>$1</code>');

    // Convert tables
    htmlText = htmlText.replace(/\|(.+?)\|/g, function(match, content) {
        const rows = content.split('\n');
        const tableRows = rows.map(row => {
            const cols = row.split('|').map(col => `<td>${col.trim()}</td>`).join('');
            return `<tr>${cols}</tr>`;
        }).join('');
        return `<table>${tableRows}</table>`;
    });

    return htmlText.trim();
}

// Function to update the live preview
function updatePreview() {
    const markdownText = markdownInput.value;
    const htmlContent = markdownToHtml(markdownText);
    preview.innerHTML = htmlContent;
}
markdownInput.addEventListener('input', updatePreview);
markdownInput.value = `# Markdown Editor
Type **bold** or *italic* text and see it previewed here.

## Example List
* Item 1
* Item 2

1. Ordered Item 1
2. Ordered Item 2

[Google](https://www.google.com)

![Image](https://www.example.com/image.jpg)

> This is a blockquote.

\`\`\`
function hello() {
    console.log('Hello, world!');
}
\`\`\`

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data 1   | Data 2   |
| Row 2    | Data 3   | Data 4   |
`;

updatePreview(); // Initial render
