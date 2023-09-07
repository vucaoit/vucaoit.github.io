function generateJQL() {
    var regex = /\bSB-\d{0,10}\b/g;
    const inpElement = document.getElementById("inp");
    const resultElement = document.getElementById("result");

    const input = inpElement.value.toUpperCase();
    var result = input.match(regex);
    var jqlQuery = `project="SOCTRIP BOOKING" and issuetype = Bug and status = Open and (`;
    const separator = ' or ';
    result = result.map(e => createItem(e));
    jqlQuery += result.join(separator) + ")";
    resultElement.textContent = jqlQuery;
}
function createItem(item) {
    return `issue in linkedIssues("${item}")`
}
// Get references to the button and the text you want to copy
var copyButton = document.getElementById("btn-copy");
var textToCopy = document.getElementById("result");

// Add a click event listener to the button
copyButton.addEventListener("click", function () {
    // Select the text you want to copy
    var selectedText = document.createRange();
    selectedText.selectNode(textToCopy);
    window.getSelection().removeAllRanges(); // Deselect any previous selections
    window.getSelection().addRange(selectedText);

    // Copy the selected text to the clipboard
    try {
        document.execCommand("copy");
        showToast();
    } catch (err) {
        showToast();
    } finally {
        // Deselect the text
        window.getSelection().removeAllRanges();
    }
});

function showToast() {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
}