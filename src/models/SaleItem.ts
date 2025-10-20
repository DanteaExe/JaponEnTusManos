export class SaleItem {
  public SaleItemID?: number;
  public SaleID: number;
  public ProductID: number;
  public Quantity: number;
  public UnitPrice: number;

  constructor(SaleID: number, ProductID: number, Quantity: number, UnitPrice: number, SaleItemID?: number) {
    this.SaleItemID = SaleItemID;
    this.SaleID = SaleID;
    this.ProductID = ProductID;
    this.Quantity = Quantity;
    this.UnitPrice = UnitPrice;
  }

  static fromDB(row: any): SaleItem {
    return new SaleItem(row.SaleID, row.ProductID, row.Quantity, row.UnitPrice, row.SaleItemID);
  }

  toJson() {
    return {
      SaleItemID: this.SaleItemID,
      SaleID: this.SaleID,
      ProductID: this.ProductID,
      Quantity: this.Quantity,
      UnitPrice: this.UnitPrice,
    };
  }
}
