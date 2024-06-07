from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):
    @task(1)
    def getlogs(self):
        url = "/logs"
        self.client.get(url)

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 2)
    host = "http://20.61.241.109:3000"

if __name__ == "__main__":
    import os
    os.system("locust -f locust.py --host=http://20.61.241.109:3000")
