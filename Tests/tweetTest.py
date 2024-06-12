from locust import HttpUser, TaskSet, task, between

class CreateTweetTaskSet(TaskSet):

    @task
    def create_tweet(self):
        url = "tweets-api/tweet/CreateTweet"
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MjNjOWFiNy04YTgwLTQ3NWQtYjliOS0yNzdmNmI4ZjdkMWQiLCJ1bmlxdWVfbmFtZSI6Imphbm91IiwianRpIjoiZGRmMGViYjItN2EyZC00MGE2LTg3YjgtMjViMjhkMjJlZWM2IiwiZXhwIjoxNzE4MTA1NDM0fQ.TbgaQ5X53l6GPzcv04neSnVIzv07Oj9T0eOFJY__qeg"
        }
        payload = {
            "UserId": "f8443b2e-22fc-4a6a-b2c6-9d63c5aefc29",
            "UserName": "nieuweuser",
            "Title": "TesTitle",
            "Content": "thx shit werkt"
        }

        self.client.post(url, json=payload, headers=headers)

class WebsiteUser(HttpUser):
    tasks = [CreateTweetTaskSet]
    wait_time = between(1, 5)
    host = "http://108.142.62.35:9000/"

if __name__ == "__main__":
    import os
    os.system("locust -f tweetTest.py")
