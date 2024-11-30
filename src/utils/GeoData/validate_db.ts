import fs from "fs";

/**
 * Validates the MaxMind database file.
 * @param filePath Full path to the database file.
 * @returns True if valid, false otherwise.
 */
export async function validateDatabase(filePath: string): Promise<boolean> {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`Database file not found at path: ${filePath}`);
      return false;
    }

    const fileSize = fs.statSync(filePath).size;
    if (fileSize < 1_000_000) {
      console.error(`Database file is too small! Size: ${fileSize} bytes`);
      return false;
    }

    console.log(`Database validation successful. File size: ${fileSize} bytes`);
    return true;
  } catch (error) {
    console.error("Database validation failed:", error);
    return false;
  }
}
