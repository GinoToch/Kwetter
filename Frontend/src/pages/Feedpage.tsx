import React, { useState, useEffect } from "react";
import axios from "axios";
import AppLayout from "../components/AppLayout";
import { jwtDecode } from "jwt-decode";
import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Group,
  Input,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import { IconHeart, IconMessage } from "@tabler/icons-react";
import { BASE_URL } from "../constants";
import { Link } from "react-router-dom";

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
      }
    };
    fetchData();
  }, [username]);

  const handleTweetSubmit = async () => {
    if (!tweetContent) {
      // Handle empty tweet content (optional: display an error message)
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
    } catch (error) {
      console.error("Error creating tweet:", error);
      // Handle creation error (optional: display an error message)
    }
  };

  return (
    <>
      <AppLayout />
      <Space h={"4rem"} />
      <Input
        placeholder="Enter message for tweet"
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
      />
      <Space h={"1rem"} />
      <Button variant="outline" color={"orange"} onClick={handleTweetSubmit}>
        Post tweet
      </Button>
      <Space h={"2rem"} />
      {tweets.length > 0 ? (
        <SimpleGrid>
          {tweets.map((tweet) => (
            <Card key={tweet.id} shadow="sm" radius="xl" withBorder>
              <Group>
                <Text>{tweet.content}</Text>
              </Group>
              <Space h={"1rem"} />
              <Text size="sm" c="gray">
                Created: {tweet.createdDate}
              </Text>
              <Text size="sm" c="gray">
                from:{" "}
                <Link to={`/Account`}>
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
    </>
  );
};

export default Feedpage;