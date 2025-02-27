export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

export type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: Date;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    role: UserRole;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripePriceId: string;
    stripeCurrentPeriodEnd: Date;
};
  