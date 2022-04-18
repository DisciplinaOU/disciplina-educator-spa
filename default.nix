{ aaaUrl ? null
, educatorUrl ? null
, pkgs ? import ./pkgs.nix}:

pkgs.callPackage ./release.nix {
  sassBinaryPath = pkgs.sassBinaryPath;
  inherit aaaUrl;
  inherit educatorUrl;
}
