export {};

declare global {
  interface UserPublicMetadata {
    roles?: ("admin" | "moderator" | "member")[];
  }
}
