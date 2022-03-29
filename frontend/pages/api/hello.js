import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import requestIp from 'request-ip'

const Producer = process.env.PRODUCER || "localhost";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function handler(req, res) {
  // Run cors
  let detectedIp = requestIp.getClientIp(req)

  await cors(req, res);
  req.body.client_ip = detectedIp;
  const data = await fetch("http://"+Producer+":6969/new_ride", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }).then((res) => res.json());
  
        res.json(data)
}