import https from "https";
import fs from "fs";
import path from "path";
import "dotenv/config";
import * as tar from "tar";
import { pipeline } from "stream/promises";

const ACCOUNT_ID = process.env.MAXMIND_ACCOUNT_ID;
const LICENSE_KEY = process.env.MAXMIND_LICENSE_KEY;

const auth = Buffer.from(`${ACCOUNT_ID}:${LICENSE_KEY}`).toString("base64");

const DB_URL =
  "https://download.maxmind.com/geoip/databases/GeoLite2-City/download?suffix=tar.gz";
const DB_PATH = path.join(
  process.cwd(),
  "src/utils/GeoData",
  "GeoLite2-City.mmdb"
);
const TEMP_PATH = path.join(process.cwd(), "src/utils/GeoData", "temp.tar.gz");

const initialOptions = {
  headers: {
    Authorization: `Basic ${auth}`,
  },
};

async function downloadDatabase() {
  console.log("\n Starting GeoLite2 database update process...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // Klasör kontrolü
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    console.log("📁 Creating database directory...");
    fs.mkdirSync(dbDir, { recursive: true });
  }

  console.log("🔑 Authenticating with MaxMind...");

  https
    .get(DB_URL, initialOptions, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const newUrl = response.headers.location;
        if (newUrl) {
          console.log("🔄 Following redirect...");
          console.log(`📍 New location: ${newUrl}\n`);
          https.get(newUrl, handleResponse).on("error", handleError);
          return;
        }
      }

      handleResponse(response);
    })
    .on("error", handleError);
}

async function handleResponse(response: any) {
  if (response.statusCode === 401) {
    console.error("\n❌ Authorization failed!");
    console.error("⚠️  Please check your account ID and license key.");
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error("\n❌ Download failed!");
    console.error(
      `⚠️  Server responded with status code: ${response.statusCode}`
    );
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    process.exit(1);
  }

  console.log("📥 Starting download...");

  let downloadedBytes = 0;
  const totalBytes = parseInt(response.headers["content-length"] || "0", 10);

  // İlk olarak tar.gz dosyasını indir
  const tempWrite = fs.createWriteStream(TEMP_PATH);

  response.on("data", (chunk: Buffer) => {
    downloadedBytes += chunk.length;
    if (totalBytes) {
      const progress = ((downloadedBytes / totalBytes) * 100).toFixed(1);
      process.stdout.write(
        `\r💾 Downloaded: ${progress}% (${formatBytes(
          downloadedBytes
        )}/${formatBytes(totalBytes)})`
      );
    } else {
      process.stdout.write(`\r💾 Downloaded: ${formatBytes(downloadedBytes)}`);
    }
  });

  try {
    await pipeline(response, tempWrite);
    console.log("\n\n📦 Extracting database file...");

    const extractDir = path.join(path.dirname(DB_PATH), "temp_extract");
    if (!fs.existsSync(extractDir)) {
      fs.mkdirSync(extractDir, { recursive: true });
    }

    // Önce geçici bir klasöre çıkaralım
    await tar.x({
      file: TEMP_PATH,
      cwd: extractDir,
      filter: (path) => path.endsWith(".mmdb"),
    });

    // Çıkarılan dosyayı bulalım
    const files = fs.readdirSync(extractDir, { recursive: true }) as string[];
    const mmdbFile = files.find((file) => file.endsWith(".mmdb"));

    if (!mmdbFile) {
      throw new Error("No .mmdb file found in the archive");
    }

    // Dosya geçerliyse kopyala
    const sourcePath = path.join(extractDir, mmdbFile);
    fs.copyFileSync(sourcePath, DB_PATH);

    // Geçici klasörü temizleyelim
    fs.rmSync(extractDir, { recursive: true, force: true });

    // Dosya boyutunu kontrol et
    const stats = fs.statSync(DB_PATH);
    if (stats.size < 1000000) {
      throw new Error("Downloaded database file is too small!");
    }

    console.log("✅ Database updated successfully!");
    console.log("📦 File saved to:", DB_PATH);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  } catch (err: any) {
    console.error("\n\n❌ Error processing file!");
    console.error("⚠️  Details:", err.message);
    console.error("🧹 Cleaning up temporary files...");
    if (fs.existsSync(TEMP_PATH)) fs.unlinkSync(TEMP_PATH);
    if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    process.exit(1);
  } finally {
    // Geçici dosyayı temizle
    if (fs.existsSync(TEMP_PATH)) {
      fs.unlinkSync(TEMP_PATH);
    }
    process.exit(0);
  }
}

function handleError(err: Error) {
  console.error("\n\n❌ Network error occurred!");
  console.error("⚠️  Details:", err.message);
  console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  process.exit(1);
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

downloadDatabase();
