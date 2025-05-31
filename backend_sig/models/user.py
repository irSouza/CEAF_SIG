from datetime import datetime
from bson import ObjectId

class User:
    def __init__(self, data):
        self.id = data.get('_id', ObjectId())
        self.name = data['name']
        self.email = data['email']
        self.password_hash = data['passwordHash']
        self.role = data.get('role', 'client')
        self.created_at = data.get('createdAt', datetime.utcnow())

    def to_dict(self):
        return {
            '_id': self.id,
            'name': self.name,
            'email': self.email,
            'passwordHash': self.password_hash,
            'role': self.role,
            'createdAt': self.created_at
        }
