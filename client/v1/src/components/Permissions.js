import { useAuth } from "../contexts/authContext";
import { RolesAndPermissions } from "../utils/roles";

const Permissions = (props) => {
  const { currentUser } = useAuth();

  const userRoles = currentUser.userRoles;
  console.log(userRoles);
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
