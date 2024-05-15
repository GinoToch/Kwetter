import React, { useState, useEffect } from "react";
import axios from "axios";
import AppLayout from "../components/AppLayout";
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

const Feedpage: React.FC<{}> = () => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [tweetContent, setTweetContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/tweets-api/feed"
        );
        setTweets(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };
    fetchData();
  }, []);

  const handleTweetSubmit = async () => {
    if (!tweetContent) {
      // Handle empty tweet content (optional: display an error message)
      return;
    }

    const payload = {
      UserId: "f8443b2e-22fc-4a6a-b2c6-9d63c5aefc29",
      UserName: "nieuweuser",
      Title: "TesTitle",
      Content: tweetContent,
    };

    try {
       await axios.post(
        "http://localhost:9000/tweets-api/tweet/CreateTweet",
        payload
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
      {/* <Button
      onClick={() =>
        notifications.show({
          title: 'Default notification',
          message: 'Hey there, your code is awesome! 🤥',
        })
      }
    >
      Show notification
    </Button> */}
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
                from: {tweet.userName}
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
