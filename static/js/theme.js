theme = 'light'
//let counter = 0;
document.getElementById('ThemeButton').addEventListener('click',() =>
{
    let body = document.querySelector('body'), alt;
    theme == 'dark' ? alt = 'light' : alt = 'dark'
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    // counter++;
    // if (counter > 10) alert('На хуй підар');
});