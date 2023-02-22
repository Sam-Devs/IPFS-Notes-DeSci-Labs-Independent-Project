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
    if (req.method === "POST") {
      const note = req.body.txt;
      const response = await client.add({ path: "/", content: note });
      return res.status(200).json(response);
    } else {
      const items = [];
      const { cid } = req.query;
      for await (const file of client.cat(cid as any)) {
        let data = Buffer.from(file).toString();
        const item: BasicIpfsData = {
          content: data,
          cid: cid,
        };
        items.push(item);
      }
      console.log(items);
      return res.status(200).json(items);
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}
