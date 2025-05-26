from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from utils.mongo import mongo_client
from utils.jwt import generate_token, token_required
from models.user import User
from bson import ObjectId

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if mongo_client.db.users.find_one({'email': data['email']}):
        return jsonify({'message': 'Email já cadastrado'}), 400
    pwd_hash = generate_password_hash(data['password'])
    user = User({'name': data['name'], 'email': data['email'], 'passwordHash': pwd_hash})
    mongo_client.db.users.insert_one(user.to_dict())
    return jsonify({'message': 'Usuário registrado'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = mongo_client.db.users.find_one({'email': data['email']})
    if not user or not check_password_hash(user['passwordHash'], data['password']):
        return jsonify({'message': 'Credenciais inválidas'}), 401
    token = generate_token(user['_id'], extra_claims={'role': user['role'], 'name': user['name']})
    return jsonify({'token': token}), 200

@auth_bp.route('/me', methods=['GET'])
@token_required
def me():
    user = mongo_client.db.users.find_one({'_id': ObjectId(request.user['sub'])}, {'passwordHash': 0})
    user['_id'] = str(user['_id'])
    return jsonify(user), 200
