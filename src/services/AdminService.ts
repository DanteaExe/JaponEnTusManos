import { pool } from "../config/db";
import { Admin } from "../models/Admin";
import { EncryptionHandler } from "../Handlers/EncryptionHandler";

export class AdminService {
  async create(admin: Admin): Promise<Admin> {
    const hashedPassword = await EncryptionHandler.hashPassword(admin.PasswordHash);

    const [result]: any = await pool.query(
      "INSERT INTO Admin (Name, PasswordHash) VALUES (?, ?)",
      [admin.Name, hashedPassword]
    );

    admin.AdminId = result.insertId;
    admin.PasswordHash = hashedPassword;
    return admin;
  }

  async login(Name: string, Password: string): Promise<Admin | null> {
    const [rows]: any = await pool.query("SELECT * FROM Admin WHERE Name = ?", [Name]);

    if (rows.length === 0) return null;

    const admin = Admin.fromDB(rows[0]);
    const isValid = await EncryptionHandler.comparePassword(Password, admin.PasswordHash);
    if (!isValid) return null;

    return admin;
  }

  async getAll(): Promise<Admin[]> {
    const [rows]: any = await pool.query("SELECT * FROM Admin");
    return rows.map((row: any) => Admin.fromDB(row));
  }
}
