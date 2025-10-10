import { readFileSync } from "fs";
import { join } from "path";
import { config } from "dotenv";
import { Pool } from "pg";

// Load .env.local first
config({ path: join(process.cwd(), ".env.local") });

async function migrate() {
	console.log("🚀 Starting database migration...");
	console.log("📂 Reading schema from lib/db/schema.sql");
	console.log("🔗 DATABASE_URL:", process.env.DATABASE_URL || "NOT SET");

	// Create pool AFTER loading env variables
	const pool = new Pool({
		connectionString: process.env.DATABASE_URL,
	});

	const schemaPath = join(process.cwd(), "lib/db/schema.sql");
	const schema = readFileSync(schemaPath, "utf-8");

	try {
		await pool.query(schema);
		console.log("\n✅ Database migrated successfully!");
		console.log("   📊 Table 'incidents' created/verified");
		console.log("   🔑 Indexes created for fast queries");
		console.log("   🎯 Ready to ingest data!");
	} catch (error) {
		console.error("\n❌ Migration failed:");
		console.error(error);
		console.log("\n💡 Troubleshooting:");
		console.log("   1. Check DATABASE_URL in .env.local");
		console.log("   2. Verify PostgreSQL is running");
		console.log("   3. Ensure database exists");
		process.exit(1);
	} finally {
		await pool.end();
	}
}

migrate();
