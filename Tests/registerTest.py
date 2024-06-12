import random
import string
from locust import HttpUser, TaskSet, task, between

class RegisterUserTaskSet(TaskSet):

    @task
    def register_user(self):
        url = "users-api/Authentication/register"
        headers = {
            "Content-Type": "application/json"
        }
        
        username = ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))  # Generates a random string of 10 lowercase letters and digits
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))  # Generates a random string of 12 letters and digits
        
        payload = {
            "UserName": username,
            "Password": password
        }

        self.client.post(url, json=payload, headers=headers)

class WebsiteUser(HttpUser):
    tasks = [RegisterUserTaskSet]
    wait_time = between(1, 5)
    host = "http://108.142.62.35:9000/"

if __name__ == "__main__":
    import os
    os.system("locust -f registerUserTest.py")
