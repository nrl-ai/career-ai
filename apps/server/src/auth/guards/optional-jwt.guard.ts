import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class OptionalJwtGuard extends AuthGuard("jwt") {
  // Override handleRequest to make authentication optional
  handleRequest(err: any, user: any) {
    // Return user if authenticated, otherwise return null (no error thrown)
    return user;
  }
}
