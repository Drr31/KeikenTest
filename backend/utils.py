import openai
from datetime import datetime, timedelta

class APIUsageTracker:
    def __init__(self):
        self.last_request = None
        self.request_count = 0
        self.reset_time = None

    def can_make_request(self):
        now = datetime.now()
        
        # Réinitialiser le compteur après une minute
        if self.reset_time and now >= self.reset_time:
            self.request_count = 0
            self.reset_time = None
        
        # Première requête
        if not self.last_request:
            self.last_request = now
            self.request_count = 1
            self.reset_time = now + timedelta(minutes=1)
            return True
        
        # Limiter à 20 requêtes par minute
        if self.request_count >= 20:
            return False
        
        self.request_count += 1
        self.last_request = now
        return True

usage_tracker = APIUsageTracker() 