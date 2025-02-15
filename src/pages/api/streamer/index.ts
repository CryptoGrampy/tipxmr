import { Streamer, Statuses, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getStreamers, createStreamer } from "~/lib/streamer";
import { createAccount } from "~/lib/account";

const { PrismaClientKnownRequestError } = Prisma;
type ResponseData = Streamer[] | { error: string };

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    streamerGetHandler(req, res);
  } else if (req.method === "POST") {
    streamerPostHandler(req, res);
  } else {
    res.setHeader("Allow", ["GET, POST"]);
    res.status(405).end(`Method ${req.method} not Allowed`);
  }
}

const streamerGetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const streamers = await getStreamers();
    res.status(200).json(streamers);
  } catch (reason) {
    res.status(500).json({ error: "failed to load data" });
  }
};

const streamerPostHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, name, alias, socket = null } = req.body;
  try {
    const streamer = await createStreamer(String(id), { name, alias, socket });
    const account = await createAccount(streamer.id, {
      createdAt: new Date(),
      isOnline: false,
      status: Statuses.active,
    });
    const result = { streamer: streamer, account: account };
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      res.status(500).json({ error: `failed to create streamer, ${message}` });
    }
  }
};

export default handler;
