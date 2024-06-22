# mitmproxy_script.py

from mitmproxy import http

def request(flow: http.HTTPFlow) -> None:
    # Replace with the actual backend URL where token is sent
    if flow.request.pretty_url.startswith("https://localhost:9000/users-api/Authentication"):
        # Check if it's a POST request and contains the token parameter
        if flow.request.method == "POST" and "token=" in flow.request.text:
            token_start = flow.request.text.find("token=") + len("token=")
            token_end = flow.request.text.find("&", token_start)
            token = flow.request.text[token_start:token_end]
            print("token")
