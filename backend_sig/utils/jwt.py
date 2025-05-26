import jwt
from flask import current_app, request, jsonify
from datetime import datetime, timedelta
from functools import wraps

def generate_token(user_id, expires_delta=None, extra_claims=None):
    expires = expires_delta or timedelta(hours=1)
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + expires
    }
    if extra_claims:
        payload.update(extra_claims)
    return jwt.encode(payload, current_app.config["JWT_SECRET_KEY"], algorithm="HS256")

def verify_token(token):
    try:
        return jwt.decode(token, current_app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None

def token_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.headers.get('Authorization', '')
        parts = auth.split()
        if len(parts) != 2 or parts[0] != 'Bearer':
            return jsonify({"message": "Token é obrigatório"}), 401
        payload = verify_token(parts[1])
        if not payload:
            return jsonify({"message": "Token inválido ou expirado"}), 401
        request.user = payload
        return f(*args, **kwargs)
    return wrapper
