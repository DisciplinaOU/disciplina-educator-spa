{ aaaUrl ? null
, educatorUrl ? null
, pkgs ? import ./pkgs.nix}:

pkgs.callPackage ./release.nix {
  inherit aaaUrl;
  inherit educatorUrl;
}
