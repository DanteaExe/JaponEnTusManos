export class Admin {
  AdminId?: number;
  Name!: string;
  PasswordHash!: string;

  constructor(Name: string, PasswordHash: string, AdminId?: number) {
    this.AdminId = AdminId;
    this.Name = Name;
    this.PasswordHash = PasswordHash;
  }

  static fromDB(row: any): Admin {
    return new Admin(row.Name, row.PasswordHash, row.AdminId);
  }

  toJson() {
    return {
      AdminId: this.AdminId,
      Name: this.Name,
    };
  }
}
