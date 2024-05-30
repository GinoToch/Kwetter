import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconUser } from "@tabler/icons-react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AppLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  const [username, setUsername] = useState<string>("");
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    const token = sessionStorage.getItem("access-token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      setUsername(decodedToken.unique_name);
    }
  }, [username]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group
          h="100%"
          px="md"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Button
              component={Link}
              to="/home"
              variant="transparent"
              
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/bookings"
              variant="transparent"
              
            >
              My feed
            </Button>
            <Button
              component={Link}
              to="/"
              key="checkIn"
              variant="transparent"
            >
              Followers
            </Button>
            <Button key="information" variant="transparent" >
              Trending
            </Button>
            <Button key="information" variant="transparent" >
              Create tweet
            </Button>
          </Group>
          <Group>
            <ActionIcon
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light"
                )
              }
              variant="default"
              size="xl"
              aria-label="Toggle color scheme"
            >
              <IconMoon stroke={1.5} />
            </ActionIcon>
            <Button
              leftSection={<IconUser size={14} />}
              variant="transparent"
              
            >
              {username}
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
      <Button key="" variant="transparent" >
            Card
          </Button>
          <Button key="" variant="transparent" >
            Departure
          </Button>
          <Button key="" variant="transparent" >
            Date
          </Button>
          <Button key="" variant="transparent" >
            Time
          </Button></AppShell.Navbar>
    </AppShell>
  );
}

export default AppLayout;
