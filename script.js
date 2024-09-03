document.getElementById('uploadButton').addEventListener('click', function () {
    const fileInput = document.getElementById('audioUpload');
    const statusMessage = document.getElementById('statusMessage');
    const downloadLink = document.getElementById('downloadLink');

    if (fileInput.files.length === 0) {
        statusMessage.textContent = 'Please select an audio file to upload.';
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    statusMessage.textContent = 'Uploading and processing...';

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'transformed_audio.wav';
        downloadLink.style.display = 'block';
        statusMessage.textContent = 'Transformation complete. Download your file below.';
    })
    .catch(error => {
        statusMessage.textContent = 'An error occurred: ' + error.message;
        console.error('Error:', error);
    });
});