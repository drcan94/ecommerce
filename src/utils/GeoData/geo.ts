"use server";
import { City, ReaderModel, Reader } from "@maxmind/geoip2-node";
import { headers } from "next/headers";
import { unstable_cache, revalidateTag } from "next/cache";
import path from "path";
import { DEFAULT_GEO_DATA, plainDefaultGeoData } from "./default_data";
import { validateDatabase } from "./validate_db";

/**
 * MaxMind database file path.
 */
const DB_PATH: string = path.join(
  process.cwd(),
  "src/utils/GeoData",
  "GeoLite2-City.mmdb"
);

const FALLBACK_IP = process.env.FALLBACK_IP!;

/**
 * Promise to hold the ReaderModel instance.
 */
let readerPromise: Promise<ReaderModel> | null = null;

/**
 * Stores the initial IP address.
 */
let initialIp: string | null = null;

/**
 * Retrieves geo data using the MaxMind Reader.
 * @returns Geo data.
 */
async function getGeoDataFromReader(): Promise<Partial<City>> {
  try {
    if (!initialIp) {
      throw new Error("Initial IP not set");
    }

    if (!readerPromise) {
      const absolutePath = path.resolve(DB_PATH);
      const isValid = await validateDatabase(absolutePath);

      if (!isValid) {
        console.error("Database validation failed");
        return DEFAULT_GEO_DATA;
      }

      readerPromise = Reader.open(absolutePath);
    }

    const reader = await readerPromise;
    const result = reader.city(initialIp);

    if (!result || !result.country || !result.country.isoCode) {
      console.warn(
        `No valid data found for IP: ${initialIp}. Returning default geo data.`
      );
      return DEFAULT_GEO_DATA;
    }
    return plainDefaultGeoData(result, initialIp);
  } catch (error) {
    console.error(`Error querying IP: ${initialIp}. Error:`, error);
    return DEFAULT_GEO_DATA;
  }
}

/**
 * Retrieves the client's IP address.
 * @returns The client's IP address.
 */
async function getClientIp(): Promise<string> {
  try {
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : headersList.get("x-real-ip");
    const clientIp =
      !ip || ip === "::1" || ip === "127.0.0.1" ? FALLBACK_IP : ip;
    console.log(`Client IP determined: ${clientIp}`);
    return clientIp;
  } catch (error) {
    console.error("Error getting client IP:", error);
    return FALLBACK_IP;
  }
}

/**
 * Cached function to get geo data.
 */
const getCachedGeoData = unstable_cache(
  async (): Promise<Partial<City>> => {
    if (!initialIp) {
      throw new Error("Initial IP not set");
    }
    console.log(`Fetching geo data for IP: ${initialIp}`);
    const geoData = await getGeoDataFromReader();
    return geoData;
  },
  ["geo-data-static", initialIp!], // Cache key
  {
    tags: ["geo-data"],
    revalidate: 24 * 60 * 60, // 24 hours
  }
);

/**
 * Retrieves the client's geo data.
 * @returns The client's geo data.
 */
export async function getClientGeoData(): Promise<Partial<City>> {
  if (!initialIp) {
    initialIp = await getClientIp();
  }
  const geoData = await getCachedGeoData();
  return geoData;
}

/**
 * Refreshes the geo data cache.
 */
export async function refreshGeoDataCache(): Promise<void> {
  try {
    console.log("Refreshing geo data cache...");
    revalidateTag("geo-data"); // Manually invalidate the cache
    readerPromise = null; // Reset the reader to reload the database
    initialIp = null; // Reset the initial IP
    console.log("Geo data cache refreshed.");
  } catch (error) {
    console.error("Error refreshing geo data cache:", error);
  }
}
