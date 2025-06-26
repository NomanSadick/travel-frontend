import { NextResponse } from "next/server";

//  deployed backend API URL
const API_BASE_URL = "https://travel-backend-hcyy.onrender.com/api";

export async function GET() {
  try {
    const res = await fetch(`${API_BASE_URL}/packages`);
    const packages = await res.json();

    // Replace with your real frontend domain
    const baseUrl = "https://travel-frontend-eight.vercel.app";

    const urls = packages
      .map((pkg: any) => {
        const lastMod = new Date().toISOString(); // Optional: use pkg.updatedAt
        return `
          <url>
            <loc>${baseUrl}/package/${pkg._id}</loc>
            <lastmod>${lastMod}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>
        `;
      })
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
        ${urls}
      </urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }
}
