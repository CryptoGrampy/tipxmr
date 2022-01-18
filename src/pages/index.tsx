import { Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import useSWR from "swr";
import { Streamer } from "../data/types";
import { getStreamers } from "../lib/streamers";
import HorizontalCenter from "~/components/helper/HorizontalCenter"

type Props = {
  streamers: Streamer[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const streamers = await getStreamers();
  return { props: { streamers } };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const fetcher = (...args: unknown[]) =>
  fetch(...args).then((res) => res.json());

const Home: NextPage<ServerSideProps> = ({ streamers }) => {
  const { data, error } = useSWR("/api/streamers", fetcher);

  console.log({ data });
  console.log({ streamers });

  return (
    <Container>
      <Head><title>TipXMR</title></Head>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          {/* <img src={landingIcon} alt="Logo" /> */}
          <HorizontalCenter>
            <img src="https://via.placeholder.com/150" alt="Landing" />
          </HorizontalCenter>
        </Grid>
        <Grid item xs={6} sx={{ margin: "auto" }}>
          <Typography variant="h1" align="center">
            Monero Donations in your livestream
          </Typography>
        </Grid>
        <Grid item>

          {/* Example for using data from swr */}
          <List>
            {streamers.map((streamer) => (
              <ListItem key={streamer.id} disablePadding>
                <ListItemButton>
                  <ListItemText primary={streamer.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
};

export default Home;
