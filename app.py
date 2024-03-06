# Import necessary libraries
from flask import Flask, request, jsonify, send_from_directory
from pathlib import Path
from matplotlib import pyplot as plt
import torch
from lightglue import LightGlue, SuperPoint
from lightglue.utils import load_image, rbd
from lightglue import viz2d
from PIL import Image
import rembg
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import os  

torch.set_grad_enabled(False)

app = Flask(__name__)
CORS(app)

app.secret_key = "caircoders-ednalanoc"

# Define the upload folder
UPLOAD_FOLDER = '/home/adis/Desktop/SID/Cattle_Matching_App/src/pages/LandingPage'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# Define the output folder
output_folder = Path("/home/adis/Desktop/SID/Cattle_Matching_App/src/assets/images")
output_folder.mkdir(exist_ok=True)
output_path_matched_image = output_folder / "matched_image.png"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Initialize SuperPoint and LightGlue
extractor = SuperPoint(max_num_keypoints=2048).eval().to(device)
matcher = LightGlue(features="superpoint").eval().to(device)

# Function to remove background
def remove_background(input_image_path, output_image_path):
    input_image = Image.open(input_image_path)
    output_image = rembg.remove(input_image)
    output_image.save(output_image_path)

# Function to process images
def process_images(input_image_path_0, input_image_path_1):
    output_image_path_0 = output_folder / "Dead_Cattle.png"
    output_image_path_1 = output_folder / "Live_Cattle.png"

    remove_background(input_image_path_0, output_image_path_0)
    remove_background(input_image_path_1, output_image_path_1)

    image0 = load_image(output_image_path_0).to(device)
    image1 = load_image(output_image_path_1).to(device)

    feats0 = extractor.extract(image0)
    feats1 = extractor.extract(image1)
    matches01 = matcher({"image0": feats0, "image1": feats1})
    feats0, feats1, matches01 = [rbd(x) for x in [feats0, feats1, matches01]]

    kpts0, kpts1, matches = feats0["keypoints"], feats1["keypoints"], matches01["matches"]
    m_kpts0, m_kpts1 = kpts0[matches[..., 0]], kpts1[matches[..., 1]]

    axes = viz2d.plot_images([image0, image1])
    viz2d.plot_matches(m_kpts0, m_kpts1, color="lime", lw=0.2)

    plt.savefig(output_path_matched_image)
    plt.close()

    return str(output_path_matched_image)

# Route for uploading images
@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    if 'files[]' not in request.files:
        return 'No file part in the request', 400

    files = request.files.getlist('files[]')

    for file in files:
        if file.filename == '':
            return 'No selected file', 400
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return jsonify({'success': True})

# Route for processing images
@app.route('/process_images', methods=['POST'])
@cross_origin()
def process_images_route():
    input_image_path_0 = os.path.join(app.config['UPLOAD_FOLDER'], 'Dead_Cattle.png')
    input_image_path_1 = os.path.join(app.config['UPLOAD_FOLDER'], 'Live_Cattle.png')

    matched_image_path = process_images(input_image_path_0, input_image_path_1)

    return jsonify({'matched_image_path': matched_image_path})

# Route to serve the matched image
@app.route('/image')
def get_image():
    try:
        return send_from_directory('/home/adis/Desktop/SID/Cattle_Matching_App/src/assets/images', 'matched_image.png')
    except FileNotFoundError:
        return 'Image not found.', 404

if __name__ == '__main__':
    app.run(debug=True)
