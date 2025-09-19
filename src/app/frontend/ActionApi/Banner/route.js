import { getAll } from "@/backend/controllers/Frontend/Banner";

export async function GET() {
  try {
    const response = await getAll();  // this is a Response object
    const data = await response.json(); // parse it into real JSON

    console.log("🔥 Data from banner Controller:", data); // now you’ll see the real data

    return new Response(
      JSON.stringify({ success: true, banner: data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Error in Banner GET:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
