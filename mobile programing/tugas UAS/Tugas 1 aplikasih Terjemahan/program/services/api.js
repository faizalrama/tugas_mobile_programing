const BASE_URL = "https://izal.pythonanywhere.com/";

export const Translate = async (input, dari) => {
  try {
    const response = await fetch(
      `${BASE_URL}/translate?q=${input}&from=${dari}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // if (!response.ok) {
    //   throw new Error(Terjemahan gagal dengan status ${response.status});
    // }
    return await response.json();
  } catch (error) {
    console.error("Kesalahan saat mengambil hasil terjemahan:", error);
    throw error;
  }
};