interface INinja {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  occupation: string;
}

import { createConnection } from "mysql2/promise";
export const baseHandler = (message: string) => {
  console.log("✅ received data ", message);
};

export const objectHandler = (message: string) => {
  const data = JSON.parse(message);
  console.log("✅ receive object ", data);
};

export const tableHandler = async (message: string) => {
  try {
    const conn = await createConnection({
      host: "localhost",
      user: "root",
      password: "secret",
      database: "dsc",
    });
    const ping = await conn.ping();
    console.log("ping ", ping);
    const rawData: INinja[] = JSON.parse(message);
    const data = rawData.map((row) => [
      row.first_name,
      row.last_name,
      row.date_of_birth,
      row.occupation,
    ]);
    console.log("Received:", data);

    const sql =
      "INSERT INTO ninja (first_name, last_name, date_of_birth, occupation) VALUES ?";
    const res = await conn.query(sql, [data]);
    console.log("response", res);
  } catch (error) {
    console.log("error ", error);
  }
};
