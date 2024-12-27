import axios from "axios";

export const http = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/",
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBDeWJlclNvZnQiLCJIZXRIYW5TdHJpbmciOiIwNC8xMC8yMDM0IiwiSGV0SGFuVGltZSI6IjIwNDM1MzI4MDAwMDAiLCJuYmYiOjE5NTY1MDI4MDAsImV4cCI6MjA0MzY4MDQwMH0.z_jMW7ae1X1gIgL_ePE8et6ts5HNKNoWcpBd8jj-b_",
  },
});
