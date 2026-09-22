"use server";

/**
 * Expands a shortened URL to its canonical form.
 * Browsers cannot do this client-side due to CORS.
 */
export async function expandShortUrl(url: string) {
  // Return early if it doesn't look like a short link
  if (
    !url.includes("goo.gl") &&
    !url.includes("g.co") &&
    !url.includes("bit.ly")
  ) {
    return url;
  }

  try {
    // We use fetch with redirect: 'follow' to let the server trace the path
    const response = await fetch(url, {
      method: "HEAD", // We only need headers to get the final URL
      redirect: "follow",
      next: { revalidate: 86400 }, // Cache this result for 24h (equivalent to set_transient)
    });

    return response.url;
  } catch (error) {
    return url; // Fail gracefully by returning original
  }
}
