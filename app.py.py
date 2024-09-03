from flask import Flask, request, send_file
import librosa
import soundfile as sf
import io

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_audio():
    file = request.files['file']
    audio, sr = librosa.load(file, sr=16000)

    # Example transformation (just a pass-through here)
    transformed_audio = audio

    # Save transformed audio to a BytesIO object
    output = io.BytesIO()
    sf.write(output, transformed_audio, sr, format='WAV')
    output.seek(0)

    return send_file(output, as_attachment=True, download_name='transformed_audio.wav', mimetype='audio/wav')

if __name__ == "__main__":
    app.run(debug=True)
