export function getEmbedSrc(url) {
  if (!url) return null;

  // If already an embed URL, return as-is
  if (url.includes("output=embed") || url.includes("/maps/embed")) {
    return url;
  }

  // 0. PRIORITY: Data parameter coordinates (!3d = lat, !4d = lng) - Most accurate
  // Matches: !3d-8.6559348!4d115.2168231
  const dataMatch = url.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
  if (dataMatch) {
    const [, lat, lng] = dataMatch;
    // Try to get zoom from URL
    const zoomMatch = url.match(/,(\d+\.?\d*)z/);
    const zoomLevel = zoomMatch ? Math.round(parseFloat(zoomMatch[1])) : 13;
    return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoomLevel}&output=embed`;
  }

  // 1. Coordinates: @lat,lng,zoom or @lat,lng
  // Matches: @-8.650000,115.216667,15z or @-8.650000,115.216667
  const coordsMatch = url.match(
    /@(-?\d+\.?\d*),(-?\d+\.?\d*)(?:,(\d+\.?\d*)z)?/,
  );
  if (coordsMatch) {
    const [, lat, lng, zoom] = coordsMatch;
    const zoomLevel = zoom ? Math.round(parseFloat(zoom)) : 12; // Use URL zoom or default 12
    return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoomLevel}&output=embed`;
  }

  // 2. Place ID: place_id parameter
  // Matches: ?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4
  const placeIdMatch = url.match(/[?&]place_id=([^&]+)/);
  if (placeIdMatch) {
    const placeId = placeIdMatch[1];
    return `https://maps.google.com/maps?q=place_id:${placeId}&output=embed`;
  }

  // 3. Place Name: /place/Name
  // Matches: /place/Eiffel+Tower or /place/Eiffel%20Tower
  const placeMatch = url.match(/\/place\/([^/?#]+)/);
  if (placeMatch) {
    const query = decodeURIComponent(placeMatch[1]);
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
  }

  // 4. Search Query: /search/Query
  // Matches: /search/Pizza or /maps/search/Pizza
  const searchMatch = url.match(/\/(?:maps\/)?search\/([^/?#]+)/);
  if (searchMatch) {
    const query = decodeURIComponent(searchMatch[1]);
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
  }

  // 5. Query Parameter: ?q=something
  try {
    const urlObj = new URL(url);
    const qParam = urlObj.searchParams.get("q");
    if (qParam) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(qParam)}&z=15&output=embed`;
    }
  } catch (e) {
    // Failed to parse URL object
  }

  return null;
}
