from flask import Blueprint, request, jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
from utils.mongo import mongo_client
from utils.jwt import token_required
from models.complaint import Complaint
from bson import ObjectId
from datetime import datetime
import os
import uuid

complaints_bp = Blueprint('complaints', __name__)

# Serve arquivos de upload (anexos)
@complaints_bp.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)

# Listar reclamações (SIG vê todas, cliente vê só as suas)
@complaints_bp.route('', methods=['GET'])
@token_required
def list_complaints():
    user = request.user
    query = {} if user.get('role') == 'SIG' else {'customerId': ObjectId(user.get('sub'))}
    docs = mongo_client.db.complaints.find(query)
    return jsonify([Complaint(doc).to_dict() for doc in docs]), 200

# Criar nova reclamação com anexos
@complaints_bp.route('', methods=['POST'])
@token_required
def create_complaint():
    data = request.form.to_dict()
    files = request.files.getlist('attachments')
    paths = []

    for f in files:
        # Garante nome único para evitar conflito de arquivos
        unique_name = f"{uuid.uuid4().hex}_{secure_filename(f.filename)}"
        dest_path = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_name)
        f.save(dest_path)
        paths.append(f'uploads/{unique_name}')  # Salva apenas o caminho relativo

    # Preenchimento automático dos campos
    data.update({
        'attachments': paths,
        'customerId': request.user.get('sub'),
        'createdAt': datetime.utcnow(),
        'firstContactAt': datetime.utcnow(),
        'fy': datetime.utcnow().year,
        'status': 'pending'
    })

    comp = Complaint(data)
    mongo_client.db.complaints.insert_one(comp.to_dict())
    return jsonify({'message': 'Reclamação criada'}), 201

# Obter uma reclamação específica (com validação de acesso)
@complaints_bp.route('/<cid>', methods=['GET'])
@token_required
def get_complaint(cid):
    user = request.user
    doc = mongo_client.db.complaints.find_one({'_id': ObjectId(cid)})
    if not doc:
        return jsonify({'message': 'Não encontrado'}), 404

    if user.get('role') != 'SIG' and str(doc.get('customerId')) != user.get('sub'):
        return jsonify({'message': 'Acesso negado'}), 403

    return jsonify(Complaint(doc).to_dict()), 200

# Atualizar uma reclamação
@complaints_bp.route('/<cid>', methods=['PUT'])
@token_required
def update_complaint(cid):
    data = request.json
    data['updatedAt'] = datetime.utcnow()
    mongo_client.db.complaints.update_one({'_id': ObjectId(cid)}, {'$set': data})
    return jsonify({'message': 'Atualizado'}), 200

# Deletar uma reclamação
@complaints_bp.route('/<cid>', methods=['DELETE'])
@token_required
def delete_complaint(cid):
    mongo_client.db.complaints.delete_one({'_id': ObjectId(cid)})
    return jsonify({'message': 'Deletado'}), 200
