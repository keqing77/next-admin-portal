
export enum UserRole {
    Viewer = "Viewer",
    Analyst = "Analyst",
    Owner = "Owner",
}

export type UserPermission = 
    | "mi.readonly"
    | "mi.editor"
    | "evaluation.readonly"
    | "evaluation.editor"
    | "lifecycle.readonly"
    | "simulation.readonly"
    | "simulation.editor";

export const ALL_USER_PERMISSIONS: UserPermission[] = [
    "mi.readonly",
    "mi.editor",
    "evaluation.readonly",
    "evaluation.editor",
    "lifecycle.readonly",
    "simulation.readonly",
    "simulation.editor",
];

export type AccessControlProps = {
  userPermissions: UserPermission[];
  allowPermissions: UserPermission[];
  renderNoAccess: () => React.ReactNode;
  children: React.ReactNode;
}

export type User = {
    id?: string;
    name: string;
    mail: string;
    country?: string;
    title: Date;
    department?: string;
    role: UserRole;
    eim?: string;
    lob?: string;
    acl?: string;
    photo?: string;
};
  