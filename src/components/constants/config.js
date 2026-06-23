
const localServer = "http://localhost:3000";
const envServer = import.meta.env.VITE_SERVER?.replace(/\/$/, "");

export const server = import.meta.env.MODE === "development" ? localServer : envServer || localServer;

// fix alert listener ,add refetch listener ,