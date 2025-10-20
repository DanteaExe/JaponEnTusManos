export class User {
    public Name: string;
    public Email: string;
    public Location: string;
    public PasswordHash: string;
    public UserId?: number;
    public CreatedAt?: string;

    constructor(Name: string, Email: string, Location: string, PasswordHash: string, UserId?: number, CreatedAt?: string) {
        this.UserId = UserId;
        this.Name = Name;
        this.Email = Email;
        this.Location = Location;
        this.PasswordHash = PasswordHash;
        this.CreatedAt = CreatedAt;
    }

    static fromDB(row: any): User {
        return new User(row.Name, row.Email, row.Location, row.PasswordHash, row.UserId, row.CreatedAt);
    }

    toJson() {
        return {
            UserId: this.UserId,
            Name: this.Name,
            Email: this.Email,
            Location: this.Location,
            CreatedAt: this.CreatedAt
        };
    }
}