/* eslint-disable @typescript-eslint/no-explicit-any */
interface OpenCageResponse {
  results: Array<unknown>;
  status: {
    code: number;
    message: string;
  };
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return new Response(JSON.stringify({ error: "Address is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=${
        process.env.OPENCAGE_API_KEY as string
      }&q=${encodeURIComponent(address)}&limit=1&countrycode=CA&language=en`
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data: OpenCageResponse = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
