import { AccessControlProps } from "@/types";
import React from "react";

const AccessControl: React.FC<AccessControlProps> = ({
  userPermissions,
  allowPermissions,
  renderNoAccess,
  children,
}) => {
  const hasAccess = allowPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  return hasAccess ? <>{children}</> : renderNoAccess();
};

export default AccessControl;
