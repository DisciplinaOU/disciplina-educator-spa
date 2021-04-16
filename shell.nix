{ pkgs ? import ./pkgs.nix {} }:

with pkgs;

mkShell {
  nativeBuildInputs = [
    nodejs
    yarn
  ];
}
