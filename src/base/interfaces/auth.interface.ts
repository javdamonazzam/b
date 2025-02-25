import { RoleEnum } from "@/types/enum/role.enum";

export interface IJwtPayload {
  sub: number;
  role: RoleEnum;
  ticket?: number;
}
