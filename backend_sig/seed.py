# seed.py
import os
from datetime import datetime
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
from utils.mongo import mongo_client

load_dotenv()

def seed_admin():
    name = os.getenv("ADMIN_NAME")
    email = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")
    if not name or not email or not password:
        print("Defina ADMIN_NAME, ADMIN_EMAIL e ADMIN_PASSWORD no .env")
        return

    db = mongo_client.db
    # Conecta sem app context
    mongo_client.init_app = lambda app=None: None

    existing = db.users.find_one({"role": "SIG", "email": email})
    if existing:
        print(f"Usuário SIG já existe: {email}")
        return

    password_hash = generate_password_hash(password)
    admin = {
        "name": name,
        "email": email,
        "passwordHash": password_hash,
        "role": "SIG",
        "createdAt": datetime.utcnow()
    }
    db.users.insert_one(admin)
    print(f"Usuário SIG criado: {email}")

if __name__ == "__main__":
    # Antes de rodar, certifique-se de que seu app.py já configurou MONGO_URI
    from app import create_app
    app = create_app()
    with app.app_context():
        seed_admin()
