export default function Ride({ data }) {
  console.log(data);
  let ip = getip();
  console.log(JSON.stringify(ip.en1));
  console.log(typeof ip.en0);
  return (
    <div>
      your ride is ready, {data[data.length - 1].driverName} is on the way
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:4000/ride");
  const data = await res.json();
  return { props: { data } };
}

function getip() {
  const { networkInterfaces } = require("os");

  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === "IPv4" && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  return results;
}
