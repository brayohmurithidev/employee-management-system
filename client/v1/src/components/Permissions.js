import { useAuth } from "../contexts/authContext";
import { RolesAndPermissions } from "../utils/roles";

const Permissions = (props) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return;
  }

  const userRoles = currentUser.userRoles;

  let userPermissions = [];

  const getPermissionsForARole = (role) => {
    return RolesAndPermissions[role] || [];
  };

  userRoles.forEach((role) =>
    RolesAndPermissions.hasOwnProperty(role.toUpperCase())
      ? getPermissionsForARole(role.toUpperCase()).map((perm) =>
          userPermissions.push(perm),
        )
      : null,
  );

  const allowedToAccess = userPermissions.includes(props.permission);

  return allowedToAccess ? props.children : null;
};

export default Permissions;
