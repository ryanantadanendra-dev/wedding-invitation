import axios from "@/lib/axios";

export async function getUcapan() {
  const response = await axios.get("/api/pesan").then((res) => {
    return res.data;
  });

  if (response.success) return response.data;

  return [];
}
