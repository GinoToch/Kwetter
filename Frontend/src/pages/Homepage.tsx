import { useState } from "react";
import { Paper, Text, Divider, Anchor, Group, Button, TextInput, PasswordInput, Stack, Center, Space } from '@mantine/core';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../constants";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from "@tabler/icons-react";

export function Homepage(props: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [opened, { open, close }] = useDisclosure(false);

  const submitLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/users-api/Authentication/login`,
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
        history.push("/Feed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      showNotification({
        title: "Login Failed",
        message: "Invalid username or password",
        color: "red",
        icon: <IconX />,
      });
    }
  };

  const submitRegister = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/users-api/Authentication/register`,
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
        showNotification({
          title: "Registration Successful",
          message: "You have successfully registered",
          color: "green",
          icon: <IconCheck />,
        });
        history.push("/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      showNotification({
        title: "Registration Failed",
        message: "Unable to register. Please try again",
        color: "red",
        icon: <IconX />,
        position: 'bottom-right'
      });
    }
  };

  return (
    <>
      <Space h={"2rem"} />
      <Center>
        <Paper w={"20rem"} radius="md" p="xl" withBorder style={{ backgroundColor: isLogin ? "white" : "whitesmoke" }} {...props}>
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
      </Center>
      <Center>
        <Space h={"4rem"} />
        <Button onClick={open}>Privacy policy</Button>
      </Center>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <Text size="xl">Privacy Policy</Text>
        <Divider />
        <Text>
          Our application stores the messages created by the user. All user information, including the messages, is attached to their username
          We ensure that user data is kept confidential and secure. By using our service, you agree to the storage and use of your information as described in this policy
        </Text>
      </Modal>
    </>
  );
}

export default Homepage;
