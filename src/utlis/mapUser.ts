import { UserResponse } from "../types/user.type";

export function mapUser(user: UserResponse) {
  const { _id, ...rest } = user;

  return { id: user._id, ...rest };
}
