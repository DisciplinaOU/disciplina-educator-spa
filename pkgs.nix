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

  sassBinaryPath = pkgs.fetchurl {
    url = https://github.com/sass/node-sass/releases/download/v7.0.1/linux-x64-93_binding.node;
    sha256 = "1rzrzyy5sla708qypr7s3kqwc3g0dhc99bjvxwf3qq4dfygags7x";
  };

in pkgs.extend(final: previous: with previous; rec {
  inherit sassBinaryPath;
  buildYarnPackage = bp.buildYarnPackage;
})
