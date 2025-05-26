from flask import Flask, jsonify
from flask_cors import CORS
from routes.auth import auth_bp
from routes.complaints import complaints_bp
from utils.mongo import mongo_client
import os
from dotenv import load_dotenv

def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    app.config["UPLOAD_FOLDER"] = os.getenv("UPLOAD_FOLDER")

    # Certifica pasta de upload
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    CORS(app)
    mongo_client.init_app(app)

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(complaints_bp, url_prefix="/complaints")

    @app.route("/health")
    def health():
        return jsonify({"status": "ok"}), 200

    return app

if __name__ == "__main__":
    create_app().run(host="0.0.0.0", port=5000, debug=True)
