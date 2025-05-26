from datetime import datetime
from bson import ObjectId

class Complaint:
    def __init__(self, data):
        self.id = data.get('_id', ObjectId())
        self.customer_id = ObjectId(data['customerId'])
        self.fy = data['fy']
        self.first_contact_at = data.get('firstContactAt', datetime.utcnow())
        self.customer = data['customer']
        self.critical_importance = data['criticalImportance']
        self.general_cause = data['generalCause']
        self.description = data['description']
        self.bag_code = data['bagCode']
        self.lot_number = data['lotNumber']
        self.machine = data.get('machine')
        self.affected_bags = data['affectedBags']
        self.green_app_number = data.get('greenAppNumber')
        self.has_sample = data.get('hasSample', False)
        self.attachments = data.get('attachments', [])
        self.status = data.get('status', 'pending')
        self.analysis_report = data.get('analysisReport')
        self.created_at = data.get('createdAt', datetime.utcnow())
        self.updated_at = data.get('updatedAt', datetime.utcnow())

    def to_dict(self):
        return {
            '_id': self.id,
            'customerId': self.customer_id,
            'fy': self.fy,
            'firstContactAt': self.first_contact_at,
            'customer': self.customer,
            'criticalImportance': self.critical_importance,
            'generalCause': self.general_cause,
            'description': self.description,
            'bagCode': self.bag_code,
            'lotNumber': self.lot_number,
            'machine': self.machine,
            'affectedBags': self.affected_bags,
            'greenAppNumber': self.green_app_number,
            'hasSample': self.has_sample,
            'attachments': self.attachments,
            'status': self.status,
            'analysisReport': self.analysis_report,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
