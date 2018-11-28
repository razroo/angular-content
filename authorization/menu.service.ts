private showMenuItem(authGroup: AuthGroup) {
   return this.authorizationService.hasPermission(authGroup);
}
