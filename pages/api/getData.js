import { getPostData } from "@/lib/twitter";

export default async (_, res) => {
  const data = await getPostData("adding - google - analytics");
  res.status(200).json(data);
};
