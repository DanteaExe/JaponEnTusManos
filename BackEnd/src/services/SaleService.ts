import { pool } from "../config/db";
import { Sale } from "../models/Sale";
import { SaleItem } from "../models/SaleItem";

export class SaleService {
    async create(sale: Sale, items: SaleItem[]): Promise<Sale> {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const [saleResult]: any = await conn.query(
                "INSERT INTO Sale (UserID, Total, PaymentStatus, PaymentMethod) VALUES (?, ?, ?, ?)",
                [sale.UserID, sale.Total, sale.PaymentStatus, sale.PaymentMethod]
            );

            const saleId = saleResult.insertId;

            for (const item of items) {
                await conn.query(
                    "INSERT INTO SaleItem (SaleID, ProductID, Quantity, UnitPrice) VALUES (?, ?, ?, ?)",
                    [saleId, item.ProductID, item.Quantity, item.UnitPrice]
                );

                await conn.query(
                    "UPDATE Product SET Stock = Stock - ? WHERE ProductID = ?",
                    [item.Quantity, item.ProductID]
                );
            }

            await conn.commit();

            const [rows]: any = await conn.query("SELECT * FROM Sale WHERE SaleID = ?", [saleId]);
            return Sale.fromDB(rows[0]);
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }

    async getAll(): Promise<Sale[]> {
        const [rows]: any = await pool.query("SELECT * FROM Sale");
        return rows.map((r: any) => Sale.fromDB(r));
    }

    async getById(id: number): Promise<Sale | null> {
        const [rows]: any = await pool.query("SELECT * FROM Sale WHERE SaleID = ?", [id]);
        if (rows.length === 0) return null;
        return Sale.fromDB(rows[0]);
    }

    async getItemsBySaleId(saleId: number): Promise<SaleItem[]> {
        const [rows]: any = await pool.query("SELECT * FROM SaleItem WHERE SaleID = ?", [saleId]);
        return rows.map((r: any) => SaleItem.fromDB(r));
    }

    async getByUserId(userId: number): Promise<Sale[]> {
        const [rows]: any = await pool.query("SELECT * FROM Sale WHERE UserID = ?", [userId]);
        return rows.map((r: any) => Sale.fromDB(r));
    }

}
