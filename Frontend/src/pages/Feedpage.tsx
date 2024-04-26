import React, { useState, useEffect } from "react";
import axios from "axios";
import AppLayout from "../components/AppLayout";
import {
  ActionIcon,
  Card,
  Grid,
  Group,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { IconHeart, IconMessage } from "@tabler/icons-react";

const Feedpage: React.FC<{}> = () => {
  const [tweets, setTweets] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/tweets-api/feed"
        );
        setTweets(response.data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AppLayout />
      <Space h={"4rem"} />
      {tweets.length > 0 ? (
        <SimpleGrid>
          {tweets.map((tweet) => (
            <Card key={tweet.id} shadow="sm" radius="xl" withBorder>
              <Group>
                <Title>{tweet.title}</Title>
                <Text>{tweet.content}</Text>
              </Group>
              <Space h={"1rem"}/>
              <Text size="sm" c="gray">
                Created: {tweet.createdDate}
              </Text>
              <Grid>
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
