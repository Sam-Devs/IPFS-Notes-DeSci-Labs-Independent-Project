import type { NextApiRequest, NextApiResponse } from "next";
import { create } from "ipfs-http-client";

export type BasicIpfsData = {
  cid: string | any;
  content: string;
};

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_SECRET_KEY;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
    "Access-Control-Allow-Origin": "*",
    Origin: "https://ipfs.infura.io:5001",
    "User-Agent": "foo",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BasicIpfsData | any>
) {
  try {
    let items = [];
    const note = req.body.txt;
    const data = await client.add({ path: "/", content: note });
    const item: BasicIpfsData = {
      content: note,
      cid: Buffer.from(data.path).toString(),
    };

    items.push(item);

    return res.status(200).json(items);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}
