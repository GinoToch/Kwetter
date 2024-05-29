from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):
    @task(1)
    def refresh_access_token(self):
        url = "/users-api/Authentication/login"
        headers = {'Content-Type': 'application/json'}
        payload = {
            "UserName": "janou",
            "Password": "meh7"
        }
        self.client.post(url, json=payload, headers=headers)

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 2)

if __name__ == "__main__":
    import os
    os.system("locust -f locust.py --host=http://172.211.231.227:9000")
