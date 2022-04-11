# (import (fetchGit {
#   url = https://github.com/DisciplinaOU/serokell-closure;
#   rev = "7b26d2aa7b99b11201679b51d80a963f9aac4847";
#   ref = "20210415.2126";
let
  sources = import ./nix/sources.nix;
  haskellNix = import sources.haskellNix {};
  pkgs = import haskellNix.sources.nixpkgs-unstable haskellNix.nixpkgsArgs;

  bp = pkgs.callPackage (pkgs.fetchFromGitHub {
    owner = "serokell";
    repo = "nix-npm-buildpackage";
    rev = "881f4bfa68e33cd0fb69e6b739fb92f8d0bbe37e";
    sha256 = "0wqmxijinm9mjcm3n5id13phmapqcxcrxwi106wvg0krca3ki58x";
  }) {};

in pkgs.extend(final: previous: with previous; rec {
  buildYarnPackage = bp.buildYarnPackage;
  constGitIgnore = _: path: _: path;
})
