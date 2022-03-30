import React from "react";

export default function handler(req, res) {
  //   const body = JSON.parse(req.body);
  // console.log(req);
  // message(req.body);
  // if (req.body) {
  return <div>works bruhhh{JSON.stringify(req)}</div>;
  // } else return <div>waiting for response</div>;
}

function message(res) {
  return <div>works bruhhh{res}</div>;
}

function waiting(res) {
  return <div>waiting for response</div>;
}
