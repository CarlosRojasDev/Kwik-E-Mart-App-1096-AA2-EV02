import { useState } from "react";

export default function useMessage () {
  const [message, setMessage] = useState("");
  return { message, setMessage };
};
