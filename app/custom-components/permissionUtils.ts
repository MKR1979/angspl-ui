export interface UserPermission {
  option_id: number;
  option_code: number;
  option_name: string;
  module_id: number;
  module_name: string;
  grant: boolean;
  permission_source: string;
}

export const findPermission = (
  userPermissions: UserPermission[],
  option_code: number
): boolean => {
  const permission = userPermissions.find(
    (perm) => perm.option_code === option_code
  );
  return permission?.grant ?? false;
};
