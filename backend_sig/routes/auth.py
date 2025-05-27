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

    # Verifica se já existe um usuário com o mesmo email
    if mongo_client.db.users.find_one({'email': data['email']}):
        return jsonify({'message': 'Email já cadastrado'}), 400

    # Gera o hash da senha
    pwd_hash = generate_password_hash(data['password'])

    # Cria o usuário com campo 'role' padrão como 'client'
    user = User({
        'name': data['name'],
        'email': data['email'],
        'passwordHash': pwd_hash,
        'role': data.get('role', 'client')  # 'SIG' ou 'client'
    })

    # Insere no banco
    mongo_client.db.users.insert_one(user.to_dict())
    return jsonify({'message': 'Usuário registrado'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    print("Tentativa de login:", data)

    user = mongo_client.db.users.find_one({'email': data['email']})

    if not user:
        print("Usuário não encontrado")
        return jsonify({'message': 'Credenciais inválidas'}), 401

    if not check_password_hash(user['passwordHash'], data['password']):
        print("Senha incorreta")
        return jsonify({'message': 'Credenciais inválidas'}), 401

    print("Login bem-sucedido para:", user['email'])

    # Converte ObjectId para string antes de gerar o token
    token = generate_token(str(user['_id']), extra_claims={
        'role': user.get('role', 'client'),
        'name': user['name']
    })

    return jsonify({'token': token}), 200

@auth_bp.route('/me', methods=['GET'])
@token_required
def me():
    user = mongo_client.db.users.find_one({'_id': ObjectId(request.user['sub'])}, {'passwordHash': 0})

    if not user:
        return jsonify({'message': 'Usuário não encontrado'}), 404

    user['_id'] = str(user['_id'])
    return jsonify(user), 200
