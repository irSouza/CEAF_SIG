from flask import Blueprint, request, jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
from utils.mongo import mongo_client
from utils.jwt import token_required
from models.complaint import Complaint
from bson import ObjectId
from datetime import datetime
import os

complaints_bp = Blueprint('complaints', __name__)

@complaints_bp.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)

@complaints_bp.route('', methods=['GET'])
@token_required
def list_complaints():
    user = request.user
    query = {} if user.get('role') == 'SIG' else {'customerId': ObjectId(user.get('sub'))}
    docs = mongo_client.db.complaints.find(query)
    return jsonify([Complaint(doc).to_dict() for doc in docs]), 200

@complaints_bp.route('', methods=['POST'])
@token_required
def create_complaint():
    data = request.form.to_dict()
    files = request.files.getlist('attachments')
    paths = []
    for f in files:
        name = secure_filename(f.filename)
        dest = os.path.join(current_app.config['UPLOAD_FOLDER'], name)
        f.save(dest)
        paths.append(dest)
    data.update({
        'attachments': paths,
        'customerId': request.user.get('sub'),
        'createdAt': datetime.utcnow(),
        'status': 'pending'
    })
    comp = Complaint(data)
    mongo_client.db.complaints.insert_one(comp.to_dict())
    return jsonify({'message': 'Reclamação criada'}), 201

@complaints_bp.route('/<cid>', methods=['GET'])
@token_required
def get_complaint(cid):
    user = request.user
    doc = mongo_client.db.complaints.find_one({'_id': ObjectId(cid)})
    if not doc:
        return jsonify({'message': 'Não encontrado'}), 404

    # Restrição: cliente só acessa sua própria reclamação
    if user.get('role') != 'SIG' and str(doc.get('customerId')) != user.get('sub'):
        return jsonify({'message': 'Acesso negado'}), 403

    return jsonify(Complaint(doc).to_dict()), 200

@complaints_bp.route('/<cid>', methods=['PUT'])
@token_required
def update_complaint(cid):
    data = request.json
    data['updatedAt'] = datetime.utcnow()
    mongo_client.db.complaints.update_one({'_id': ObjectId(cid)}, {'$set': data})
    return jsonify({'message': 'Atualizado'}), 200

@complaints_bp.route('/<cid>', methods=['DELETE'])
@token_required
def delete_complaint(cid):
    mongo_client.db.complaints.delete_one({'_id': ObjectId(cid)})
    return jsonify({'message': 'Deletado'}), 200
