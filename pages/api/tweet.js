import { getTweets } from "@/lib/twitter";

export default async (_, res) => {
  const tweets = await getTweets(["1405963596828491779"]);
  res.status(200).json(tweets);
};
