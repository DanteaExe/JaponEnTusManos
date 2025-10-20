export class Sale {
  public SaleID?: number;
  public UserID: number;
  public Total: number;
  public PaymentStatus: string;
  public PaymentMethod: string;
  public CreatedAt?: string;

  constructor(UserID: number, Total: number, PaymentStatus: string, PaymentMethod: string, SaleID?: number, CreatedAt?: string) {
    this.SaleID = SaleID;
    this.UserID = UserID;
    this.Total = Total;
    this.PaymentStatus = PaymentStatus;
    this.PaymentMethod = PaymentMethod;
    this.CreatedAt = CreatedAt;
  }

  static fromDB(row: any): Sale {
    return new Sale(row.UserID, row.Total, row.PaymentStatus, row.PaymentMethod, row.SaleID, row.CreatedAt);
  }

  toJson() {
    return {
      SaleID: this.SaleID,
      UserID: this.UserID,
      Total: this.Total,
      PaymentStatus: this.PaymentStatus,
      PaymentMethod: this.PaymentMethod,
      CreatedAt: this.CreatedAt,
    };
  }
}
