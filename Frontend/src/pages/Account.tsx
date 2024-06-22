import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants";
import {
  Card,
  Avatar,
  Group,
  Button,
  Text,
  ActionIcon,
  Modal,
  Center,
  Space,
  Input,
} from "@mantine/core";
import AppLayout from "../components/AppLayout";
import { jwtDecode } from "jwt-decode";
import { IconArrowBack, IconCheck, IconPencil } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Intercept from "../Intercept";

export function Account() {
  const { userName } = useParams<{ userName: string }>();
  const [user, setUser] = useState<{
    id: string;
    userName: string;
    followers: number;
    description: string;
  } | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [description, setDescription] = useState("Hello I'm new here!");
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false); 

  useEffect(() => {
    const token = sessionStorage.getItem("access-token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken.unique_name);

      if (decodedToken.unique_name === userName) {
        setIsCurrentUser(true);
      }
    }

    const fetchData = async () => {
      try {
        const response = await Intercept.get(
          `${BASE_URL}/account-api/account/GetAccount?name=${userName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.value);
        setDescription(
          response.data.value.description || "Hello I'm new here!"
        );
      } catch (error) {
        console.error("Error getting profile", error);
      }
    };
    fetchData();
  }, [userName]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleDeleteAccount = async () => {
    setDeleteModalOpened(true);   
  };

  const handleConfirmDelete = async() => {
    console.log("click")
    const token = sessionStorage.getItem("access-token");
    if (!token) {
      console.error("Access token not found");
      return;
    }

    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.sub;

    try {
       await Intercept.delete(
        `${BASE_URL}/account-api/account/DeleteAccount?id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Account deleted successfully");
      setDeleteModalOpened(false);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <AppLayout />
      <Space h={"10rem"} />
      <Center>
        <Card withBorder padding="xl" radius="md" w={"20rem"}>
          <Card.Section
            h={140}
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
            }}
          />
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png"
            size={80}
            radius={80}
            mx="auto"
            mt={-30}
          />
          <Text ta="center" fz="lg" fw={500} mt="sm">
            {user.userName}
          </Text>
          <Group justify="center">
            <Text ta="center" td="underline" fz="sm" c="dimmed">
              {description}
            </Text>
            {isCurrentUser && (
              <ActionIcon onClick={open}>
                <IconPencil size={16} />
              </ActionIcon>
            )}
          </Group>
          <Group mt="md" justify="center">
            <Text ta="center" fz="sm" c="dimmed">
              Followers: {user.followers}
            </Text>
          </Group>
          {isCurrentUser ? (
            <Button
              fullWidth
              radius="md"
              mt="xl"
              size="md"
              color="red"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          ) : (
            <Button fullWidth radius="md" mt="xl" size="md" variant="default">
              Follow
            </Button>
          )}
        </Card>
        <Modal
          opened={opened}
          onClose={close}
          title="Authentication"
          withCloseButton={false}
        >
          <Input placeholder="Enter new description" />
          <Space h="md" />
          <Center>
            <Button
              color="green"
              variant="outline"
              rightSection={<IconCheck size={14} />}
            >
              Save
            </Button>
          </Center>
        </Modal>
        <Modal
          opened={deleteModalOpened}
          onClose={() => setDeleteModalOpened(false)}
          title="Confirm"
          withCloseButton={false}
        >
          <Center>
            <Text td="underline">
              Are you sure you want to delete your account?
            </Text>
          </Center>
          <Space h={"md"} />
          <Center>
          <Button
              color="red"
              variant="outline"
              onClick={handleConfirmDelete}
              rightSection={
                <IconCheck size={14} />
              }
            >
              Yes
            </Button>
            <Button
              color="green"
              variant="outline"
              rightSection={<IconArrowBack size={14} />}
            >
              No
            </Button>
          </Center>
        </Modal>
      </Center>
    </>
  );
}

export default Account;
