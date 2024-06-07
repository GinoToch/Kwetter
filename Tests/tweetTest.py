from locust import HttpUser, TaskSet, task, between

class CreateTweetTaskSet(TaskSet):

    @task
    def create_tweet(self):
        url = "/tweets-api/tweet/CreateTweet"
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDZhNjRjNS0xMDM5LTRjNjQtOGEwMC0wOWJhMDIwYjc1ZjkiLCJ1bmlxdWVfbmFtZSI6Imphbm91IiwianRpIjoiYjQxZGY0MjYtYTkxMC00MmE3LTg2NGMtMWEzYzNlZWU0N2U0IiwiZXhwIjoxNzE3Nzc5MTUzfQ.WhU4YkFHS_bnNCUZxuphO8a6i5jfUWAmjRGG2PdouMk"
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
    host = "http://172.211.231.227:9000"

if __name__ == "__main__":
    import os
    os.system("locust -f tweetTest.py")
