import React, { useState, useEffect } from "react";
import axios from "axios";
import AppLayout from "../components/AppLayout";
import {jwtDecode} from "jwt-decode";
import {
  ActionIcon,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Input,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import { IconCheck, IconHeart, IconMessage, IconX } from "@tabler/icons-react";
import { BASE_URL } from "../constants";
import { Link } from "react-router-dom";
import { showNotification } from '@mantine/notifications';

const Feedpage: React.FC<{}> = () => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [tweetContent, setTweetContent] = useState("");
  const [username, setUsername] = useState<string>("");
  const [userId, setId] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("access-token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      setUsername(decodedToken.unique_name);
      setId(decodedToken.sub);
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tweets-api/feed`);
        setTweets(response.data);
        console.log(username);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
        showNotification({
          title: "Error",
          message: "Failed to fetch tweets",
          color: "red",
          icon: <IconX />,
          autoClose: 3000,
          position: 'bottom-right',
        });
      }
    };
    fetchData();
  }, [username]);

  const handleTweetSubmit = async () => {
    if (!tweetContent) {
      showNotification({
        title: "Error",
        message: "Tweet content cannot be empty",
        color: "red",
        icon: <IconX />,
        autoClose: 3000,
        position: 'bottom-right',
      });
      return;
    }

    try {
      const token = sessionStorage.getItem("access-token");
      await axios.post(
        `${BASE_URL}/tweets-api/tweet/CreateTweet`,
        {
          UserId: userId,
          UserName: username,
          Title: "TesTitle",
          Content: tweetContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showNotification({
        title: "Success",
        message: "Tweet posted successfully",
        color: "green",
        icon: <IconCheck />,
        autoClose: 3000,
        position: 'bottom-right',
      });
      setTweetContent(""); // Clear the input field after successful submission
    } catch (error) {
      console.error("Error creating tweet:", error);
      showNotification({
        title: "Error",
        message: "Failed to post tweet",
        color: "red",
        icon: <IconCheck />,
        autoClose: 3000,
        position: 'bottom-right',
      });
    }
  };

  return (
    <>
      <AppLayout />
      
      <Space h={"4rem"} />
      <Center>
      <Input
        placeholder="Enter message for tweet"
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
        w={"11rem"}
      />
      </Center>
      <Space h={"1rem"} />
      <Center>
      <Button variant="outline" color={"orange"} onClick={handleTweetSubmit}>
        Post tweet
      </Button>
      </Center>
      <Space h={"2rem"} />
      <Center>
      {tweets.length > 0 ? (
        <SimpleGrid maw={"40rem"} w={"20rem"}>
          {tweets.map((tweet) => (
            <Card key={tweet.id} shadow="sm" radius="xl" withBorder>
              <Group>
                <Text>{tweet.content}</Text>
              </Group>
              <Space h={"1rem"} />
              <Text size="sm" c="gray">
                Created: {new Date(tweet.createdDate).toLocaleString()}
              </Text>
              <Text size="sm" c="gray">
                from:{" "}
                <Link to={`/Account/${tweet.userName}`}>
                  {tweet.userName}
                </Link>
              </Text>
              <Grid columns={5}>
                <Grid.Col span={0.5}>
                  <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart color="red" stroke={1.5} />
                  </ActionIcon>
                </Grid.Col>
                <Grid.Col span={0.1}>
                  <ActionIcon variant="default" radius="md" size={36}>
                    <IconMessage color="steelblue" stroke={1.5} />
                  </ActionIcon>
                </Grid.Col>
              </Grid>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <p>No tweets found.</p>
      )}
      </Center>
    </>
  );
};

export default Feedpage;