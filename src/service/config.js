import axios from "axios";

export const http = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/",
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NyIsIkhldEhhblN0cmluZyI6IjI3LzEyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczNTI1NzYwMDAwMCIsIm5iZiI6MTcwNTU5NzIwMCwiZXhwIjoxNzM1NDA1MjAwfQ.QgJv8DfQ6VrgNKpb6y5aTzwXLElPfrxzaooDqmw06CY",
  },
});
