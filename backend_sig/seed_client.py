from pymongo import MongoClient
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.get_default_database()

name = "Usuário Teste"
email = "cliente@teste.com"
password = "123456"
role = "client"

# Remove o usuário antigo (caso tenha sido criado com 'password' ao invés de 'passwordHash')
db.users.delete_one({"email": email})

# Insere o usuário corretamente
db.users.insert_one({
    "name": name,
    "email": email,
    "passwordHash": generate_password_hash(password),
    "role": role
})

print("Usuário cliente recriado com sucesso.")
