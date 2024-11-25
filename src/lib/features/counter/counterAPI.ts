// A mock function to mimic making an async request for data
export const fetchCount = async (amount = 1) => {
  try {
    const response = await fetch("http://localhost:3000/api/example/counter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    console.log("amount", amount);
    const result: { data: number } = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return { data: 0, error };
  }
};
