import { useState } from "react";
import { Paper, Text, Divider, Anchor, Group, Button, TextInput, PasswordInput, Stack } from '@mantine/core';
import axios from "axios";
import { useHistory } from "react-router-dom";

export function Homepage(props:any) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submitLogin = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9000/users-api/Authentication/login",
        {
          userName: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        sessionStorage.setItem("access-token", response.data.token);
        console.log("Successful login");
        history.push("/Feed");
      }
    } catch (error) {
      console.error("Login failed:", error);
  
    }
  };

  const submitRegister = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/users-api/Authentication/register",
        {
          userName: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        sessionStorage.setItem("access-token", response.data.token);
        console.log("Successful registration");
        history.push("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
  
    }
  };

  return (
    <>
      <Paper radius="md" p="xl" withBorder style={{ backgroundColor: isLogin ? "white" : "whitesmoke" }} {...props}>
        <Text size="lg" fw={500}>
          Welcome to Kwetter
        </Text>

        <Divider label="Enter your details" labelPosition="center" my="lg" />

        <form onSubmit={isLogin ? submitLogin : submitRegister}>
          <Stack>
            <TextInput
              required
              label="Username"
              placeholder="Your username"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Want to register?" : "Already have an account? Login"}
            </Anchor>
            <Button type="submit" radius="md">
              {isLogin ? "Login" : "Register"}
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
}

export default Homepage;
