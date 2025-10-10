import { Pool } from "pg";
import { logger } from "@/services/logger";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = async (text: string, params: any[]) => {
  const result = await pool.query(text, params);
  logger.info("Query executed successfully", { text, params });
  // duration in milliseconds
  return result;
};

export default pool;