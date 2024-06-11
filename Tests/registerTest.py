from locust import HttpUser, TaskSet, task, between
import uuid

class RegisterUserTaskSet(TaskSet):

    @task
    def register_user(self):
        url = "users-api/Authentication/register"
        headers = {
            "Content-Type": "application/json"
        }
        
        unique_id = str(uuid.uuid4())
        payload = {
            "UserName": f"user_{unique_id}",
            "Password": f"pass_{unique_id}"
        }

        self.client.post(url, json=payload, headers=headers)

class WebsiteUser(HttpUser):
    tasks = [RegisterUserTaskSet]
    wait_time = between(1, 5)
    host = "http://108.142.62.35:9000/"

if __name__ == "__main__":
    import os
    os.system("locust -f registerUserTest.py")
