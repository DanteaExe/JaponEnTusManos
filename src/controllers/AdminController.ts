import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";
import { Admin } from "../models/Admin";

export class AdminController {
  private service = new AdminService();

  createAdmin = async (req: Request, res: Response) => {
    try {
      const { Name, PasswordHash } = req.body;
      if (!Name || !PasswordHash)
        return res.status(400).json({ message: "Name and Password are required" });

      const admin = new Admin(Name, PasswordHash);
      const newAdmin = await this.service.create(admin);
      res.status(201).json(newAdmin.toJson());
    } catch (error) {
      console.error("Error in creating admin:", error);
      res.status(500).json({ message: "Error with creating admin" });
    }
  };

  loginAdmin = async (req: Request, res: Response) => {
    try {
      const { Name, Password } = req.body;
      if (!Name || !Password)
        return res.status(400).json({ message: "Name and Password are required" });

      const admin = await this.service.login(Name, Password);
      if (!admin)
        return res.status(401).json({ message: "You are not an admin!" });

      res.status(200).json({ message: "Login Succesful", admin: admin.toJson() });
    } catch (error) {
      console.error("Error in login admin:", error);
      res.status(500).json({ message: "Error in login" });
    }
  };

  getAdmins = async (_req: Request, res: Response) => {
    try {
      const admins = await this.service.getAll();
      res.status(200).json(admins.map((a) => a.toJson()));
    } catch (error) {
      res.status(500).json({ message: "Error with getting admins" });
    }
  };
}
