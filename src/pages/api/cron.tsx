import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response
    .status(200)
    .end(
      'Hello Cron! <Will choose a new clip for each game daily at 12AM EST>'
    );
}
