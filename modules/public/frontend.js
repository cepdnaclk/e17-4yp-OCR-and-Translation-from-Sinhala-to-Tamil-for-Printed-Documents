// frontend.js
//console.log("frontend is active")
const mainDiv = document.getElementById("main");

const frontendHTML = `
<h1>Text File Upload</h1>
<form id="uploadForm">
    <input type="file" id="fileInput" accept=".txt" />
    <button type="submit">Upload</button>
</form>
<div id="message"></div>
`;

mainDiv.innerHTML = frontendHTML;

document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        showMessage("Please select a file.");
        return;
    }

    const formData = new FormData();
    formData.append("uploadedText", file);

    try {
        const response = await fetch("/api/upload_txt", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            showMessage("Uploaded and translated: " + data.message);
        } else {
            showMessage("Error uploading the file.");
        }
    } catch (error) {
        console.error(error);
        showMessage("An error occurred.");
    }
});

function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
}
